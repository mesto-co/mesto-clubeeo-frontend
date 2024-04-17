<template>
  <div
    v-html='data.data'
  />
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    data: Object as PropType<{ data: string }>
  },
});
</script>
