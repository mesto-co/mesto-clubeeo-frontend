<template>
  <club-aside2 v-if="asideComponent === 'club-aside-2'" />

  <club-aside3 v-else-if="asideComponent === 'club-aside-3'" />

  <club-aside v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClubAside from 'components/clubpage/clubAside/ClubAside.vue';
import ClubAside2 from 'components/clubpage/clubAside/ClubAside2.vue';
import ClubAside3 from 'components/clubpage/clubAside/ClubAside3.vue';

export default defineComponent({
  name: 'ClubAsideProxy',
  components: {
    ClubAside,
    ClubAside2,
    ClubAside3,
  },
  props: {
    asideComponent: {
      type: String,
      default: 'club-aside',
    },
  },
});
</script>
