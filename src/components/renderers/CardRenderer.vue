<template>
  <div
    :class='{"q-pa-md": true, "text-center": true, ...(card.class || {})}'
  >
    <h4
      v-if='card.title'
      class='text-h4 q-ma-none q-pb-md text-center'
      v-html='card.title'
    />
    <div
      v-if='card.text'
      class='text-center'
      v-html='card.text'
    />
    <template
      v-for='(chip, k) in card.chips || []' :key='k'
    >
      <q-chip
        flat no-caps size='lg'
        class='q-ma-sm'
        style='background-color: #2b2e3b; color: #FFFFFF; border-radius: 8px'
      >
        <q-img v-if='chip.icon' :src='chip.icon' width='24px' class='q-mr-sm' />
        {{ chip.title }}
      </q-chip>
    </template>

    <div
      v-if='card.button'
      class='text-center'
    >
      <q-btn
        :size='card.button.size || "xl"'
        unelevated no-caps
        :style='card.button.style'
        :class='card.button.class'
        :type='card.button.href ? "a" : undefined'
        :href='card.button.href'
        :to='card.button.to'
        target='_blank'
      >
        {{ card.button.label }}
      </q-btn>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { IRenderableCard } from 'components/snippets/interfaces';

export default defineComponent({
  name: 'CardRenderer',
  props: {
    card: Object as PropType<IRenderableCard>
  }
});
</script>
