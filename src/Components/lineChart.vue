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
                    <!-- <div
                        style="z-index: 99;cursor: pointer;position: absolute; right: 257px; border: 1px solid gray;padding: 10px;top: -25px;color: white;border-radius: 5px;font-size: 15px;min-width: 40px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        <v-switch label="RAM History"></v-switch>
                    </div> -->

                    <v-progress-circular v-if="loader == false"
                        style="position: absolute; left: 47%;top: 40%;transform: translate(-50%;-50%);" size="102"
                        :width="7" indeterminate color="primary"></v-progress-circular>


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
    props: ['dataRestartOrgan', 'dataOrganAlive', 'temporalite', 'dataOrganRAM'],
    components: {
        BackupInformation,
    },

    data() {
        return {
            myChart: null,
            loading: false,
            timePeriod: 'day',
            reload: 'mdi-reload',
            loader: false,
            test: [{ 'x': 1702996622417, 'y': 83 },
            { 'x': 1702993022417, 'y': 27 },
            { 'x': 1702989422417, 'y': 77 },
            { 'x': 1702985822417, 'y': 80 },
            { 'x': 1702982222417, 'y': 86 },
            { 'x': 1702978622417, 'y': 54 },
            { 'x': 1702975022417, 'y': 35 },
            { 'x': 1702971422417, 'y': 12 },
            { 'x': 1702967822417, 'y': 17 },
            { 'x': 1702964222417, 'y': 42 },
            { 'x': 1702960622417, 'y': 93 },
            { 'x': 1702957022417, 'y': 94 },
            { 'x': 1702953422417, 'y': 40 },
            { 'x': 1702949822417, 'y': 55 },
            { 'x': 1702946222417, 'y': 68 },
            { 'x': 1702942622417, 'y': 54 },
            { 'x': 1702939022417, 'y': 74 },
            { 'x': 1702935422417, 'y': 7 },
            { 'x': 1702931822417, 'y': 98 },
            { 'x': 1702928222417, 'y': 53 },
            { 'x': 1702924622417, 'y': 63 },
            { 'x': 1702921022417, 'y': 70 },
            { 'x': 1702917422417, 'y': 28 },
            { 'x': 1702913822417, 'y': 99 }]
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

            console.log(this.dataOrganRAM, 'LE BON ?');
            const data3 = this.dataOrganRAM.map(item => ({
                x: new Date(item.date),
                y: item.value
            }));

            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [
                        {
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
                            barThickness: 1.3,
                            categoryPercentage: 0.1
                        },
                        {
                            label: 'RAM',
                            data: data3,
                            backgroundColor: 'rgba(52, 121, 249, 0.043)',
                            borderColor: "rgba(52, 121, 249, 0.583)",
                            yAxisID: 'y-axis-2',
                            fill: false,
                            pointRadius: false,
                            borderWidth: 2.3,
                        }
                    ]
                },
                options: {
                    hover: {
                        mode: 'point',
                        intersect: true
                    },
                    tooltips: {

                    },

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
                        yAxes: [
                            {
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
                            },
                            {
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
                            },
                            {
                                id: 'y-axis-2',
                                type: 'linear',
                                position: 'right',
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    max: this.dataOrganRAM.reduce((max, obj) => obj.value > max ? obj.value : max, this.dataOrganRAM[0].value) * 1.1,
                                    min: 0,
                                    callback: function (value, index, values) {
                                        return value.toFixed(1) + ' mo'; // Limite à deux chiffres après la virgule et ajoute 'GB'
                                    }
                                    // stepSize: 1
                                },
                            }
                        ],
                    },
                }
            });

            this.loader = true
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
        dataOrganRAM(newData) {
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
    /* background-color: rgba(52, 121, 249, 0.583); */
}
</style>