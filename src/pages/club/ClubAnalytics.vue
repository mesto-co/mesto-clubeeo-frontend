<template>
  <club-page header="analytics" :loading="!timeSeries" sticky="bottom">
    <template v-slot:buttons>
      <q-select
        dense
        outlined
        color="primary"
        dark
        v-model="selectedChart"
        :options="chartOptions"
      />
    </template>

    {{ selectedChart.label }} per day

    <div style="height: max(50vh, 200px); max-height: max(50vh, 200px)">
      <time-series-chart :data="timeSeries" />
    </div>

    <p>total: {{ Object.values(timeSeries).reduce((m, v) => m + v, 0) }}</p>

    <p>
      average:
      {{
        Math.round(
          (Object.values(timeSeries).reduce((m, v) => m + v, 0) /
            Object.values(timeSeries).length) *
            100
        ) / 100
      }}
    </p>
  </club-page>
</template>

<script lang="ts">
import ClubPage from '../../components/clublayout/ClubPage.vue';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { shortenAddress } from '@src/lib/components/chains';
import { defaultPagination } from '@src/lib/components/table';
import { api } from 'boot/axios';
import { useRoute } from 'vue-router';
import { IMeInClub } from '@src/models/meInClub';
import TimeSeriesChart from '@components/charts/TimeSeriesChart.vue';
import { TTimeSeries } from '@src/models/analytics';

const columns = [
  { name: 'name', align: 'left', label: 'role', field: 'name' },
  { name: 'members', align: 'right', label: 'members', field: 'membersCount' },
];

interface IClubRole {
  name: string;
  membersCount: number;
}

interface ILoadedClub {
  id: number;
  name: string;
  roles: IClubRole[];
  meInClub: IMeInClub;
}

const chartOptions = [
  {
    value: 'member-visits',
    label: 'member visits',
  },
  {
    value: 'anonymous-visits',
    label: 'anonymous visits',
  },
  {
    value: 'badges-granted',
    label: 'badges granted',
  },
];

export default defineComponent({
  components: { TimeSeriesChart, ClubPage },
  setup() {
    const $route = useRoute();

    const timeSeries = ref<TTimeSeries>({});
    const club = ref<ILoadedClub | null>(null);
    const isLoading = ref(true);
    const slug = computed(() =>
      $route.params.clubSlug ? String($route.params.clubSlug) : null
    );
    const selectedChart = ref(chartOptions[0]);

    const load = async () => {
      if (!slug.value) return console.error('no club slug');
      isLoading.value = true;

      const result = await api.get<{ data: TTimeSeries }>(
        `/api/club/${slug.value}/dashboard/analytics/${selectedChart.value.value}`
      );
      isLoading.value = false;

      timeSeries.value = result.data.data;
    };

    onMounted(async () => {
      await load();
    });

    watch(selectedChart, load);

    const roleName = ref('');

    const chartHeight = computed(() => '300');

    return {
      club,
      timeSeries,
      roleName,
      columns,
      defaultPagination,
      shortenAddress,
      selectedChart,
      chartOptions,
      chartHeight,
      isLoading,
    };
  },
});
</script>
