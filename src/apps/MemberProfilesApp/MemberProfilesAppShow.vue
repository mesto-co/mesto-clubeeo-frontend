<template>
  <club-page header="Профиль участника" sticky="bottom" :loading="isLoading">
    <!-- Profile Content -->
    <div v-if="profile" class="q-pa-md">
      <profile-view :profile="profile" />
    </div>

    <!-- Error Message -->
    <div v-else-if="!isLoading && error" class="q-pa-md text-center">Профиль не найден</div>
  </club-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/boot/axios';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';

const route = useRoute();
const profile = ref(null);
const isLoading = ref(false);
const error = ref(null);

const fetchProfile = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    const profileId = route.query.profileId;
    const result = await api.get(`/api/club/1/apps/member-profiles/member-profiles/profile/${profileId}`);
    profile.value = result.data.data;
  } catch (err) {
    console.error(err);
    error.value = err;
    profile.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>
