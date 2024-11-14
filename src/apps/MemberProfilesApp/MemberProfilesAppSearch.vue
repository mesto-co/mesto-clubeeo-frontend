<template>
  <club-page header="Местные" sticky="bottom" :loading="store.isLoading">
    <!-- Search Input -->
    <div class="q-pa-md">
      <q-input
        v-model="store.searchQuery"
        filled
        dark
        label="Поиск по имени или описанию"
        @keyup.enter="store.searchProfiles"
      >
        <template v-slot:append>
          <q-icon name="search" class="cursor-pointer" @click="store.searchProfiles" />
        </template>
      </q-input>
    </div>

    <!-- Results -->
    <div v-if="store.profiles.length" class="q-pa-md">
      <div v-for="(profile, index) in store.profiles" :key="index" class="q-mb-lg">
        <profile-view
          :to="{
            name: 'club-dynamic-app-page',
            params: { appSlug: appData.appSlug, appPage: 'show' },
            query: { profileId: profile.id },
          }"
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

      <!-- Load More Button -->
      <div v-if="store.hasMore" class="text-center q-mt-md">
        <q-btn
          color="primary"
          :loading="store.isLoading"
          @click="() => store.searchProfiles(true)"
          label="Загрузить еще"
        />
      </div>
    </div>

    <!-- No Results Message -->
    <div v-else-if="!store.isLoading && store.searchQuery && store.hasSearched" class="q-pa-md text-center">
      Ничего не найдено
    </div>
  </club-page>
</template>

<script setup>
import ClubPage from '@components/clublayout/ClubPage.vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';
import { appProps } from '@apps/_common/appProps';
import { useMemberProfileSearchStore } from './memberProfileSearch';
import { onMounted, ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

defineProps(appProps);

const store = useMemberProfileSearchStore();

// Optional: Implement infinite scroll instead of "Load More" button
const target = ref(null);
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && store.hasMore && !store.isLoading) {
    store.searchProfiles(true);
  }
});

onMounted(async () => {
  await store.searchProfiles();
});
</script>
