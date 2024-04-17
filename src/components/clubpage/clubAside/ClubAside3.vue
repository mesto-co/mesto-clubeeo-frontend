<template>
  <div>&nbsp;</div>

  <div
    v-if='!isClubLoading'
    class='aside'
    style='padding: 30px 0'
  >

    <div
      v-if='!discordValidation'
      v-html='club.welcome || clubWelcomeDefault'
    />

    <template v-if='!isLoggedIn'>
      <div
        class='row'
      >
        <div class='col'>
          <login-buttons
            :me-in-club='meInClub'
            :labels='{logInWith: "Log in with"}'
          />
        </div>

        <div class='col-auto q-pl-sm'>
          <q-icon
            :name='undefined'
            size='sm'
            color='grey-6'
          />
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class='row'
      >
        <div class='col'>
          <club-button
            class='full-width q-mb-sm'
            scheme='inverse'
            :disabled='true'
            icon='fa-solid fa-wallet'
            label='Verify wallet'
          />
        </div>

        <div class='col-auto q-pl-sm'>
          <q-icon
            name='fa fa-check'
            size='sm'
            color='grey-6'
          />
        </div>
      </div>
    </template>

    <!--    <div class='q-pb-sm'>steps:</div>-->

    <template v-if='discordValidation'>
      <div
        class='row'
      >
        <div class='col'>
          <discord-validation-btn
            class='full-width q-mb-sm'
            :code='discordValidation'
            :disabled='isLoggedIn ? undefined : true'
          />
        </div>

        <div class='col-auto q-pl-sm'>
          <q-icon
            :name='!isLoggedIn ? stateIcon("locked") : ""'
            size='sm'
            color='grey-6'
          />
        </div>
      </div>
    </template>

    <onborading-tasks-widget
      v-else
    />

  </div>

  <div></div>
</template>

<script lang='ts'>
import { computed, defineComponent, inject } from 'vue';
import { state } from 'src/state';
import { IClubStyle } from 'src/models/clubStyle';
import { useQuasar } from 'quasar';
import ClubButton from 'components/clubpage/ClubButton.vue';
import { useRoute } from 'vue-router';
import DiscordValidationBtn from 'src/apps/DiscordApp/components/DiscordValidationBtn.vue';
import { mapSocialToIcon } from 'src/lib/components/socials';
import LoginButtons from 'components/clubpage/LoginButtons.vue';
import OnboradingTasksWidget from 'components/widgets/OnboradingTasksWidget.vue';

const clubWelcomeDefault = '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

export default defineComponent({
  name: 'ClubAside3',
  components: {
    OnboradingTasksWidget,
    DiscordValidationBtn,
    LoginButtons,
    ClubButton
  },
  emits: ['reload'],
  setup() {
    const $q = useQuasar();
    const $route = useRoute();

    // onMounted(async () => {
    //   await loadPage();
    // });

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

    return {
      club,
      meInClub: state.$club.meInClub,
      isClubLoading: state.$club.isLoading,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      showMetaMask,
      discordValidation,
      mapSocialToIcon,
    };
  }
});
</script>
