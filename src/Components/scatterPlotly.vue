<template>
    <div>
        <button class="toto" @click="importCSV" style="">Import
            CSV</button>
        <div ref="scatterPlot" style="width: 100%; min-width: 1000px"></div>
    </div>
</template>

<script>
import Plotly from 'plotly.js-basic-dist-min';
import Papa from 'papaparse';

export default {
    name: 'ScatterPlot',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            importedShapes: [],
            nanPing: [],
        };
    },
    mounted() {
        this.drawScatterPlot();
    },
    watch: {
        data: {
            handler() {
                this.drawScatterPlot();
            },
            deep: true
        }
    },
    methods: {
        drawScatterPlot() {
            const hubData = this.data.find(item => item.organName === "Hub");
            const nanPing = this.nanPing;
            const dataHubOff = hubData ? hubData.data
                .filter(entry => entry.value === 1)
                .map(entry => entry.date) : [];

            const plotData = this.data.map(organ => {
                return {
                    x: organ.data.map(point => new Date(point.date)),
                    y: organ.data.map(() => organ.organName),
                    mode: 'markers',
                    type: 'scatter',
                    name: organ.organName
                };
            });


            const shapeNan = nanPing.map(item => {
                return {
                    type: 'line',
                    x0: item.date,
                    x1: item.date,
                    yref: 'paper',
                    y0: 0,
                    y1: 1,
                    line: {
                        color: 'rgba(39, 118, 245, 0.38)',
                        width: 2,
                        // dash: 'dot'
                    }
                };
            })

            const shapes = dataHubOff.map(item => {
                return {
                    type: 'line',
                    x0: new Date(item),
                    x1: new Date(item),
                    yref: 'paper',
                    y0: 0,
                    y1: 1,
                    line: {
                        color: 'red',
                        width: 2,
                        dash: 'dot'
                    }
                };
            });

            const allShapes = [
                ...shapeNan,
                ...shapes,
            ];

            // Add shapes for NaN values in imported CSV
            if (this.importedShapes.length > 0) {
                shapes.push(...this.importedShapes);
            }

            const layout = {
                showlegend: false,
                title: 'Redémarrage des organes de la plateforme',
                xaxis: {
                    rangeslider: {
                        visible: true,
                        bordercolor: 'black',
                        borderwidth: 1,
                    }
                },
                yaxis: {
                    automargin: true
                },
                height: 500,
                margin: {
                    l: 100,
                    r: 20,
                    b: 50,
                    t: 50
                },
                shapes: allShapes,
            };

            Plotly.react(this.$refs.scatterPlot, plotData, layout);
        },
        importCSV() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv';
            input.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    Papa.parse(file, {
                        header: false,
                        skipEmptyLines: true,
                        complete: (results) => {
                            this.processImportedData(results.data);
                        }
                    });
                }
            });
            input.click();
        },
        processImportedData(data) {
            const importedShapes = [];
            const nanDates = [];
            // console.log(data);

            data.forEach(row => {
                const values = row[1];
                const date = row[0];


                if (values.includes('NaN')) {
                    nanDates.push(values);
                    console.log(nanDates);
                }
            });

            console.log();


            const parsedData = this.parseTimesWithTodayDate(nanDates);

            console.log(parsedData);
            this.nanPing = parsedData;

            this.drawScatterPlot();

        },


        parseTimesWithTodayDate(data) {
            const result = [];
            const today = new Date();

            data.forEach(entry => {
                const [time, value] = entry.split(';');
                const match = time.trim().match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);

                if (match) {
                    const hours = parseInt(match[1]);
                    const minutes = parseInt(match[2]);
                    const seconds = parseInt(match[3]);
                    const period = match[4].toUpperCase();

                    let formattedHours = hours;
                    if (period === 'PM' && hours !== 12) {
                        formattedHours += 12;
                    } else if (period === 'AM' && hours === 12) {
                        formattedHours = 0; // Minuit
                    }

                    const formattedDate = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                        formattedHours,
                        minutes,
                        seconds
                    );

                    result.push({ date: formattedDate, value });
                }
            });

            return result;
        }

    }
};
</script>

<style scoped>
#scatterPlot {
    width: 800px;
}

.rangeslider-container {
    border: 1px solid black !important;
}

.toto {
    margin-bottom: 10px;
    border: 1px solid black;
    padding: 5px;
    margin-left: 4px;
    font-size: 15px;
    border-radius: 5px;
    background-color: white;
    transition: 0.3s
}

.toto:hover {
    background-color: rgb(211, 211, 211);
}
</style>
