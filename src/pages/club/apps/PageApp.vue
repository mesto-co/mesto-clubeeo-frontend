<template>
  <q-page class='clubPage'>

    <div class='text-h6 q-pb-md'>page</div>

    <div
      v-html='data.content'
    />

  </q-page>
</template>

<script lang='ts'>

import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../../../boot/axios';

interface IPageAppData {
  content: string
}

export default defineComponent({
  setup() {
    const $route = useRoute();

    const clubSlug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);
    const appSlug = computed(() => $route.params.appSlug ? String($route.params.appSlug) : null);

    const data = ref<Partial<IPageAppData>>({});

    const loadApp = async () => {
      console.log(clubSlug.value, appSlug.value)
      if (!clubSlug.value || !appSlug.value) return;

      const result = await api.get<{
        data: IPageAppData
      }>(`/api/clubApps/${clubSlug.value}/clubAppSlug:${appSlug.value}`);

      console.log(result.data);

      data.value = result.data.data;
    }

    onMounted(async () => {
      await loadApp()
    });
    watch(appSlug, loadApp);
    watch(clubSlug, loadApp);

    // onUnmounted(() => {
    //   unwatch1();
    //   unwatch2();
    // })

    return {
      data
    }
  }
});
</script>
