// Post common

import { api } from 'boot/axios';

export interface IIndexedClub {
  id: number
  slug: string
  name: string
}

interface IGetClubIndexResponse {
  clubs: IIndexedClub[]
}

export const getClubs = async () => {
  const response = await api.get<IGetClubIndexResponse>('/api/club');
  return response.data;
}
