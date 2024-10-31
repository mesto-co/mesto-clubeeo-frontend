import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface IListTypes {
  id: string;
  name: string;
  slug: string;
}

interface IList {
  id: string;
  name: string;
  data: string[];
  enable: boolean;
}

export const useListsStore = defineStore('lists', {
  state: () => ({
    listTypes: [] as IListTypes[],
    lists: [] as IList[],
    isLoading: false,
    type: '',
    pagination: {
      page: 1,
      rowsNumber: null,
      rowsPerPage: 20,
    },
  }),

  actions: {
    async fetchLists(type?: string) {
      this.isLoading = true;

      if (type) this.type = type;

      try {
        const response = await api.get('/api/club/1/apps/lists/mesto-lists/lists', {
          params: {
            listType: this.type,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
          },
        });
        this.lists = response.data.data.lists;
        this.pagination.rowsNumber = response.data.data.meta.total;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getListsTypes() {
      try {
        const response = await api.get('/api/club/1/apps/lists/mesto-lists/lists-types');
        this.listTypes = response.data.data.listsTypes;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
