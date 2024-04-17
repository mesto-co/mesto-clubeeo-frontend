<template>
  <div>

    <div class='flex'>
      <template v-for='badge of badges' v-bind:key='badge.name'>
        <badge
          size='48px'
          class='q-mt-md'
          :badge='badge'
          :showName='false'
        />
      </template>
    </div>

  </div>

  <div style='padding: 30px 0' v-if='!isClubLoading'>
    <template v-if='!isLoggedIn'>
      <div
        v-html='club.welcome || clubWelcomeDefault'
      />

      <login-buttons
        :meInClub='meInClub'
      />
    </template>

    <template v-else-if='!meInClub.services.tg.loggedIn'>
      <!--          <telegram-login-->
      <!--            mode='callback'-->
      <!--            :telegram-login='meInClub.services.tg.telegramLoginBot'-->
      <!--            :request-access='write'-->
      <!--            :radius='8'-->
      <!--            @callback='telegramAuthCallback'-->
      <!--          />-->

      <telegram-bot-login-btn
        class='full-width q-mb-sm'
        :telegram-login-bot='meInClub.services.tg.telegramLoginBot'
        :login-code='meInClub.services.tg.telegramLoginCode'
        @click='onTelegramLoginClicked'
      />
    </template>

    <template v-else-if='meInClub.services.tg.chatInviteLink && !club.settings.asideDisableTelegram'>
      <club-button
        :href='meInClub.services.tg.chatInviteLink'
        label='Join Telegram'
        class='full-width q-mb-sm'
        icon='fab fa-telegram-plane'
        scheme='inverse'
      />
      <!--      :label='`${club.name || club.slug} in Telegram`'-->
    </template>

    <template v-if='isLoggedIn && discordValidation'>
      <discord-validation-btn
        class='full-width q-mb-sm'
        :code='discordValidation'
      />
    </template>
    <template
      v-else-if='isLoggedIn && !discordValidation && club.socialLinks.discord && !club.settings.asideDisableDiscord'>
      <club-button
        :href='club.socialLinks.discord'
        class='full-width q-mb-sm'
        scheme='inverse'
        :icon='mapSocialToIcon("discord")'
        label='Join Discord'
      />
      <!--        :label='`${club.name || club.slug} in Discord`'-->
      <!--      />-->
    </template>

    <template v-if='isLoggedIn && club.settings.showDashboardLink'>
      <club-button
        :to='{name: "club-home"}'
        class='full-width q-mb-sm'
        scheme='inverse'
      >
        <q-img
          src='/icons/Fav-Icon-Black.png' width='24px' height='24px'
          class='q-mr-sm'
        />
        {{ `${club.name || club.slug} club` }}
      </club-button>
    </template>

    <template v-if='isLoggedIn && meInClub.services.tg.loggedIn && club.settings.whitelistButton'>
      <whitelist-button
        :club='club'
      />
    </template>
  </div>

  <div
    v-if="!isClubLoading"
    class='q-pb-md'
  >

    <me-in-club-widget
      v-if='!club.settings.asideHideMe && meInClubStore.data.loggedIn'
      :me-in-club='meInClubStore.data'
      class='full-width'
      @click='meInClubMenuShowing = true'
    >
      <q-btn
        icon='fa-solid fa-caret-up'
        size='sm'
        dense flat
      >

        <q-menu v-model="meInClubMenuShowing">

          <q-list dense style='min-width: 100px'>
<!--            <q-separator />-->
            <q-item clickable v-close-popup>
              <q-item-section
                @click='onLogOut'
              >Log out</q-item-section>
            </q-item>
          </q-list>

        </q-menu>
      </q-btn>
    </me-in-club-widget>

  </div>

  <q-inner-loading
    :showing='isClubLoading'
    dark
  />

</template>

<script lang='ts'>
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import { api } from 'boot/axios';
import { state } from 'src/state';
import { IClubStyle } from 'src/models/clubStyle';
import { useQuasar } from 'quasar';
import ClubButton from 'components/clubpage/ClubButton.vue';
import TelegramBotLoginBtn from 'components/telegram/TelegramBotLoginBtn.vue';
import { useRoute } from 'vue-router';
import DiscordValidationBtn from 'src/apps/DiscordApp/components/DiscordValidationBtn.vue';
import { mapSocialToIcon } from 'src/lib/components/socials';
import WhitelistButton from 'components/clubpage/WhitelistButton.vue';
import LoginButtons from 'components/clubpage/LoginButtons.vue';
import MeInClubWidget from 'components/me/MeInClubWidget.vue';
import { useMeInClubStore } from 'stores/meInClubStore';
import Badge from 'components/clubpage/Badge.vue';
import { useLogout } from 'src/uses/useLogout';

const clubWelcomeDefault = '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

interface ITelegramUser {
  auth_date: number,
  hash: string,
  id: number,
  first_name: string,
  last_name: string,
  photo_url: string,
  username: string,
}

export default defineComponent({
  name: 'ClubAside',
  components: {
    Badge,
    MeInClubWidget,
    LoginButtons,
    WhitelistButton,
    DiscordValidationBtn,
    TelegramBotLoginBtn,
    ClubButton
  },
  emits: ['reload'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const $route = useRoute();
    const meInClub = state.$club.meInClub;
    const meInClubStore = useMeInClubStore();
    const clubStyle = inject<IClubStyle>('clubStyle');

    const discordValidation = computed(() => $route.query.discordValidation);

    const telegramAuthCallback = async (user: ITelegramUser) => {
      const result = await api.post<{ ok: boolean }>('/api/telegram/auth/login', user);

      if (result.data.ok) {
        await state.$club.loadClub();
      } else {
        // todo: popup error
      }
    };

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    const isMobileSafari = computed(() => {
      return $q.platform.is.mobile && $q.platform.is.safari;
    });


    const isLoggedIn = computed(() => {
      if (meInClub.wallets.eth?.loggedIn) return true;
      if (meInClub.wallets.near?.loggedIn) return true;
      return false;
    });

    const onTelegramLoginClicked = () => {
      const interval = setInterval(() => {
        if (meInClub.services.tg?.loggedIn) {
          clearInterval(interval);
        } else {
          emit('reload', { reason: 'telegram-await-login' });
          // void onLoad({ background: true });
        }
      }, 1000);
    };

    onMounted(async () => {
      await meInClubStore.loadByRoute();
    });
    watch(
      state.$club.isLoading,
      async (isLoading) => {
        if (!isLoading) {
          await meInClubStore.loadByRoute();
        }
      }
    )

    const $logout = useLogout();

    const onLogOut = async () => {
      await $logout.logout();

      emit('reload', { reason: 'logged-out' });
    }

    const meInClubMenuShowing = ref(false);

    const badges = computed(() => state.$club.club?.settings?.badges || []);

    return {
      club: state.$club.club,
      meInClub: state.$club.meInClub,
      meInClubStore,
      isClubLoading: computed(() => state.$club.isLoading.value || !state.$club.isOnceLoaded.value),
      telegramAuthCallback,
      onTelegramLoginClicked,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      showMetaMask,
      discordValidation,
      isMobileSafari,
      mapSocialToIcon,
      onLogOut,
      meInClubMenuShowing,
      badges,
    };
  }
});
</script>
