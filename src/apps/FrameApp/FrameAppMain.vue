<template>
  <club-page sticky="bottom">
    <iframe
      :src="appData.url || 'https://analytics.mesto.co/telegram'"
      class="frame-content"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </club-page>
</template>

<script setup>
import { defineComponent } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';

defineComponent({
  components: { ClubPage },
});

// Define props
defineProps({
  appData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});
</script>

<style scoped>
.frame-content {
  padding: 0;
  margin: 0;
  width: 100%;
  height: calc(100vh - 100px);
  border: none;
  background-color: rgb(29 29 39);
}
</style>
