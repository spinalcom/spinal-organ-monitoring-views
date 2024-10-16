<template>
    <div>
        <canvas ref="scatterChart"></canvas>
    </div>
</template>

<script>
import { Chart } from "chart.js";

export default {
    name: "ScatterGraph",
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            scatterChart: null,
            hubPoints: [],
        };
    },
    watch: {
        data: {
            handler(newData) {
                this.updateHubPoints(newData);
                if (this.scatterChart) {
                    this.updateChart(newData);
                }
            },
            immediate: true,
            deep: true,
        },
    },
    mounted() {
        this.updateHubPoints(this.data);
        this.createChart();
    },
    methods: {
        createChart() {
            const ctx = this.$refs.scatterChart.getContext("2d");

            this.scatterChart = new Chart(ctx, {
                type: "scatter",
                data: {
                    datasets: [
                        ...this.formatData(this.data),
                        ...this.getHubLineDatasets(),
                    ],
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute',
                                tooltipFormat: 'HH:mm',
                                displayFormats: {
                                    hour: 'HH',
                                    minute: 'HH:mm',
                                },
                            },
                            position: 'bottom',
                            title: {
                                display: true,
                                text: 'Heures (0-24)',
                            },
                            min: 0,
                            max: 24,
                        },
                        y: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Organes',
                            },
                            ticks: {
                                callback: (value) => {
                                    return this.data[value] ? this.data[value].organName : value;
                                },
                            },
                        },

                    },
                    elements: {
                        point: {
                            radius: context => {
                                const dataIndex = context.dataIndex;
                                const dataset = context.dataset.data;
                                const currentPoint = dataset[dataIndex];
                                const pointCount = dataset.filter(point => point.x === currentPoint.x && point.y === currentPoint.y).length;
                                return 4 + (pointCount - 1) * 2;
                            },
                        },
                    },
                },
            });
        },
        updateChart(newData) {
            this.updateHubPoints(newData);
            this.scatterChart.data.datasets = [
                ...this.formatData(newData),
                ...this.getHubLineDatasets(),
            ];
            this.scatterChart.options.scales.y.labels = newData.map(item => item.organName);
            this.scatterChart.update();
        },
        formatData(data) {
            console.warn(data);

            return data.map((item, index) => {
                console.log(index);

                return {
                    type: 'scatter',
                    label: item.organName,
                    data: item.data.map(point => {
                        const date = new Date(point.date);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        return { x: hours + minutes / 60, y: index };
                    }),
                    backgroundColor: this.getColor(index),
                    showLine: false,
                };
            });
        }
        ,
        //line pour hub
        getHubLineDatasets() {
            console.log(this.data, 'aa');

            return this.hubPoints.map(hubPoint => ({
                type: 'line',
                label: 'Hub Line',
                data: [
                    { x: hubPoint.x, y: -0.5 },
                    { x: hubPoint.x, y: this.data.length - 0.5 } // Point en haut du graphique
                ],
                borderColor: 'red',
                borderWidth: 2,
                fill: false,
                pointRadius: 0,
                tension: 0,
            }));
        },

        //couleur random
        getColor(index) {
            const hue = (index * 137.5) % 360;
            return `hsl(${hue}, 70%, 50%)`;
        },
        //point du hub
        updateHubPoints(data) {
            this.hubPoints = [];
            for (let item of data) {
                if (item.organName === "Hub" && item.data.length > 0) {
                    item.data.forEach(point => {
                        const date = new Date(point.date);
                        const hours = date.getHours();
                        const minutes = date.getMinutes();
                        const time = hours + minutes / 60;
                        this.hubPoints.push({ x: time });
                    });
                }
            }
        }

    },
};
</script>

<style scoped>
canvas {
    max-width: 70%;
    height: 300px;
}
</style>
