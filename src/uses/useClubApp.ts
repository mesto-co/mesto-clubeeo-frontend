import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import { getClubApp, IGetClubAppResponse } from '@src/api/clubAppApi';

export type TUseClubApp = ReturnType<typeof useClubApp>;

export const useClubApp = () => {
  const $router = useRouter();
  const $route = useRoute();

  const clubSlugRouteParam = computed(() =>
    $route.params?.clubSlug ? String($route.params.clubSlug) : null
  );
  const appSlugRouteParam = computed(() =>
    $route.params?.appSlug ? String($route.params.appSlug) : null
  );

  const clubApp = reactive<IGetClubAppResponse>({
    isMember: true,
    hasAccess: true,
    data: {},
    clubApp: {
      id: '',
      title: '',
    },
  });

  const isLoading = ref(false);
  const isOnceLoaded = ref(false);

  const loadClubApp = async (
    opts: { background?: boolean; clubAppSlug?: string } = {}
  ) => {
    if (isOnceLoaded.value && !opts.background) isLoading.value = true;

    const clubSlug = clubSlugRouteParam.value;
    const clubAppSlug = opts.clubAppSlug || appSlugRouteParam.value;

    if (clubSlug && clubAppSlug) {
      try {
        const response = await getClubApp(clubSlug, clubAppSlug);
        Object.assign(clubApp, response);
        isOnceLoaded.value = true;
      } catch (e) {
        const err = e as { response?: { status: number } };

        if (err.response?.status === 404) {
          await $router.push({ name: 'notFound' });
        }
      }
    }

    isLoading.value = false;
  };

  return {
    clubApp,
    clubSlugRouteParam,
    clubAppSlugRouteParam: appSlugRouteParam,
    isLoading,
    isOnceLoaded,

    getClubApp,
    loadClubApp,
  };
};
