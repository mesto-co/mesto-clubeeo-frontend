<template>
  <q-page class="flex flex-center" style="background: #111117">
    <div></div>

    <div>
      <telegram-bot-login-btn
        v-if="!meInClub.services?.tg?.loggedIn"
        class="clubButtonActive"
        :telegram-login-bot="meInClub.services?.tg?.telegramLoginBot"
        :login-code="meInClub.services?.tg?.telegramLoginCode"
        @click="onTelegramLoginClicked"
      />
      <div v-else>
        <q-btn
          class="clubButtonActive"
          @click="pushToClubRoot"
          style="cursor: pointer"
          rounded
          label="Continue"
        />
      </div>

      <!-- <eth-wallets-login
        redirect-path='login'
        buttons-class='clubButtonActive'
        @loggedIn='onLoggedIn'
      />

      <near-wallet-login-btn
        class='clubButtonActive'
        @loggedIn='onLoggedIn'
      /> -->

      <!--      <wallet-login-btn-switcher-->
      <!--        style='color: #FFFFFF'-->
      <!--        redirect-path='login'-->
      <!--        @loggedIn='onLoggedIn'-->
      <!--      />-->
    </div>

    <div></div>
  </q-page>
</template>

<script lang="ts">
import { RouteParamsRaw, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { onMounted, provide, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
// import EthWalletsLogin from '@components/wallets/EthWalletsLogin.vue';
// import NearWalletLoginBtn from '@components/wallets/NearWalletLoginBtn.vue';
import { inBrowser } from '@src/lib/inBrowser';
import TelegramBotLoginBtn from '@src/components/telegram/TelegramBotLoginBtn.vue';
import { state } from '@src/state';
import { useMeInClubStore } from '@src/stores/meInClubStore';

export default {
  components: { TelegramBotLoginBtn },
  setup() {
    const $router = useRouter();
    const meInClub = state.$club.meInClub;
    const meInClubStore = useMeInClubStore();

    const showMetaMaskBtn = ref(
      inBrowser ? MetaMaskOnboarding.isMetaMaskInstalled() : false
    );

    onMounted(async () => {
      const defaultClub = 'mesto';
      await meInClubStore.loadByClub(defaultClub);
      await state.$club.loadClub();
    });

    const onLoggedIn = async () => {
      if (!inBrowser) return;

      const afterLoginRoute = LocalStorage.getItem('afterLoginRoute') as {
        name: string;
        params: RouteParamsRaw | undefined;
      };
      if (afterLoginRoute && afterLoginRoute.name) {
        await $router.push({
          name: afterLoginRoute.name,
          params: afterLoginRoute.params,
        });
      } else {
        await $router.push({ name: 'club-new' });
      }
    };

    provide(
      'clubStyle',
      ref({ primaryTextColor: '#FFFFFF', textColor: '#FFFFFF' })
    );

    let telegramLoginInterval: NodeJS.Timeout | null = null;
    const onTelegramLoginClicked = () => {
      if (telegramLoginInterval) {
        clearInterval(telegramLoginInterval);
      }

      let reloading = false;
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      telegramLoginInterval = setInterval(async () => {
        if (!reloading && meInClub.services.tg?.telegramLoginCode) {
          try {
            reloading = true;
            const result = await state.$club.loginWithCode(
              'tg',
              meInClub.services.tg.telegramLoginCode
            );
            if (result.ok) {
              if (telegramLoginInterval) {
                clearInterval(telegramLoginInterval);
              }
              await pushToClubRoot();
            }
          } catch (e) {
            console.error(e);
          } finally {
            reloading = false;
          }
        }
      }, 1000);
    };

    const pushToClubRoot = async () => {
      await $router.push({
        name: 'club-home',
        params: { clubSlug: 'mesto' },
      });
    };

    return {
      showMetaMaskBtn,
      onLoggedIn,
      onTelegramLoginClicked,
      meInClub,
      pushToClubRoot,
    };
  },
};
</script>
