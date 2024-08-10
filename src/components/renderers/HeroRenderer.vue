<template>
  <div>
    <q-img
      v-if="heroImg"
      :src="heroImg"
      :style="{
        ...(maxHeight ? { maxHeight: maxHeight } : {}),
        ...(minHeight ? { minHeight: minHeight } : {}),
      }"
    />
    <div
      v-else
      :style="{
        ...(minHeight ? { minHeight: minHeight } : {}),
        backgroundColor: (styling || {}).heroColor,
      }"
    ></div>

    <div v-if="logoImg" class="heroRenderer_logoWrapper">
      <avatar
        :src="logoImg"
        :name="logoName"
        :alt="`${logoName} logo`"
        :class="avatarClass"
      />
    </div>
  </div>
</template>

<style lang="scss">
div.heroRenderer_logoWrapper {
  display: flex;
  justify-content: center;
  margin-top: max(-60px, -25vw);
  z-index: 1;
  position: relative;
  margin-bottom: 9px;

  .avatar {
    width: min(120px, 50vw);
    height: min(120px, 50vw);

    &.avatarRound {
      border-radius: min(60px, 25vw);
    }
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import Avatar from '@components/elements/Avatar.vue';
import { IClubStyle } from '@src/models/clubStyle';

export default defineComponent({
  components: { Avatar },
  props: {
    heroImg: {
      type: String,
      required: false,
    },
    logoImg: {
      type: String,
    },
    logoMode: {
      type: String,
      default: 'round',
    },
    maxHeight: {
      type: String,
    },
    minHeight: {
      type: String,
      default: '65px',
    },
    showLogo: {
      type: Boolean,
      default: true,
    },
    styling: {
      type: Object as PropType<IClubStyle>,
      required: false,
    },
  },
  setup(props) {
    return {
      avatarClass: computed(() => {
        return {
          avatar: true,
          avatarRound: props.logoMode === 'round',
        };
      }),
    };
  },
});
</script>
