<template>

  <h2 class='col-12 text-center q-pa-sm q-ma-none'>
    <template
      v-for='(item, index) in data.items'
      v-bind:key='index'
    >

      <q-btn
        flat
        style='background-color: #2b2e3b; border-radius: 8px'
        class='q-ma-sm'
        :href='item.url'
        target='_blank'
        type='a'
      >
        <q-img
          fit='scale-down'
          :src='item.img'
          height='69px' width='200px'
          :alt='item.alt'
        />
      </q-btn>

    </template>

<!--    <q-btn-->
<!--      flat-->
<!--      style='background-color: #2b2e3b; border-radius: 8px'-->
<!--      class='q-ma-sm'-->
<!--      href='https://superdao.notion.site/About-Superdao-240d101034524747a05bfc1b90ee3185'-->
<!--      target='_blank'-->
<!--      type='a'-->
<!--    >-->
<!--      <q-img-->
<!--        fit='scale-down'-->
<!--        src='https://superdao.co/assets/images/logo.svg'-->
<!--        height='69px' width='200px'-->
<!--        alt='SuperDAO'-->
<!--      />-->
<!--    </q-btn>-->

<!--    <q-btn-->
<!--      flat-->
<!--      style='background-color: #2b2e3b; border-radius: 8px'-->
<!--      class='q-ma-sm'-->
<!--      href='https://app.pass.hashbon.com'-->
<!--      target='_blank'-->
<!--      type='a'-->
<!--    >-->
<!--      <q-img-->
<!--        fit='scale-down'-->
<!--        src='https://app.pass.hashbon.com/static/media/img-logo-large-v2.143c11e7754c7198bc3cb53337b44fb2.svg'-->
<!--        height='69px' width='200px'-->
<!--        alt='HashbonPass'-->
<!--      />-->

<!--    </q-btn>-->

<!--    <q-btn-->
<!--      flat-->
<!--      style='background-color: #2b2e3b; border-radius: 8px'-->
<!--      class='q-ma-sm'-->
<!--      href='https://astrodao.com'-->
<!--      target='_blank'-->
<!--      type='a'-->
<!--    >-->
<!--      <q-img-->
<!--        fit='scale-down'-->
<!--        src='/imgs/astro-logo.svg'-->
<!--        height='69px' width='200px'-->
<!--        alt='AstroDAO'-->
<!--      />-->

<!--    </q-btn>-->

  </h2>

</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  components: { },
  props: {
    data: {
      type: Object as PropType<{
        items: {
          url: string,
          img: string,
          alt: string,
        }
      }>
    }
  },
});
</script>
