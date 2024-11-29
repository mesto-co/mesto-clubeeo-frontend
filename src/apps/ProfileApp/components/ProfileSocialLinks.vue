<template>
  <template v-if="hasSocialLinks">
    <div class="q-pa-md">
      <div class="text-right q-pb-md">
        Соцсети
        <q-icon name="fa-solid fa-share-nodes" class="q-px-sm" />
      </div>

      <div class="row q-gutter-sm">
        <template v-for="(link, socCode) in filteredSocialLinks" :key="socCode">
          <a :href="formatSocialLink(socCode, link)" target="_blank" class="social-link" rel="noopener noreferrer">
            <q-btn round flat :icon="mapSocialToIcon(socCode)" :title="socCode" />
          </a>
        </template>
      </div>
    </div>
    <q-separator dark inset />
  </template>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  socialLinks: {
    type: Object,
    default: () => ({}),
  },
});

const hasSocialLinks = computed(() => Object.values(props.socialLinks || {}).some((link) => link));

const filteredSocialLinks = computed(() =>
  Object.entries(props.socialLinks || {})
    .filter((entry) => entry[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}),
);

const socialToIconMap = {
  web: 'fa-solid fa-globe',
  telegram: 'fa-brands fa-telegram',
  linkedin: 'fa-brands fa-linkedin',
  twitter: 'fa-brands fa-twitter',
  youtube: 'fa-brands fa-youtube',
  facebook: 'fa-brands fa-facebook',
  tiktok: 'fa-brands fa-tiktok',
  instagram: 'fa-brands fa-instagram',
  discord: 'fa-brands fa-discord',
  reddit: 'fa-brands fa-reddit',
};

const mapSocialToIcon = (code) => socialToIconMap[code];

const formatSocialLink = (platform, link) => {
  if (!link) return '';
  if (link.startsWith('https://')) return link;
  if (link.startsWith('@')) {
    switch (platform) {
      case 'telegram':
        return `https://t.me/${link.substring(1)}`;
      case 'twitter':
        return `https://twitter.com/${link.substring(1)}`;
      case 'instagram':
        return `https://instagram.com/${link.substring(1)}`;
      default:
        return link;
    }
  }
  return `https://${link}`;
};
</script>

<style scoped>
.social-link {
  text-decoration: none;
  color: inherit;
}

.social-link:hover {
  opacity: 0.8;
}
</style>
