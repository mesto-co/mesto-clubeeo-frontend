<template>
  <club-button
    label='Login to Telegram'
    scheme='inverse'
    icon='fab fa-telegram-plane'
    :href='telegramLoginUrl'
  />
</template>

<script lang='js'>
/* eslint-disable */

// source https://github.com/vchaptsev/vue-telegram-login/blob/master/src/vue-telegram-login.vue
// MIT license https://github.com/vchaptsev/vue-telegram-login/blob/master/LICENSE

import ClubButton from '../clubpage/ClubButton';
import { computed, ref } from 'vue';
export default {
  name: 'telegram-bot-login-btn',
  components: { ClubButton },
  props: {
    telegramLoginBot: {
      type: String,
      required: true,
      validator (value) { return value.endsWith('bot') || value.endsWith('Bot') }
    },
    loginCode: {
      type: String,
      required: true,
      validator (value) { return value.length > 0 }
    },
  },
  // emits: ['click'],
  // methods: {
  //   onTelegramAuth (user) {
  //     this.$emit('callback', user)
  //   }
  // },
  setup (props) {
    const telegramLoginUrl = computed(() => {
      return `https://t.me/${props.telegramLoginBot}?start=${props.loginCode}`;
    });

    const buttonRecentlyClicked = ref(false);

    const onClick = () => {
      // buttonRecentlyClicked.value = true;
    }

    return {
      telegramLoginUrl,
      onClick,
      buttonRecentlyClicked,
    }
  }
}
</script>
