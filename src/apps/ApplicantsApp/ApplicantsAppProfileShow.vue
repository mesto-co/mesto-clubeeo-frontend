<template>
  <div>
    <profile-view v-if="profile" :profile="profile" />

    <!-- Add the application details component -->
    <application-details v-if="profile?.memberId" :member-id="profile.memberId" :can-manage="hasAdminRole" />

    <q-loading :show="!profile" />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';
import ApplicationDetails from './components/ApplicationDetails.vue';

defineComponent({
  components: { ProfileView, ApplicationDetails },
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
