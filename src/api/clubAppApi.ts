import { api } from 'boot/axios';

export interface IGetClubAppResponse {
  clubApp: {
    id: string
    title: string
  },
  isMember: true,
  hasAccess: true,
  data: Record<string, unknown> // config
}

export const getClubApp = async (clubSlug: string, clubAppSlug: string) => {
  const response = await api.get<{
    data: IGetClubAppResponse
  }>(`/api/clubApps/${clubSlug}/${clubAppSlug}`, {
    headers: { 'X-SuppressError': '404' }
  });
  return response.data;
}
