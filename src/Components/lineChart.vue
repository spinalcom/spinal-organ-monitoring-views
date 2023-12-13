<template>
    <v-app>
        <v-main>
            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;"
                :title="'ORGAN DETAILS ' + timePeriod.toUpperCase()">
                <div class="chart-container">
                    <div @click="handleloading()"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 0px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 180px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        <v-progress-circular v-if="loading" :size="15" color="red" :width="3"
                            indeterminate></v-progress-circular>
                        <span v-if="!loading">Changer la temporalité</span>
                    </div>
                    <div @click="createChart();"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 190px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 40px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        <v-icon class="mx-1" color="white darken-2" dark>{{ reload }}</v-icon>
                    </div>
                    <canvas ref="myChart"></canvas>
                </div>
            </BackupInformation>
        </v-main>
    </v-app>
</template>
<script>
import { Chart } from "chart.js";
import 'chartjs-plugin-zoom';
import BackupInformation from "../Components/BackupInformation.vue";
export default {
    name: "lineChart",
    props: ['dataRestartOrgan', 'dataOrganAlive', 'temporalite'],
    components: {
        BackupInformation,
    },

    data() {
        return {
            myChart: null,
            loading: false,
            timePeriod: 'day',
            reload: 'mdi-reload',

        }
    },

    methods: {

        handleloading() {
            this.loading = true
            setTimeout(() => {
                this.toggleTimePeriod();
                this.loading = false
            }, 0);
        },

        updateChart() {
            if (this.myChart) {
                this.myChart.destroy();  // Détruit l'ancien graphique
            }
            this.createChart();  // Crée un nouveau graphique
        },

        toggleTimePeriod() {
            this.timePeriod == 'day' ? this.timePeriod = 'week' : this.timePeriod = 'day';
            this.updateChart();
            this.$emit('valueEmitted', this.timePeriod);
        },
        completeTimeSeries() {
            const now = Date.now();
            const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
            const startDate = oneWeekAgo;
            const endDate = Date.now();

            const completeData = [];

            for (let date = startDate; date <= endDate; date += 60000) {
                const existingData = this.dataOrganAlive.find(item => item.date >= date && item.date < date + 60000);
                if (existingData) {
                    completeData.push(existingData);
                } else {
                    completeData.push({ date: date, value: false });
                }
            }
            return this.filterEdgePoints(completeData);
        },

        filterEdgePoints(data) {
            const edgePoints = [];
            for (let i = 0; i < data.length; i++) {

                if (i === 0 || i === data.length - 1) {
                    edgePoints.push(data[i]);
                } else {
                    if (data[i].value !== data[i - 1].value || data[i].value !== data[i + 1].value) {
                        edgePoints.push(data[i]);
                    }
                }
            }
            // console.log(data);
            return edgePoints;
        },

        roundToMinute(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        },

        createChart() {
            const ctx = this.$refs.myChart.getContext("2d");
            const temporalite = this.timePeriod

            const filteredData = this.completeTimeSeries();
            let filteredDataForPeriod = null
            let dataRestartOrganForPeriod = null

            if (temporalite == 'day') {
                const now = new Date();
                const startTime = new Date(temporalite === 'day' ? now.getTime() - 24 * 60 * 60 * 1000 : now.getTime() - 7 * 24 * 60 * 60 * 1000);
                filteredDataForPeriod = filteredData.filter(item => new Date(item.date) >= startTime);
                dataRestartOrganForPeriod = this.dataRestartOrgan.filter(item => new Date(item.date) >= startTime);
            } else {
                filteredDataForPeriod = filteredData;
                dataRestartOrganForPeriod = this.dataRestartOrgan
            }

            const data = filteredDataForPeriod.map(item => ({
                x: new Date(item.date),
                y: item.value ? 1 : 0
            }));

            const data2 = dataRestartOrganForPeriod.map(item => ({
                x: new Date(item.date),
                y: item.value ? 2 : 0
            }));

            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'État de l\'organe',
                        data: data,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: true,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        steppedLine: true,
                    },
                    {
                        type: "bar",
                        yAxisID: 'B',
                        label: "Restart",
                        data: data2,
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                        categoryPercentage: 1,
                        barThickness: 2,
                        categoryPercentage: 0.1
                    }
                    ]
                },
                options: {
                    hover: {
                        mode: 'point',
                        intersect: true
                    },
                    tooltips: {
                        // mode: 'point',
                        // intersect: false,

                        // callbacks: {

                        //     title: function (tooltipItems, data) {
                        //         const date = data.datasets[tooltipItems[0].datasetIndex].data[tooltipItems[0].index].x;
                        //         return date ? date.toLocaleString() : '';
                        //     },
                        //     label: function (tooltipItem, data) {
                        //         console.log('toto');
                        //         return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel;
                        //     }
                        // }
                    },
                    // plugins: {
                    //     zoom: {
                    //         // Activation du zoom
                    //         zoom: {
                    //             enabled: true,  // Active le zoom
                    //             mode: 'x',  // Zoom seulement sur l'axe X
                    //             drag: true,  // Active le zoom par glissement de la souris
                    //         },
                    //         pan: {
                    //             enabled: false,  // Active le défilement
                    //             mode: 'x',  // Défilement seulement sur l'axe X
                    //         }
                    //     }
                    // },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: temporalite === 'day' ? 'hour' : 'day',
                                displayFormats: {
                                    hour: 'HH:mm', // Format de l'heure
                                    day: 'MMM D'   // Format du jour
                                },
                            },
                            ticks: {
                                maxTicksLimit: temporalite === 'day' ? 24 : 7,
                                min: temporalite === 'day' ? new Date(new Date().setHours(new Date().getHours() - 24)) : null, // Heure actuelle - 24 heures
                                max: temporalite === 'day' ? new Date() : null,
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            id: 'A',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                max: 2,
                                min: 0,
                                stepSize: 1,
                                callback: function (value) {
                                    switch (value) {
                                        case 1: return 'Alive';
                                        case 2: return 'Restart';
                                        default: return '';
                                    }
                                }
                            },
                            gridLines: {
                                display: true
                            }
                        }, {
                            display: false,
                            id: 'B',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                max: 2,
                                min: 0,
                                stepSize: 1
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                    },
                }
            });
        },
    },

    mounted() {
        this.createChart();

    },
    watch: {
        dataOrganAlive(newData) {
            this.createChart();
        },
        dataRestartOrgan(newData) {
            this.createChart();
        },
        // etiquettes(newLabels) {
        //     this.myChart.data.labels = newLabels;
        //     this.myChart.update();
        // },


    },
}
</script>

<style>
.chart-container {
    height: 70vh;
    position: relative;
}

.chart-container canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100% !important;
    height: 100% !important;
}
</style>