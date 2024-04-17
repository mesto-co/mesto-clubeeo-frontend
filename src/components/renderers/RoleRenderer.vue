<template>
  <q-badge
    class='q-mr-sm'
  >{{ role.name }}</q-badge>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RoleRenderer',
  props: {
    role: Object as PropType<{ name: string }>
  }
});
</script>
