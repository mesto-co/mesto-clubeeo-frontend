import { ref } from 'vue';
import { getClubs, IIndexedClub } from '@src/api/clubsApi';

export type TUseClubs = ReturnType<typeof useClubs>;

export const useClubs = () => {
  const clubs = ref<IIndexedClub[]>([]);

  const isLoading = ref(false);
  const isOnceLoaded = ref(false);

  const loadClubs = async () => {
    isLoading.value = true;

    const response = await getClubs();
    clubs.value = response.clubs;
    isOnceLoaded.value = true;

    isLoading.value = false;
  };

  return {
    clubs,
    isLoading,
    isOnceLoaded,

    getClubs,
    loadClubs,
  };
};
