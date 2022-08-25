export interface IMeInClub {
  loggedIn: boolean
  isMember: boolean
  isAdmin: boolean
  isPlatformAdmin: boolean
  screenName: string
  mainWallet: {
    address: string
    chain: string
  }
}

export const getDefaultMeInClub = (): IMeInClub => {
  return {
    loggedIn: false,
    isMember: false,
    isAdmin: false,
    isPlatformAdmin: false,
    screenName: '',
    mainWallet: {
      address: '',
      chain: '',
    },
  }
}

export const meInClubPartial = `{
  loggedIn
  isMember
  isAdmin
  isPlatformAdmin
  screenName
  mainWallet {
    address
    chain
  }
}`;
