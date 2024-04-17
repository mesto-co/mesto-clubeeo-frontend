// Post common

import { api } from 'boot/axios';
import { IClubStyle } from 'src/models/clubStyle';
import { IRoadmapEntry } from 'src/models/roadmapModel';
import { IClubBadge, IMemberBadge, IMemberBadgeBase } from 'src/models/badgeModels';

export interface IClubCollections {
  name?: string
  coverImg?: string
  url?: string
  siteName?: string
  label?: string
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

export interface IClubRoadmap {
  entries: IRoadmapEntry[]
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
  id: string
  slug: string
  name: string
  description: string
  welcome?: string
  website?: string
  buyLinks: IClubBuyLinks
  socialLinks: IClubSocialLinks
  style?: Partial<IClubStyle>
  roadmap?: Partial<IClubRoadmap>
  settings?: Partial<{
    isPremium: boolean,
    whitelistOnTelegramLogIn: boolean,
    badges: Array<{ name: string, img: string, description: string }>,
    whitelistButton: boolean | { label: string },
    clubPostsCarouselAppId: number,
    [key: string]: unknown;
  }>
}

export interface IMeInClub {
  isMember: boolean | null
  isLoggedIn: boolean | null
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
  },
  mainWallet: {
    id: number
    address: string
    chain: string | 'eth' | 'near'
    createdAt: string
    updatedAt: string
  } | Record<string, never>
}

interface IGetClubResponse {
  club: IClub
  me: IMeInClub
}

export const getClub = async (clubSlug: string, data: {session?: string} = {}) => {
  const response = await api.get<IGetClubResponse>(`/api/club/slug/${clubSlug}`, {
    headers: {
      'X-SuppressError': '404',
      'X-Clubeeo-Session': data.session
    },
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

interface IGetRolesResponse {
  roles: Array<IGetRolesResponse_Role>
}

export interface IGetRolesResponse_Role {
  id: number
  name: string
}

export const getRoles = async (args: {clubId: number} | {clubSlug: string}) => {
  /* eslint-disable */
  // @ts-ignore
  const clubLocator = args.hasOwnProperty('clubId') ? `clubId:${args.clubId}` : `clubSlug:${args.clubSlug}`;
  /* eslint-enable */

  const response = await api.get<IGetRolesResponse>(`/api/club/${clubLocator}/roles`);
  return response.data.roles;
}

export type ISaveRolesRequest_RoleIds = Record<number, boolean>;

export const saveAppRoles = async (args: {clubSlug: string, appSlug: string, roles: ISaveRolesRequest_RoleIds}) => {
  const response = await api.post<{ok: boolean}>(`/api/club/${args.clubSlug}/app/${args.appSlug}/roles`, {
    roles: args.roles,
  });
  return response.data;
}


export const saveMemberRoles = async (args: {clubSlug: string, memberId: string, roles: ISaveRolesRequest_RoleIds}) => {
  const response = await api.post<{ok: boolean}>(`/api/club/clubSlug:${args.clubSlug}/member/memberId:${args.memberId}/roles`, {
    roles: args.roles,
  });
  return response.data;
}

export interface ILoadMemberResponse {
  user: {
    id: number
    email: string
    imgUrl: string,
    screenName: string,
    timezone: string,
    userClubRoles: Array<{
      clubRole: null | {
        id: number
        name: string
      }
    }>
    badges: Array<IMemberBadge>
  }
}


interface IGetBadgesResponse {
  badges: Array<IClubBadge>
}

export const getBadges = async (args: {clubId: number} | {clubSlug: string}) => {
  /* eslint-disable */
  // @ts-ignore
  const clubLocator = args.hasOwnProperty('clubId') ? `clubId:${args.clubId}` : `clubSlug:${args.clubSlug}`;
  /* eslint-enable */

  const response = await api.get<IGetBadgesResponse>(`/api/club/${clubLocator}/badges`);
  return response.data.badges;
}

export const assignBadge = async (args: {clubSlug: string, memberId: string, badge: {id: string, value: number}}) => {
  const response = await api.post<{
    memberBadge: IMemberBadgeBase,
    clubBadge: IClubBadge,
    isCreated: boolean,
    isChanged: boolean,
  }>(`/api/club/clubSlug:${args.clubSlug}/member/memberId:${args.memberId}/assignBadge`, {
    badge: {
      id: args.badge.id,
      value: args.badge.value,
    },
  });
  return response.data;
}

export const loadMember = async (args: {clubSlug: string, memberId: string}) => {
  const response = await api.get<ILoadMemberResponse>(`/api/club/clubSlug:${args.clubSlug}/member/memberId:${args.memberId}`, {});
  return response.data;
}

export const loadMe = async (args: {clubSlug: string}) => {
  const response = await api.get<ILoadMemberResponse>(`/api/club/clubSlug:${args.clubSlug}/member/me`, {});
  return response.data;
}
