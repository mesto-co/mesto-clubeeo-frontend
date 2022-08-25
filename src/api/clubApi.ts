// Post common

import { api } from 'boot/axios';
import { IClubStyle } from 'src/models/clubStyle';

export interface IClubCollections {
  name?: string
  coverImg?: string
  url?: string
  siteName?: string
}

export interface IClubBuyLinks {
  main?: string
  opensea?: string
  rarible?: string
  collections?: Array<IClubCollections>
}

export interface IClubSocialLinks {
  tiktok?: string
  telegram?: string
  discord?: string
  instagram?: string
  twitter?: string
  reddit?: string
  facebook?: string
  linkedin?: string
  youtube?: string
  web?: string
}

export enum EClubSocialLinks {
  tiktok = 'tiktok',
  telegram = 'telegram',
  discord = 'discord',
  instagram = 'instagram',
  twitter = 'twitter',
  reddit = 'reddit',
  facebook = 'facebook',
  linkedin = 'linkedin',
  youtube = 'youtube',
  web = 'web',
}

export interface IClub {
  id: number
  slug: string
  name: string
  description: string
  welcome?: string
  website?: string
  buyLinks: IClubBuyLinks
  socialLinks: IClubSocialLinks
  style?: Partial<IClubStyle>
  settings?: Partial<{
    whitelistOnTelegramLogIn: boolean,
    badges: Array<{ name: string, img: string, description: string }>,
    whitelistButton: boolean | { label: string }
  }>
}

export interface IMeInClub {
  isMember: boolean | null
  services: {
    tg?: {
      chatInviteLink: string
      telegramLoginBot: string
      telegramLoginCode: string
      loggedIn: boolean | null
    }
  }
  wallets: {
    eth?: {
      loggedIn: boolean | null
      enabled: boolean | null
    },
    near?: {
      loggedIn: boolean | null
      enabled: boolean | null
    },
  }
}

interface IGetClubResponse {
  club: IClub
  me: IMeInClub
}

export const getClub = async (clubSlug: string) => {
  const response = await api.get<IGetClubResponse>(`/api/club/slug/${clubSlug}`, {
    headers: { 'X-SuppressError': '404' }
  });
  return response.data;
};

interface IGetMeInClubResponse {
  club: IClub
  tgChatInviteLink: string
}

export const getMeInClub = async (clubSlug: string) => {
  const response = await api.get<IGetMeInClubResponse>(`/api/club/slug/${clubSlug}/me`);
  return response.data;
};
