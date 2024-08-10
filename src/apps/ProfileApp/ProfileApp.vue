<template>
  <club-page header="Demo profile" sticky="bottom" :loading="false">
    Here's the profile page.
  </club-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { appProps } from '@apps/_common/appProps';

export default defineComponent({
  components: { ClubPage },
  props: appProps,
});
</script>
