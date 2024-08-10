<template>
  <template v-if="!dynamicApp.isLoading">
    <template v-if="dynamicApp.appName === 'platform-clubs'">
      <platform-clubs-app :app-data="dynamicApp" />
    </template>

    <template v-else>
      <club-page :header="dynamicApp.appSlug" class="text-center">
        application "{{ dynamicApp.appName }}" is unknown
      </club-page>
    </template>
  </template>

  <q-inner-loading :showing="dynamicApp.isLoading" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useDynamicAppStore } from '@stores/dynamicAppStore';
import { useRoute } from 'vue-router';
import ClubPage from '@components/clublayout/ClubPage.vue';
import PlatformClubsApp from '@apps/PlatformClubsApp/PlatformClubsApp.vue';

const routeParamToString = (param: string | string[]): string => {
  if (Array.isArray(param)) return param[0] || ''; //take first if multiple
  return param || '';
};

export default defineComponent({
  name: 'DynamicAppPage',
  components: { PlatformClubsApp, ClubPage },
  setup() {
    const $route = useRoute();
    const $dynamicApp = useDynamicAppStore();

    onMounted(async () => {
      await $dynamicApp.load({
        clubSlug: routeParamToString($route.params.clubSlug),
        appSlug: routeParamToString($route.params.appSlug),
      });
    });

    return {
      dynamicApp: $dynamicApp,
    };
  },
});
</script>
