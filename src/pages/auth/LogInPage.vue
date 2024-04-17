<template>
  <q-page class='flex flex-center' style='background: #111117'>
    <div>

    </div>

    <div>
      <eth-wallets-login
        redirect-path='login'
        buttons-class='clubButtonActive'
        @loggedIn='onLoggedIn'
      />

      <near-wallet-login-btn
        class='clubButtonActive'
        @loggedIn='onLoggedIn'
      />

<!--      <wallet-login-btn-switcher-->
<!--        style='color: #FFFFFF'-->
<!--        redirect-path='login'-->
<!--        @loggedIn='onLoggedIn'-->
<!--      />-->
    </div>

    <div>

    </div>
  </q-page>
</template>

<script lang='ts'>
import { RouteParamsRaw, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { provide, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import EthWalletsLogin from 'components/wallets/EthWalletsLogin.vue';
import NearWalletLoginBtn from 'components/wallets/NearWalletLoginBtn.vue';
import { inBrowser } from 'src/lib/inBrowser';

export default {
  components: { NearWalletLoginBtn, EthWalletsLogin },
  setup() {
    const $router = useRouter();

    const showMetaMaskBtn = ref(inBrowser ? MetaMaskOnboarding.isMetaMaskInstalled() : false);

    const onLoggedIn = async () => {
      if (!inBrowser) return;

      const afterLoginRoute = LocalStorage.getItem('afterLoginRoute') as { name: string, params: RouteParamsRaw | undefined };
      if (afterLoginRoute && afterLoginRoute.name) {
        await $router.push({ name: afterLoginRoute.name, params: afterLoginRoute.params });
      } else {
        await $router.push({ name: 'club-new' });
      }
    };

    provide('clubStyle', ref({primaryTextColor: '#FFFFFF', textColor: '#FFFFFF'}));

    return {
      showMetaMaskBtn,
      onLoggedIn,
    };
  }
};
</script>
