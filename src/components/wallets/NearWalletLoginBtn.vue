<template>
  <club-button
    label='log in with NEAR'
    class='full-width'
    scheme='inverse'
    icon='img:/icons/crypto/near.svg'
    @click='handleConnectWallet'
  />
</template>

<script type='ts'>
import { defineComponent, onMounted } from 'vue';
import { WalletConnection } from 'near-api-js';
import { connect } from 'near-api-js/lib/browser-connect';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores/browser_local_storage_key_store';
import getNearConfig from 'src/lib/near/config';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { web3LoginLogic } from 'src/services/Web3Login/web3LoginLogic';
import { registerNonceApiAdapter, verifyAndLoginApiAdapter } from 'src/services/Web3Login/web3LoginApiAdapters';
import { Notify } from 'quasar';
import { nearChainsConfigMap } from 'src/lib/near/nearConsts';

export default defineComponent({
  components: { ClubButton },
  emits: ['loggedIn'],

  setup(props, { emit }) {
    const chain = 'near';

    onMounted(async () => {
      const keyStore = new BrowserLocalStorageKeyStore();

      const config = {
        ...getNearConfig(nearChainsConfigMap[chain]),
        keyStore
      }

      const near = await connect(config);

      const wallet = new WalletConnection(near, null);

      console.log('wallet.isSignedIn(): ', wallet.isSignedIn());

      // If not signed in redirect to the NEAR wallet to sign in
      // keys will be stored in the BrowserLocalStorageKeyStore
      if(!wallet.isSignedIn()) return;

      const callLogin = async () => {
        await web3LoginLogic({
          getChain: async () => Promise.resolve(chain),
          getWalletAddress: async () => Promise.resolve(wallet.account().accountId),
          registerNonce: registerNonceApiAdapter,
          personalSign: () => wallet.account().accountId, //todo: actual sign
          verifyAndLogin: verifyAndLoginApiAdapter,
          onLogInSuccess: () => emit('loggedIn'),
          onLogInFail: (e) => Notify.create({ type: 'warning', message: e.message })
        });
      };

      await callLogin();
    });

    const handleConnectWallet = async () => {
      const keyStore = new BrowserLocalStorageKeyStore();

      const config = {
        ...getNearConfig(nearChainsConfigMap[chain]),
        keyStore
      }

      const near = await connect(config);

      const wallet = new WalletConnection(near, null);

      console.log('wallet.isSignedIn(): ', wallet.isSignedIn());

      // If not signed in redirect to the NEAR wallet to sign in
      // keys will be stored in the BrowserLocalStorageKeyStore
      if(!wallet.isSignedIn()) return wallet.requestSignIn();

      const callLogin = async () => {
        await web3LoginLogic({
          getChain: async () => Promise.resolve(chain),
          getWalletAddress: async () => Promise.resolve(wallet.account().accountId),
          registerNonce: registerNonceApiAdapter,
          personalSign: () => wallet.account().accountId, //todo: actual sign
          verifyAndLogin: verifyAndLoginApiAdapter,
          onLogInSuccess: () => emit('loggedIn'),
          onLogInFail: (e) => Notify.create({ type: 'warning', message: e.message })
        });
      };

      await callLogin();
    }

    return {
      handleConnectWallet,
      data: {
      }
    }
  }
});

</script>
