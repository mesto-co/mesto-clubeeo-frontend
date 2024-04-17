<template>

  <q-btn
    icon='fab fa-telegram-plane'
    size='xl'
    href='https://t.me/clubeeo'
    target='_blank'
    dense flat round
  ></q-btn>

  <q-btn
    icon='fab fa-discord'
    size='xl'
    href='https://discord.gg/C6jHsjzZ3f'
    target='_blank'
    dense flat round
  ></q-btn>

  <q-btn
    icon='fab fa-twitter'
    size='xl'
    href='https://twitter.com/ClubeeoOfficial'
    target='_blank'
    dense flat round
  ></q-btn>

  <q-btn
    icon='fab fa-reddit'
    size='xl'
    href='https://www.reddit.com/r/clubeeo'
    target='_blank'
    dense flat round
  ></q-btn>

  <q-btn
    icon='fab fa-linkedin'
    size='xl'
    href='https://www.linkedin.com/company/clubeeo'
    target='_blank'
    dense flat round
  ></q-btn>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    data: {
      type: Object
    }
  }
});
</script>
