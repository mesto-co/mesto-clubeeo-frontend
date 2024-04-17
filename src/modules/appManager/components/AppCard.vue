<template>
  <q-card style='width: 280px; border-radius: 12px; background-color: rgb(29, 29, 39)' flat>
    <q-img
      :src='app.coverImg'
      ratio='1'
      position='top'
    />

    <q-card-section class='text-center'>
      <div style='font-weight: bold'>{{ app.name }}</div>
      <div style='line-height: 14px; font-size: 12px; padding-top: 4px; min-height: 28px' v-html='app.description'>
      </div>
      <div style='line-height: 14px; font-size: 12px; padding-top: 8px' v-html='app.tags'>
      </div>
    </q-card-section>

    <slot name='buttons'></slot>
  </q-card>
</template>


<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { IAppItem } from '../appManagerTypes';

export default defineComponent({
  components: {},
  props: {
    app: {
      type: Object as PropType<IAppItem>,
      required: true,
    }
  }
});
</script>
