<template>

  <apexchart
    class="charts"
    type="line"
    :options="chartOptions"
    :series="series"
  ></apexchart>

</template>

<script lang='ts'>

import { computed, defineComponent, PropType } from 'vue';
import { TTimeSeries } from 'src/models/analytics';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<TTimeSeries>
    },
    minMax: {
      type: Number,
      default: 10
    }
  },
  setup(props) {
    const values = computed(() => Object.values(props.data || {}));

    const chartOptions = computed(() => ({
      chart: {
        height: '100%',
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 1,
        curve: 'smooth'
      },
      // colors: ['#071455'],
      plotOptions: {
        bar: {
          colors: {
            ranges: [{ from: 0, to: 100, color: '#1A5CFF'}
              // }, {
              //   from: 100,
              //   to: 200,
              //   color: '#566EEC'
              // }, {
              //   from: 200,
              //   to: 300,
              //   color: '#7E63C2'
              // }]
            ]
          },
          columnWidth: '50',
        }
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false,
        enabledOnSeries: [1]
      },
      xaxis: {
        type: 'numeric',
        tickAmount: 'dataPoints',
        decimalsInFloat: 0,
        labels: {
          show: true,
          style: {
            colors: '#fff',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
          formatter: function (val: number) {
            return values.value.length - val;
          }
        },
      },
      yaxis: {
        // min: 1,
        // tickAmount: props.maxHeight-1,
        max: Math.max(props.minMax, ...values.value),
        labels: {
          show: true,
          style: {
            colors: '#fff',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      grid: {
        borderColor: '#1A5CFF',
      },
      tooltip: {
        enabled: false
      },
      markers: {
        size: 2,
        colors: '#444',
        strokeColors: '#fff',
        strokeWidth: 4,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: 'rect',
        radius: 0,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
    }));

    return {
      chartOptions,
      series: computed(() => [{
        name: 'Trend Analysis',
        type: 'bar',
        data: values.value,
      }]),
    };
  }
});

</script>
