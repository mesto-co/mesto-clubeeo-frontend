<template>
  <scrollable-widget title="Telegram чаты" :is-loading="store.isLoading" :has-more="false">
    <!-- Main content -->
    <q-card
      v-for="chat in store.chats"
      :key="chat.id"
      v-ripple
      class="my-box cursor-pointer q-hoverable chat-card"
      dark
    >
      <q-card-section class="text-center">
        <q-avatar size="56px">
          <chat-avatar :chat-id="chat.extId" />
        </q-avatar>
        <div class="text-subtitle1 q-mt-sm name-text">{{ chat.name }}</div>
        <div class="text-caption type-text">
          <q-icon :name="chatTypeIcon(chat)" class="q-mr-xs" />
          {{ chatTypeLabel(chat) }}
        </div>
        <q-btn
          v-if="chat.chatInviteLink"
          color="secondary"
          class="q-mt-sm"
          :href="chat.chatInviteLink"
          target="_blank"
          icon="fas fa-external-link-alt"
          label="Открыть"
          size="sm"
          no-caps
        />
      </q-card-section>
    </q-card>

    <!-- Footer slot -->
    <template #footer>
      <q-btn
        flat
        color="grey"
        class="q-mt-sm"
        label="все чаты"
        :to="{
          name: 'club-dynamic-app',
          params: { appSlug: 'telegram-chats' },
        }"
      />
    </template>
  </scrollable-widget>
</template>

<script setup>
import { onMounted } from 'vue';
// import { defineComponent } from 'vue';
import { useTelegramChatsStore } from './telegramChatsStore';
import ScrollableWidget from '../../components/ScrollableWidget.vue';
import ChatAvatar from './components/ChatAvatar.vue';

// defineComponent({
//   props:
// });

const store = useTelegramChatsStore();

const chatTypeIcon = (chat) => {
  if (chat.isForum) return 'fas fa-comments';
  if (chat.service === 'tg:channel') return 'fas fa-bullhorn';
  return 'fas fa-users';
};

const chatTypeLabel = (chat) => {
  if (chat.isForum) return 'Форум';
  switch (chat.service) {
    case 'tg:channel':
      return 'Канал';
    case 'tg:supergroup':
      return 'Супергруппа';
    case 'tg:group':
      return 'Группа';
    default:
      return 'Чат';
  }
};

onMounted(async () => {
  await store.fetchChats(1, 200);
});
</script>

<style lang="scss" scoped>
.chat-card {
  width: 200px;
  min-height: 180px;
  min-width: 180px;
  background-color: rgb(29, 29, 39);
  box-shadow: none;
}

.name-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 1.5em;
  line-height: 1.5em;
}

.type-text {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 1.5em;
  line-height: 1.5em;
}

.q-btn.q-btn--flat {
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
}
</style>
