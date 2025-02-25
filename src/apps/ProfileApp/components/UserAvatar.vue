<template>
  <q-avatar :size="size">
    <img :src="getAvatarUrl(userId)" @error="$event.target.src = getFallbackAvatarUrl(userId)" />
  </q-avatar>
</template>

<script setup>
defineProps({
  userId: {
    type: [Number, String],
    required: true,
  },
  size: {
    type: String,
    default: '80px',
  },
});

// Generate a consistent avatar URL for each user
const getAvatarUrl = (userId) => {
  return `/api/telegram/user/${userId}/avatar`;
};

const getFallbackAvatarUrl = (id) => {
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`;
};
</script>
