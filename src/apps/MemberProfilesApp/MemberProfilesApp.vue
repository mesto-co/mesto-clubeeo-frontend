<template>
  <member-profiles-app-search v-if="!$route.params.appPage" :app-data="appData" />
  <member-profiles-app-show v-else-if="$route.params.appPage === 'show'" :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import MemberProfilesAppShow from './MemberProfilesAppShow.vue';
import MemberProfilesAppSearch from './MemberProfilesAppSearch.vue';

defineComponent({
  components: { MemberProfilesAppSearch, MemberProfilesAppShow },
  props: appProps,
});
</script>
