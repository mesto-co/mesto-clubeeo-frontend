<template>
  <q-card :style='{width: size}' style='border-radius: 12px; background-color: rgb(29, 29, 39)' class='q-mr-md' flat>
    <q-img
      ratio='1'
      :src='badge.img'
    />

    <q-card-section class='text-center q-pa-xs' v-if='showName'>
      <small class='flex justify-between'>
        <q-icon
          v-if='badge.chain'
          :name='`img:/icons/crypto/${badge.chain}.svg`'
          size='14px'
        />
        <div style='flex-grow: 2'>
          {{ badge.name }}
        </div>
      </small>
    </q-card-section>
    <q-tooltip class="bg-transparent">
      <q-card width='280px' style='border-radius: 12px; background-color: rgb(29, 29, 39)'>
        <q-img
          width='280px'
          height='280px'
          fit='cover'
          ratio='1'
          :src='badge.img'
        />
        <q-card-section class='text-center q-pa-xs'>
          <div class='flex justify-between'>
            <q-icon
              v-if='badge.chain'
              :name='`img:/icons/crypto/${badge.chain}.svg`'
              size='18px'
            />
            <div style='font-size: 0.85rem; flex-grow: 2' class='text-bold'>{{ badge.name }}</div>
            <div
              v-if='badge.chain'
              style='width: 18px'
            ></div>
          </div>
          <div class='q-pt-sm' style='font-size: 0.85rem'>{{ badge.description }}</div>
          <div class='q-pt-sm q-pb-sm' style='font-size: 0.85rem' v-if='badge.role'>
            <span style='color: rgba(255, 255, 255, 0.5)'>grants role:</span>
            <q-badge :class='{"q-ml-xs": true, [badge.role.class]: true}'>{{ badge.role.name }}</q-badge>
          </div>
        </q-card-section>
      </q-card>

    </q-tooltip>
  </q-card>
</template>

<script lang='ts'>

import { defineComponent, PropType } from 'vue';

interface IBadge {
  img: string
  name: string
  chain?: string
  description?: string
  role?: {
    class: string
    name: string
  }
}

export default defineComponent({
  props: {
    badge: {
      type: Object as PropType<IBadge>
    },
    size: {
      type: String,
      default: '100px'
    },
    showName: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
    };
  }
});
</script>
