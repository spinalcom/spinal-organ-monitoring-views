<template>
    <v-app style="overflow: hidden;height: 155px;">
        <v-main style=" background-color: rgb(255, 255, 255);" >
            <!-- Ajoutez un style inline ici pour contrôler la largeur -->

            <div class="shadowbow"
                style="background-color: rgb(255, 255, 255); background-color: rgb(255, 255, 255); padding-left: 0px;padding-top: 2px;border-radius: 5px;height:155px;padding-right: 10px;">
                <canvas ref="myChart" style="width: 100%;"></canvas>
                <div style="font-size: 12px; padding-left: 5px;padding-top: 5px;color: rgb(118, 118, 118);">
                    Status of the last 24 hours
                </div>
            </div>
        </v-main>
    </v-app>
</template>


<script>
import { Chart } from "chart.js";
import 'chartjs-plugin-zoom';
export default {
    name: 'ChartComponent',
    data() {
        return {
            myChart: null
        };
    },
    props: ['dataOrganStatus'],
    mounted() {
        this.createChart();
    },
    methods: {
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
        createChart() {
            const ctx = this.$refs.myChart.getContext('2d');
            ctx.canvas.width = window.innerWidth - 100;
            ctx.canvas.height = 250;
            const filteredData = this.filterEdgePoints(this.dataOrganStatus);

            const data3 = filteredData.map(item => ({
                x: new Date(item.date),
                y: item.value ? 1 : 0
            }));

            console.log(data3, 'les dataLast24Hours  !!!!!!!!!!!!!!!!!');

            this.myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{ // Ajout de la propriété datasets
                        label: 'État de l\'organe',
                        data: data3,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: true,
                        backgroundColor: 'rgba(0, 195, 58, 0.172)',
                        steppedLine: true
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'day',
                                displayFormats: {
                                    hour: 'HH:mm',
                                    day: 'MMM D'
                                },
                            },
                            ticks: {
                                display: false,
                                maxTicksLimit: 24,
                                min: new Date(new Date().setHours(new Date().getHours() - 24)),
                                max: new Date()
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
                                max: 1,
                                min: 0,
                                stepSize: 1,
                                callback: function (value) {
                                    switch (value) {
                                        case 1: return 'Alive';
                                        case 0: return 'Down';
                                        default: return '';
                                    }
                                }
                            },
                            gridLines: {
                                display: true
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            });
        }
    },
    watch: {
        dataOrganStatus(newData) {
            this.createChart();
            console.log(newData, 'les datas');
        },



    },
    beforeDestroy() {
        if (this.myChart != null) {
            this.myChart.destroy(); // Détruire le graphique pour éviter les fuites de mémoire
        }
    }

};
</script>

<style>


.shadowbow{
    background-color: rgba(0, 195, 58, 0.672);
    /* box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset; */
}
/* Ajoutez ici le style de votre composant */
</style>