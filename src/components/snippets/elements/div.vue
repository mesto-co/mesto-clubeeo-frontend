<template>
  <div>
    <snippet-renderer
      :data='data.slot'
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
