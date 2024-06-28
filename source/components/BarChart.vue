<template>
  <Bar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :width="width"
    :height="height"
  />
</template>

<script>
import {Bar} from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {
    Bar
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 400
    },
    dataBar: {
      type: Array,
      // [1, 2, 3, 4]
    },
    labels: {
      type: Array,
// {
//   labels: [
//     'January',
//     'February',
//     'March',
//     'April',
//   ],
//     labelData1: 'labelData1',
//   labelData2: 'labelData2',
// }
    },
  },
  data() {
    const chartOptions  = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
            color: "#FBFBFB"
          },
          ticks: {
            color: '#4B4B4B',
            font: {
              size: 14,
            },
          }
        },
        y: {
          ticks: {
            color: '#4B4B4B',
            font: {
              size: 12,
              weight: "bold"
            },
            callback(value, index, ticks) {
              return Math.ceil(value / 60) + 'm';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true,
          usePointStyle: false,
          displayColors: false,
          backgroundColor: '#FFFFFF',
          titleColor: '#4B4B4B',
          titleFont: {
            size: 14,
            weight: 700,
            lineHeight: '19px'
          },
          titleAlign: 'left',
          bodyColor: "#4B4B4B",
          bodyFont: {
            size: 12,
            weight: 700,
            lineHeight: '16px'
          },
          bodyAlign: 'left',
          borderColor: '#F3F4F3',
          borderWidth: 1,
          padding: {
            left: 20,
            right: 20,
            top: 13,
            bottom: 8
          },
          callbacks: {
            label(tooltipItem) {
              const dataColumn = tooltipItem.dataset.data;
              const dataIndex = tooltipItem.dataIndex;
              return Math.ceil(dataColumn[dataIndex] / 60) + ' phút đã xem';
            }
          }
        }
      }
    };
    return {
      chartData: {
        labels: this.labels[0].labels,
        datasets: [
          {
            type: "bar",
            label: this.labels[0].labelData1,
            data: this.dataBar,
            backgroundColor: "#99BFF7",
            borderRadius: 5
          },
        ]
      },
      chartOptions
    }
  }
}
</script>
