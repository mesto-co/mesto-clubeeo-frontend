<template>
  <div>&nbsp;</div>

  <div
    v-if='!isClubLoading'
    style='padding: 30px 0'
  >

    <template v-if='!isLoggedIn'>
      <div
        v-html='club.welcome || clubWelcomeDefault'
      />

      <login-buttons
        :meInClub='meInClub'
      />

      <div>Next Steps:</div>

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-telegram-plane'
        label='Verify Telegram'
      />

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-telegram-plane'
        label='Join Telegram'
      />

      <club-button
        class='full-width q-mb-sm'
        scheme='inverse'
        disabled='true'
        icon='fab fa-discord'
        label='Join Discord'
      />

    </template>

    <template v-else-if='isLoggedIn && discordValidation'>
      <discord-validation-btn
        class='full-width q-mb-sm'
        :code='discordValidation'
      />
    </template>

    <template v-else-if='isLoggedIn'>

      <div>Done:</div>
      <div class='q-pb-md'>
        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fa fa-check'
          label='Verify wallet'
        />

        <club-button
          v-if='meInClub.services.tg.loggedIn'
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fa fa-check'
          label='Verify Telegram'
        />
      </div>

      <template v-if='!meInClub.services.tg.loggedIn'>
        <telegram-bot-login-btn
          label='Verify Telegram'
          class='full-width q-mb-sm'
          :telegram-login-bot='meInClub.services.tg.telegramLoginBot'
          :login-code='meInClub.services.tg.telegramLoginCode'
          @click='onTelegramLoginClicked'
        />

        <div>Next Steps:</div>

        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fab fa-discord'
          label='Join Telegram'
        />

        <club-button
          class='full-width q-mb-sm'
          scheme='inverse'
          disabled='true'
          icon='fab fa-discord'
          label='Join Discord'
        />
      </template>

      <template v-else>
        <template v-if='meInClub.services.tg.chatInviteLink && !club.settings.asideDisableTelegram'>
          <club-button
            :href='meInClub.services.tg.chatInviteLink'
            label='Join Telegram'
            class='full-width q-mb-sm'
            icon='fab fa-telegram-plane'
            scheme='inverse'
          />
        </template>

        <template v-if='club.socialLinks.discord && !club.settings.asideDisableDiscord'>
          <club-button
            :href='club.socialLinks.discord'
            class='full-width q-mb-sm'
            scheme='inverse'
            :icon='mapSocialToIcon("discord")'
            label='Join Discord'
          />
        </template>
      </template>

      <template v-if='club.settings.showDashboardLink'>
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

      <template v-if='meInClub.services.tg.loggedIn && club.settings.whitelistButton'>
        <whitelist-button
          :club='club'
        />
      </template>

    </template>

  </div>

  <div></div>
</template>

<script lang='ts'>
import { computed, defineComponent, inject } from 'vue';
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

const clubWelcomeDefault = '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

export default defineComponent({
  name: 'ClubAside2',
  components: {
    LoginButtons,
    WhitelistButton,
    DiscordValidationBtn,
    TelegramBotLoginBtn,
    ClubButton,
  },
  emits: ['reload'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const $route = useRoute();

    const discordValidation = computed(() => $route.query.discordValidation);

    const clubStyle = inject<IClubStyle>('clubStyle');

    const showMetaMask = computed(() => {
      return !$q.platform.is.safari;
    });

    const meInClub = state.$club.meInClub;

    const isLoggedIn = computed(() => {
      if (meInClub.wallets.eth?.loggedIn) return true;
      if (meInClub.wallets.near?.loggedIn) return true;
      return false;
    });

    const club = state.$club.club;

    const onTelegramLoginClicked = () => {
      const interval = setInterval(() => {
        if (meInClub.services.tg?.loggedIn) {
          clearInterval(interval);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (club.settings?.whitelistOnTelegramLogIn) {
            void api.post<{
              clubFormApplication: {
                id: number,
                clubId: number,
                userId: number,
                formType: string,
              }
            }>(`/api/club/${club.id}/applications`, {
              formType: 'whitelist-application'
            });
          }
        } else {
          emit('reload', { reason: 'telegram-await-login' });
          // void onLoad({ background: true });
        }
      }, 1000);
    };

    return {
      club,
      meInClub: state.$club.meInClub,
      isClubLoading: state.$club.isLoading,
      onTelegramLoginClicked,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      showMetaMask,
      discordValidation,
      mapSocialToIcon
    };
  }
});
</script>
