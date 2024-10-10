<template>
    <div v-if="modal"  @click="cancelmodal" class="validation-bar"
        :style="{ backgroundColor: 'white' }">
        {{ InformationText }}
        <v-icon v-if="color == 'green'" style="position: absolute;right: 10px;color: greenyellow;" size="60">mdi-check-circle</v-icon>
        <v-icon v-if="color == 'red'"  style="position: absolute;right: 10px;color: red;"  size="60">mdi-close-circle</v-icon>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
export default {

    name: "card-menu",
    data() {
        return {
        }
    },
    methods: {
        cancelmodal(){
            this.$store.commit('setInformationTextFalse');
        }

    },
    computed: {
        ...mapState(['InformationText']),
        ...mapState(['modal']),
        ...mapState(['color']),
    },

    watch: {
        modal(newmodal) {
            //mettre le modal a false au bout de 2 sec 
            setTimeout(() => {
                // Appeler la mutation Vuex pour fermer le modal
                this.$store.commit('setInformationTextFalse');
            }, 2000); // 3 secondes
        },

    }
}

</script>
  
<style>
.validation-bar {
    font: normal normal normal 10px/12px Charlevoix Pro;
    letter-spacing: 1px;
    font-size: 20px;
    color: rgb(44, 44, 44);
    display: flex;
    cursor: pointer;
    /* justify-content: center; */
    padding-left: 20px;
    text-align: left;
    align-items: center;
    width: 400px;
    height: 80px;
    border: 1px solid rgb(255, 255, 255);
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translate(-50%);
    border-radius: 5px;
    /* font-weight: bold; */
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    -webkit-animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    background-color: rgb(231, 144, 144);
}

@-webkit-keyframes slide-in-top {
    0% {
        -webkit-transform: translateY(-1000px);
        transform: translateY(-1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes slide-in-top {
    0% {
        -webkit-transform: translate(-50%, -1000px);
        transform: translate(-50%, -1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0);
        opacity: 1;
    }
}
</style>