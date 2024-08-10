import { defineStore } from 'pinia';
import { getDefaultMeInClub, IMeInClub } from '@src/models/meInClub';
import { api } from 'boot/axios';
import { useClubStore } from '@stores/clubStore';
import { state } from '@src/state';

const clubStore = useClubStore();

export const useMeInClubStore = defineStore('meInClub', {
  state: () => {
    return {
      data: getDefaultMeInClub(),
      isLoading: false,
      isOnceLoaded: false,
      clubSlug: '',
    };
  },
  actions: {
    setDefault() {
      this.data = getDefaultMeInClub();
    },
    patchWith(meInClub: Partial<IMeInClub>) {
      this.$patch({ data: meInClub });
    },
    async loadByClub(clubSlug: string | null) {
      this.setDefault();
      this.clubSlug = clubSlug || '';

      if (!clubSlug) return;
      this.isLoading = true;

      await clubStore.loadBySlug(clubSlug);
      this.patchWith(clubStore.club.meInClub);

      this.isLoading = false;
      this.isOnceLoaded = true;
    },
    async loadByRoute() {
      const clubSlug = state.$club.clubSlugRouteParam.value;
      if (clubSlug) {
        await this.loadByClub(clubSlug);
      }
    },
    async logout() {
      await api.post('/api/auth/logout', {});
    },
  },
});
