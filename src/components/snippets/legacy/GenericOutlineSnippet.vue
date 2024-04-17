<template>

  <q-btn
    :size='data.size || "md"'
    outline
    no-caps
    :style="data.size || ['border-radius: 8px']"
    type='a'
    :href='data.url'
    :label='data.label'
    target='_blank'
  />

</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    data: {
      type: Object
    }
  }
});
</script>
