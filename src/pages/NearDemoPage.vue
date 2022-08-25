<template>
  {{ data }}
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { WalletConnection } from 'near-api-js';
import { connect } from 'near-api-js/lib/browser-connect';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores/browser_local_storage_key_store';
import getNearConfig from '../lib/near/config';

export default defineComponent({
  setup() {
    onMounted(async () => {
      const keyStore = new BrowserLocalStorageKeyStore();

      const config = {
        ...getNearConfig('testnet'),
        keyStore
      }

      const near = await connect(config);

      const wallet = new WalletConnection(near, null);

      console.log('wallet.isSignedIn(): ', wallet.isSignedIn());
      // If not signed in redirect to the NEAR wallet to sign in
      // keys will be stored in the BrowserLocalStorageKeyStore
      if(!wallet.isSignedIn()) return wallet.requestSignIn();

      // await wallet.requestSignTransactions({
      //   transactions: [
      //     new Transaction({
      //       nonce: 'test'
      //     })
      //   ]
      // });

      async function verifySignature() {
        const accountId = String(wallet.getAccountId());
        console.log('String(wallet.getAccountId())', String(wallet.getAccountId()));

        console.log('accounts:', await wallet._keyStore.getAccounts(config.networkId))
        // console.log('accounts:', await wallet.account()

        const keyPair = await keyStore.getKey(config.networkId, accountId);
        console.log(keyPair, keyStore)
        const msg = Buffer.from('hi');

        const { signature } = keyPair.sign(msg);

        const isValid = keyPair.verify(msg, signature);

        console.log('Signature Valid?:', isValid);

        return isValid;
      }

      await verifySignature();


      // alert('111')
      // alert(verifySignature());
    });

    return {
      data: {}
    }
  }
});

</script>
