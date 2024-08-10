<template>
  <template v-for="(taskStep, i) in onboardingTask.steps" v-bind:key="i">
    <div v-if="taskStep.type === 'telegram:join'">
      <div class="row">
        <div class="col">
          <club-button
            class="full-width q-mb-sm"
            scheme="inverse"
            :disabled="taskStep.state === 'available' ? undefined : true"
            icon="fab fa-telegram-plane"
            :label="taskStep.label"
            :href="taskStep.link"
          />
        </div>

        <div class="col-auto q-pl-sm">
          <q-icon :name="stateIcon(taskStep.state)" size="sm" color="grey-6" />
        </div>
      </div>
    </div>

    <div v-else-if="taskStep.type === 'telegram:verify'">
      <div class="row">
        <div class="col">
          <telegram-bot-login-btn
            :label="taskStep.label || 'verify Telegram'"
            class="full-width q-mb-sm"
            :disabled="taskStep.state === 'available' ? undefined : true"
            :telegram-login-bot="meInClub.services.tg.telegramLoginBot"
            :login-code="meInClub.services.tg.telegramLoginCode"
          />
        </div>

        <div class="col-auto q-pl-sm">
          <q-icon :name="stateIcon(taskStep.state)" size="sm" color="grey-6" />
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <div class="col">
          <club-button
            class="full-width"
            scheme="inverse"
            :disabled="taskStep.state === 'available' ? undefined : true"
            :icon="taskStep.icon"
            :label="taskStep.label"
            :href="taskStep.link"
          />
        </div>

        <div class="col-auto q-pl-sm">
          <q-icon :name="stateIcon(taskStep.state)" size="sm" color="grey-6" />
        </div>
      </div>
    </div>
  </template>

  <div v-if="onboardingTask.completed" class="q-pt-md text-center">
    all tasks completed
    <q-icon
      name="fa-solid fa-check-double"
      size="sm"
      color="grey-6"
      class="q-pl-sm"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import { state } from '@src/state';
import { IClubStyle } from '@src/models/clubStyle';
import ClubButton from '@components/clubpage/ClubButton.vue';
import TelegramBotLoginBtn from '@components/telegram/TelegramBotLoginBtn.vue';
import { mapSocialToIcon } from '@src/lib/components/socials';
import axios from 'axios';
import Timeout = NodeJS.Timeout;

const clubWelcomeDefault =
  '<h2>Welcome to the club</h2><p>Please, log in using a wallet with NFT community pass</p>';

export default defineComponent({
  components: {
    TelegramBotLoginBtn,
    ClubButton,
  },
  props: {
    // locator: {
    //   type: Array
    // }
  },
  setup() {
    onMounted(async () => {
      await loadPage();
    });

    const clubStyle = inject<IClubStyle>('clubStyle');

    const meInClub = state.$club.meInClub;

    const isLoggedIn = computed(() => {
      if (meInClub.wallets.eth?.loggedIn) return true;
      if (meInClub.wallets.near?.loggedIn) return true;
      return false;
    });

    const club = state.$club.club;

    let interval: Timeout;
    const checkTaskUpdates = () => {
      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        if (onboardingTask.value.completed) {
          clearInterval(interval);
        } else {
          if (document.hasFocus()) {
            void loadPage();
          }
          // emit('reload', { reason: 'telegram-await-login' });
        }
      }, 1000);
    };

    const onboardingTask = ref<{
      completed: boolean;
      steps: Array<
        | {
            type: 'telegram:join' | 'typeform:complete';
            clubExtId: number;
            label: string;
            state: 'available' | 'locked' | 'completed';
            link: string;
          }
        | {
            type: 'wallet:verify';
            chain: 'eth';
          }
      >;
    }>({
      completed: false,
      steps: [],
    });

    const loadPage = async () => {
      const result = await axios.get<{
        widgetLocator: string;
        view: {
          type: 'onboarding-tasks';
          completed: boolean;
          steps: Array<
            | {
                type: 'telegram:join' | 'typeform:complete';
                clubExtId: number;
                label: string;
                state: 'available' | 'locked' | 'completed';
                link: string;
              }
            | {
                type: 'wallet:verify';
                chain: 'eth';
              }
          >;
        };
      }>(`/api/club/${club.slug}/widget/onboarding-task:root`);

      checkTaskUpdates();

      onboardingTask.value = result.data.view;
    };

    const stateIcon = (state: string) => {
      if (state === 'locked') return 'fa-solid fa-lock';
      if (state === 'completed') return 'fa fa-check';
    };

    watch(state.$club.meInClub, loadPage);

    return {
      meInClub: state.$club.meInClub,
      isLoggedIn,
      clubWelcomeDefault,
      clubStyle,
      mapSocialToIcon,
      onboardingTask,
      stateIcon,
    };
  },
});
</script>
