<template>
  <template
    v-if='club.settings.layout === "custom"'
  >

  </template>

  <main
    v-else
    class='clubeeo-wrapper'
    :style='clubPageStyle'
  >
    <section class='main-content-section'>

      <div class='content-wrapper'>
        <home-page2
          heroMinHeight='115px'
          :showSocialLinks='club && club.settings && !club.settings.hideSocialLinks'
        />
      </div>

    </section>

    <aside class='token-gate-invite' :style='clubAsideStyle'>

      <club-aside-proxy
        :aside-component='club && club.settings && club.settings.asideComponent'
        @reload='onAsideReload'
      />

    </aside>
  </main>

</template>

<style lang='scss'>

main.clubeeo-wrapper {
  @media (max-width: $breakpoint-xs-max) {
    display: flex;
    flex-direction: column-reverse !important;
    min-height: 100vh;
  }

  margin: 0 auto;
  display: flex;

  overflow: hidden;

  section.main-content-section {

    @media (min-width: $breakpoint-xs-max) {
      overflow-y: scroll;
      width: 100%;
      height: 100vh;
    }

    .content-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;

      @media (max-width: $breakpoint-xs-max) {
        min-height: 100%;
      }
      @media (min-width: $breakpoint-xs-max) {
        min-height: 100vh;
      }
    }
  }

  aside.token-gate-invite {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    @media (min-width: $breakpoint-xs-max) {
      width: 534px;
      height: 100vh;
    }

    background-color: #212121;
    padding: 0 30px;
    //padding: 210px 30px 30px;

    font-weight: 600;
    color: #FFFFFF;

    h1,h2,h3,h4,h5,h6 {
      margin: 0;
      font-weight: 600;
    }

    ol {
      font-size: 16px;
      line-height: 21px;

      li {
        margin-bottom: 18px;
      }

    }
  }
}

</style>

<script lang='ts'>
import { computed, defineComponent, onMounted, provide, watch } from 'vue';
import { api } from 'boot/axios';
import { state } from 'src/state';
import { IClubStyle, normLandingClubStyle } from 'src/models/clubStyle';
import { useQuasar } from 'quasar';
import { mapSocialToIcon } from 'src/lib/components/socials';
import HomePage2 from 'components/clubpage/HomePage2.vue';
import ClubAsideProxy from 'components/clubpage/clubAside/ClubAsideProxy.vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from 'stores/sessionStore';

const clubWelcomeDefault = '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

interface ITelegramUser {
  auth_date: number,
  hash: string,
  id: number,
  first_name: string,
  last_name: string,
  photo_url: string,
  username: string,
}

export default defineComponent({
  name: 'ClubRootPage',
  components: { ClubAsideProxy, HomePage2 },
  setup() {
    const $q = useQuasar();
    const $route = useRoute();

    const $sessionStorage = useSessionStore();

    const onLoad = async (opts: {background?: boolean} = {}) => {
      if (state.$club.clubSlugRouteParam.value) {
        await state.$club.loadClub(opts);
      }
    };

    onMounted(async () => {
      $sessionStorage.setQuery($route.query);
      await onLoad();
    });

    watch(state.$club.clubSlugRouteParam, async () => {
      $sessionStorage.clearQuery();
      await onLoad()
    });

    const onAsideReload = async () => {
      await onLoad({background: true});
    }

    const telegramAuthCallback = async (user: ITelegramUser) => {
      const result = await api.post<{ ok: boolean }>('/api/telegram/auth/login', user);

      if (result.data.ok) {
        await state.$club.loadClub();
      } else {
        // todo: popup error
      }
    };

    const onLoggedIn = async () => {
      await state.$club.loadClub();
    };

    const clubStyle = computed<IClubStyle>(() => {
      const s = state.$club.club.style || {} as Partial<IClubStyle>;
      return normLandingClubStyle(s);
    });

    provide('clubStyle', clubStyle);

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    const isMobileSafari = computed(() => {
      return $q.platform.is.mobile && $q.platform.is.safari;
    });

    const clubPageStyle = computed(() => ({
      fontFamily: `'${clubStyle.value.font}', sans-serif`,
      backgroundColor: clubStyle.value.color || '#ffffff',
      color: clubStyle.value.textColor || '#000000',
      flexDirection: clubStyle.value.aside === 'left' ? 'row-reverse' : ''
    }));

    const clubAsideStyle = computed(() => ({
      fontFamily: `'${clubStyle.value.font}', sans-serif`,
      backgroundColor: clubStyle.value.primaryColor || '#212121',
      color: clubStyle.value.primaryTextColor || '#ffffff',
    }));

    const meInClub = state.$club.meInClub;

    const isLoggedIn = computed(() => {
      if (meInClub.wallets.eth?.loggedIn) return true;
      if (meInClub.wallets.near?.loggedIn) return true;
      return false;
    });

    return {
      club: state.$club.club,
      meInClub: state.$club.meInClub,
      isClubLoading: state.$club.isLoading,
      telegramAuthCallback,
      onLoggedIn,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      showMetaMask,
      clubPageStyle,
      clubAsideStyle,
      isMobileSafari,
      mapSocialToIcon,
      onAsideReload,
    };
  }
});
</script>
