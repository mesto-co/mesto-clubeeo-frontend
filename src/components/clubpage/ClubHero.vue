<template>

  <div>
    <q-img
      v-if='clubStyle.heroImg'
      :src='clubStyle.heroImg'
      :style='{
        ...(maxHeight ? {maxHeight: maxHeight} : {}),
        ...(minHeight ? {minHeight: minHeight} : {}),
       }'
    />
    <div
      v-else
      :style='{
        ...(minHeight ? {minHeight: minHeight} : {}),
        backgroundColor: clubStyle.heroColor,
       }'
    >

    </div>

    <div
      v-if='showLogo && clubStyle.logoImg'
      class='clubHero_logoWrapper'
    >
      <avatar
        :src='clubStyle.logoImg'
        :name='club.name'
        :alt='`${club.name} logo`'
        class='avatar'
      />
    </div>
  </div>

</template>

<style lang='scss'>

div.clubHero_logoWrapper {
  display: flex;
  justify-content: center;
  margin-top: max(-60px, -25vw);
  z-index: 1;
  position: relative;
  margin-bottom: 9px;

  .avatar {
    width: min(120px, 50vw);
    height: min(120px, 50vw);
    border-radius: min(60px, 25vw);
  }
}

</style>

<script lang='ts'>
import { defineComponent, inject } from 'vue';
import { state } from 'src/state';
import Avatar from 'components/elements/Avatar.vue';

export default defineComponent({
  components: { Avatar },
  props: {
    maxHeight: {
      type: String
    },
    minHeight: {
      type: String,
      default: '65px'
    },
    showLogo: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const clubStyle = inject('clubStyle');

    return {
      club: state.$club.club,
      clubStyle
    };
  }
});
</script>
