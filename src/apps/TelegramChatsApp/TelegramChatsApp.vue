<template>
  <telegram-chats-list :app-data="appData" />
</template>

<script setup>
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import TelegramChatsList from './TelegramChatsList.vue';

defineComponent({
  components: { TelegramChatsList },
  props: appProps,
});
</script>
