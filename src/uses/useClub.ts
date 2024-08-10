import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, ref } from 'vue';
import { getClub, IClub, IMeInClub } from '@src/api/clubApi';
import { useSessionStore } from '@stores/sessionStore';
import { Notify } from 'quasar';
import { api } from '@src/boot/axios';

export type TUseClub = ReturnType<typeof useClub>;

export const useClub = () => {
  const $router = useRouter();
  const $route = useRoute();
  const $sessionStorage = useSessionStore();

  const clubSlugRouteParam = computed(() =>
    $route.params.clubSlug
      ? String($route.params.clubSlug)
      : $route.meta?.clubSlug
      ? String($route.meta.clubSlug)
      : null
  );

  const club = reactive<IClub>({
    id: '',
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
    settings: {},
  });

  const meInClub = reactive<IMeInClub>({
    isMember: null,
    isLoggedIn: null,
    services: {},
    wallets: {},
    mainWallet: {},
  });

  const pushToClubRoot = async () => {
    await $router.push({
      name: 'club',
      params: { clubSlug: clubSlugRouteParam.value },
    });
  };

  const isLoading = ref(false);
  const isOnceLoaded = ref(false);

  const loadClub = async (
    opts: { background?: boolean; redirect404?: boolean } = {}
  ) => {
    try {
      if (!opts.background) isLoading.value = true;

      const clubSlug = clubSlugRouteParam.value;
      if (clubSlug) {
        try {
          const response = await getClub(clubSlug, {
            session: JSON.stringify($sessionStorage.sessionData),
          });
          Object.assign(club, response.club);
          Object.assign(meInClub, response.me);
          isOnceLoaded.value = true;
        } catch (e) {
          const err = e as { response?: { status: number } };

          const redirect404 =
            opts.redirect404 || opts.redirect404 === undefined;
          if (err.response?.status === 404 && redirect404) {
            await $router.push({ name: 'notFound' });
          }
        }
      }
    } catch (e) {
      const err = e as { message: string };
      Notify.create({
        type: 'negative',
        message: String(err.message || 'error'),
      });
    } finally {
      isLoading.value = false;
    }
  };

  async function loginWithCode(
    service: 'tg' | string,
    code: string
  ): Promise<{ ok: boolean }> {
    try {
      if (service === 'tg') {
        const result = await api.post<{ ok: boolean }>(
          '/api/telegram/auth/code-login',
          {
            code,
          }
        );
        return result.data;
      } else {
        throw new Error(`Unsupported service: ${service}`);
      }
    } catch (e) {
      const err = e as { message: string };
      console.error(err);
      Notify.create({
        type: 'negative',
        message: String(err.message || 'error'),
      });
    }
    return { ok: false };
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
    loginWithCode,
  };
};
