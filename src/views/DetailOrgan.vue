<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD ?'" :btn2Title="'EDIT ORGAN'" :btn3Title="'DELETE ORGAN'"
                v-on:btn1="show = true" v-on:btn2="show = true" v-on:btn3="deletebtn()" title="ORGAN INFORMATION"
                :title2="this.organ.name" :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class=" bar-information">{{ this.organ.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ this.organ.type }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">IP ADDRESS</span>
                        <span class="bar-information">{{ this.organ.ip_adress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">MAC ADDRESS</span>
                        <span class="bar-information">{{ this.organ.mac_adress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">PLATFORM ID</span>
                        <span class="bar-information">{{ this.organ.platformId }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">status</span>
                        <div v-if="this.organ.status == 'off'"
                            style="background-color: rgb(202, 36, 36);color: white; border-radius: 10px; height: 18px;display: flex;justify-content: center;align-items: center;font-size: 10px;transform: translate(0,-2px);">
                            OFF</div>
                        <div v-if="this.organ.status == 'on'"
                            style="background-color: rgb(49, 204, 49);color: white; border-radius: 10px; height: 18px;display: flex;justify-content: center;align-items: center;font-size: 10px;transform: translate(0,-2px);">
                            ON</div>
                    </div>
                </div>
            </InformationBar>

            <!-- LINE CHART  entrer 'week' ou 'day' -->
            <linechart v-if="this.dataOrganAlive != []" :dataRestartOrgan="dataRestartOrgan"
                :dataOrganAlive="dataOrganAlive" :temporalite="temp" @valueEmitted="handleValueEmitted" />


            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT ORGAN</p>
                    <InputUser v-model="formOrgan.name" title="  ORGAN NAME" id="name" />
                    <span class="errors" v-if="$v.formOrgan.name.$error"> Organ Name is required</span>
                    <InputUser v-model="formOrgan.mac_adress" title="MAC ADDRESS" id="mac_address" />
                    <span class="errors" v-if="$v.formOrgan.mac_adress.$error"> Organ mac_adress is required</span>
                    <InputUser v-model="formOrgan.ip_adress" title="  IP ADDRESS" id="ip_address" />
                    <span class="errors" v-if="$v.formOrgan.ip_adress.$error"> Organ ip_address is required</span>
                    <InputUser v-model="formOrgan.type" title="  IP ADDRESS" id="ip_address" />
                    <span class="errors" v-if="$v.formOrgan.type.$error"> Organ type is required</span>
                    <div @click="editUserPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>
        </v-main>
    </v-app>
</template>
  
<script>
import InputUser from "../Components/InputUser";
import InformationBar from "../Components/InformationBar.vue";
import linechart from "../Components/lineChart.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import BlueButton from "../Components/BlueButton.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import SelectUser from "../Components/SelectUser.vue";
import InputPass from "../Components/InputPassword.vue"
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { mapState } from 'vuex';

export default {

    name: "App",
    components: {
        InformationBar,
        BackupInformation,
        Tabs,
        FiltreBar,
        SelectUser,
        BlueButton,
        InputPass,
        InputUser,
        linechart

    },
    data() {
        return {
            temp: 'day',
            presentTempo: 'day',
            formOrgan: {
                name: null,
                mac_adress: null,
                ip_adress: null,
                type: null
            },
            organ: {
                "id": "id de l organe",
                "bosId": "id du boss",
                "name": "noms de l'organ",
                "type": "type de l'organ",
                "mac_adress": "mac address",
                "ip_adress": "ip address",
                "organType": "organ type",
                "platformId": "id de la platform",
                "status": "off",
            },

            show: false,
            dataRestartOrgan: [
            ],
            dataOrganAlive: [],
        };

    },
    validations: {
        formOrgan: {
            name: {
                required,
            },
            mac_adress: {
                required,
            },
            ip_adress: {
                required,
            },
            type: {
                required,
            }
        },
    },
    methods: {
        handleValueEmitted(value) {
            // console.log('Valeur reçue du composant linechart :', value);
            // Traitez la valeur ici
            this.presentTempo = value
        },
        //VALIDE ELEMENT
        editUserPlatform() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                console.log('valid form');
            }
        },

        //DELETE ELEMENT
        deletebtn() {
            const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet organe ?");
            if (confirmed) {
                this.$store.dispatch('deleteOrgan', {
                    organId: this.$route.query.id,
                });
                this.$router.push("organ");
            }
        },

    },

    computed: {
        ...mapState(['CurrentOrgan']),
        ...mapState(['OrganHealth']),
        ...mapState(['OrganReboot'])
    },

    mounted() {
        this.$store.dispatch('getOrgan', {
            organId: this.$route.query.id,
        });

        const now = Date.now(); // Obtient le timestamp actuel en millisecondes
        let twentyFourHoursAgo = now - (24 * 60 * 60 * 1000);

        if (this.presentTempo == 'week') {
            twentyFourHoursAgo = now - (7 * 24 * 60 * 60 * 1000);
        }

        this.$store.dispatch('gettoto', {
            organId: this.$route.query.id,
            begin: twentyFourHoursAgo,
            end: now,
        });

        this.$store.dispatch('getOrganReboot', {
            organId: this.$route.query.id,
            begin: twentyFourHoursAgo,
            end: now,
        });

    },
    watch: {

        etiquettes(newLabels) {
            this.myChart.data.labels = newLabels;
            this.myChart.update();
        },
        CurrentOrgan(newOrgan) {
            this.organ = newOrgan
            // console.log(this.organ , 'le reste');
        },
        OrganHealth(newData) {
            this.dataOrganAlive = newData;
            // console.log('tata', this.dataOrganAlive);
        },
        OrganReboot(newData) {
            this.dataRestartOrgan = newData;
            // console.log('toto', this.dataRestartOrgan);
        }

    },
}
</script>
  
<style scoped>
*:focus {
    outline: none;
}

.errors {
    margin: 0;
    /* position: absolute; */
    transform: translate(0, -10%);
    font-size: 10px;
    color: red;
    padding-left: 2px;
    letter-spacing: 1.1px;
}

.app {
    font: normal normal normal 10px/12px Charlevoix Pro;
    letter-spacing: 1px;
    background: #eeeeee00;
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

.v-application {
    background: #eeeeee00;
}

.reset_btn {
    width: 100%;
    /* background-color: red; */
    position: absolute;
    top: -65px;
    display: flex;
    justify-content: end;
    min-width: 980px;
}



.v-data-table>>>td {
    background-color: white;
    border-top: 10px solid #F7F7F7;
    border-bottom: solid 0px black !important;
    height: 60px !important;
    font-size: 11px !important;
}

#content>div>main>div>div.d-flex.flex-column.rounded-lg.backup-bar.v-card.v-sheet.theme--light.elevation-2>div.v-tabs.v-tabs--grow.theme--light>div.v-window.v-item-group.theme--light.v-tabs-items>div>div.v-window-item.v-window-item--active>div>div>div.v-card__title>div {
    margin-top: 0;
    padding-top: 0;
}

.v-data-table>>>th {
    background: #F7F7F7 !important;
}

#content>div>main>div>div.d-flex.flex-column.rounded-lg.backup-bar.v-card.v-sheet.theme--light.elevation-2>div.v-tabs.v-tabs--grow.theme--light>div.v-window.v-item-group.theme--light.v-tabs-items>div>div.v-window-item.v-window-item--active>div>div>div.v-card__title {
    padding: 10px;
    background-color: white;
    border: 1px solid #E3E7E8;
    border-radius: 6px;
}

.bar-chart {
    height: 400px;
}


.sub-division {
    display: flex;
    flex-direction: column;
    width: 20%;
}

.bar-sub-title {
    color: #949DA6;
    margin-bottom: 6px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 11px;
    letter-spacing: 1.1px;
}

.bar-information {
    margin-bottom: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    letter-spacing: 1.3px;
    font-size: 11px;
    color: #14202C;

}

.information-backup-bar2 {
    background: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 9px;
    letter-spacing: 0.9px;
    height: 50px;
    margin-bottom: 3px;
    margin-top: 2px;
    margin-left: 1px;
    padding-left: 8px;
}

.btn-creer {
    min-height: 35px;
    border: 0px;
    padding-left: 30px;
    padding-right: 30px;
    background: #14202C;
    border-radius: 6px;
    color: white;
    /* margin-left: 5px; */
    margin-top: 20px;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;

}

.choix_platform {
    width: 99%;
    height: 150px;
    background-color: #EAEEF0;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
}

.popup {
    position: absolute;
    width: 615px;
    /* height: 280px; */
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 10px;
    font-family: Arial, Helvetica, sans-serif;
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
    bottom: 10px;
    right: 10px;
    width: 145px;
    height: 40px;
    background-color: #14202C;
    border-radius: 6px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
}

.popup-btn-ajouter {
    position: absolute;
    left: 49%;
    bottom: 10px;
    width: 145px;
    height: 40px;
    background-color: #14202C;
    border-radius: 6px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
}

.popup-btn-copier {
    position: absolute;
    left: 23%;
    bottom: 10px;
    width: 145px;
    height: 40px;
    background-color: #14202C;
    border-radius: 6px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font: normal normal normal 11px/13px Charlevoix Pro;
    letter-spacing: 1.1px;
}

.popup_platform {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    backdrop-filter: blur(5px);
}
</style>