<template>
  <club-button
    :label='`${labels.logInWith || "log in with"} WalletConnect`'
    class='full-width'
    icon='img:/imgs/walletconnect-circle-blue.svg'
    scheme='inverse'
    @click='handleConnectWallet'
  />
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { web3LoginLogic } from 'src/services/Web3Login/web3LoginLogic';
import { registerNonceApiAdapter, verifyAndLoginApiAdapter } from 'src/services/Web3Login/web3LoginApiAdapters';
import { Notify } from 'quasar';
import { personalSignWalletConnectAdapterFactory } from 'src/services/Web3Login/web3LoginWalletConnectAdapters';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  name: 'wallet-connect-login-btn',
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
    const handleConnectWallet = async () => {

      // Create a connector
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal
      });

      const callLogin = async () => {
        await web3LoginLogic({
          getChain: async () => Promise.resolve('eth'),
          getWalletAddress: async () => Promise.resolve(connector.accounts[0]),
          registerNonce: registerNonceApiAdapter,
          personalSign: personalSignWalletConnectAdapterFactory(connector),
          verifyAndLogin: verifyAndLoginApiAdapter,
          onLogInSuccess: () => emit('loggedIn'),
          onLogInFail: (e) => Notify.create({ type: 'warning', message: e.message }),
          getData: () => ({appData: props.appData || {}}),
        });
      };

      // Check if connection is already established
      if (connector.connected) {
        // kill session to show wallet select dialog
        await connector.killSession();
      }

      // create new session
      await connector.createSession();

      // Subscribe to connection events
      connector.on('connect', (error, payload: { params: Array<{ accounts: string[], chainId: unknown }> }) => {
        if (error) {
          throw error;
        }

        console.log('connector:connect');

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];

        console.log({ accounts, chainId });

        void callLogin();
      });

      connector.on('session_update', (error, payload: { params: Array<{ accounts: unknown, chainId: unknown }> }) => {
        if (error) {
          throw error;
        }

        console.log('connector:session_update');

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];

        console.log({ accounts, chainId });
      });

      connector.on('disconnect', (error, payload: { params: Array<unknown> }) => {
        if (error) {
          throw error;
        }

        console.log('connector:disconnect', payload);

        // Delete connector
      });
    };

    return {
      handleConnectWallet,
    };
  }
});
</script>
