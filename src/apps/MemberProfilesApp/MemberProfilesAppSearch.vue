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
import { onMounted } from 'vue';

defineProps(appProps);

onMounted(async () => {
  await store.searchProfiles();
});

const store = useMemberProfileSearchStore();
</script>
