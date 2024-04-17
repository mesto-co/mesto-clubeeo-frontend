<template>

  <h2 class='col-12 text-center q-pa-md q-pt-xl' v-if='data.h2 !== false'>
    <q-btn
      :size='data.size || "xl"'
      outline
      no-caps
      :style="data.size || ['border-radius: 8px', 'font-size: 3.5rem', 'padding: 1rem 3rem']"
      type='a'
      :href='data.url'
      :label='data.label'
      target='_blank'
    />
  </h2>

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
