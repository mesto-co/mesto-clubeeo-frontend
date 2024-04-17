<template>
  <snippet-renderer
    :data='pageData'
  />
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
// import { useRoute } from 'vue-router';
import { screenPage, content } from 'components/snippets/shortcuts';

export default defineComponent({
  components: { },
  setup() {
    // const $route = useRoute();

    // const clubSlug = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);
    // const pageSlug = computed(() => $route.params.pageSlug ? String($route.params.pageSlug) : null);

    const pageData = ref(
      screenPage(
        content.generic({
          header: 'for whom?',
          cards: [
            {
              title: 'web2 to web3 transformations',
            },{
              title: 'events',
            },{
              title: 'NFT projects',
            },{
              title: 'p2e games',
            },
          ]
        })
      )
    );

    return {
      pageData
    };
  }
});
</script>
