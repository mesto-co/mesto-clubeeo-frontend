<template>
  <feed-app-main-page
    v-if='appData.appPage === ""'
    :app-data='appData'
  />
  <feed-app-new-post-page
    v-else-if='appData.appPage === "new"'
    :app-data='appData'
  />
  <div
    v-else
    class='text-white'
  >
    {{ appData }}
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import FeedAppMainPage from 'src/apps/FeedApp/FeedAppMainPage.vue';
import { appProps } from 'src/apps/_common/appProps';
import FeedAppNewPostPage from 'src/apps/FeedApp/FeedAppNewPostPage.vue';

export default defineComponent({
  components: { FeedAppNewPostPage, FeedAppMainPage },
  props: appProps
});
</script>
