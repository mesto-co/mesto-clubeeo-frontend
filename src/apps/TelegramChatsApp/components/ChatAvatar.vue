<template>
  <q-avatar :size="size">
    <img :src="getAvatarUrl(chatId)" @error="$event.target.src = getFallbackAvatarUrl(chatId)" />
  </q-avatar>
</template>

<script setup>
defineProps({
  chatId: {
    type: [Number, String],
    required: true,
  },
  size: {
    type: String,
    default: '80px',
  },
});

// Generate a consistent avatar URL for each user
const getAvatarUrl = (chatId) => {
  return `/api/telegram/chatAvatar/${chatId}`;
};

const getFallbackAvatarUrl = (id) => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`;
};
</script>
