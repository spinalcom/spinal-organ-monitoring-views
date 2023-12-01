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
                <BlueButton @click.native="show = true" :icon="'mdi-plus'" title="ADD ORGAN" :val="'blue'" />
            </v-card>
        </div>
        <BachupInformation style="height: 100vh" title="ORGANS LIST">
            <Tabs :items="items">
                <v-tab-item>
                    <div style="margin-top: 20px !important " class="d-flex mb-2 mt-4 ml-2">
                        <div style="width: 20%;margin-left: 5px;">Name</div>
                        <div style="width: 21%">Type</div>
                        <div style="width: 21%">Status</div>
                        <div style="width: 21%">Last Health Time</div>
                        <div style="width: 24%">Ip address</div>
                        <!-- <div style="width: 100%">ADD/DELETE</div> -->
                    </div>
                    <div v-for="item in this.Organ" :key="item.id">
                        <div v-if="item.organType == 'api server'" class="d-flex mb-2">
                            <div style="width: 100%" class="content-list">
                                {{ item.name }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.type }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                <div style="height: 22px;color: white;background-color: rgb(31, 182, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(39, 160, 35);"
                                    v-if="item.status == 'on'">ON</div>
                                <div style="height: 22px;color: white;background-color: rgb(209, 31, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(177, 40, 40);"
                                    v-else>OFF</div>
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.last_health_time }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.ip_adress }}
                            </div>
                            <div class="content-list rounded-r-lg hover">
                                <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                                    <v-icon>mdi-arrow-right</v-icon>
                                    <v-progress-circular v-if="clicked" indeterminate color="primary"></v-progress-circular>
                                </button>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div class="d-flex mb-2 mt-4 ml-2">
                        <div style="width: 20%;margin-left: 5px;">Name</div>
                        <div style="width: 21%">Type</div>
                        <div style="width: 21%">Status</div>
                        <div style="width: 21%">Last Health Time</div>
                        <div style="width: 24%">Ip address</div>
                        <!-- <div style="width: 100%">ADD/DELETE</div> -->
                    </div>

                    <div v-for="item in this.Organ" :key="item.id">
                        <div v-if="item.organType == 'hub'" class="d-flex mb-2">
                            <div style="width: 100%" class="content-list">
                                {{ item.name }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.type }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                <div style="height: 22px;color: white;background-color: rgb(31, 182, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(39, 160, 35);"
                                    v-if="item.status == 'on'">ON</div>
                                <div style="height: 22px;color: white;background-color: rgb(209, 31, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(177, 40, 40);"
                                    v-else>OFF</div>
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.last_health_time }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.ip_adress }}
                            </div>
                            <div class="content-list rounded-r-lg hover">
                                <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                                    <v-icon>mdi-arrow-right</v-icon>
                                    <v-progress-circular v-if="clicked" indeterminate color="primary"></v-progress-circular>
                                </button>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
                <v-tab-item>
                    <div class="d-flex mb-2 mt-4 ml-2">
                        <div style="width: 20%;margin-left: 5px;">Name</div>
                        <div style="width: 21%">Type</div>
                        <div style="width: 21%">Status</div>
                        <div style="width: 21%">Last Health Time</div>
                        <div style="width: 24%">Ip address</div>
                        <!-- <div style="width: 100%">ADD/DELETE</div> -->
                    </div>

                    <div v-for="item in this.Organ" :key="item.id">
                        <div v-if="item.organType != 'hub' && item.organType != 'api server'" class="d-flex mb-2">
                            <div style="width: 100%" class="content-list">
                                {{ item.name }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.type }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                <div style="height: 22px;color: white;background-color: rgb(31, 182, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(39, 160, 35);"
                                    v-if="item.status == 'on'">ON</div>
                                <div style="height: 22px;color: white;background-color: rgb(209, 31, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(177, 40, 40);"
                                    v-else>OFF</div>
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.last_health_time }}
                            </div>
                            <div style="width: 100%" class="content-list">
                                {{ item.ip_adress }}
                            </div>
                            <div class="content-list rounded-r-lg hover">
                                <button class="pr-2" style="height: 100%" @click="displayDetail(item);">
                                    <v-icon v-if="!clicked">mdi-arrow-right</v-icon>
                                    <v-progress-circular v-if="clicked" indeterminate size="25"
                                        color="black"></v-progress-circular>
                                </button>
                            </div>
                        </div>
                    </div>
                </v-tab-item>
            </Tabs>
        </BachupInformation>

        <div v-if="show" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="show = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD ORGAN</p>
                <InputUser v-model="formOrgan.name" title="  ORGAN NAME" id="name" />
                <span class="errors" v-if="$v.formOrgan.name.$error"> Organ Name is required</span>
                <InputUser v-model="formOrgan.mac_adress" title="MAC ADDRESS" id="mac_address" />
                <span class="errors" v-if="$v.formOrgan.mac_adress.$error"> Organ mac_address is required</span>
                <InputUser v-model="formOrgan.ip_adress" title="  IP ADDRESS" id="ip_address" />
                <span class="errors" v-if="$v.formOrgan.ip_adress.$error"> Organ ip is required</span>
                <InputUser v-model="formOrgan.type" title=" ORGAN TYPE" id="type" />
                <span class="errors" v-if="$v.formOrgan.type.$error"> Organ type is required</span>
                <InputUser v-model="formOrgan.bosId" title=" ORGAN BOS ID" id="type" />
                <span class="errors" v-if="$v.formOrgan.bosId.$error"> Organ BOS Id is required</span>
                <InputUser v-model="formOrgan.PlatformId" title=" ORGAN BOS ID" id="type" />
                <span class="errors" v-if="$v.formOrgan.PlatformId.$error"> Organ Platform Id is required</span>
                <div @click="addOrgan()" class="mt-4 ml-1 popup-btn-ajouter">
                    <span>ADD</span>
                </div>
                <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                    <span>CLOSE</span>
                </div>
            </v-card>
        </div>

    </v-app>
</template>
  
<script>
import BlueButton from "../Components/BlueButton.vue"
import StatutButton from "../Components/StatutButton.vue"
import InputUser from "../Components/InputUser.vue"
import BachupInformation from "../Components/BackupInformation.vue"
import StateButton from "../Components/StateButton.vue"
import InputPassword from "../Components/InputPassword.vue"
import Tabs from "../Components/Tabs.vue";
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { mapState } from 'vuex';


export default {
    name: "App",
    components: {
        BlueButton,
        BachupInformation,
        StatutButton,
        InputUser,
        StateButton,
        InputPassword,
        Tabs,
    },
    data: () => ({
        // token: "",
        clicked: false,
        formOrgan: {
            name: null,
            mac_adress: null,
            ip_adress: null,
            type: null,
            bosId: null,
            PlatformId: null,
        },
        show: false,
        items: [
            'ORGANS API SERVER',
            'ORGANS HUB',
            'OTHERS ORGANS',
        ],
        Organ: [
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                organType: 'hub',
                "status": "off",
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 1"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                organType: 'hub',
                "status": "on",
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 1"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                organType: 'hub',
                "status": "on",
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 1"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "off",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "off",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            }, {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            }, {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            }, {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'api server',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 4"
            },
            {
                "name": "OrganTest",
                "type": "MonitoringServiceOrgan",
                "status": "on",
                organType: 'other',
                "ip_adress": "<string>",
                "id": "22de-f0e9-149e-18adc719527",
                last_health_time: "test 2 "
            },

        ],
    }),
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
            },
            bosId: {
                required,
            },
            PlatformId: {
                required,
            }
        },
    },

    methods: {
        AddOrgan() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                //ici ajout organ !
                location.reload();
            }
        },

        displayDetail(item) {
            this.clicked = true;
            setTimeout(() => {
                this.$router.push({ name: "DetailOrgan", query: { id: item.id } });
            }, 0);

        },
    },
    computed: {
        ...mapState(['OrganList'])
    },
    created() {
    },
    mounted() {
        this.$store.dispatch('getOrganList');
    },
    watch: {
        OrganList(newList) {
            this.Organ = newList;
            console.log(this.Organ);
        }
    },
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

.popup_platform {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    backdrop-filter: blur(5px);
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

.errors {
    margin: 0;
    transform: translate(0, -10%);
    font-size: 10px;
    color: red;
    padding-left: 2px;
    letter-spacing: 1.1px;
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
</style>
