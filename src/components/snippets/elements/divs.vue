<template>
  <div
    v-for='(item, i) in data.items'
    v-bind:key='i'
  >
    <snippet-renderer
      :data='item'
    />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: Object //as PropType<any>
  },
});
</script>
