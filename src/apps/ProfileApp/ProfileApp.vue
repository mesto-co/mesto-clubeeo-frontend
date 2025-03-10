<template>
  <profile-app-show v-if="!$route.params.appPage" :app-data="appData" />
  <profile-app-edit v-else-if="$route.params.appPage === 'edit'" :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import ProfileAppShow from './ProfileAppShow.vue';
import ProfileAppEdit from './ProfileAppEdit.vue';

defineComponent({
  components: { ProfileAppShow, ProfileAppEdit },
  props: appProps,
});
</script>
