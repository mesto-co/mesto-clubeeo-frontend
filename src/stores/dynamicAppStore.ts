import { defineStore } from 'pinia';
import { api } from 'boot/axios';

interface IDynamicAppStore {
  isLoading: boolean,
  clubSlug: string,
  clubId: number,
  appId: number,
  appSlug: string,
  appName: string,
  appPage: string,
  appPageData: Record<string, unknown>,
  title: string,
  roles: Array<IClubApp_Role>,
  // data: {}
}

interface IClubApp_Role {
  id: number
}

export const useDynamicAppStore = defineStore('dynamic-app', {
  state: (): IDynamicAppStore => {
    return {
      isLoading: false,
      clubSlug: '',
      clubId: 0,
      appId: 0,
      appSlug: '',
      appName: '',
      appPage: '',
      appPageData: {},
      title: '',
      roles: [],
      // data: {}
    }
  },
  actions: {
    async load(opts: {clubSlug: string, appSlug: string, appPage?: string | null}) {
      this.$state.isLoading = true;
      this.$state.appSlug = opts.appSlug;
      this.$state.clubSlug = opts.clubSlug;
      this.$state.appPage = opts.appPage || '';
      this.$state.clubId = 0;
      this.$state.appName = '';

      const result = await api.get<{
        data: {
          club: {
            id: number
          },
          clubApp: {
            id: number,
            appName: string,
            appSlug: string,
            title: string,
          },
          appPage: {
            appPage: string,
            data: Record<string, string>,
          },
          roles: Array<IClubApp_Role>
        }
      }>(`/api/club/${opts.clubSlug}/app/${opts.appSlug}/config?appPage=${opts.appPage || ''}`);
      const data = result.data.data;

      this.$state.appId = data.clubApp.id;
      this.$state.appName = data.clubApp.appName;
      this.$state.appSlug = data.clubApp.appSlug;
      this.$state.title = data.clubApp.title;
      this.$state.clubId = data.club.id;
      this.$state.roles = data.roles;

      this.$state.appPage = data.appPage.appPage || '';
      this.$state.appPageData = data.appPage.data;

      this.$state.isLoading = false;
    },
  }
});
