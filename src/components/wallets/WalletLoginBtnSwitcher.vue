<template>
  <meta-mask-login-btn
    v-if='showMetaMaskBtn'
    @loggedIn='onLoggedIn'
  />

  <meta-mask-link-login-btn
    v-else
    :club-slug='club.slug'
  />
</template>

<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue';
import MetaMaskOnboarding from '@metamask/onboarding';
import MetaMaskLoginBtn from 'components/MetaMaskLoginBtn.vue';
import { IClub } from 'src/api/clubApi';
import MetaMaskLinkLoginBtn from 'components/MetaMaskLinkLoginBtn.vue';

export default defineComponent({
  name: 'wallet-login-btn-switcher',
  components: { MetaMaskLinkLoginBtn, MetaMaskLoginBtn },
  emits: ['loggedIn'],

  props: {
    club: {
      type: Object as PropType<IClub>,
      required: true
    }
  },

  setup(props, { emit }) {

    const onLoggedIn = () => emit('loggedIn');

    const showMetaMaskBtn = ref(MetaMaskOnboarding.isMetaMaskInstalled());
    // const showMetaMaskBtn = ref(false);

    return {
      onLoggedIn,
      showMetaMaskBtn,
    }
  }
});
</script>
