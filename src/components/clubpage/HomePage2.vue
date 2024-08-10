<template>
  <template v-if="club">
    <club-hero :minHeight="heroMinHeight" :maxHeight="heroMaxHeight" />

    <div class="q-mb-md text-center">
      <div
        class="text-h5 q-pb-sm"
        v-if="clubState && !clubState.settings.hideTitle"
      >
        {{ club.name }}
      </div>

      <div
        style="max-width: 550px; display: inline-block"
        v-html="club.description"
      />

      <buy-link-btn :buy-links="club.buyLinks" />
    </div>

    <div class="text-center">
      <div
        v-if="club.buyLinks.collections"
        class="q-page"
        ref="clubPageCollections"
      >
        <!--        <div class='text-right q-pr-md'>collections</div>-->

        <collections-component
          :club-name="club.name"
          :buy-links="club.buyLinks"
        />
      </div>

      <div
        v-if="
          club.roadmap &&
          club.roadmap.entries &&
          club.roadmap.entries.length > 0
        "
        class="q-pt-md"
      >
        <div class="text-right q-pr-md">roadmap</div>

        <roadmap-viewer v-model="club.roadmap.entries" class="text-left" />
      </div>

      <social-links
        v-if="showSocialLinks"
        class="q-pb-md"
        :social-links="club.socialLinks"
      />

      <powered-by-clubeeo v-if="showPoweredBy" />
    </div>

    <!--    :style='{...clubPageStyle, ...evenScreenStyle}'-->
  </template>
</template>

<style lang="scss"></style>

<script lang="ts">
import SocialLinks from './SocialLinks.vue';
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';
import { state } from '@src/state';
import { useRoute } from 'vue-router';
import { api } from 'boot/axios';
import {
  clubRoadmapPartial,
  clubSocialLinksPartial,
  clubStylePartial,
} from '@src/lib/api/graphqlPartials';
import ClubHero from '@components/clubpage/ClubHero.vue';
import CollectionsComponent from '@components/clubpage/CollectionsComponent.vue';
import PoweredByClubeeo from '@components/clubpage/PoweredByClubeeo.vue';
import BuyLinkBtn from '@components/clubpage/BuyLinkBtn.vue';
import { IClubRoadmap } from '@src/api/clubApi';
import RoadmapViewer from '@components/clubpage/RoadmapViewer.vue';

interface ILoadedClub {
  id: number;
  name: string;
  description: string;
  slug: string;
  roadmap: IClubRoadmap;
  style: {
    logoImg?: string;
    heroImg?: string;
  };
  buyLinks: {
    collections?: {
      name: string;
      siteName: string;
      url: string;
      coverImg: string;
    }[];
  };
}

export default defineComponent({
  components: {
    RoadmapViewer,
    BuyLinkBtn,
    PoweredByClubeeo,
    CollectionsComponent,
    ClubHero,
    SocialLinks,
  },
  props: {
    showPoweredBy: {
      type: Boolean,
      default: true,
    },
    showSocialLinks: {
      type: Boolean,
      default: true,
    },
    heroMaxHeight: {
      type: String,
      default: '50vh',
    },
    heroMinHeight: {
      type: String,
    },
  },
  setup() {
    const $route = useRoute();

    const club = ref<ILoadedClub | null>(null);

    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );

    const load = async () => {
      if (!slug.value) return;

      const result = await api.post<{
        data: {
          club: ILoadedClub;
        };
      }>('/graphql', {
        query: `{
          club(slug: "${slug.value}") {
            id
            name
            slug
            description
            style ${clubStylePartial}
            socialLinks ${clubSocialLinksPartial}
            roadmap ${clubRoadmapPartial}
            buyLinks {
              main
              opensea
              rarible
              collections {
                name
                siteName
                url
                coverImg
              }
            }
          }
        }`,
      });

      club.value = result.data.data.club;
    };

    onMounted(load);
    watch($route, load);

    const clubPageCollections = ref<Element>();
    provide('pageRefs', {
      clubPageCollections,
    });

    const clubStyle = inject('clubStyle');

    return {
      clubState: state.$club.club,
      club, // : state.$club.club,
      meInClub: state.$club.meInClub,
      clubStyle,
      clubPageCollections,
    };
  },
});
</script>
