<template>
  <feed-app-main-page v-if="appData.appPage === ''" :app-data="appData" />
  <feed-app-new-post-page
    v-else-if="appData.appPage === 'new'"
    :app-data="appData"
  />
  <div v-else class="text-white">
    {{ appData }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FeedAppMainPage from '@apps/FeedApp/FeedAppMainPage.vue';
import { appProps } from '@apps/_common/appProps';
import FeedAppNewPostPage from '@apps/FeedApp/FeedAppNewPostPage.vue';

export default defineComponent({
  components: { FeedAppNewPostPage, FeedAppMainPage },
  props: appProps,
});
</script>
