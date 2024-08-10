<template>
  <layout-layout>
    <club-selector />
  </layout-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStyleStore } from '@stores/styleStore';
import LayoutLayout from '@src/backbones/LayoutLayout.vue';
import ClubSelector from '@components/clublayout/ClubSelector.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { ClubSelector, LayoutLayout },

  setup() {
    const leftDrawerOpen = ref(false);

    const styleStore = useStyleStore();
    styleStore.provide();

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
