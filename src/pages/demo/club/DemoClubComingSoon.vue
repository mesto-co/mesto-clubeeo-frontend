<template>
  <club-page
    header='create contest'
  >
    <template v-slot:buttons>
      <club-button
        class='clubButtonActive'
        :to='{name: ""}'
      >create</club-button>
    </template>

    <h3 class='text-center vertical-middle' style='margin-top: 35vh'>
      <span class='clubHeaderActive'>Coming soon</span>
    </h3>

  </club-page>
</template>

<style>

</style>

<script lang='ts'>
import ClubPage from '/src/components/clublayout/ClubPage.vue';
import { defineComponent } from 'vue';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  components: { ClubButton, ClubPage },
  setup () {
    return {

    }
  }
});
</script>
