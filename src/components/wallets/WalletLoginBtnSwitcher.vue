<template>
  <meta-mask-login-btn
    v-if="showMetaMaskBtn"
    :labels="labels"
    :app-data="appData"
    @loggedIn="onLoggedIn"
  />

  <meta-mask-link-login-btn
    v-else
    :labels="labels"
    :app-data="appData"
    :redirect-path="redirectPath"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import MetaMaskLoginBtn from '@components/MetaMaskLoginBtn.vue';
import MetaMaskLinkLoginBtn from '@components/MetaMaskLinkLoginBtn.vue';
import { inBrowser } from '@src/lib/inBrowser';

export default defineComponent({
  name: 'wallet-login-btn-switcher',
  components: { MetaMaskLinkLoginBtn, MetaMaskLoginBtn },
  emits: ['loggedIn'],

  props: {
    redirectPath: {
      type: String,
      required: true,
    },
    labels: {
      type: Object as PropType<{
        logInWith?: string;
      }>,
      default: () => ({}),
    },
    appData: Object as PropType<{ appId: number; clubId: number }>,
  },

  setup(props, { emit }) {
    const onLoggedIn = () => emit('loggedIn');

    const showMetaMaskBtn = ref(
      inBrowser ? MetaMaskOnboarding.isMetaMaskInstalled() : false
    );
    // const showMetaMaskBtn = ref(false);

    return {
      onLoggedIn,
      showMetaMaskBtn,
    };
  },
});
</script>
