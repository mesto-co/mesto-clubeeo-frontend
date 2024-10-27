<template>
  <club-page header="Профиль" sticky="bottom" :loading="$profile.isLoading">
    <template v-slot:buttons>
      <div>
        <club-button
          class="clubButtonActive q-px-md q-mr-sm"
          dense
          @click="
            $router.push({
              name: 'club-dynamic-app-page',
              params: { appPage: 'edit' },
            })
          "
          >Редактировать</club-button
        >
      </div>
    </template>

    <profile-view :profile="$profile" />
  </club-page>
</template>

<script setup>
import { defineComponent, onMounted } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { appProps } from '@apps/_common/appProps';
import { useProfileStore } from './profileStore';
import ProfileView from './components/ProfileView.vue';

defineComponent({
  components: { ClubPage, ClubButton, ProfileView },
  props: appProps,
});

const $profile = useProfileStore();

onMounted(async () => {
  await $profile.fetchProfile();
});
</script>
