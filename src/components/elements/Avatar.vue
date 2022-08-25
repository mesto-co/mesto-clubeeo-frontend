<template>
  <q-img v-if='!src'
    :src='`https://ui-avatars.com/api/?name=${name}&size=128&bold=true&format=svg&background=1c1c1f&color=fff`'
    :alt='alt'
    ratio='1'
  />
  <video
    v-else-if='src.endsWith(".mp4")'
    :src='src'
    :style='{width, height}'
    loop autoplay muted
  />
  <q-img
    v-else
    :src='src'
    :alt='alt'
    ratio='1'
  />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: {
      type: String
    },
    name: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'logo'
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
  }
});
</script>
