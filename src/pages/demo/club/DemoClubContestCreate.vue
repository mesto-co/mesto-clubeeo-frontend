<template>
  <club-page
    header='create contest'
  >
    <template v-slot:buttons>
      <club-button
        class='clubButtonActive'
        :to='{name: "demo-contest"}'
      >create</club-button>
    </template>

    <q-card dark class='clubBgDefault q-pb-sm q-mb-md' flat>
      <q-card-section class='text-subtitle1 q-pb-none flex justify-between'>
        <div>
          contest terms
        </div>
        <div class='text-right'>
          <club-button
            class='clubButtonActive'
          >add term</club-button>
        </div>
      </q-card-section>

      <q-card-section class='row q-col-gutter-md q-pb-xs'>
        <div class='col'>
          <q-select
            label='condition type'
            filled dark dense
            :options='["Twitter"]'
            model-value='Twitter'
          />
        </div>

        <div class='col'>
          <q-select
            label='action'
            filled dark dense
            :options='["subscription"]'
            model-value='subscription'
          />
        </div>

        <div class='col'>
          <q-input
            label='link'
            filled dark dense
            model-value='twitter.com/clubeeo_official'
          />
        </div>
      </q-card-section>

      <q-card-section class='row q-col-gutter-md q-pb-xs'>
        <div class='col'>
          <q-select
            label='condition type'
            filled dark dense
            :options='["Telegram"]'
            model-value='Telegram'
          />
        </div>

        <div class='col'>
          <q-select
            label='action'
            filled dark dense
            :options='["subscription"]'
            model-value='subscription'
          />
        </div>

        <div class='col'>
          <q-input
            label='link'
            filled dark dense
            model-value='t.me/clubeeo_en'
          />
        </div>
      </q-card-section>

      <q-card-section class='row q-col-gutter-md q-pb-xs'>
        <div class='col'>
          <q-select
            label='condition type'
            filled dark dense
            :options='["NFT"]'
            model-value='NFT'
          />
        </div>

        <div class='col'>
          <q-select
            label='action'
            filled dark dense
            :options='["owned"]'
            model-value='owned'
          />
        </div>

        <div class='col'>
          <q-input
            label='contract'
            filled dark dense
            model-value='0x8D5c7b3D209Fd0b1Ef1BaE56C5A385e384C97aD2'
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card dark class='clubBgDefault q-pb-sm q-mb-md' flat>
      <q-card-section class='text-subtitle1 q-pb-none'>
        time frame
      </q-card-section>

      <q-card-section class='row q-col-gutter-md q-pb-xs'>
        <div class='col'>
          <q-input
            label='start'
            filled dark dense
            :model-value='moment().add(1, "d").format("DD MMM YYYY")'
          />
        </div>

        <div class='col'>
          <q-input
            label='finish'
            filled dark dense
            :model-value='moment().add(8, "d").format("DD MMM YYYY")'
          />
        </div>

        <div class='col'>

        </div>
      </q-card-section>
    </q-card>

    <q-card dark class='clubBgDefault q-pb-sm q-mb-md' flat>
      <q-card-section class='text-subtitle1 q-pb-none'>
        contest prize
      </q-card-section>

      <q-card-section class='row q-col-gutter-md q-pb-xs'>
        <div class='col'>
          <q-select
            label='prize type'
            filled dark dense
            :options='["NFT Giveaway"]'
            model-value='NFT Giveaway'
          />
        </div>

        <div class='col'>
          <q-input
            label='limit'
            filled dark dense
            model-value='100'
          />
        </div>

        <div class='col'>
          <q-input
            label='collection'
            filled dark dense
            model-value='opensea.io/collection/cats'
          />
        </div>
      </q-card-section>

    </q-card>

  </club-page>
</template>

<style>
.q-menu {
  background: #1d1d27
}
</style>

<script lang='ts'>
import ClubPage from '/src/components/clublayout/ClubPage.vue';
import { defineComponent } from 'vue';
import moment from 'moment';
import ClubButton from 'components/clubpage/ClubButton.vue';

export default defineComponent({
  components: { ClubButton, ClubPage },
  setup () {
    return {
      moment
    }
  }
});
</script>
