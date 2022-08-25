<template>
  <q-btn
    :type="href ? 'a' : null"
    :target='href ? "_blank" : null'
    :href='href'
    :style="primaryButtonStyle"
    :class='(clubStyle || {}).buttonClass'
    no-caps
    unelevated
  >
    <slot />
  </q-btn>
</template>

<script lang='ts'>
import { computed, defineComponent, inject, Ref } from 'vue';
import { IClubStyle } from 'src/models/clubStyle';

export default defineComponent({
  props: {
    href: {
      type: String,
      required: false
    },
    scheme: {
      type: String,
      default: 'primary'
    }
  },
  setup(props) {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const primaryButtonStyle = computed(() => {
      const style = clubStyle?.value || {};

      if (props.scheme === 'inverse') {
        return {
          backgroundColor: style.color,
          color: style.textColor,
          borderRadius: '8px'
        }
      }

      return {
        backgroundColor: style.primaryColor,
        color: style.primaryTextColor,
        borderRadius: '8px'
      }
    });

    return {
      clubStyle,
      primaryButtonStyle,
    };
  }
});
</script>
