import { ILoadedClub } from 'src/api/clubGraphql';
import { getDefaultDashClubStyle } from 'src/models/clubStyle';
import { getDefaultMeInClub } from 'src/models/meInClub';

export const getDefaultClub = (): ILoadedClub => {
  return {
    id: 0,
    slug: '',
    name: '',
    description: '',
    socialLinks: {},
    style: getDefaultDashClubStyle(),
    meInClub: getDefaultMeInClub(),
  }
}
