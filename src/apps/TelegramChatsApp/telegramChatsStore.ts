import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

interface TelegramChat {
  id: string;
  extId: string;
  service: string;
  name: string;
  isAdmin: boolean;
  removed: boolean;
  isForum: boolean;
  generalTopicId: string;
  chatInviteLink?: string;
}

export const useTelegramChatsStore = defineStore('telegramChats', {
  state: () => ({
    chats: [] as TelegramChat[],
    isLoading: false,
  }),

  actions: {
    async fetchChats(clubId: string, perPage?: number) {
      this.isLoading = true;
      try {
        const response = await api.post('/graphql', {
          query: `
            query TelegramChats($clubId: ID!, $perPage: Int) {
              telegramChats(clubId: $clubId, perPage: $perPage) {
                items {
                  id
                  extId
                  service
                  name
                  isAdmin
                  removed
                  isForum
                  generalTopicId
                  chatInviteLink
                }
              }
            }
          `,
          variables: {
            clubId,
            perPage,
          },
        });

        this.chats = response.data.data.telegramChats.items;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
