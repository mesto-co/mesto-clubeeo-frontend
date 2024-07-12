import {
  clubSocialLinksPartial,
  clubStylePartial,
  IClubSocialLinks,
} from 'src/lib/api/graphqlPartials';
import { api } from 'boot/axios';
import { IClubStyle } from 'src/models/clubStyle';
import { IMeInClub, meInClubPartial } from 'src/models/meInClub';

export interface IClubSettings {
  isPremium: boolean;
}

export const clubSettingsPartial = `{
  isPremium
}`;

export interface ILoadedClub {
  id: string;
  name: string;
  slug: string;
  description: string;
  socialLinks: IClubSocialLinks;
  style: IClubStyle;
  meInClub: IMeInClub;
  settings: Partial<IClubSettings>;
}

export const graphqlClubSchema = `{
  id
  name
  slug
  description
  socialLinks ${clubSocialLinksPartial}
  style ${clubStylePartial}
  meInClub ${meInClubPartial}
  settings ${clubSettingsPartial}
}`;

export const getClubGraphql = async (
  clubSlug: string
): Promise<{ club: ILoadedClub }> => {
  const response = await api.post<{
    data: {
      club: ILoadedClub;
    };
  }>('/graphql', {
    query: `{ club(slug:"${clubSlug}") ${graphqlClubSchema} }`,
  });

  return response.data.data;
};
