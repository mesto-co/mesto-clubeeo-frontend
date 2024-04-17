<template>
  <club-button
    :label='`${labels.logInWith || "log in with"} MetaMask`'
    class='full-width'
    icon='img:/imgs/MetaMask_Fox.svg'
    scheme='inverse'
    @click='handleConnectMetamask'
  />
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import { useRoute } from 'vue-router';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { provider } from 'web3-core';
import { registerNonceApiAdapter, verifyAndLoginApiAdapter } from 'src/services/Web3Login/web3LoginApiAdapters';
import { personalSignWeb3AdapterFactory } from 'src/services/Web3Login/web3LoginWeb3Adapters';
import { web3LoginLogic } from 'src/services/Web3Login/web3LoginLogic';
import { Notify } from 'quasar';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  name: 'meta-mask-login-btn',
  components: { ClubButton },
  emits: ['loggedIn'],

  props: {
    labels: {
      type: Object as PropType<{
        logInWith?: string
      }>,
      default: () => ({}),
    },
    appData: Object as PropType<{ appId: number, clubId: number }>
  },

  setup(props, { emit }) {
    const $route = useRoute();
    const slug = computed<string>(() => String($route.params.slug));

    const handleConnectMetamask = async () => {
      const detectedProvider = await detectEthereumProvider() as provider;

      if (detectedProvider) {
        // connected

        const web3: Web3 = new Web3(detectedProvider); // this retrieves the web3 instance from the wallet

        await web3LoginLogic({
          getChain: async () => Promise.resolve('eth'),
          getWalletAddress: async () => {
            const accounts = await web3.eth.requestAccounts();
            return accounts[0];
          },
          registerNonce: registerNonceApiAdapter,
          personalSign: personalSignWeb3AdapterFactory(web3),
          verifyAndLogin: verifyAndLoginApiAdapter,
          onLogInSuccess: () => emit('loggedIn'),
          onLogInFail: (e) => Notify.create({ type: 'warning', message: e.message }),
          getData: () => ({appData: {appId: props.appData?.appId, clubId: props.appData?.clubId}}),
        });
      } else {
        console.error('Can\'t connect MetaMask');
      }
    };

    const signMessage = () => {
      return null;
    };

    return {
      handleConnectMetamask,
      signMessage,
      slug
    };
  }
});
</script>
