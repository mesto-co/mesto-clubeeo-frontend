<template>
  <club-button
    label="Validate Discord"
    scheme="inverse"
    icon="fab fa-discord"
    @click="onValidateClick"
  />
</template>

<script lang="ts">
/* eslint-disable */

// source https://github.com/vchaptsev/vue-telegram-login/blob/master/src/vue-telegram-login.vue
// MIT license https://github.com/vchaptsev/vue-telegram-login/blob/master/LICENSE

import { api } from 'boot/axios';
import ClubButton from '@components/clubpage/ClubButton.vue';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'discord-validation-btn',
  components: { ClubButton },
  props: {
    code: {
      type: String,
      required: true,
      validator(value: string) {
        return value.length > 0;
      },
    },
  },
  setup(props: { code: string }) {
    const $router = useRouter();

    const onValidateClick = async () => {
      const {
        data: { ok, isMember },
      } = await api.post<{ ok: boolean; isMember: boolean }>(
        '/api/apps/discord/validate-user',
        {
          code: props.code,
        }
      );

      if (ok) {
        await $router.push('');

        if (isMember) {
          Notify.create({
            type: 'positive',
            message: 'Your account and membership are validated',
          });
        } else {
          Notify.create({
            type: 'positive',
            message: 'Your account is validated',
          });
        }
      }
    };

    return {
      onValidateClick,
    };
  },
});
</script>
