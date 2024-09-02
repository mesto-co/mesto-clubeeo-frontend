<template>
  <applicants-app-list :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import ApplicantsAppList from './ApplicantsAppList.vue';

defineComponent({
  components: { ApplicantsAppList },
  props: appProps,
});
</script>
