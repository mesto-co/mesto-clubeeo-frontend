<template>
  <frame-app-main :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import FrameAppMain from './FrameAppMain.vue';

defineComponent({
  components: { FrameAppMain },
  props: appProps,
});
</script>
