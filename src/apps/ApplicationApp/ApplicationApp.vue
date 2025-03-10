<template>
  <application-app-apply v-if="!$route.params.appPage" :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import ApplicationAppApply from './ApplicationAppApply.vue';

defineComponent({
  components: { ApplicationAppApply },
  props: appProps,
});
</script>
