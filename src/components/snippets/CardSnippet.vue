<template>

  <q-card>
    <q-card-section>

      <slot />

      <template v-if='items'>
        <template
          v-for='(item, index) in items'
          v-bind:key='index'
        >
          {{item}}
        </template>
      </template>

    </q-card-section>
  </q-card>

</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    items: {
      type: Array,
      required: false,
    }
  },
  setup() {
    return {};
  }
});
</script>
