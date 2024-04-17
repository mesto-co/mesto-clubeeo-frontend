<template>
  <template
    v-for='({social, url, icon}) in socialLinksView'
    v-bind:key='social'
  >
    <q-btn
      type='a'
      target='_blank'
      :href='url'
      :size='size'
      dense flat round
      :icon='icon'
    />
  </template>
</template>

<script lang='ts'>
import { computed, defineComponent, PropType } from 'vue';
import { IClubSocialLinks } from 'src/api/clubApi';
import { mapSocialToIcon } from 'src/lib/components/socials';

export default defineComponent({
  props: {
    socialLinks: Object as PropType<IClubSocialLinks>,
    size: {
      type: String,
      required: false,
    }
  },
  setup(props) {
    const socialLinksView = computed(() => Object.entries(props.socialLinks || {})
      .map(([social, url]: [string, string]) => {
        if (!url) return null;
        return {
          social,
          url,
          icon: String(mapSocialToIcon(social) || ''),
        }
      })
      .filter(v => v)
    )

    return {
      socialLinksView,
    };
  }
});
</script>
