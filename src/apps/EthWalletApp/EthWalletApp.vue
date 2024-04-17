<template>
  <q-page class='flex flex-center' style='background: #111117'>
    <div>

    </div>

    <div class='text-white'>
      <eth-wallets-login
        :redirect-path='`${window.location.origin}${$route.fullPath}`'
        buttons-class='clubButtonActive'
        :app-data='appData'
        @loggedIn='onLoggedIn'
      />
    </div>

    <div>

    </div>
  </q-page>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import EthWalletsLogin from 'components/wallets/EthWalletsLogin.vue';
import { useClubStore } from 'stores/clubStore';
import { appProps } from 'src/apps/_common/appProps';

export default defineComponent({
  components: { EthWalletsLogin },
  props: appProps,
  setup() {
    const $router = useRouter();
    const $club = useClubStore();

    return {
      onLoggedIn: async () => {
        await $router.push({ name: 'club-home' });
        await $club.load();
      },
      window,
    };
  }
});
</script>
