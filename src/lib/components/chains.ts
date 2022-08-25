export const shortenAddress = (wallet: {address: string, chain?: string, chainNorm?: string}) => {
  if (!wallet) return '';

  let address = wallet.address;
  const addressLength = (address || '').length;
  if (addressLength > 15) {
    if (wallet.chain?.startsWith('near') || (wallet.chain?.startsWith('mock'))) {
      address = address.slice(0, 5) + '...' + address.slice(addressLength-6, addressLength)
    } else {
      address = address.slice(0, 6) + '...' + address.slice(addressLength-4, addressLength)
    }
  }

  return address;
}

export const shortenAddressOnChain = (wallet: {address: string, chain?: string, chainNorm?: string}) => {
  if (!wallet) return '';

  const shorten = shortenAddress(wallet);

  return [shorten, wallet?.chainNorm || wallet?.chain].filter(v => v).join(' @ ')
}
