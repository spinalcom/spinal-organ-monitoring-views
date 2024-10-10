<template>
    <v-app>
        <v-main>

            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;"
                :title="'ORGAN DETAILS ' + timePeriod.toUpperCase()">
                <div class="chart-container">
                    <div v-if="timePeriod == 'day'" style="font-size: 20px;transform: translate(0,-15px);">{{
                        getDayWithDateFromOffset(dateNUmber)
                        }}</div>
                    <div v-else style="font-size: 20px;transform: translate(0,-15px);">Les 7 derniers jours</div>
                    <div @click="handleloading()"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 0px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 180px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        <v-progress-circular v-if="loading" :size="15" color="red" :width="3"
                            indeterminate></v-progress-circular>
                        <span v-if="!loading">Changer la temporalité</span>
                    </div>
                    <div @click="updateChartData();"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 190px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 40px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        <v-icon class="mx-1" color="white darken-2" dark>{{ reload }}</v-icon>
                    </div>
                    <div v-if="timePeriod == 'day'"  @click="changeTimePerdiode(-1);"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 320px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 40px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        J-1
                    </div>
                    <div v-if="timePeriod == 'day' && dateNUmber < 0"  @click="changeTimePerdiode(1);"
                        style="z-index: 99;cursor: pointer;position: absolute; right: 270px; border: 1px solid gray;padding: 10px;top: -25px;color: white;background-color: #14202C;border-radius: 5px;font-size: 15px;min-width: 40px;display: flex;justify-content: center;height: 36px;align-items: center;">
                        J+1
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
            dateNUmber: 0,
            myChart: null,
            loading: false,
            timePeriod: 'day',
            reload: 'mdi-reload',
            loader: false,
            startTime: null,
            endTime: null
        }
    },

    methods: {
        getDayWithDateFromOffset(dateNumber) {
            const daysOfWeek = [
                'dimanche',
                'lundi',
                'mardi',
                'mercredi',
                'jeudi',
                'vendredi',
                'samedi',
            ];

            const months = [
                'janvier',
                'février',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'août',
                'septembre',
                'octobre',
                'novembre',
                'décembre',
            ];

            // Crée une nouvelle date à partir d'aujourd'hui
            const today = new Date();

            // Ajoute le décalage
            today.setDate(today.getDate() + dateNumber);

            // Récupère le nom du jour, le numéro du jour, le mois et l'année
            const dayOfWeek = daysOfWeek[today.getDay()];
            const dayOfMonth = today.getDate();
            const month = months[today.getMonth()];
            const year = today.getFullYear();

            // Construit la chaîne de date complète
            return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
        },


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
            // this.updateChart();
            this.$emit('valueEmitted', this.timePeriod);
        },

        changeTimePerdiode(nbr) {
            this.dateNUmber = this.dateNUmber + nbr
        },

        determineDate(offset) {
            var currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + offset);
            this.$emit('emitedTime', currentDate);
        },

        completeTimeSeries() {
            const now = Date.now();
            const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
            const startDate = oneWeekAgo;
            const endDate = now;

            const completeData = [];
            let dataIndex = 0;

            for (let date = startDate; date <= endDate; date += 60000) {
                // Optimisation : Recherche continue dans dataOrganAlive pour éviter de répéter find()
                while (
                    dataIndex < this.dataOrganAlive.length &&
                    this.dataOrganAlive[dataIndex].date < date
                ) {
                    dataIndex++;
                }
                // Vérifier si l'élément actuel correspond à la minute en cours
                if (
                    dataIndex < this.dataOrganAlive.length &&
                    this.dataOrganAlive[dataIndex].date >= date &&
                    this.dataOrganAlive[dataIndex].date < date + 60000
                ) {
                    completeData.push(this.dataOrganAlive[dataIndex]);
                } else {
                    completeData.push({ date: date, value: false });
                }
            }
            return this.filterEdgePoints(completeData);
        },

        filterEdgePoints(data) {
            const edgePoints = [];
            const dataLength = data.length;

            // Trouver la première valeur d'edge point
            let firstEdgeValue = data[0].value;
            for (let i = 1; i < dataLength; i++) {
                if (data[i].value !== data[i - 1].value) {
                    firstEdgeValue = data[i].value;
                    break;
                }
            }

            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            edgePoints.push({ date: startOfDay.getTime(), value: firstEdgeValue });

            for (let i = 0; i < dataLength; i++) {
                // Ajouter les points de bord ou ceux qui diffèrent de leurs voisins
                if (
                    i === 0 || i === dataLength - 1 ||
                    data[i].value !== data[i - 1].value ||
                    data[i].value !== data[i + 1].value
                ) {
                    edgePoints.push(data[i]);
                }
            }

            return edgePoints;
        }


        ,

        roundToMinute(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        },

        updateChartData() {
            if (this.myChart) {
                this.myChart.destroy(); 
            }
            this.createChart();
        },
        createChart() {
            const ctx = this.$refs.myChart.getContext("2d");
            const temporalite = this.timePeriod;

            const filteredData = this.completeTimeSeries();
            let filteredDataForPeriod = null;
            let dataRestartOrganForPeriod = null;
            let dataOrganRAMForPeriod = null;

            if (temporalite === 'day') {
                const specificDay = this.dateNUmber;
                const now = new Date();
                const targetDate = new Date();
                targetDate.setDate(now.getDate() + specificDay);
                this.startTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
                this.endTime = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 1);

                filteredDataForPeriod = filteredData.filter(item => new Date(item.date) >= this.startTime && new Date(item.date) < this.endTime);
                dataRestartOrganForPeriod = this.dataRestartOrgan.filter(item => new Date(item.date) >= this.startTime && new Date(item.date) < this.endTime);
                dataOrganRAMForPeriod = this.dataOrganRAM.filter(item => new Date(item.date) >= this.startTime && new Date(item.date) < this.endTime);
            } else {
                filteredDataForPeriod = filteredData;
                dataRestartOrganForPeriod = this.dataRestartOrgan;
                dataOrganRAMForPeriod = this.dataOrganRAM;
            }

            const data = filteredDataForPeriod.map(item => ({
                x: new Date(item.date),
                y: item.value ? 1 : 0
            }));

            const data2 = dataRestartOrganForPeriod.map(item => ({
                x: new Date(item.date),
                y: item.value ? 2 : 0
            }));

            const data3 = dataOrganRAMForPeriod.map(item => ({
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
                            yAxisID: 'A'
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
                            yAxisID: 'y-axis-2', // Associer au bon axe Y
                            fill: false,
                            pointRadius: false,
                            borderWidth: 2.3
                        }
                    ]
                },
                options: {
                    animation: {
                        duration: 0
                    },
                    hover: {
                        mode: 'point',
                        intersect: true
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: temporalite === 'day' ? 'hour' : 'day',
                                displayFormats: {
                                    hour: 'HH:mm',
                                    day: 'MMM D'
                                }
                            },
                            ticks: {
                                maxTicksLimit: temporalite === 'day' ? 24 : 7,
                                min: temporalite === 'day' ? this.startTime : null,
                                max: temporalite === 'day' ? this.endTime : null
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
                                display: true,
                                ticks: {
                                    max: 2, // Fixer la valeur max
                                    min: 0, // Fixer la valeur min
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
                                id: 'B',
                                type: 'linear',
                                position: 'right',
                                display: false,
                                ticks: {
                                    max: 2, // Fixer la valeur max
                                    min: 0, // Fixer la valeur min
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
                                display: true,
                                gridLines: {
                                    drawOnChartArea: false
                                },
                                ticks: {
                                    max: this.dataOrganRAM.reduce((max, obj) => obj.value > max ? obj.value : max, this.dataOrganRAM[0].value) * 1.1,
                                    min: 0,
                                    callback: function (value, index, values) {
                                        return value.toFixed(1) + ' mo';
                                    }
                                }
                            }
                        ]
                    },
                    plugins: {
                        zoom: {
                            pan: {
                                enabled: false,
                                mode: 'x',
                                modifierKey: null, // Pas besoin de touche modificatrice
                                speed: 10, // Ajuste la vitesse de déplacement du panoramique avec le défilement
                            },

                            zoom: {
                                enabled: true,
                                mode: 'x',

                                drag: {
                                    enabled: true,
                                    borderColor: 'red',
                                    borderWidth: 3,
                                    backgroundColor: 'rgba(54, 162, 235, 0.15)'
                                },
                                wheel: {
                                    enabled: false
                                },
                                pinch: {
                                    enabled: false
                                }
                            }
                        }
                    }
                }
            });

            this.loader = true;
        }

        ,
    },

    mounted() {
        this.createChart();

    },
    watch: {
        dataOrganAlive(newData) {
            this.updateChartData();
        },
        dataRestartOrgan(newData, old) {
            this.updateChartData();
        },
        dataOrganRAM(newData) {
            this.updateChartData();
        },
        dateNUmber(newData) {
            this.determineDate(newData)
        }
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