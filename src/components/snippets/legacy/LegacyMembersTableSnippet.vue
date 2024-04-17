<template>
  <members-table
    :rows='data.rows'
  />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import MembersTable from '../../members/MembersTable.vue';

export default defineComponent({
  components: { MembersTable },
  props: {
    data: {
      type: Object
    }
  }
});
</script>
