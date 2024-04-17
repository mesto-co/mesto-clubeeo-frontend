import { defineStore } from 'pinia';

export type IMenuItem = {
  title: string
  toName: string
  toParams?: Record<string, string>
  icon?: string
  configurable?: boolean,
} | {
  title: string
  url: string
  icon?: string
} | {
  type: 'split'
  title: string
}

export const useClubMenuStore = defineStore('club-menu', {
  state: () => {
    return {
      isAdmin: false,
      menuItems: [] as {
        appSlug: string
        appName: string
        title: string
        icon: string
      }[]
    };
  },
  getters: {
    menuView: (state) => {
      const result: Array<IMenuItem> = [
        {
          title: 'home',
          toName: 'club-home'
        }
      ];

      state.menuItems.forEach(item => {
        if (['posts', 'posts-new'].includes(item.appName)) {
          result.push({
            title: item.title,
            toName: `club-app-${item.appName}`,
            toParams: {
              appSlug: item.appSlug
            },
            configurable: state.isAdmin || false,
          });
        } else {
          result.push({
            title: item.title,
            toName: 'club-dynamic-app',
            toParams: {
              appSlug: item.appSlug
            },
            configurable: state.isAdmin || false,
          });
        }
      });

      if (state.isAdmin) {
        result.push(
          {
            type: 'split',
            title: 'ADMINISTRATION'
          },
          // {
          //   title: 'edit profile',
          //   toName: 'club-profile-edit'
          // },
          // {
          //   title: 'Club page',
          //   toName: 'club-roles'
          // },
          {
            title: 'members',
            toName: 'club-members'
          },
          {
            title: 'roles',
            toName: 'club-roles'
          },
          {
            title: 'badges',
            toName: 'club-badges'
          },
          {
            title: 'apps',
            toName: 'club-apps'
          },
          {
            title: 'automation',
            toName: 'club-automation'
          },
          {
            title: 'analytics',
            toName: 'club-analytics'
          },
        );
      }

      return result;
    }
  }
  // getters: {
  //   slug: state => state.data.slug || '',
  //   club: state => state.data,
  //   clubLoaded: state => state.clubLoaded,
  // },
  // actions: {
  //   setDefault() {
  //     this.data = getDefaultClub();
  //   },
  //   provide() {
  //     provide('club', computed(() => this.$state.data));
  //   },
  //   patchWith(club: Partial<IClub>) {
  //     this.$patch({data: club});
  //   },
  //   async loadBySlug(slug: string | null) {
  //     if (slug) {
  //       this.setDefault();
  //       this.$state.data.slug = slug;
  //
  //       await this.load();
  //     }
  //   },
  //   async load() {
  //     if (this.slug) {
  //       this.$state.clubLoaded = false;
  //
  //       const result = await getClubGraphql(this.slug);
  //       this.patchWith(result.club);
  //
  //       styleStore.patchWith(result.club.style);
  //
  //       this.$state.clubLoaded = true;
  //     }
  //   },
  //   // async onSyncBySlug(slug: string, cb: () => Promise<void>) {
  //   //   if (this.slug === slug) {
  //   //     await cb();
  //   //   } else {
  //   //     setTimeout(() => void this.onSyncBySlug(slug, cb), 200);
  //   //   }
  //   // },
  // },
});
