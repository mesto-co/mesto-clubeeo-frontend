// performs login

export type TGetChainPort = () => Promise<string>; //todo: ChainEnum

export type TGetWalletAddressPort = () => Promise<string>;

export type TRegisterNoncePort = (params: TRegisterNoncePortParams) => Promise<string>;
export interface TRegisterNoncePortParams {
  prefix: string
}

export type TPersonalSignPort = (params: TPersonalSignPortParams) => Promise<string>;
export interface TPersonalSignPortParams {
  nonce: string,
  walletAddress: string
}

export type TVerifyAndLoginPort = (params: TVerifyAndLoginPortParams) => Promise<boolean>;
export interface TVerifyAndLoginPortParams {
  signature: string
  walletAddress: string
  nonce: string
  chain: string //todo: ChainEnum
}

export interface ILogicFailure {
  message: string
}

const NoncePrefix = 'Please sign this message to log in to Clubeeo: ';

export const web3LoginLogic = async (ports: {
  getChain: TGetChainPort,
  getWalletAddress: TGetWalletAddressPort,
  registerNonce: TRegisterNoncePort,
  personalSign: TPersonalSignPort,
  verifyAndLogin: TVerifyAndLoginPort,
  onLogInSuccess?: () => void,
  onLogInFail?: (e: ILogicFailure) => void,
}) => {
  const chain = await ports.getChain();
  const walletAddress = await ports.getWalletAddress();

  const nonce = await ports.registerNonce({
    prefix: NoncePrefix
  });

  const signature = await ports.personalSign({
    nonce,
    walletAddress
  });

  const isLoggedIn = await ports.verifyAndLogin({
    signature,
    walletAddress,
    nonce,
    chain,
  });

  if (isLoggedIn) {
    if (ports.onLogInSuccess) ports.onLogInSuccess();
  } else {
    if (ports.onLogInFail) ports.onLogInFail({message: 'Login failed'});
  }

  return isLoggedIn;
};
