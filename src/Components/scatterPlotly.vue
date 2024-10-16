<template>
    <div>
        <div ref="scatterPlot" style="width: 100%; min-width: 1000px"></div>
    </div>
</template>

<script>
import Plotly from 'plotly.js-basic-dist-min';


export default {
    name: 'ScatterPlot',
    props: {
        data: {
            type: Array,
            required: true
        }
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
            const dataHubOff = hubData.data
                .filter(entry => entry.value === 1)
                .map(entry => entry.date);

            const plotData = this.data.map(organ => {
                return {
                    x: organ.data.map(point => new Date(point.date)),
                    y: organ.data.map(() => organ.organName),
                    mode: 'markers',
                    type: 'scatter',
                    name: organ.organName
                };
            });

            const shapes = dataHubOff.map(item => {
                return {
                    type: 'line',
                    x0: item,
                    x1: item,
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
                    title: 'Organ Name',
                    automargin: true
                },
                height: 500,
                margin: {
                    l: 100,
                    r: 20,
                    b: 50,
                    t: 50
                },
                shapes: shapes,
            };

            Plotly.react(this.$refs.scatterPlot, plotData, layout);

        },

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
</style>