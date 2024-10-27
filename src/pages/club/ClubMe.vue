<template>
  <club-page header="Профиль" :loading="$profile.isLoading">
    <!-- <template v-slot:buttons>
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
    </template> -->

    <profile-view :profile="$profile" />
  </club-page>
</template>

<script setup>
import { defineComponent, onMounted } from 'vue';
import ClubPage from '@components/clublayout/ClubPage.vue';
// import ClubButton from '@components/clubpage/ClubButton.vue';
import { useProfileStore } from 'apps/ProfileApp/profileStore';
import ProfileView from 'apps/ProfileApp/components/ProfileView.vue';

defineComponent({
  components: { ClubPage, ProfileView },
});

const $profile = useProfileStore();

onMounted(async () => {
  await $profile.fetchProfile();
});
</script>
