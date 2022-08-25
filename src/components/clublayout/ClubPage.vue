<template>
  <q-page class='clubPage'>

    <div
      v-if="!sticky"
      class='text-h6 q-pb-md flex justify-between full-width'
    >
      <div>{{ header }}</div>

      <div v-if='!loading'>
        <slot
          name='buttons'
        />
      </div>
    </div>

    <div style='height: 65px;' v-if='sticky === "top"'></div>

    <div v-if='!loading'>
      <slot />
    </div>

    <div style='height: 65px' v-if='sticky === "bottom"'></div>

    <q-page-sticky
      v-if='sticky'
      :position='sticky'
      expand
    >

      <!--        :style='{backgroundColor: clubStyle.color || "#111117"}'-->

      <div
        :style='{backgroundColor: "#16161f"}'
        class='text-h6 q-py-md q-px-lg flex justify-between full-width'
      >
        <div>{{ header }}</div>

        <div v-if='!loading'>
          <slot
            name='buttons'
          />
        </div>
      </div>
    </q-page-sticky>

    <q-inner-loading
      :showing='loading'
      dark
    />

  </q-page>
</template>

<script lang='ts'>
import { defineComponent, inject, Ref } from 'vue';
import { IClubStyle } from 'src/models/clubStyle';

export default defineComponent({
  props: {
    header: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false,
    },
    sticky: {
      type: String,
      default: ''
    }
  },
  setup() {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    return {
      clubStyle,
    }
  }
});
</script>
