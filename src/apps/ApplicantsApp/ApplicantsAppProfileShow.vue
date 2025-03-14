<template>
  <div>
    <profile-view v-if="profile" :profile="profile" />

    <q-loading :show="!profile" />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';

defineComponent({
  components: { ProfileView },
});

defineProps({
  profile: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.text-h6 {
  font-size: 1.1rem;
  font-weight: 500;
}

.text-subtitle1 {
  font-size: 1rem;
  opacity: 0.8;
}

.text-caption {
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>
