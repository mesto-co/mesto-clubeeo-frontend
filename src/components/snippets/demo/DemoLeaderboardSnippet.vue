<template>

  <q-table
    :rows='screenRows'
    :columns='columns'
    dark
    title='leaderboard'
    hide-pagination
    row-key='position'
    :rows-per-page-options="[0]"
    :pagination="{ rowsPerPage: 0 }"
    class='bg-transparent'
  >
    <template v-slot:body-cell="props">
      <q-td :props="props" style='font-size: 1rem'>
        {{ props.value }}
      </q-td>
    </template>

    <template v-slot:body-cell-points="props">
      <q-td :props="props" style='font-size: 1rem'>
        <q-badge :class='pointsClass(props.row)' :label="props.value" style='font-size: 1rem; height: 1.5rem' />
      </q-td>
    </template>
  </q-table>

  <div class='text-center' v-if='!expanded'>
    <q-btn
      icon='fa-solid fa-ellipsis' dense round
      @click='expanded = true'
    />
  </div>

</template>

<script lang='ts'>
import { computed, defineComponent, PropType, ref } from 'vue';

const columns = [
  { name: 'position', label: 'position', field: 'position', align: 'left', format: (val: string) => `#${val}` },
  { name: 'name', label: 'name', field: 'name', align: 'left' },
  { name: 'points', label: 'points', field: 'points' },
];

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<{data: Array<{position: number, name: string, points: number}>}>
    }
  },
  setup(props) {
    const expanded = ref(false);
    const rows = computed(() => props.data);

    // const pointsClass = (row: {position: string}) => {
    const pointsClass = () => {
      return 'clubButtonFire';
      // return 'bg-grey-3 text-black';
    }

    return {
      pointsClass,
      expanded,
      columns,
      rows,
      screenRows: computed(() => {
        return (props.data?.data || []).slice(0, expanded.value ? 10 : 5)
      }),
    };
  }
});
</script>
