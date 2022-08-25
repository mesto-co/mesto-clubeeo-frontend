<template>
  <club-page
    header='home'
    :loading='!club'
    sticky='bottom'
  >
    <template v-slot:buttons>
      <div v-if='club.meInClub.isAdmin'>
        <club-button
          class='clubButtonActive q-px-md'
          :to='{name: "club-home-edit"}'
          dense
        >edit</club-button>
      </div>
    </template>

    <home-page2
      :show-powered-by='false'
    />

  </club-page>
</template>

<script lang='ts'>

import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { api } from '../../boot/axios';
import { useRoute } from 'vue-router';
import { clubSocialLinksPartial, clubStylePartial } from 'src/lib/api/graphqlPartials';
import HomePage2 from 'components/clubpage/HomePage2.vue';
import ClubButton from 'components/clubpage/ClubButton.vue';
import ClubPage from 'components/clublayout/ClubPage.vue';

interface ILoadedClub {
  id: number
  name: string
  description: string
  slug: string
  style: {
    logoImg?: string
    heroImg?: string
  }
  meInClub: {
    loggedIn: boolean
    isMember: boolean
    isAdmin: boolean
    isPlatformAdmin: boolean
  }
}

export default defineComponent({
  components: { ClubPage, ClubButton, HomePage2 },
  setup() {
    const $route = useRoute();

    const club = ref<ILoadedClub | null>(null);

    const slug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

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
            meInClub {
              loggedIn
              isMember
              isAdmin
              isPlatformAdmin
            }
          }
        }`
      });

      club.value = result.data.data.club;
    }

    onMounted(load);
    watch($route, load);

    // provide('clubStyle', computed(() => Object.assign(
    //   {}, club.value?.style, {
    //     color: '',
    //     textColor: '',
    //     primaryColor: '#1D1D27',
    //     primaryTextColor: '',
    //     font: '',
    //     socialColor: '#1D1D27',
    //     socialTextColor: '#FFFFFF'
    //   })
    // ));

    // provide('clubStyle', computed(() => Object.assign(
    //   {}, club.value?.style, {
    //     socialColor: '#1D1D27',
    //     socialTextColor: '#FFFFFF'
    //   })
    // ));

    return {
      club
    };
  }
});
</script>
