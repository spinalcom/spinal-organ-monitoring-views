<!-- src/components/LineChart.vue -->
<template>
  <!-- <chart-Line :data="chartData" :options="chartOptions"></chart-Line> -->
   <canvas :id="id" class="canvasChart"></canvas>
</template>

<script>
// import { Line } from 'vue-chartjs'

export default {
  name: 'LineChart',
  // components: { 'chart-Line': Line },
  props: {
    id: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log("Mounted LineChart with data:", this.data);
    this.renderChart(this.chartData, this.chartOptions);
  },
  methods: {
    renderChart(data, options) {
      console.log("Rendering chart with data:", data);
      const ctx = document.getElementById(this.id).getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
      });
    }
  },
  computed: {
    chartData() {
      console.log("Data for chart:", this.data);
      const labels = this.data.map((_, i) => `T${i + 1}`);
      const data= {
        labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.3
          }
        ]
      };

      console.log("Chart data:", data);
      return data;
    },
    chartOptions() {
      return {
        responsive: true,
      };
    }
  }
}
</script>

<style>
.canvasChart {
  width: 100% !important;
  height: 105% !important;
}
</style>