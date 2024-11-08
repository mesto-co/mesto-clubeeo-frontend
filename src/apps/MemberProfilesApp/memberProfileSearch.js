import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from 'src/boot/axios';

export const useMemberProfileSearchStore = defineStore('memberProfileSearch', () => {
  const searchQuery = ref('');
  const profiles = ref([]);
  const isLoading = ref(false);
  const hasSearched = ref(false);

  const searchProfiles = async () => {
    // if (!searchQuery.value) {
    //   profiles.value = [];
    //   return;
    // }

    isLoading.value = true;
    hasSearched.value = true;
    try {
      const result = await api.get('/api/club/1/apps/member-profiles/member-profiles/search?show_default=new', {
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

  return {
    searchQuery,
    profiles,
    isLoading,
    hasSearched,
    searchProfiles,
  };
});
