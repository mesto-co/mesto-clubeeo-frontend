<template>
  <template v-if="!dynamicApp.isLoading">
    <component :is="currentApp" v-if="currentApp" :app-data="dynamicApp" :key="dynamicApp.appName" />
    <club-page v-else :header="dynamicApp.appSlug" class="text-center">
      application "{{ dynamicApp.appName }}" is unknown
    </club-page>
  </template>

  <q-inner-loading dark :showing="dynamicApp.isLoading" />
</template>

<script>
import { defineComponent, onMounted, watch, computed } from 'vue';
import { useDynamicAppStore } from 'stores/dynamicAppStore';
import ClubPage from '@components/clublayout/ClubPage.vue';

// Static imports to avoid Vite/Quasar issues with dynamic imports
import ApplicationApp from 'apps/ApplicationApp/ApplicationApp.vue';
import ProfileApp from 'apps/ProfileApp/ProfileApp.vue';
import ApplicantsApp from 'apps/ApplicantsApp/ApplicantsApp.vue';
import MemberProfilesApp from 'apps/MemberProfilesApp/MemberProfilesApp.vue';
import PlatformClubsApp from '@apps/PlatformClubsApp/PlatformClubsApp.vue';
import PageApp from '@apps/PageApp/PageApp.vue';
import LeaderboardApp from '@apps/LeaderboardApp/LeaderboardApp.vue';
import FeedApp from '@apps/FeedApp/FeedApp.vue';
import TelegramApp from '@apps/TelegramApp/TelegramApp.vue';
import ListsApp from 'src/apps/ListsApp/ListsApp.vue';
import FrameApp from 'src/apps/FrameApp/FrameApp.vue';
import UniApp from 'src/apps/UniApp/UniApp.vue';
import TelegramChatsApp from 'apps/TelegramChatsApp/TelegramChatsApp.vue';

const APP_COMPONENTS = {
  applicants: ApplicantsApp,
  application: ApplicationApp,
  profile: ProfileApp,
  'member-profiles': MemberProfilesApp,
  lists: ListsApp,
  feed: FeedApp,
  leaderboard: LeaderboardApp,
  page: PageApp,
  'platform-clubs': PlatformClubsApp,
  telegram: TelegramApp,
  frame: FrameApp,
  uni: UniApp,
  'telegram-chats': TelegramChatsApp,
};

const routeParamToString = (param) => {
  if (Array.isArray(param)) return param[0] || ''; //take first if multiple
  return param || '';
};

export default defineComponent({
  name: 'DynamicAppComponent',
  components: {
    ClubPage,
    TelegramChatsApp,
  },
  props: {
    clubSlug: {
      type: String,
      required: true,
    },
    appSlug: {
      type: String,
      required: true,
    },
    appPage: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const $dynamicApp = useDynamicAppStore();

    const currentApp = computed(() => APP_COMPONENTS[$dynamicApp.appName] || null);

    const init = async () => {
      await $dynamicApp.load({
        clubSlug: routeParamToString(props.clubSlug),
        appSlug: routeParamToString(props.appSlug),
        appPage: routeParamToString(props.appPage),
      });
    };

    onMounted(init);
    watch(props, init, { deep: true });

    return {
      dynamicApp: $dynamicApp,
      currentApp,
    };
  },
});
</script>
