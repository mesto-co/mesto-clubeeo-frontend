<template>
  <iframe
    :src="appData.publicConfig?.url || 'https://analytics.mesto.co/telegram'"
    class="frame-content"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</template>

<script setup>
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
  height: 100vh;
  border: none;
  background-color: rgb(29 29 39);
}
</style>
