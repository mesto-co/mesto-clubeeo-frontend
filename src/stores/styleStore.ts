import { defineStore } from 'pinia';
import { getDefaultDashClubStyle, IClubStyle } from 'src/models/clubStyle';
import { computed, provide } from 'vue';

export const useStyleStore = defineStore('style', {
  state: () => {
    return {
      data: getDefaultDashClubStyle()
    }
  },
  actions: {
    setDefault() {
      this.data = getDefaultDashClubStyle();
    },
    provide() {
      provide('clubStyle', computed(() => this.$state.data));
    },
    patchWith(style: Partial<IClubStyle>) {
      this.$patch({
        data: {
          heroImg: style.heroImg || '',
          logoImg: style.logoImg || '',
        }
      })
    }
  },
})
