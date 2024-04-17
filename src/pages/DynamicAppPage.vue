<template>
  <dynamic-app-component
    :club-slug='clubSlug'
    :app-slug='appSlug'
    :app-page='appPage'
  />
</template>

<script lang='ts'>
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import DynamicAppComponent from 'components/DynamicAppComponent.vue';

const routeParamToString = (param: string | string[]): string => {
  if (Array.isArray(param)) return param[0] || ''; //take first if multiple
  return param || '';
};

export default defineComponent({
  name: 'DynamicAppPage',
  components: { DynamicAppComponent },
  setup() {
    const $route = useRoute();

    return {
      clubSlug: computed(() => routeParamToString($route.params.clubSlug)),
      appSlug: computed(() => routeParamToString($route.params.appSlug)),
      appPage: computed(() => routeParamToString($route.params.appPage)),
    };
  }
});
</script>
