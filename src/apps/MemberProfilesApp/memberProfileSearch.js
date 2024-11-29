import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import gql from 'graphql-tag';
import { print } from 'graphql';

export const useMemberProfileSearchStore = defineStore('memberProfileSearch', () => {
  const searchQuery = ref('');
  const profiles = ref([]);
  const isLoading = ref(false);
  const hasSearched = ref(false);
  const currentPage = ref(1);
  const hasMore = ref(false);

  const SEARCH_PROFILES = gql`
    query SearchProfiles($slug: String!, $query: String!, $pagination: PaginationInput) {
      club(slug: $slug) {
        memberProfileSearch(query: $query, pagination: $pagination) {
          items {
            id
            memberId
            name
            headline
            aboutMe
            location
            socialLinks
            professions
            industries
            skills
          }
          total
          page
          pageSize
          hasMore
        }
      }
    }
  `;

  const searchProfiles = async (loadMore = false) => {
    loadMore = false;
    if (loadMore) {
      currentPage.value++;
    } else {
      currentPage.value = 1;
      profiles.value = [];
    }

    isLoading.value = true;
    hasSearched.value = true;

    try {
      const { data } = await axios.post('/graphql', {
        query: print(SEARCH_PROFILES),
        variables: {
          slug: 'mesto',
          query: searchQuery.value,
          pagination: {
            page: currentPage.value,
            pageSize: 20,
          },
        },
      });

      const result = data.data.club.memberProfileSearch;
      hasMore.value = result.hasMore;

      if (loadMore) {
        profiles.value = [...profiles.value, ...result.items];
      } else {
        profiles.value = result.items;
      }
    } catch (error) {
      console.error(error);
      profiles.value = loadMore ? profiles.value : [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    searchQuery,
    profiles,
    isLoading,
    hasSearched,
    hasMore,
    searchProfiles,
  };
});
