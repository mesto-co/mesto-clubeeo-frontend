<template>
  <div
    v-if="data.title || data.header || data.image"
    class="col-12 q-pa-md q-pt-xl"
  >
    <div v-if="data.image" class="text-center q-pb-lg">
      <q-img :src="data.image.src" :style="data.image.style || {}" />
    </div>
    <h1 v-if="data.header" class="col-12 text-center q-ma-none">
      <span class="clubHeaderActive">
        {{ data.header }}
      </span>
    </h1>
    <h2
      v-if="data.title"
      class="col-12 text-center q-ma-none"
      v-html="data.title.join('<br />')"
    />
  </div>

  <template v-for="(card, j) in data.cards" :key="j">
    <snippet-renderer v-if="card.type" :data="card" />
    <card-renderer v-else :card="card" />
  </template>

  <div class="text-center col-12">
    <template v-if="data.next">
      <div>{{ data.next }}</div>
      <q-icon name="fas fa-arrow-down" size="xl" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardRenderer from '@components/renderers/CardRenderer.vue';

export default defineComponent({
  components: { CardRenderer }, // components: { CardRenderer }
  props: {
    data: {
      type: Object, //as Record<string, string>
    },
  },
});
</script>
