<template>
  <club-page
    header='edit club'
    sticky='bottom'
    :loading='!club'
  >
    <template v-slot:buttons>
      <club-button
        class='clubButton buttonSecondary q-px-md q-mr-md'
        :class='{}'
        :to='{name: "club-home"}'
        dense
      >cancel</club-button>

      <club-button
        class='clubButtonActive q-px-md'
        dense
        @click='onSaveClicked'
      >save</club-button>
    </template>

    <template v-if='club'>
      <q-form ref='formRef'>

        <q-uploader
          flat
          url='/api/uploads/image'
          class='q-mb-lg full-width clubBgDefault'
          label='Upload header image'
          auto-upload
          @uploaded='onHeroImgUploaded'
        />

<!--        <club-hero-->
<!--          v-if='heroImg || logoImg'-->
<!--          max-height='120px'-->
<!--          :club-style='{-->
<!--            heroImg: heroImg ? `\\static\\uploads\\${heroImg}` : undefined,-->
<!--            logoImg: logoImg ? `\\static\\uploads\\${logoImg}` : undefined,-->
<!--          }'-->
<!--          class='q-mb-lg'-->
<!--        />-->

        <q-uploader
          flat
          url='/api/uploads/image'
          class='q-mb-lg full-width clubBgDefault'
          label='Upload logo image'
          auto-upload
          @uploaded='onLogoImgUploaded'
        />

        <div class='q-mb-md'>
          <div class='q-pb-sm flex flex-center'>
            <q-input
              label='Name'
              dark outlined
              style='width: 550px'
              v-model='club.name'
              :rules="[ val => val.length > 0 || 'please fill this field' ]"
            />
          </div>

          <div class='q-pb-sm flex flex-center'>
            <q-editor
              label='Description'
              dark outlined
              style='width: 550px; background-color: transparent'
              v-model='club.description'
              :toolbar="[
                ['bold', 'italic', 'underline', 'strike'],
              ]"
            />
          </div>

        </div>

        <div class='text-center'>
        <template
          v-for='socCode in socialLinkCodes'
          v-bind:key='socCode'
        >

          <div class='q-pb-sm flex flex-center'>
            <q-input
              :label='socCode'
              dark outlined
              style='width: 550px'
              v-model='club.socialLinks[socCode]'
              :rules="[ val => (!val || val.startsWith('https://')) ||  'Should start with https://' ]"
            >
              <template v-slot:append>
                <q-avatar>
                  <q-icon :name='mapSocialToIcon(socCode)' size='sm' />
                </q-avatar>
              </template>
            </q-input>
          </div>
        </template>

<!--        <div-->
<!--          v-if='club.buyLinks.collections'-->
<!--          class='q-page'-->
<!--          ref='clubPageCollections'-->
<!--        >-->
<!--          <collections-component-->
<!--            :club-name='club.name'-->
<!--            :buy-links='club.buyLinks'-->
<!--          />-->
<!--        </div>-->
      </div>

      </q-form>
    </template>

  </club-page>
</template>

<style lang='scss'>
.q-uploader__header {
  background: linear-gradient(45deg,rgba(rgb(0, 76, 255),0.5),rgba(rgb(135, 28, 255),0.5));;
}
</style>

<script lang='ts'>

import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import { clubSocialLinksPartial, clubStylePartial } from 'src/lib/api/graphqlPartials';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { EClubSocialLinks, IClubSocialLinks } from 'src/api/clubApi';
import { Notify, QForm } from 'quasar';
import { mapSocialToIcon } from 'src/lib/components/socials';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { imgUploaded } from 'src/lib/onImageUpload';

interface ILoadedClub {
  id: number
  name: string
  description: string
  slug: string
  style: {
    logoImg?: string
    heroImg?: string
  },
  socialLinks: IClubSocialLinks
}

export default defineComponent({
  components: { ClubPage, ClubButton },
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const club = ref<ILoadedClub | null>(null);

    const slug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

    const formRef = ref<QForm | null>(null);

    const socialLinkCodes = Object.keys(EClubSocialLinks);

    const load = async () => {
      if (!slug.value) return;

      const result = await api.post<{
        data: {
          club: ILoadedClub
        }
      }>('/graphql', {
        query: `{
          club(slug: "${slug.value}") {
            id
            name
            slug
            description
            style ${clubStylePartial}
            socialLinks ${clubSocialLinksPartial}
          }
        }`
      });

      club.value = result.data.data.club;

      // ensure all code keys exist
      socialLinkCodes.forEach((code) => {
        if (club.value && !(code in club.value.socialLinks)) club.value.socialLinks[code as keyof IClubSocialLinks] = '';
      });
    }

    const onSaveClicked = async () => {
      if (!club.value) return;

      const validationSuccess = await formRef.value?.validate(true);
      if (!validationSuccess) {
        Notify.create({
          type: 'warning',
          message: 'some fields are not filled correctly',
          position: 'top-right'
        });

        return;
      }

      await api.post<{
        data: {
          club: ILoadedClub
        }
      }>('/graphql', {
        query: `mutation saveClub($id:ID!, $input:SaveClubInput!) {
          saveClub(id:$id, input:$input) {
            id
            name
            description
          }
        }`,
        variables: {
          id: club.value.id,
          input: {
            name: club.value.name,
            description: club.value.description,
            socialLinks: club.value.socialLinks,
            heroImg: heroImg.value,
            logoImg: logoImg.value,
          }
        }
      });

      Notify.create({
        type: 'dark',
        message: 'club data is updated',
        position: 'top-right',
      });
      await $router.push({name: 'club-home'});
    }

    onMounted(load);
    watch($route, load);

    provide('clubStyle', computed(() => Object.assign(
      {}, club.value?.style, {
        socialColor: '#1D1D27',
        socialTextColor: '#FFFFFF'
      })
    ));

    const logoImg = ref<string>('');
    const heroImg = ref<string>('');

    const onHeroImgUploaded = imgUploaded((name) => heroImg.value = name);
    const onLogoImgUploaded = imgUploaded((name) => logoImg.value = name);

    return {
      formRef,
      club,
      socialLinkCodes,
      mapSocialToIcon,
      onSaveClicked,
      onHeroImgUploaded,
      onLogoImgUploaded,
      logoImg,
      heroImg,
    };
  }
});
</script>
