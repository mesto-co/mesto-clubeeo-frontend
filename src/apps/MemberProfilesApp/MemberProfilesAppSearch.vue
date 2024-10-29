<template>
  <club-page header="Поиск участников" sticky="bottom" :loading="isLoading">
    <!-- Search Input -->
    <div class="q-pa-md">
      <q-input v-model="searchQuery" filled dark label="Поиск по имени или описанию" @keyup.enter="searchProfiles">
        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" @click="searchProfiles" />
        </template>
      </q-input>
    </div>

    <!-- Results -->
    <div v-if="profiles.length" class="q-pa-md">
      <div v-for="(profile, index) in profiles" :key="index" class="q-mb-lg">
        <profile-view
          :profile="profile"
          :show-about-me="true"
          :show-professions="true"
          :show-industries="true"
          :show-skills="false"
          :show-experience="false"
          :show-education="false"
          :show-projects="false"
        />
        <q-separator dark class="q-my-md" />
      </div>
    </div>

    <!-- No Results Message -->
    <div v-else-if="!isLoading && searchQuery && hasSearched" class="q-pa-md text-center">Ничего не найдено</div>
  </club-page>
</template>

<script setup>
import { ref } from 'vue';
import { api } from 'src/boot/axios';
// import { useDebounceFn } from '@vueuse/core';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';

const searchQuery = ref('');
const profiles = ref([]);
const isLoading = ref(false);
const hasSearched = ref(false);

const searchProfiles = async () => {
  if (!searchQuery.value) {
    profiles.value = [];
    return;
  }

  isLoading.value = true;
  hasSearched.value = true;
  try {
    const result = await api.get('/api/club/1/apps/member-profiles/member-profiles/search', {
      params: { q: searchQuery.value },
    });
    profiles.value = result.data.data;
  } catch (error) {
    console.error(error);
    profiles.value = [];
  } finally {
    isLoading.value = false;
  }
};

// const debouncedSearch = useDebounceFn(searchProfiles, 300);
</script>
