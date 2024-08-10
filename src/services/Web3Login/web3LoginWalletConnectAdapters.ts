import {
  TPersonalSignPort,
  TPersonalSignPortParams,
} from '@src/services/Web3Login/web3LoginLogic';
import WalletConnect from '@walletconnect/client';
import { Notify } from 'quasar';

export const personalSignWalletConnectAdapterFactory = (
  connector: WalletConnect
): TPersonalSignPort => {
  return async (params: TPersonalSignPortParams) => {
    const msgParams = [
      params.nonce, // Required
      params.walletAddress, // Required
    ];

    Notify.create({
      type: 'info',
      message: 'Please sign the message using your wallet',
    });

    return (await connector.signPersonalMessage(msgParams)) as string;
  };
};
