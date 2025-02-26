<template>
  <club-page sticky="bottom" :loading="store.isLoading">
    <div v-for="chat in store.chats" :key="chat.id" class="q-mb-md">
      <q-card dark flat class="chat-card">
        <div class="row items-center full-height">
          <!-- Avatar and Info Section -->
          <div class="col-grow row items-center q-pa-md">
            <div class="col-auto">
              <chat-avatar :chat-id="chat.extId" size="56px" />
            </div>
            <div class="col q-ml-md">
              <div class="text-h6">{{ chat.name }}</div>
              <div class="text-caption">
                <q-icon :name="chatTypeIcon(chat)" class="q-mr-xs" />
                {{ chatTypeLabel(chat) }}
              </div>
            </div>
          </div>

          <!-- Join Button Section -->
          <div class="col-auto q-pa-sm" style="min-width: 160px">
            <q-btn
              v-if="chat.chatInviteLink"
              flat
              :href="chat.chatInviteLink"
              target="_blank"
              icon="fas fa-external-link-alt"
              label="открыть"
              class="full-width"
              no-caps
              size="sm"
            />
          </div>
        </div>
      </q-card>
    </div>
  </club-page>
</template>

<script setup>
import { onMounted } from 'vue';
import { defineComponent } from 'vue';
import { appProps } from '@apps/_common/appProps';
import { useTelegramChatsStore } from './telegramChatsStore';
import ClubPage from '@components/clublayout/ClubPage.vue';
import ChatAvatar from './components/ChatAvatar.vue';

defineComponent({
  props: appProps,
});

const props = defineProps(appProps);
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
  await store.fetchChats(props.appData.clubId);
});
</script>

<style lang="scss" scoped>
.chat-card {
  background-color: rgb(29, 29, 39);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
}

.full-height {
  min-height: 88px;
}
</style>
