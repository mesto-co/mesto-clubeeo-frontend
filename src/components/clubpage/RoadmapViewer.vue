<template>
  <q-timeline layout="comfortable">
    <q-timeline-entry
      v-for="(entry, entryIdx) in view"
      v-bind:key="entryIdx"
      :title="entry.title"
      :subtitle="entry.when"
      color="theme"
    >
      <div v-html="entry.text" />
    </q-timeline-entry>
  </q-timeline>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { IRoadmapEntry } from '@src/models/roadmapModel';

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Array as PropType<IRoadmapEntry[]>,
      required: true,
    },
  },
  setup(props) {
    const view = computed(() =>
      props.modelValue.map((item) => ({
        ...item,
        // subtitle: [item.stage, item.date ? String(moment(item.date).format('MMMM DD, YYYY')) : null].filter(v=>v).join(' '),
        // subtitle: item.when,
      }))
    );

    return {
      view,
    };
  },
});
</script>
