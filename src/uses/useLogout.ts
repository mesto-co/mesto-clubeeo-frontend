import { useMeInClubStore } from '@stores/meInClubStore';
import { BrowserLocalStorageKeyStore } from 'near-api-js/lib/key_stores/browser_local_storage_key_store';
import getNearConfig from '@src/lib/near/config';
import { nearChainsConfigMap } from '@src/lib/near/nearConsts';
import { connect } from 'near-api-js/lib/browser-connect';
import { WalletConnection } from 'near-api-js';

export const useLogout = () => {
  const meInClubStore = useMeInClubStore();

  const logout = async () => {
    await meInClubStore.logout();

    // NEAR session logout ------
    const keyStore = new BrowserLocalStorageKeyStore();

    const chain = 'near';
    const config = {
      ...getNearConfig(nearChainsConfigMap[chain]),
      keyStore,
    };

    const near = await connect(config);
    const wallet = new WalletConnection(near, null);

    if (wallet.isSignedIn()) {
      wallet.signOut();
    }
    // NEAR session logout ------

    await meInClubStore.loadByRoute();
  };

  return {
    logout,
  };
};
