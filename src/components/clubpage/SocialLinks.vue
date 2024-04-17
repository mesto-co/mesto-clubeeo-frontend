<template>
  <div>
    <template
      v-for='({social, url, icon}) in socialLinksView'
      v-bind:key='social'
    >
      <q-btn
        type='a'
        target='_blank'
        :href='url'
        round unelevated
        :icon='icon'
        :style="itemStyle"
      />
    </template>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import { IClubSocialLinks } from 'src/api/clubApi';
import { mapSocialToIcon } from 'src/lib/components/socials';
import { IClubStyle } from 'src/models/clubStyle';

export default defineComponent({
  props: {
    socialLinks: Object as PropType<IClubSocialLinks>,
  },
  setup(props) {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const itemStyle = computed(() => ({
      backgroundColor: clubStyle?.value?.socialColor || '#FFFFFF',
      color: clubStyle?.value?.socialTextColor || '#000000',
      margin: '0 6px'
    }));

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
      clubStyle,
      itemStyle,
      socialLinksView,
    };
  }
});
</script>
