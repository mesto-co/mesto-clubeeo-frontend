<template>
  <club-page :header="appData.title" sticky="bottom" :loading="isLoading">
    <q-table
      v-if="!isLoading"
      :rows="screenRows"
      :columns="columns"
      dark
      flat
      style="background-color: rgb(29 29 39)"
      title="leaderboard"
      hide-pagination
      row-key="position"
      :rows-per-page-options="[0]"
      :pagination="{ rowsPerPage: 0 }"
    >
      <template v-slot:body-cell="props">
        <q-td :props="props" style="font-size: 1rem">
          {{ props.value }}
        </q-td>
      </template>

      <template v-slot:body-cell-value="props">
        <q-td :props="props" style="font-size: 1rem">
          <q-badge
            :class="valueClass(props.row)"
            :label="props.value"
            style="font-size: 1rem; height: 1.5rem"
          />
        </q-td>
      </template>
    </q-table>

    <div class="text-center" v-if="!expanded">
      <q-btn icon="fa-solid fa-ellipsis" dense round @click="expanded = true" />
    </div>
  </club-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useLoadIndex } from '@src/uses/useLoaders';
import ClubPage from '@components/clublayout/ClubPage.vue';
import { appProps } from '@apps/_common/appProps';

const columns = [
  {
    name: 'position',
    label: 'position',
    field: 'position',
    align: 'left',
    format: (val: string) => `#${val}`,
  },
  { name: 'name', label: 'name', field: 'name', align: 'left' },
  { name: 'value', label: 'value', field: 'value' },
];

interface ILeaderboardEntry {
  position: number;
  name: string;
  value: number;
}

export default defineComponent({
  components: { ClubPage },
  props: appProps,
  setup(props) {
    const expanded = ref(false);

    const { data: rows, isLoading } = useLoadIndex<
      ILeaderboardEntry,
      'leaderboard'
    >({
      url: () =>
        props.appData?.clubId && props.appData?.appId
          ? `/api/club/${props.appData.clubId}/apps/${props.appData.appId}/leaderboard`
          : null,
      key: 'leaderboard',
    });

    // const rows = ref<ILeaderboardEntry[]>([]);

    // const valueClass = (row: {position: string}) => {
    const valueClass = () => {
      return 'clubButtonActive';
      // return 'bg-grey-3 text-black';
    };

    return {
      valueClass,
      expanded,
      columns,
      rows,
      isLoading,
      screenRows: computed(() => {
        return rows.value.slice(0, expanded.value ? 50 : 10);
      }),
    };
  },
});
</script>
