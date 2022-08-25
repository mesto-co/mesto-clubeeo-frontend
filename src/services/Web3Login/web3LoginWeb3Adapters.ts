import {
  TPersonalSignPort, TPersonalSignPortParams,
} from 'src/services/Web3Login/web3LoginLogic';
import Web3 from 'web3';

export const personalSignWeb3AdapterFactory = (web3: Web3): TPersonalSignPort => {
  return async (params: TPersonalSignPortParams) => {
    return await web3.eth.personal.sign(
      web3.utils.fromUtf8(params.nonce),
      params.walletAddress,
      ''
    );
  };
}
