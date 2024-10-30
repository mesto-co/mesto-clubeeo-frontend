import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface IList {
  id?: string;
  name: string;
  data: string[];
  enable: boolean;
}

export const useListsItemCreateStore = defineStore('lists-item-create', {
  state: () => ({
    listsItem: {name: '', slug: '', data: [], enable: false} as IList,
    isLoading: false,
  }),

  actions: {
    async saveListsItem({ onSuccess, onError }: { onSuccess: () => void; onError: (error) => void }) {
      this.isLoading = true;

      try {
        await api.post('/api/club/1/apps/lists/mesto-lists/lists', this.listsItem);
        onSuccess();
      } catch (error) {
        const errorMessage = (error as Record<string, any>)?.response?.data?.error;
        if (errorMessage) {
          onError({ message: errorMessage });
        } else {
          onError(error);
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
});
