<template>
  <layout-layout>
    <template v-slot:toolbar-title>
      <q-btn unelevated no-caps :label="club.name" :to="{ name: 'club' }" style="border-radius: 8px"></q-btn>
    </template>

    <club-selector />

    <club-menu :club="club" />
  </layout-layout>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import ClubSelector from '@components/clublayout/ClubSelector.vue';
import ClubMenu from '@components/clublayout/ClubMenu.vue';
import { useStyleStore } from '@stores/styleStore';
import LayoutLayout from '@src/backbones/LayoutLayout.vue';
import { useClubStore } from '@stores/clubStore';
import { useUserStore } from 'stores/userStore';

export default defineComponent({
  name: 'ClubLayout',

  components: {
    LayoutLayout,
    ClubMenu,
    ClubSelector,
  },

  setup() {
    const $route = useRoute();
    const userStore = useUserStore();
    const isLoading = ref(true);

    const slug = computed(() => ($route.params.clubSlug ? String($route.params.clubSlug) : null));

    const isCurrentRoute = (routeName: string) => {
      return $route.name === routeName;
    };

    const styleStore = useStyleStore();
    styleStore.provide();

    const clubStore = useClubStore();
    clubStore.provide();
    const clubLoaded = computed(() => clubStore.clubLoaded);

    const load = async () => {
      if (!slug.value) {
        return;
      }

      try {
        isLoading.value = true;

        await userStore.tryWebappLogin(slug.value, $route.query.initData as string);
        await clubStore.loadBySlug(slug.value);
        styleStore.patchWith(clubStore.club.style);

        isLoading.value = false;
      } catch (e) {
        console.error(e);
      }
    };

    onMounted(load);
    watch(
      () => $route.params.clubSlug,
      async () => {
        await load();
      },
    );

    return {
      clubLoaded,
      club: computed(() => clubStore.club),
      isCurrentRoute,
      isLoading,
    };
  },
});
</script>
