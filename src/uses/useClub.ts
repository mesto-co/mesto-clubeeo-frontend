import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import { getClub, IClub, IMeInClub } from 'src/api/clubApi';

export type TUseClub = ReturnType<typeof useClub>;

export const useClub = () => {
  const $router = useRouter();
  const $route = useRoute();

  const clubSlugRouteParam = computed(() => $route.params.clubSlug ? String($route.params.clubSlug) : null);

  const club = reactive<IClub>({
    id: 0,
    slug: '',
    name: '',
    description: '',
    welcome: '',
    website: '',
    buyLinks: {},
    socialLinks: {},
    style: {
      color: '',
      textColor: '',
      primaryColor: '',
      primaryTextColor: '',
      socialColor: '',
      socialTextColor: '',
      heroImg: '',
      logoImg: '',
    },
    settings: {
    }
  });

  const meInClub = reactive<IMeInClub>({
    isMember: null,
    services: {},
    wallets: {},
  });

  const pushToClubRoot = async () => {
    await $router.push({name: 'club', params: {clubSlug: clubSlugRouteParam.value}});
  }

  const isLoading = ref(false);
  const isOnceLoaded = ref(false);

  const loadClub = async (opts: {background?: boolean} = {}) => {
    if (isOnceLoaded.value && !opts.background) isLoading.value = true;

    const clubSlug = clubSlugRouteParam.value;
    if (clubSlug) {
      try {
        const response = await getClub(clubSlug);
        Object.assign(club, response.club);
        Object.assign(meInClub, response.me);
        isOnceLoaded.value = true;
      } catch (e) {
        const err = e as {response?: {status: number}};

        if (err.response?.status === 404) {
          await $router.push({name: 'notFound'});
        }
      }
    }

    isLoading.value = false;
  }

  return {
    club,
    meInClub,
    clubSlugRouteParam,
    isLoading,
    isOnceLoaded,

    pushToClubRoot,

    getClub,
    loadClub,
  }
}
