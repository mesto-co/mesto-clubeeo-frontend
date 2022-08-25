<template>
  <club-button
    label='Install MetaMask'
    class='full-width'
    icon='img:/imgs/MetaMask_Fox.svg'
    scheme='inverse'
    :href='`https://metamask.app.link/dapp/clubeeo.com/${clubSlug}`'
  />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  name: 'meta-mask-link-login-btn',
  components: { ClubButton },
  props: {
    clubSlug: {
      type: String
    }
  },

  // setup(props) {
  //   return {}
  // }
});
</script>
