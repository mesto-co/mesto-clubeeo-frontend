<template>
  <club-page
    header='create club'
    sticky='bottom'
  >
    <template v-slot:buttons>
      <club-button
        class='clubButton q-px-md q-mr-md'
        :to='{name: "root"}'
        dense
      >cancel
      </club-button>

      <club-button
        class='clubButtonActive q-px-md'
        dense
        @click='onCreateClicked'
      >create
      </club-button>
    </template>

    <template v-if='club'>
      <q-form ref='formRef'>

        <div class='q-mb-md'>
          <div class='q-pb-sm flex flex-center'>
            <q-input
              label='name'
              dark outlined
              style='width: 550px'
              :rules="[ val => val.length > 0 || 'please fill this field' ]"
              v-model='club.name'
            />
          </div>

          <div class='q-pb-sm flex flex-center'>
            <q-input
              label='link name'
              dark outlined
              style='width: 550px'
              :rules="[ val => val.length > 0 || 'please fill this field', val => slugify(val) === val || 'please use url-friendly naming' ]"
              v-model='club.slug'
            >
              <template v-slot:prepend>
                <div class='linkName__domain'>clubeeo.com/</div>
              </template>
            </q-input>
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

        </div>

      </q-form>
    </template>

  </club-page>
</template>

<style class='scss'>

.linkName__domain {
  font-size: 14px;
}

</style>

<script lang='ts'>

import { defineComponent, onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { useRoute, useRouter } from 'vue-router';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { EClubSocialLinks, IClubSocialLinks } from 'src/api/clubApi';
import { LocalStorage, Notify, QForm } from 'quasar';
import { mapSocialToIcon } from 'src/lib/components/socials';
import ClubPage from 'components/clublayout/ClubPage.vue';
import { nameToSlug } from 'src/lib/strHelpers';
import slugify from 'slugify';

interface INewClub {
  slug: string
  name: string
  description: string
  socialLinks: IClubSocialLinks
}

export default defineComponent({
  components: { ClubPage, ClubButton },
  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const isMeLoading = ref(true);
    const me = ref({
      loggedIn: false,
    });

    onMounted(async () => {
      isMeLoading.value = true;
      const result = await api.post<{
        data: {
          me: {
            loggedIn: boolean
          }
        }
      }>('/graphql', {
        query: `{
            me {
              loggedIn
            }
          }`
      }, {
        headers: {
          'X-SuppressError': '401'
        }
      });

      me.value = result.data.data.me;
      isMeLoading.value = false;

      if (!me.value.loggedIn) {
        LocalStorage.set('afterLoginRoute', {name: $route.name, params: $route.params});
        await $router.push({name: 'login'});
      }
    });

    const club = ref<INewClub>({
      description: '',
      name: '',
      slug: '',
      socialLinks: {
        discord: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        reddit: '',
        telegram: '',
        twitter: '',
        web: ''
      }
    });

    const formRef = ref<QForm | null>(null);

    const socialLinkCodes = Object.keys(EClubSocialLinks);

    const saveClicked = async () => {
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

      const result = await api.post<{
        data: {
          createClub: {
            id: number
            slug: string
          }
        }
      }>('/graphql', {
        query: `mutation createClub($input:CreateClubInput!) {
      createClub(input:$input) {
        id
        slug
      }
    }`,
        variables: {
          input: {
            name: club.value.name,
            slug: club.value.slug,
            description: club.value.description,
            socialLinks: club.value.socialLinks
          }
        }
      });

      Notify.create({
        type: 'positive',
        message: 'Club is created',
        position: 'bottom-right'
      });

      await $router.push({ name: 'club-home', params: { clubSlug: result.data.data.createClub.slug } });

    };

    watch(
      () => club.value.name,
      () => {
        club.value.slug = nameToSlug(club.value.name);
      }
    );

    return {
      formRef,
      club,
      socialLinkCodes,
      mapSocialToIcon,
      onCreateClicked: saveClicked,
      slugify,
      isMeLoading,
      me,
    };
  }
});
</script>
