<template>
  <q-page class='clubPage'>

    <div
      v-if="!isSticky"
      :class='headerClassValue'
    >
      <div class='flex'>
        <back-btn v-if='backLink' :to='backLink' />
        <slot
          name='header'
        >{{ header }}</slot>
      </div>

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
      v-if='isSticky'
      :position='sticky'
      expand
    >

      <!--        :style='{backgroundColor: clubStyle.color || "#111117"}'-->

      <div
        :style='{backgroundColor: "#16161f"}'
        :class='headerClassValue'
      >
        <div>
          <back-btn v-if='backLink' :to='backLink' />
          <slot
            name='header'
          >{{ header }}</slot>
        </div>

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
import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import { IClubStyle } from 'src/models/clubStyle';
import BackBtn from 'components/elements/BackBtn.vue';

export default defineComponent({
  components: { BackBtn },
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
      default: 'bottom'
    },
    headerClasses: {
      type: Object as PropType<{padding?: Record<string, string>}>,
      default: () => ({})
    },
    backLink: {
      type: Object,
      required: false,
    }
  },
  setup(props) {
    const clubStyle = inject('clubStyle') as Ref<IClubStyle>;

    const isSticky = computed(() => props.sticky && props.sticky !== 'disable');

    const headerClassValue = computed(() => ({
      ...(props.headerClasses.padding || {'q-py-md': true, 'q-px-lg': true}),
      'text-h6': true,
      'flex': true,
      'justify-between': true,
      'full-width': true,
    }));

    return {
      isSticky,
      clubStyle,
      headerClassValue,
    }
  }
});
</script>
