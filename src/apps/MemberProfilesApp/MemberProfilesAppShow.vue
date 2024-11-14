<template>
  <club-page
    sticky="top"
    :loading="isLoading"
    :back-link="{ name: 'club-dynamic-app', params: { appSlug: appData.appSlug } }"
  >
    <template #header>Местные <q-icon name="chevron_right" /> {{ profile?.name }}</template>
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
import axios from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ProfileView from '../ProfileApp/components/ProfileView.vue';
import { appProps } from '@apps/_common/appProps';

defineProps(appProps);

const route = useRoute();
const profileId = route.query.profileId;
const isLoading = ref(false);
const error = ref(null);
const profile = ref(null);

const PROFILE_QUERY = gql`
  query Club($slug: String!, $profileId: ID!) {
    club(slug: $slug) {
      memberProfileGet(profileId: $profileId) {
        id
        memberId
        name
        headline
        aboutMe
        location
        projects {
          name
          link
          description
          stage
          status
          logo
          pitchDeck
          videoPitch
          website
          category
          tags
          market
          needs
        }
        socialLinks
        professions
        industries
        skills
        workplaces {
          organization
          position
          startDate
          endDate
          current
          skills
        }
        education {
          institution
          degree
          startYear
          endYear
        }
        communityGoals
        createdAt
        updatedAt
      }
    }
  }
`;

const fetchProfile = async () => {
  try {
    isLoading.value = true;
    const { data } = await axios.post('/graphql', {
      query: print(PROFILE_QUERY),
      variables: {
        slug: 'mesto', // Replace with actual club slug if needed
        profileId,
      },
    });
    profile.value = data.data.club.memberProfileGet;
  } catch (e) {
    error.value = e;
    console.error('Error fetching profile:', e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProfile();
});
</script>
