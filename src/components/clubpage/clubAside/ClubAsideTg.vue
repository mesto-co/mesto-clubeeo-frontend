<template>
  <div></div>

  <div style="padding: 30px 0" v-if="!isClubLoading">
    <telegram-bot-login-btn
      v-if="!meInClub.services?.tg?.loggedIn"
      class="clubButtonActive"
      :telegram-login-bot="meInClub.services?.tg?.telegramLoginBot"
      :login-code="meInClub.services?.tg?.telegramLoginCode"
      @click="onTelegramLoginClicked"
    />
    <div v-else>
      <club-button
        class="clubButtonActive"
        @click="pushToClubRoot"
        rounded
        label="Dashboard"
        icon="fa-solid fa-arrow-right"
      />
    </div>
  </div>

  <div v-if="!isClubLoading" class="q-pb-md">
    <me-in-club-widget
      v-if="!club.settings.asideHideMe && meInClubStore.data.loggedIn"
      :me-in-club="meInClubStore.data"
      class="full-width"
      @click="meInClubMenuShowing = true"
    >
      <q-btn icon="fa-solid fa-caret-up" size="sm" dense flat>
        <q-menu v-model="meInClubMenuShowing">
          <q-list dense style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section @click="onLogOut">Log out</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </me-in-club-widget>
  </div>

  <q-inner-loading :showing="isClubLoading" dark />
</template>

<script lang="ts">
import { RouteParamsRaw, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import { computed, onMounted, provide, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import { inBrowser } from '@src/lib/inBrowser';
import TelegramBotLoginBtn from '@src/components/telegram/TelegramBotLoginBtn.vue';
import { state } from '@src/state';
import { useMeInClubStore } from '@src/stores/meInClubStore';
import { useLogout } from '@src/uses/useLogout';
import MeInClubWidget from '@src/components/me/MeInClubWidget.vue';
import ClubButton from '../ClubButton.vue';

export default {
  components: { TelegramBotLoginBtn, MeInClubWidget, ClubButton },
  emits: ['reload'],
  setup(
    props: Record<string, string>,
    { emit }: { emit: (event: 'reload', payload: { reason: string }) => void }
  ) {
    const $router = useRouter();
    const $logout = useLogout();
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

    const meInClubMenuShowing = ref(false);

    const onLogOut = async () => {
      await $logout.logout();

      emit('reload', { reason: 'logged-out' });
    };

    return {
      club: state.$club.club,
      showMetaMaskBtn,
      onLoggedIn,
      onTelegramLoginClicked,
      meInClub,
      meInClubStore,
      pushToClubRoot,
      isClubLoading: computed(
        () => state.$club.isLoading.value || !state.$club.isOnceLoaded.value
      ),
      meInClubMenuShowing,
      onLogOut,
    };
  },
};
</script>
