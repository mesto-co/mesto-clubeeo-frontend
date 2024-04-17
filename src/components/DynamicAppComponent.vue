<template>
  <template v-if='!dynamicApp.isLoading'>

    <eth-wallet-app
      v-if='dynamicApp.appName === "eth-wallet"' :app-data='dynamicApp' />
    <eth-gating-app
      v-else-if='dynamicApp.appName === "eth-gating"' :app-data='dynamicApp' />
    <feed-app
      v-else-if='dynamicApp.appName === "feed"' :app-data='dynamicApp' />
    <leaderboard-app
      v-else-if='dynamicApp.appName === "leaderboard"' :app-data='dynamicApp' />
    <page-app
      v-else-if='dynamicApp.appName === "page"' :app-data='dynamicApp' />
    <platform-clubs-app
      v-else-if='dynamicApp.appName === "platform-clubs"' :app-data='dynamicApp' />

    <club-page
      v-else
      :header='dynamicApp.appSlug'
      class='text-center'
    >
      application "{{ dynamicApp.appName }}" is unknown
    </club-page>

  </template>

  <q-inner-loading
    dark
    :showing='dynamicApp.isLoading'
  />
</template>

<script lang='ts'>
import { defineComponent, onMounted, watch } from 'vue';
import { useDynamicAppStore } from 'stores/dynamicAppStore';
import ClubPage from 'components/clublayout/ClubPage.vue';
import PlatformClubsApp from 'src/apps/PlatformClubsApp/PlatformClubsApp.vue';
import PageApp from 'src/apps/PageApp/PageApp.vue';
import LeaderboardApp from 'src/apps/LeaderboardApp/LeaderboardApp.vue';
import EthWalletApp from 'src/apps/EthWalletApp/EthWalletApp.vue';
import EthGatingApp from 'src/apps/EthGatingApp/EthGatingApp.vue';
import FeedApp from 'src/apps/FeedApp/FeedApp.vue';

const routeParamToString = (param: string | string[]): string => {
  if (Array.isArray(param)) return param[0] || ''; //take first if multiple
  return param || '';
};

export default defineComponent({
  name: 'DynamicAppComponent',
  components: { FeedApp, EthGatingApp, EthWalletApp, LeaderboardApp, PageApp, PlatformClubsApp, ClubPage },
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

    const init = async () => {
      await $dynamicApp.load({
        clubSlug: routeParamToString(props.clubSlug),
        appSlug: routeParamToString(props.appSlug),
        appPage: routeParamToString(props.appPage),
      });
    }

    onMounted(init);
    watch(props, init, {deep: true});

    return {
      dynamicApp: $dynamicApp
    };
  }
});
</script>
