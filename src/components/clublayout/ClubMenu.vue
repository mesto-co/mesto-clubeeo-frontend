<template>
  <div>
    <q-scroll-area
      style="
        height: calc(100vh - 48px);
        width: 223px;
        background-color: rgb(29 29 39);
      "
    >
      <div style="padding: 12px 8px 12px 8px; width: 223px">
        <q-list style="margin: 0">
          <q-btn
            flat
            no-caps
            class="full-width q-mb-md clubBgDark"
            :to="{ name: 'club' }"
            style="border-radius: 8px"
          >
            {{ club.name }}
            <q-icon
              v-if="(club.settings || {}).isPremium"
              name="fa-solid fa-star"
              size="13px"
              class="q-pl-sm clubHeaderActive"
              style="bottom: 1px"
            />
          </q-btn>

          <template v-for="link in linksList" :key="link.title">
            <q-item
              v-if="link.type == 'split'"
              dense
              style="
                color: rgba(255, 255, 255, 0.5);
                margin: 12px 0 0;
                font-weight: 700;
              "
            >
              <q-item-section>
                {{ link.title }}
              </q-item-section>
            </q-item>

            <q-item
              v-else-if="link.toName"
              clickable
              :to="{ name: link.toName, params: link.toParams || {} }"
              dense
              style="border-radius: 8px; margin: 2px 0"
              :class="{
                clubButtonActive: isCurrentRoute(link.toName, link.toParams),
                clubMenuItem: true,
              }"
            >
              <q-item-section v-if="link.icon" avatar>
                <q-icon :name="link.icon" />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ link.title }}</q-item-label>
                <!--                 <q-item-label caption>-->
                <!--                   {{ link.caption }}-->
                <!--                 </q-item-label>-->
              </q-item-section>

              <q-item-section side v-if="link.configurable">
                <q-btn
                  dense
                  round
                  flat
                  size="xs"
                  icon="fa-solid fa-gear"
                  color="white"
                  @click.prevent="onAppSettingsClicked(link)"
                />
                <!--                <q-icon name='fa-solid fa-gear' size='xs' />-->
              </q-item-section>
            </q-item>

            <q-item
              v-else
              clickable
              tag="a"
              target="_blank"
              :href="link.url"
              dense
              style="border-radius: 8px; margin: 2px 0"
              :class="{ clubMenuItem: true }"
            >
              <q-item-section>
                <q-item-label>{{ link.title }}</q-item-label>
                <!--                 <q-item-label caption>-->
                <!--                   {{ link.caption }}-->
                <!--                 </q-item-label>-->
              </q-item-section>

              <q-item-section v-if="link.icon" avatar>
                <q-icon :name="link.icon" size="xs" />
              </q-item-section>
            </q-item>
          </template>
        </q-list>

        <div v-if="!menuLoaded" class="text-center">
          <q-spinner size="xl" class="q-mt-lg" />
        </div>
      </div>
    </q-scroll-area>

    <me-in-club-widget
      v-if="club && club.meInClub.loggedIn"
      :me-in-club="club.meInClub"
      :class="{ clubButtonActive: isCurrentRoute('club-me') }"
      style="cursor: pointer"
      @click="$router.push({ name: 'club-me' })"
    >
      <q-btn icon="fa-solid fa-user" size="sm" dense flat />
    </me-in-club-widget>
  </div>
</template>

<style lang="scss" scoped>
.q-item.clubMenuItem {
  color: inherit;

  a {
    color: inherit;
  }
}
</style>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { state } from '@src/state';
import { IClubSocialLinks } from '@src/lib/api/graphqlPartials';
import { shortenAddress } from '@src/lib/components/chains';
import MeInClubWidget from '@components/me/MeInClubWidget.vue';
import _ from 'lodash';
import { useClubMenuStore } from '@stores/clubMenuStore';

interface ILoadedClub {
  id: number;
  name: string;
  socialLinks: IClubSocialLinks;
  meInClub: {
    loggedIn: boolean;
    isMember: boolean;
    isAdmin: boolean;
    isPlatformAdmin: boolean;
    screenName: string;
    mainWallet: {
      address: string;
      chain: string;
    };
    menu: {
      items: {
        appSlug: string;
        appName: string;
        title: string;
        icon: string;
      }[];
    };
  };
}

export default defineComponent({
  name: 'ClubMenu',

  components: { MeInClubWidget },

  props: {
    club: {
      type: Object as PropType<ILoadedClub>,
    },
  },

  setup(props) {
    const $route = useRoute();
    const $router = useRouter();
    const clubLoaded = ref(true);

    const load = async () => {
      await state.$club.loadClub();
    };
    onMounted(load);
    watch(
      () => $route.params.clubSlug,
      async () => {
        await load();
      }
    );

    const menuLoaded = computed(
      () => clubLoaded.value && state.$club.isOnceLoaded.value
    );

    const $menu = useClubMenuStore();

    const linksList = computed(() => $menu.menuView);

    watch(
      () => props?.club?.meInClub,
      () =>
        $menu.$patch({
          menuItems: props?.club?.meInClub?.menu.items || [],
          isAdmin: props?.club?.meInClub?.isAdmin || false,
        }),
      { deep: true }
    );

    // const linksList2 = computed(() => {
    //   const result: Array<IMenuItem> = [
    //     {
    //       title: 'home',
    //       toName: 'club-home'
    //     }
    //   ];
    //
    //   // const telegramLink = legacyMeInClub?.services?.tg?.chatInviteLink;
    //   // const discordLink = props?.club?.socialLinks?.discord;
    //
    //   if (menuLoaded.value) {
    //     // if (telegramLink || discordLink) {
    //     //   result.push({ type: 'split', title: 'CLUB RESOURCES' });
    //     //
    //     //   if (telegramLink) result.push({
    //     //     title: 'telegram',
    //     //     url: telegramLink,
    //     //     icon: mapSocialToIcon('telegram')
    //     //   });
    //     //
    //     //   if (discordLink) result.push({
    //     //     title: 'discord',
    //     //     url: discordLink,
    //     //     icon: mapSocialToIcon('discord')
    //     //   });
    //     // }
    //
    //     const meInClub = props?.club?.meInClub;
    //
    //     if (meInClub?.menu.items) {
    //       meInClub?.menu.items.forEach(item => {
    //         if (['posts', 'posts-new'].includes(item.appName)) {
    //           result.push({
    //             title: item.title,
    //             toName: `club-app-${item.appName}`,
    //             toParams: {
    //               appSlug: item.appSlug
    //             },
    //             configurable: meInClub.isAdmin || false,
    //           });
    //         } else {
    //           result.push({
    //             title: item.title,
    //             toName: 'club-dynamic-app',
    //             toParams: {
    //               appSlug: item.appSlug
    //             },
    //             configurable: meInClub.isAdmin || false,
    //           });
    //         }
    //       });
    //     }
    //
    //     if (meInClub?.isAdmin) {
    //       result.push(
    //         {
    //           type: 'split',
    //           title: 'ADMINISTRATION'
    //         },
    //         // {
    //         //   title: 'edit profile',
    //         //   toName: 'club-profile-edit'
    //         // },
    //         // {
    //         //   title: 'Club page',
    //         //   toName: 'club-roles'
    //         // },
    //         {
    //           title: 'members',
    //           toName: 'club-members'
    //         },
    //         {
    //           title: 'roles',
    //           toName: 'club-roles'
    //         },
    //         {
    //           title: 'badges',
    //           toName: 'club-badges'
    //         },
    //         {
    //           title: 'apps',
    //           toName: 'club-apps'
    //         },
    //         {
    //           title: 'automation',
    //           toName: 'club-automation'
    //         },
    //         {
    //           title: 'analytics',
    //           toName: 'club-analytics'
    //         },
    //       );
    //     }
    //   }
    //
    //   return result;
    // });

    const isCurrentRoute = (
      routeName: string,
      routeParams?: Record<string, string>
    ) => {
      if ('club-dynamic-app-config' === $route.name) {
        return routeParams?.appSlug === $route.params.appSlug;
      }

      const parentRouteName = ($route.meta?.parent as { name?: string })?.name;
      if ($route.name !== routeName && parentRouteName !== routeName)
        return false;

      if (routeParams === undefined) {
        return true;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { clubSlug, ...routeParamsForCheck } = $route.params;
        return _.isEqual(routeParams, routeParamsForCheck);
      }
    };

    return {
      menu: $menu,

      isCurrentRoute,
      linksList,
      menuLoaded,
      shortenAddress,
      onAppSettingsClicked: async (link: { toParams: { appSlug: string } }) => {
        await $router.push({
          name: 'club-app-manage',
          params: {
            appSlug: link.toParams.appSlug,
          },
        });
      },
    };
  },
});
</script>
