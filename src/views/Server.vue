<template>
    <v-app class="app">
        <div class="d-flex justify-end" style="width: 100%; min-width: 980px">
            <v-card class="
          d-flex
          flex-column
          ml-2
          pl-1
          pt-1
          pb-1
          pr-1
          justify-center
          rounded-lg
        " elevation="2">
                <BlueButton @click.native="AddServer()" :icon="'mdi-plus'" title="ADD SERVER" :val="'blue'" />
            </v-card>
        </div>
        <BachupInformation title="SERVER LIST">
            <div class="d-flex mb-2 mt-4">
                <div style="width: 20%">Server Id</div>
                <div style="width: 20%">Server Name</div>
                <div style="width: 20%">ip Address </div>
                <div style="width: 20%">mac Address</div>
                <div style="width: 20%">sshLogin</div>
                <div style="width: 20%">sshPassword</div>
                <div style="width: 23%">last_health_time</div>
            </div>

            <div v-for="item in this.server" :key="item.id">

                <div class="d-flex mb-2">
                    <div style="width: 20%" class="content-list rounded-l-lg pl-2">
                        {{ item.id }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.name }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.ipAdress }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.macAdress }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.sshLogin }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.sshPassword }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.last_health_time }}
                    </div>
                    <div class="content-list rounded-r-lg hover">
                        <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                            <v-icon>mdi-arrow-right</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </BachupInformation>
    </v-app>
</template>
  
<script>
import BlueButton from "../Components/BlueButton.vue"
import StatutButton from "../Components/StatutButton.vue"
import InputUser from "../Components/InputUser.vue"
import BachupInformation from "../Components/BackupInformation.vue"
import StateButton from "../Components/StateButton.vue"
import InputPassword from "../Components/InputPassword.vue"
import { mapActions, mapGetters } from "vuex";

export default {
    name: "App",
    components: {
        BlueButton,
        BachupInformation,
        StatutButton,
        InputUser,
        StateButton,
        InputPassword
    },
    data: () => ({
        server: [{
            "id": "id du server",
            "type": "type du server",
            "name": "le nom du server",
            "ipAdress": "adresse ip du server",
            "macAdress": "mac adresse",
            "sshLogin": "ssh login",
            "sshPassword": "ssh password",
            "boot_timestamp": "boot times tamp",
            "last_health_time": "last health time",
            "serverType": "servertype",
        }],
    }),

    methods: {
        AddServer(item) {
            this.$router.push({ name: "AddServer" });
        },
        
        displayDetail(item) {
            this.$router.push({ name: "DetailServer", query: { id: item.id } });
        },
    },
    computed: {
      
    },
    created() {
    }
}
</script>
  
<style scoped >
.app {
    font: normal normal normal 10px/12px Charlevoix Pro;
    letter-spacing: 1px;
    background: #ffffff00;
}

.popup-back {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    backdrop-filter: blur(5px);
}

.popup {
    position: relative;
    width: 415px;
    height: 269px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -100%);
    left: 50%;
    top: 50%;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
}

.btn-valider-user {
    background-color: #ffffff;
    height: 100%;
    display: flex;
    align-items: center;
    min-height: 50px;
    padding-left: 10px;
    font: normal normal normal 12px/14px Charlevoix Pro;
    letter-spacing: 1.2px;
    margin: 1px;
}

.sub-division {
    display: flex;
    flex-direction: column;
    width: 15%;
}

.popup-closebtn {
    top: 7px;
    right: 7px;
    width: 40px;
    height: 40px;
    border: 2px solid #E9ECEE;
    opacity: 1;
    position: absolute;
    border-radius: 6px !important;
    justify-content: center;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    cursor: pointer;
}

.popup-btn-fermer {
    position: absolute;
    left: 60%;
    top: 75%;
    width: 145px;
    height: 40px;
    background-color: #14202C;
    border-radius: 6px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.content-list {
    border: 1px solid rgba(216, 216, 216, 0.623);
    background-color: #ffffff;
    display: flex;
    align-items: center;
    min-height: 50px;
    padding-left: 10px;
    font: normal normal normal 12px/14px Charlevoix Pro;
    letter-spacing: 1.2px;
    margin: 1px;
    flex-wrap: wrap;
}

.hover:hover {
    background: rgb(228, 228, 228);
    transition: 0.3s;
}
</style>
