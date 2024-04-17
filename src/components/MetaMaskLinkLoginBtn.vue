<template>
  <club-button
    label='install MetaMask'
    class='full-width'
    icon='img:/imgs/MetaMask_Fox.svg'
    scheme='inverse'
    :href='`https://metamask.app.link/dapp/clubeeo.com/${redirectPath}`'
  />
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  name: 'meta-mask-link-login-btn',
  components: { ClubButton },
  props: {
    redirectPath: {
      type: String,
    },

    labels: {
      type: Object as PropType<{
        logInWith?: string
      }>,
      default: () => ({}),
    },
  },

  // setup(props) {
  //   return {}
  // }
});
</script>
