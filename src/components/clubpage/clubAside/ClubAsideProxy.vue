<template>
  <club-aside2 v-if="asideComponent === 'club-aside-2'" />

  <club-aside3 v-else-if="asideComponent === 'club-aside-3'" />

  <club-aside v-else-if="asideComponent === 'club-aside'" />

  <club-aside-tg v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClubAside from 'components/clubpage/clubAside/ClubAside.vue';
import ClubAside2 from 'components/clubpage/clubAside/ClubAside2.vue';
import ClubAside3 from 'components/clubpage/clubAside/ClubAside3.vue';
import ClubAsideTg from 'components/clubpage/clubAside/ClubAsideTg.vue';

export default defineComponent({
  name: 'ClubAsideProxy',
  components: {
    ClubAside,
    ClubAside2,
    ClubAside3,
    ClubAsideTg,
  },
  props: {
    asideComponent: {
      type: String,
      default: 'club-aside-tg',
    },
  },
});
</script>
