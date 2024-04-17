import { defineStore } from 'pinia';
import { api } from 'boot/axios';

interface IGlobalConfig {
  root?: {
    redirect?: string
  }
}

const getDefaultGlobalConfig = (): IGlobalConfig => {
  return {};
};

export const useGlobalConfigStore = defineStore('globalConfig', {
  state: () => {
    return {
      data: getDefaultGlobalConfig(),
      isLoading: false,
      isOnceLoaded: false
    };
  },
  actions: {
    async load() {
      this.isLoading = true;

      const result = await api.get<{
        config: IGlobalConfig
      }>('/api/global/config');

      this.$patch({data: result.data.config});

      this.isLoading = false;
      this.isOnceLoaded = true;
    }
  }
});
