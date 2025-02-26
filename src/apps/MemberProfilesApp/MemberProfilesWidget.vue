<template>
  <scrollable-widget
    title="Новые участники"
    :is-loading="store.isLoading"
    :has-more="store.hasMore"
    @load-more="loadMore"
  >
    <!-- Main content -->
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
          <user-avatar :user-id="member.userId" />
          <div class="text-subtitle1 q-mt-sm name-text">{{ member.name }}</div>
          <div class="text-caption headline-text">{{ member.headline }}</div>
        </q-card-section>
      </q-card>
    </router-link>

    <!-- Footer slot -->
    <template #footer>
      <q-btn
        flat
        color="grey"
        class="q-mt-sm"
        label="все участники сообщества"
        :to="{ name: 'club-dynamic-app', params: { appSlug: 'member-profiles' } }"
      />
    </template>
  </scrollable-widget>
</template>

<script setup>
import { useMemberProfileSearchStore } from './memberProfileSearch';
import { onMounted } from 'vue';
import UserAvatar from '../ProfileApp/components/UserAvatar.vue';
import ScrollableWidget from '../../components/ScrollableWidget.vue';

const store = useMemberProfileSearchStore();

const loadMore = async () => {
  await store.searchProfiles(true, { pageSize: 8 });
};

onMounted(async () => {
  await store.searchProfiles(false, { pageSize: 8 });
});
</script>

<style lang="scss" scoped>
.member-card {
  width: 200px;
  min-height: 180px;
  min-width: 130px;
  background-color: rgb(29, 29, 39);
  box-shadow: none;
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

.q-btn.q-btn--flat {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
