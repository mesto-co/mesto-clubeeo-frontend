<template>

  <template v-if='(meInClub.wallets.eth || {}).enabled'>
    <q-no-ssr>
      <div
        v-if='showMetaMask'
        class='full-width text-center q-pb-sm'
      >
        <wallet-login-btn-switcher
          :redirect-path='club.slug'
          :labels='club.settings.labels'
          @loggedIn='onLoggedIn'
        />

        <!--          <meta-mask-login-btn-->
        <!--            @loggedIn='onLoggedIn'-->
        <!--          />-->
      </div>

      <div class='full-width text-center q-pb-sm'>
        <wallet-connect-login-btn
          :labels='club.settings.labels'
          @loggedIn='onLoggedIn'
        />
      </div>

      <div
        v-if='isMobileSafari'
        class='full-width text-center q-pb-sm text-left'
      >
        <div class='q-pt-md q-pb-sm'>
          Safari has known issues with MetaMask and WalletConnect,
          please use compatible browser or internal MetaMask browser
        </div>

        <club-button
          label='download Chrome'
          class='full-width q-mb-sm'
          icon='fa-brands fa-chrome'
          scheme='inverse'
          type='a'
          href='https://apps.apple.com/us/app/google-chrome/id535886823'
        />

        <club-button
          label='download MetaMask'
          class='full-width q-mb-sm'
          icon='img:/imgs/MetaMask_Fox.svg'
          scheme='inverse'
          type='a'
          href='https://apps.apple.com/us/app/metamask/id1438144202'
        />
      </div>

      <!--        <div>-->
      <!--          <meta-mask-link-login-btn-->
      <!--            :club-slug='club.slug'-->
      <!--          />-->
      <!--        </div>-->
    </q-no-ssr>
  </template>

  <template v-if='(meInClub.wallets.near || {}).enabled'>
    <q-no-ssr>
      <div class='full-width text-center q-pb-sm'>
        <near-wallet-login-btn
          @loggedIn='onLoggedIn'
        />
      </div>

      <!--        <div>-->
      <!--          <meta-mask-link-login-btn-->
      <!--            :club-slug='club.slug'-->
      <!--          />-->
      <!--        </div>-->
    </q-no-ssr>
  </template>

</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import WalletLoginBtnSwitcher from '../wallets/WalletLoginBtnSwitcher.vue';
import WalletConnectLoginBtn from '../wallets/WalletConnectLoginBtn.vue';
import ClubButton from './ClubButton.vue';
import NearWalletLoginBtn from '../wallets/NearWalletLoginBtn.vue';
import { state } from '../../state';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'LoginButtons',
  components: { NearWalletLoginBtn, ClubButton, WalletConnectLoginBtn, WalletLoginBtnSwitcher },
  props: {
    meInClub: {
      type: Object as PropType<{
        wallets: {
          eth?: {
            enabled: boolean,
          },
          near?: {
            enabled: boolean,
          }
        }
      }>
    }
  },
  setup() {
    const $q = useQuasar();

    const onLoggedIn = async () => {
      await state.$club.loadClub();
    };

    // const $route = useRoute();
    //
    // const discordValidation = computed(() => $route.query.discordValidation);
    //
    // const telegramAuthCallback = async (user: ITelegramUser) => {
    //   const result = await api.post<{ ok: boolean }>('/api/telegram/auth/login', user);
    //
    //   if (result.data.ok) {
    //     await state.$club.loadClub();
    //   } else {
    //     // todo: popup error
    //   }
    // };
    //
    // const onLoggedIn = async () => {
    //   await state.$club.loadClub();
    // };
    //
    // const clubStyle = inject<IClubStyle>('clubStyle');

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    const isMobileSafari = computed(() => {
      return $q.platform.is.mobile && $q.platform.is.safari;
    });

    // const meInClub = state.$club.meInClub;
    //
    // const isLoggedIn = computed(() => {
    //   if (meInClub.wallets.eth?.loggedIn) return true;
    //   if (meInClub.wallets.near?.loggedIn) return true;
    //   return false;
    // });
    //
    // const onTelegramLoginClicked = () => {
    //   const interval = setInterval(() => {
    //     if (meInClub.services.tg?.loggedIn) {
    //       clearInterval(interval);
    //     } else {
    //       emit('reload', { reason: 'telegram-await-login' });
    //       // void onLoad({ background: true });
    //     }
    //   }, 1000);
    // };
    //
    return {
      club: state.$club.club,
    //   meInClub: state.$club.meInClub,
    //   isClubLoading: state.$club.isLoading,
    //   telegramAuthCallback,
      onLoggedIn,
    //   onTelegramLoginClicked,
    //   isLoggedIn,
    //   clubWelcomeDefault,
    //   clubStyle,
      showMetaMask,
    //   discordValidation,
    //   discordValidation,
      isMobileSafari,
    //   mapSocialToIcon
    };
  }
});
</script>
