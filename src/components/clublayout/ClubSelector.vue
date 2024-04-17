<template>
  <div>
    <q-scroll-area style='height: calc(100vh - 80px); width: 76px;'>
      <div style='padding: 12px; width: 76px; background-color: rgb(17 17 23); min-height: calc(100vh - 76px);'>

        <q-list style='width: 52px'>
          <!--           <q-item-label header> Club dashboard </q-item-label>-->
          <!--{{clubList}}-->

          <template
            v-for='club in clubs'
            :key='club.slug'
          >

            <q-item
              clickable
              :to='{name: "club-home", params: {clubSlug: club.slug}}'
              :class='{clubButtonActive: isCurrentClub(club.slug)}'
              class='clubSelectorButton'
            >
              <q-avatar style='margin: 2px'>
                <avatar
                  :src='club.style.logoImg || `https://ui-avatars.com/api/?name=${club.name}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'
                  width='48px'
                  height='48px'
                  :name='club.name'
                  :alt='`${club.name} logo`'
                />

                <!--              <q-img-->
                <!--                :src='club.style.logoImg || `https://ui-avatars.com/api/?name=${club.name}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'-->
                <!--                width='48px'-->
                <!--                height='48px'-->
                <!--                ratio='1'-->
                <!--                :alt='`${club.name} logo`'-->
                <!--              />-->
              </q-avatar>
            </q-item>

          </template>
        </q-list>

      </div>
    </q-scroll-area>

    <div style='padding: 12px; width: 76px; background-color: rgb(17 17 23); '>
      <q-list>
        <q-item
          clickable
          class='clubSelectorButton'
          @click='$router.push({name: "club-new"})'
        >
          <q-avatar style='margin: 2px'>
            <q-icon name='fa fa-plus' />
          </q-avatar>
        </q-item>
      </q-list>
    </div>

  </div>

</template>

<style>
.clubSelectorButton {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  padding: 0;
  margin: 0 0 4px;
}
</style>

<script lang='ts'>
import { useRoute, useRouter } from 'vue-router';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import Avatar from 'components/elements/Avatar.vue';
import { errorHasHttpCode } from 'src/lib/axiosErrorHelpers';
import { LocalStorage } from 'quasar';

interface ILoadedClub {
  id: number
  name: string
  slug: string
  style: {
    logoImg: string | null
  }
}

export default defineComponent({
  name: 'ClubSelector',

  components: { Avatar },

  setup() {
    const $route = useRoute();
    const $router = useRouter();

    const isCurrentClub = (clubSlug: string) => {
      return $route.params.clubSlug === clubSlug;
    };

    const clubs = ref<ILoadedClub[]>([]);

    onMounted(async () => {
      try {
        if ($route.query.telegramLoginCode) {
          const telegramLoginCode = $route.query.telegramLoginCode;
          const clubSlug = $route.params.clubSlug;
          const routeName = $route.name;
          // redirect forth-and-back to force reload
          await $router.push({name: 'login'});

          const {data: {ok}} = await api.post<{ok: boolean}>(
            '/api/telegram/auth/code-login', {
              code: telegramLoginCode,
            });

          if (ok) {
            await $router.push({name: routeName || undefined, params: {clubSlug}});
          }
        }

        const result = await api.post<{
          data: {
            clubs: ILoadedClub[]
          }
        }>('/graphql', {
          query: `{
            clubs {
              id
              name
              slug
              style {
                logoImg
              }
            }
          }`
        }, {
          headers: {
            'X-SuppressError': '401'
          }
        });

        clubs.value = result.data.data.clubs;
      } catch (e) {
        console.log(errorHasHttpCode(e, 401));
        LocalStorage.set('afterLoginRoute', {name: $route.name, params: $route.params});
        // await $router.push({name: 'login'});
      }
    });

    return {
      clubs,
      isCurrentClub
    };
  }
});
</script>
