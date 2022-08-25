<template>
  <layout-layout>
    <template v-slot:toolbar-title>
      <q-btn
        unelevated
        no-caps
        :label='club.name'
        :to='{name: "club"}'
        style='border-radius: 8px'
      ></q-btn>
    </template>

    <club-selector />

    <club-menu
      :club='club'
    />

  </layout-layout>
</template>

<script lang='ts'>

import { useRoute } from 'vue-router';

import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import ClubSelector from 'components/clublayout/ClubSelector.vue';
import ClubMenu from 'components/clublayout/ClubMenu.vue';
import { ILoadedClub } from 'src/api/clubGraphql';
import { useStyleStore } from 'stores/styleStore';
import LayoutLayout from 'src/backbones/LayoutLayout.vue';
import { useClubStore } from 'stores/clubStore';
import { IClubStyle } from 'src/models/clubStyle';

export default defineComponent({
  name: 'MainLayout',

  components: {
    LayoutLayout,
    ClubMenu,
    ClubSelector
  },

  setup() {
    const $route = useRoute();

    const slug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

    const isCurrentRoute = (routeName: string) => {
      return $route.name === routeName;
    };

    const styleStore = useStyleStore();
    styleStore.provide();

    const clubStore = useClubStore();
    clubStore.provide();
    const clubLoaded = computed(() => clubStore.clubLoaded);

    const load = async () => {
      await clubStore.loadBySlug(slug.value);
      styleStore.patchWith(clubStore.club.style);
    }

    onMounted(load);
    watch(
    () => $route.params.clubSlug,
    async () => {
      await load();
    });

    return {
      clubLoaded,
      club: computed(() => clubStore.club),
      isCurrentRoute,
    };
  }
});
</script>
