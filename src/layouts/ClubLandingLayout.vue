<template>
  <q-layout view='LHr lpR lFr' style='background-color: #1d282b'>

<!--    <q-header bordered class='bg-pool text-white'>-->
<!--      <q-toolbar>-->
<!--&lt;!&ndash;        <q-btn dense flat round icon='menu' @click='toggleLeftDrawer' />&ndash;&gt;-->

<!--        <q-toolbar-title v-if='club'>-->
<!--          <router-link :to='{name: "club", params: {slug: currentClubSlug}}' class='a-no-decoration'>-->
<!--            {{ club.name }}-->
<!--          </router-link>-->

<!--          <q-inner-loading-->
<!--            :showing='isClubLoading'-->
<!--          />-->
<!--        </q-toolbar-title>-->

<!--        <div style='border: 2px solid rgba(255,255,255,0.25); border-radius: 4px; padding: 1px 5px'>-->
<!--          clubeeo-->
<!--        </div>-->

<!--        &lt;!&ndash;        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />&ndash;&gt;-->
<!--      </q-toolbar>-->
<!--    </q-header>-->

<!--    <q-drawer v-model='leftDrawerOpen' side='left' bordered dark width='72'>-->
<!--      &lt;!&ndash;      v-for='i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]' v-bind:key='i'&ndash;&gt;-->

<!--      <div-->
<!--        v-for='club in clubs'-->
<!--        :key='club.id'-->
<!--        class='q-px-sm q-pt-sm'-->
<!--      >-->
<!--        <q-btn-->
<!--          dense-->
<!--          :to='{name: "club", params: {clubSlug: club.slug}}'-->
<!--          :flat='currentClubSlug !== club.slug'-->
<!--          :color='currentClubSlug === club.slug ? "black" : ""'-->
<!--          :disable='currentClubSlug === club.slug'-->
<!--        >-->
<!--          <q-avatar size='48px'>-->
<!--            <img src='https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg'>-->
<!--          </q-avatar>-->

<!--          {{ club.name }}-->
<!--        </q-btn>-->
<!--      </div>-->

<!--      <q-inner-loading-->
<!--        :showing='areClubsLoading'-->
<!--      />-->
<!--    </q-drawer>-->

    <q-drawer v-model='rightDrawerOpen' side='right' behavior='mobile' bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-no-ssr>
      <q-page-container>
        <router-view />

        <q-inner-loading
          :showing='isGlobalLoading'
        />
      </q-page-container>
    </q-no-ssr>

    <!--    <q-footer bordered class="bg-pool text-white">-->
    <!--      <q-toolbar>-->
    <!--        <q-toolbar-title>-->
    <!--&lt;!&ndash;          <q-avatar>&ndash;&gt;-->
    <!--&lt;!&ndash;            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">&ndash;&gt;-->
    <!--&lt;!&ndash;          </q-avatar>&ndash;&gt;-->
    <!--          <div class='q-page flex justify-center items-start q-pa-xs'>-->
    <!--            <div-->
    <!--              style='min-width: 512px'-->
    <!--            >-->
    <!--              <q-tabs-->
    <!--                v-model="tab"-->
    <!--              >-->
    <!--                <q-route-tab :to='{name: "club", params: {slug: currentClubSlug}}' name="mails" icon="fas fa-home" />-->
    <!--                <q-route-tab :to='{name: "club-new-post", params: {slug: currentClubSlug}}' name="movies" icon="add" />-->
    <!--              </q-tabs>-->

    <!--&lt;!&ndash;              <div class='col'>&ndash;&gt;-->
    <!--&lt;!&ndash;                <q-btn&ndash;&gt;-->
    <!--&lt;!&ndash;                  flat dense stack icon='fas fa-home' size='lg'&ndash;&gt;-->
    <!--&lt;!&ndash;                  :to='{name: "club", params: {slug: currentClubSlug}}'&ndash;&gt;-->
    <!--&lt;!&ndash;                />&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--&lt;!&ndash;              <div class='text-right col'>&ndash;&gt;-->
    <!--&lt;!&ndash;                <q-btn&ndash;&gt;-->
    <!--&lt;!&ndash;                  flat dense icon='add' size='lg'&ndash;&gt;-->
    <!--&lt;!&ndash;                  :to='{name: "club-new-post", params: {slug: currentClubSlug}}'&ndash;&gt;-->
    <!--&lt;!&ndash;                />&ndash;&gt;-->
    <!--&lt;!&ndash;              </div>&ndash;&gt;-->
    <!--            </div>-->
    <!--          </div>-->

    <!--          <q-inner-loading-->
    <!--            :showing='isGlobalLoading'-->
    <!--          />-->
    <!--        </q-toolbar-title>-->
    <!--      </q-toolbar>-->
    <!--    </q-footer>-->

  </q-layout>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { state } from '../state';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    // onMounted(async () => {
    //   await state.$clubs.loadClubs();
    // });

    const $route = useRoute();
    const currentClubSlug = computed(() => $route.params.clubSlug);

    return {
      state,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },

      currentClubSlug,

      club: state.$club.club,
      isClubLoading: state.$club.isLoading,

      // clubs: state.$clubs.clubs,
      // areClubsLoading: state.$clubs.isLoading,

      tab: ref('mails'),

      isGlobalLoading: state.$global.isLoading
    };
  }
};
</script>
