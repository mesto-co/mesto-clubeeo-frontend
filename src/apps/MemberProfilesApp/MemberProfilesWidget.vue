<template>
  <h2 class="text-h5 q-mb-md">Новые участники</h2>
  <div class="row no-wrap q-gutter-md scroll" ref="scrollContainer" @scroll="handleScroll">
    <router-link
      v-for="member in store.profiles"
      :key="member.id"
      :to="{
        name: 'club-dynamic-app-page',
        params: { appSlug: 'member-profiles', appPage: 'show' },
        query: { profileId: member.id },
      }"
      class="text-decoration-none"
    >
      <q-card v-ripple class="my-box cursor-pointer q-hoverable member-card" dark>
        <q-card-section class="text-center">
          <q-avatar size="80px">
            <img :src="getAvatarUrl(member.id)" />
          </q-avatar>
          <div class="text-subtitle1 q-mt-sm name-text">{{ member.name }}</div>
          <div class="text-caption headline-text">{{ member.headline }}</div>
        </q-card-section>
      </q-card>
    </router-link>

    <!-- Loading placeholder -->
    <div v-if="store.isLoading" class="text-decoration-none">
      <q-card dark class="my-box member-card loading-card">
        <q-card-section class="text-center">
          <div class="avatar-placeholder">
            <q-spinner-dots color="primary" size="40px" />
          </div>
          <div class="text-placeholder q-mt-sm"></div>
          <div class="text-placeholder text-placeholder--multi"></div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-btn
    flat
    color="grey"
    class="q-mt-sm"
    label="все участники сообщества"
    :to="{ name: 'club-dynamic-app', params: { appSlug: 'member-profiles' } }"
  />
</template>

<script setup>
import { useMemberProfileSearchStore } from './memberProfileSearch';
import { onMounted, ref } from 'vue';

const store = useMemberProfileSearchStore();
const scrollContainer = ref(null);
const isLoadingMore = ref(false);

// Generate a consistent avatar URL for each user
const getAvatarUrl = (id) => {
  return `/api/telegram/user/${id}/avatar`;
};

const handleScroll = async (event) => {
  const container = event.target;
  const scrollWidth = container.scrollWidth;
  const scrollLeft = container.scrollLeft;
  const clientWidth = container.clientWidth;

  // Check if we're near the end (within 100px of the right edge)
  if (!isLoadingMore.value && !store.isLoading && store.hasMore && scrollWidth - (scrollLeft + clientWidth) < 100) {
    isLoadingMore.value = true;
    await store.searchProfiles(true, { pageSize: 8 });
    isLoadingMore.value = false;
  }
};

onMounted(async () => {
  await store.searchProfiles(false, { pageSize: 8 });
});
</script>

<style lang="scss" scoped>
.club-page {
  background-color: rgb(17, 17, 23);
  color: white;
  min-height: 100vh;
}

.scroll {
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.section-container {
  margin: 2rem 0;
}

.q-card {
  width: 200px;
  // background: #1a1a1a;
  background-color: rgb(29, 29, 39);
  // border: 2px solid #2b2e3b;
  box-shadow: none;
}

.event-card {
  min-height: 150px;
  min-width: 160px;
}

.member-card {
  min-height: 180px;
  min-width: 130px;
}

.q-btn.q-btn--flat {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  padding: 0 1rem;
}

.name-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 1.5em;
  line-height: 1.5em;
}

.headline-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 4.5em;
  line-height: 1.5em;
}

.loading-card {
  background-color: rgba(29, 29, 39, 0.7) !important;
  width: 200px !important;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-placeholder {
  height: 1.5em;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  margin: 0 auto;
  width: 70%;

  &:first-of-type {
    margin-top: 0.5rem;
  }

  &--multi {
    height: 4.5em;
    margin-top: 0.25rem;
  }
}
</style>
