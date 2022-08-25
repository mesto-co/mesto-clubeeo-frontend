import { defineStore } from 'pinia';
import { getDefaultMeInClub, IMeInClub } from 'src/models/meInClub';
import { api } from 'boot/axios';
import { useClubStore } from 'stores/clubStore';

const clubStore = useClubStore();

export const useMeInClubStore = defineStore('meInClub', {
  state: () => {
    return {
      data: getDefaultMeInClub(),
      isLoading: false,
      isOnceLoaded: false,
      clubSlug: '',
    }
  },
  actions: {
    setDefault() {
      this.data = getDefaultMeInClub();
    },
    patchWith(meInClub: Partial<IMeInClub>) {
      this.$patch({ data: meInClub })
    },
    async loadByClub(clubSlug: string) {
      if (!clubSlug) return;

      this.setDefault();
      this.clubSlug = clubSlug;
      this.isLoading = true;

      await clubStore.loadBySlug(clubSlug);
      this.patchWith(clubStore.club.meInClub);

      this.isLoading = false;
      this.isOnceLoaded = true;
    },
    async logout() {
      await api.post('/api/auth/logout', {});
    }
  },
})
