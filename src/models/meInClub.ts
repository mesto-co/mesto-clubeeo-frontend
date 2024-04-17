export interface IMeInClub {
  loggedIn: boolean
  isMember: boolean
  isAdmin: boolean
  isPlatformAdmin: boolean
  isPremium: boolean
  screenName: string
  mainWallet: {
    address: string
    chain: string
  }
  menu: {
    items: {
      appSlug: string
      appName: string
      title: string
      icon: string
    }[]
  }
}

export const getDefaultMeInClub = (): IMeInClub => {
  return {
    loggedIn: false,
    isMember: false,
    isAdmin: false,
    isPlatformAdmin: false,
    isPremium: false,
    screenName: '',
    mainWallet: {
      address: '',
      chain: '',
    },
    menu: {
      items: [],
    },
  }
}

export const meInClubPartial = `{
  loggedIn
  isMember
  isAdmin
  isPlatformAdmin
  isPremium
  screenName
  mainWallet {
    address
    chain
  }
  menu {
    items {
      appSlug
      appName
      title
      icon
    }
  }
}`;
