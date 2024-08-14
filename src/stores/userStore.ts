import { defineStore } from 'pinia';
import { api } from 'boot/axios';

export interface IUser {
  id: string;
}

export interface IMember {
  id: string;
}

export interface IClub {
  id: string;
  name: string;
}

export const useUserStore = defineStore('user', {
  state: (): {
    user: IUser | null;
    member: IMember | null;
    club: IClub | null;
    loggedIn: boolean;
    isLoading: boolean;
  } => ({
    user: null,
    club: null,
    member: null,
    loggedIn: false,
    isLoading: false,
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.loggedIn && state.user),
  },
  actions: {
    setLogIn(user: IUser, isLoggedIn: boolean) {
      if (isLoggedIn && user) {
        this.$state.user = user;
        this.$state.loggedIn = true;
      } else {
        this.$state.user = null;
        this.$state.loggedIn = false;
      }
    },
    async tryWebappLogin(clubSlug: string, queryInitData?: string) {
      const telegramWebapp = (window as unknown as ITelegramWindow).Telegram?.WebApp;
      console.log('initData', telegramWebapp, window);
      let initData = typeof window !== 'undefined' ? telegramWebapp?.initData : false;
      console.log('initData', initData);
      if (!initData && queryInitData) initData = queryInitData;
      console.log('initData', initData);
      if (!initData) return false;
      return await this.webappLogin(String(clubSlug), String(initData));
    },
    async webappLogin(clubSlug: string, initData: string) {
      try {
        this.isLoading = true;
        this.$state.loggedIn = false;

        const response = await api.post<{
          ok?: boolean;
          user: IUser;
          member: IMember;
          club: IClub;
        }>(`/api/telegram/${clubSlug}/webapp-login`, { initData });

        if (response.data.ok) {
          this.$state.user = response.data.user;
          this.$state.member = response.data.member;
          this.$state.club = response.data.club;
          this.$state.loggedIn = true;
        }
      } catch (e) {
        console.error(e);
        throw e;
      } finally {
        this.isLoading = false;
        return true;
      }
    },
  },
});

export interface ITelegramWindow_InitDataUnsafe {
  query_id: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_premium: boolean;
  };
  auth_date: string;
  hash: string;
}

export interface ITelegramWindow {
  Telegram: {
    WebApp: {
      initData: string;
      initDataUnsafe: ITelegramWindow_InitDataUnsafe;
      themeParams: ITelegramWindow_ThemeParams;
    };
  };
}

export interface ITelegramWindow_ThemeParams {
  button_text_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  secondary_bg_color: string;
  bg_color: string;
}
