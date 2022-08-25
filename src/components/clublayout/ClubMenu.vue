<template>
  <div>
    <q-scroll-area style='height: calc(100vh - 48px); width: 223px;'>

      <div style='padding: 12px 8px 12px 8px; width: 223px'>

        <q-list
          style='margin: 0'
        >
          <q-btn
            unelevated
            no-caps class='full-width q-mb-md'
            :label='club.name'
            :to='{name: "club"}'
            style='border-radius: 8px'
          ></q-btn>

          <template
            v-for='link in linksList'
            :key='link.title'
          >
            <q-item
              v-if='link.type == "split"'
              dense
              style='color: rgba(255,255,255,0.5); margin: 12px 0 0; font-weight: 700'
            >
              <q-item-section>
                {{ link.title }}
              </q-item-section>
            </q-item>

            <q-item
              v-else-if='link.toName'
              clickable
              :to='{name: link.toName, params: link.toParams || {}}'
              dense
              style='border-radius: 8px; margin: 2px 0'
              :class='{clubButtonActive: isCurrentRoute(link.toName), clubMenuItem: true}'
            >
              <q-item-section v-if='link.icon' avatar>
                <q-icon :name='link.icon' />
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ link.title }}</q-item-label>
                <!--                 <q-item-label caption>-->
                <!--                   {{ link.caption }}-->
                <!--                 </q-item-label>-->
              </q-item-section>
            </q-item>

            <q-item
              v-else
              clickable
              tag='a'
              target='_blank'
              :href='link.url'
              dense
              style='border-radius: 8px; margin: 2px 0'
              :class='{clubMenuItem: true}'
            >
              <q-item-section>
                <q-item-label>{{ link.title }}</q-item-label>
                <!--                 <q-item-label caption>-->
                <!--                   {{ link.caption }}-->
                <!--                 </q-item-label>-->
              </q-item-section>

              <q-item-section v-if='link.icon' avatar>
                <q-icon :name='link.icon' size='xs' />
              </q-item-section>

            </q-item>

          </template>
        </q-list>

        <div
          v-if='!menuLoaded'
          class='text-center'
        >
          <q-spinner size='xl' class='q-mt-lg' />
        </div>

      </div>

    </q-scroll-area>

    <me-in-club-widget
      v-if='club'
      :me-in-club='club.meInClub'
      :class='{clubButtonActive: isCurrentRoute("club-me")}'
      style='cursor: pointer;'
      @click='$router.push({name: "club-me"})'
    >
      <q-btn
        icon='fa-solid fa-user'
        size='sm'
        dense flat
      />
    </me-in-club-widget>

  </div>
</template>

<style lang='scss' scoped>
.q-item.clubMenuItem {
  color: inherit;

  a {
    color: inherit;
  }
}
</style>

<script lang='ts'>
import { useRoute } from 'vue-router';
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { state } from 'src/state';
import { mapSocialToIcon } from 'src/lib/components/socials';
import { IClubSocialLinks } from 'src/lib/api/graphqlPartials';
import { shortenAddress } from 'src/lib/components/chains';
import MeInClubWidget from 'components/me/MeInClubWidget.vue';

interface ILoadedClub {
  id: number
  name: string
  socialLinks: IClubSocialLinks
  meInClub: {
    loggedIn: boolean
    isMember: boolean
    isAdmin: boolean
    isPlatformAdmin: boolean
    screenName: string
    mainWallet: {
      address: string
      chain: string
    }
  }
}

export default defineComponent({
  name: 'ClubMenu',

  components: { MeInClubWidget },

  props: {
    club: {
      type: Object as PropType<ILoadedClub>
    }
  },

  setup(props) {
    const $route = useRoute();
    const legacyMeInClub = state.$club.meInClub;
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

    const menuLoaded = computed(() => clubLoaded.value && !state.$club.isLoading.value);

    const linksList = computed(() => {
      const result: Array<{
        title: string
        toName: string
        toParams?: Record<string, string>
        icon?: string
      } | {
        title: string
        url: string
        icon?: string
      } | {
        type: 'split'
        title: string
      }> = [
        {
          title: 'home',
          toName: 'club-home'
        }
      ];

      const telegramLink = legacyMeInClub?.services?.tg?.chatInviteLink;
      const discordLink = props?.club?.socialLinks?.discord;

      if (menuLoaded.value) {
        if (telegramLink || discordLink) {
          result.push({ type: 'split', title: 'CLUB RESOURCES' });

          if (telegramLink) result.push({
            title: 'telegram',
            url: telegramLink,
            icon: mapSocialToIcon('telegram')
          });

          if (discordLink) result.push({
            title: 'discord',
            url: discordLink,
            icon: mapSocialToIcon('discord')
          });
        }

        const meInClub = props?.club?.meInClub;

        if (meInClub?.isAdmin || meInClub?.isPlatformAdmin) {
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
            }
            // {
            //   title: 'Roles',
            //   toName: 'club-roles',
            //   selected: true
            // },
          );
        }
      }

      return result;
    });


    const isCurrentRoute = (routeName: string) => {
      return $route.name === routeName;
    };

    return {
      isCurrentRoute,
      linksList,
      menuLoaded,
      shortenAddress,
    };
  }
});
</script>
