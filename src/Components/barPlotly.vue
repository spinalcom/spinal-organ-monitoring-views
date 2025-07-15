<template>
    <div ref="plotContainer"></div>
</template>

<script>
import Plotly from 'plotly.js-basic-dist-min';

export default {
    name: 'barPlotly',
    props: {
        data: {
            type: Array,
            required: true,
        }
    },
    mounted() {
        this.renderPlot();
    },
    watch: {
        data: {
            handler() {
                this.renderPlot();
            },
            deep: true
        }
    },
    methods: {
        renderPlot() {
            const x = this.data.map(item => item.date);
            const y = this.data.map(item => item.count);

            // Moyenne globale
            // Moyenne réelle (uniquement jours avec redémarrages > 0)
            const validCounts = y.filter(val => val > 0);
            const sum = validCounts.reduce((acc, val) => acc + val, 0);
            const avg = validCounts.length > 0 ? sum / validCounts.length : 0;
            const avgLine = new Array(y.length).fill(avg);

            const barTrace = {
                x,
                y,
                type: 'bar',
                name: 'Redémarrages',
                marker: {
                    color: 'rgb(55, 83, 109)'
                }
            };

            const avgTrace = {
                x,
                y: avgLine,
                type: 'scatter',
                mode: 'lines',
                name: `Norme moyenne (${Math.round(avg)})`,
                line: {
                    color: 'red',
                    dash: 'dot'
                }
            };

            const layout = {
                title: 'Nombre de redémarrages par jour',
                xaxis: {
                    title: 'Date',
                    tickangle: -45
                },
                yaxis: {
                    title: 'Redémarrages'
                },
                margin: {
                    l: 50,
                    r: 30,
                    b: 100,
                    t: 50,
                    pad: 4
                },
                legend: {
                    orientation: 'h',
                    x: 0,
                    y: -0.3
                }
            };

            Plotly.newPlot(this.$refs.plotContainer, [barTrace, avgTrace], layout, { responsive: true });
        }

    }
};
</script>

<style scoped>
/* optionally force a min height */
div {
  width: 100%;
  min-height: 600px;
}
</style>