<template>
  {{ meInClub }}

  {{ club }}
</template>

<script lang='ts'>


import { defineComponent, onMounted } from 'vue';
import { state } from 'src/state';

export default defineComponent({
  setup() {
    const onLoad = async () => {
      if (state.$club.clubSlugRouteParam.value) {
        await state.$club.loadClub();
      }
    };

    onMounted(onLoad);

    return {
      club: state.$club.club,
      meInClub: state.$club.meInClub,
    }
  }
});
</script>
