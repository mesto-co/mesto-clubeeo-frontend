<template>

  <q-table
    :rows='data.rows'
    :columns='data.columns'
    row-key='id'
    hide-bottom
    dark flat
    style='background-color: rgb(29 29 39);'
    :pagination='defaultPagination'
    :rows-per-page-options='[20, 50, 200]'
  >

  </q-table>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { defaultPagination } from 'src/lib/components/table';

export default defineComponent({
  components: { }, // components: { CardRenderer }
  props: {
    data: {
      type: Object //as Record<string, string>
    }
  },
  setup() {
    return {
      defaultPagination,
    }
  }
});
</script>
