import { State } from 'src/state';
import { computed } from 'vue';

export const useGlobalState = (state: State) => {
  const isLoading = computed(() => {
    return state.$club.isLoading.value ||
      state.$clubs.isLoading.value ||
      state.$post.isCreating.value ||
      state.$posts.isLoading.value
  })

  return {
    isLoading,
  }
}
