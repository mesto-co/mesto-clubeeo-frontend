import { api } from 'boot/axios';
import {
  TRegisterNoncePort,
  TRegisterNoncePortParams,
  TVerifyAndLoginPort,
  TVerifyAndLoginPortParams,
} from '@src/services/Web3Login/web3LoginLogic';

export const verifyAndLoginApiAdapter: TVerifyAndLoginPort = async (
  params: TVerifyAndLoginPortParams
) => {
  return await api.post('/api/web3/verify-and-login', {
    signature: params.signature,
    address: params.walletAddress,
    nonce: params.nonce,
    chain: params.chain,
    data: params.data || {},
  });
};

export const registerNonceApiAdapter: TRegisterNoncePort = async (
  params: TRegisterNoncePortParams
) => {
  const nonceResult = await api.post<{ nonce: string }>('/api/web3/nonce', {
    prefix: params.prefix,
  });

  return nonceResult.data.nonce;
};
