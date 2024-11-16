<template>
  <q-no-ssr>
    <q-layout view="lHh LpR lFf">
      <q-header class="md-hide lg-hide xl-hide" style="background-color: rgb(29 29 39)">
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

          <q-toolbar-title>
            <q-btn unelevated no-caps :label="club.name" :to="{ name: 'club' }" style="border-radius: 8px"></q-btn>
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above bordered dark>
        <div class="flex">
          <club-menu :club="club" />
        </div>
      </q-drawer>

      <q-page-container>
        <div v-if="isLoading" class="flex flex-center">
          <q-spinner size="3em" />
        </div>
        <router-view v-else />
      </q-page-container>
    </q-layout>
  </q-no-ssr>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';

import { computed, defineComponent, onMounted, ref, watch } from 'vue';
// import ClubSelector from '@components/clublayout/ClubSelector.vue';
import ClubMenu from '@components/clublayout/ClubMenu.vue';
import { useStyleStore } from '@stores/styleStore';
import { useClubStore } from '@stores/clubStore';
import { useUserStore } from 'stores/userStore';

export default defineComponent({
  name: 'ClubLayout',

  components: {
    ClubMenu,
    // ClubSelector,
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
        isLoading.value = true;
        return;
      }

      try {
        isLoading.value = true;
        await userStore.tryWebappLogin(slug.value, $route.query.initData as string);
        await clubStore.loadBySlug(slug.value);
        styleStore.patchWith(clubStore.club.style);
      } catch (e) {
        console.error(e);
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(load);
    watch(
      () => $route.params.clubSlug,
      async () => {
        await load();
      },
    );

    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      clubLoaded,
      club: computed(() => clubStore.club),
      isCurrentRoute,
      isLoading,
    };
  },
});
</script>
