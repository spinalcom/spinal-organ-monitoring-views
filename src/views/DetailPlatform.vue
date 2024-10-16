<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD ORGAN'" :btn2Title="'EDIT PLATFORM '" :btn3Title="'DELETE PLATFORM'"
                v-on:btn1="showOrgan = true" v-on:btn2="displayEditPlatform" v-on:btn3="deletebtn()"
                title="PLATFORM INFORMATION" :title2="this.platform.name"
                :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">ID</span>
                        <span class=" bar-information">{{ this.platform.id }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class="bar-information">{{ this.platform.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ this.platform.type }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">PLATFORM TYPE</span>
                        <span class="bar-information">{{ this.platform.platformType }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">IP ADDRESS</span>
                        <span class="bar-information">{{ this.platform.ipAdress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">URL</span>
                        <span class="bar-information">{{ this.platform.url }}</span>
                    </div>
                </div>
            </InformationBar>

            <!-- <BachupInformation style="height: 100vh" title="ORGANS LIST"> -->
            <BackupInformation class="app" style="max-height: 74vh ; overflow: hidden;" title="ORGAN LIST">
                <Tabs :items="items">
                    <v-tab-item>
                        <input placeholder="Rechercher" class="input-search" label="Rechercher"
                            v-model="searchQuery"></input>
                        <div class="d-flex mb-2 mt-4">
                            <div style="width: 46%;margin-left: 10px;">Organs Name</div>
                            <div style="width: 46.5%;margin-left: 10px;">Last Health Time</div>
                            <div style="width: 46.5%;margin-left: 10px;">Status</div>
                            <div style="width: 50%">Id</div>
                        </div>
                        <div v-for="item in filteredOrganList" :key="item.id">
                            <div class="d-flex mb-2">
                                <div style="width: 100%" class="content-list">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ convertTimestampToDate(item.lastHealth) }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    <div style="height: 22px;color: white;background-color: rgb(31, 182, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(39, 160, 35);"
                                        v-if="item.status == 1">ON</div>
                                    <div style="height: 22px;color: white;background-color: rgb(209, 31, 31);display: flex; justify-content: center;align-items: center;width: 50px;border-radius: 10px;border: solid 2px rgb(177, 40, 40);"
                                        v-else>OFF</div>
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.id }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetail(item.id)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>
                    <v-tab-item>
                        <div style="display: flex;">


                            <!-- <v-date-input label="Date input"></v-date-input> -->

                            <!-- <div @click="changeDate('previous')"
                                style="border: 1px solid black ;margin: 3px; width: 50px;border-radius:5px ;display: flex ; justify-content: center ; align-items: center;height: 30px ; font-size: 15px;font-weight: bold; cursor: pointer;">
                                j-1
                            </div>
                            <div @click="changeDate('next')"
                                style="border: 1px solid black ;margin: 3px; width: 50px;border-radius:5px ;display: flex ; justify-content: center ; align-items: center;height: 30px ; font-size: 15px;font-weight: bold; cursor: pointer;">
                                j+1
                            </div> -->
                            <!-- <div style="display: flex;justify-content: center;align-items: center;margin-left: 20px;">
                                {{ formattedDate }}
                            </div> -->

                            <div
                                style="width: 100%;border: 1px solid black ;margin: 3px;border-radius:5px ;display: flex ; justify-content: center ; align-items: center;height: 30px ; font-size: 15px;font-weight: bold; cursor: pointer;">

                                <input type="date" name="todayDate" id="todayDate" v-model="todayDate"
                                    @change="changeDate">
                            </div>



                        </div>

                        <v-progress-circular v-if="isLoading" indeterminate color="primary"></v-progress-circular>

                        <v-data-table v-if="!isLoading" :headers="headers" :items="sortedOrganReboots"
                            :items-per-page="-1" class="elevation-1" :item-class="getRowClass">
                            <template v-slot:item="{ item }">
                                <tr
                                    :style="item.organName === 'Hub' ? { backgroundColor: 'rgb(31 182 31)', color: 'red' } : {}">
                                    <td :style="item.organName === 'Hub' ? { backgroundColor: 'rgba(197, 225, 113, 0.316)', color: 'red' } : {}"
                                        class="text-start">{{ item.organName }}</td>
                                    <td :style="item.organName === 'Hub' ? { backgroundColor: 'rgba(197, 225, 113, 0.316)', color: 'red' } : {}"
                                        class="text-start">{{ formatDate(item.date) }}</td>
                                </tr>
                            </template>
                        </v-data-table>
                    </v-tab-item>

                    <v-tab-item>
                        <!-- <scatterChart :data="organReboots" /> -->
                        <div
                                style="border: 1px solid black ;margin: 3px;border-radius:5px ;display: flex ; justify-content: center ; align-items: center;height: 30px ; font-size: 15px;font-weight: bold; cursor: pointer;">

                                <input type="date" name="todayDate" id="todayDate" v-model="todayDate"
                                    @change="changeDate">
                            </div>
                        <scatterPlotly :data="organReboots" />
                    </v-tab-item>

                </Tabs>
            </BackupInformation>



            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT PLATFORM</p>
                    <InputUser title="  PLATFORM NAME" id="userName" v-model="formPlatform.name" />
                    <span class="errors" v-if="$v.formPlatform.name.$error"> Platform Name is required</span>
                    <InputUser title="  PLATFORM TYPE" id="userName" v-model="formPlatform.platformType" />
                    <span class="errors" v-if="$v.formPlatform.platformType.$error"> Platform Type is required</span>
                    <InputUser title="  PLATFORM ipAdress" id="userName" v-model="formPlatform.ipAdress" />
                    <span class="errors" v-if="$v.formPlatform.ipAdress.$error"> Platform IP address is required</span>
                    <InputUser title="  PLATFORM loginAdmin" id="userName" v-model="formPlatform.loginAdmin" />
                    <span class="errors" v-if="$v.formPlatform.loginAdmin.$error"> Platform login admin is
                        required</span>
                    <InputUser title="  PLATFORM passwordAdmin" id="userName" v-model="formPlatform.passwordAdmin" />
                    <span class="errors" v-if="$v.formPlatform.passwordAdmin.$error"> Platform password admin is
                        required</span>
                    <div @click="editUserPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>
        </v-main>

        <!-- MODALE ADD Organ -->
        <div v-if="showOrgan" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="showOrgan = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD ORGAN</p>
                <InputUser v-model="formOrgan.name" title="PLATFORM NAME" id="userName" />
                <span class="errors" v-if="$v.formOrgan.name.$error"> Organ Name is required</span>
                <div @click="addOrgan()" class="mt-4 ml-1 popup-btn-ajouter">
                    <span>ADD</span>
                </div>
                <div @click="showOrgan = false" class="mt-4 ml-1 popup-btn-fermer">
                    <span>CLOSE</span>
                </div>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import InputUser from "../Components/InputUser";
import InformationBar from "../Components/InformationBar.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import BlueButton from "../Components/BlueButton.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import SelectUser from "../Components/SelectUser.vue";
import { mapActions, mapGetters } from "vuex";
import InputPass from "../Components/InputPassword.vue"
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { mapState } from 'vuex';
import scatterChart from "../Components/scatterChart.vue";
import scatterPlotly from "../Components/scatterPlotly.vue";
import { Chart } from 'chart.js';

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
        scatterChart,
        scatterPlotly
    },
    data() {
        return {


            items: [
                'ORGANS HUB',
                'ORGAN RESTART LIST',
                'RESTART ORGAN',
            ],
            searchQuery: '',
            formPlatform: {
                name: null,
                platformType: null,
                ipAdress: null,
                loginAdmin: null,
                passwordAdmin: null,
            },
            formOrgan: {
                name: null,
            },
            platformList: [],
            platform: {},
            show: false,
            showOrgan: false,
            headers: [
                { text: 'Organ Name', value: 'organName' },
                { text: 'Reboot Date', value: 'date' }
            ],
            organReboots: [],
            isLoading: true,
            date: new Date().toISOString().substr(0, 10),
            todayDate: this.getTodayDate()
        };

    },
    validations: {
        formPlatform: {
            name: {
                required,
            },
            platformType: {
                required,
            },
            ipAdress: {
                required,
            },
            loginAdmin: {
                required,
            },
            passwordAdmin: {
                required,
            },
        },
        formOrgan: {
            name: {
                required
            }
        },

    },
    methods: {
        getTodayDate() {
            const today = new Date();
            return today.toISOString().split("T")[0];
        },

        getRowClass(item) {
            return item.organName === 'Hub' ? 'green-row' : '';
        },
        convertTimestampToDate(timestamp) {
            var date = new Date(timestamp);
            return date.toLocaleDateString("fr-FR") + ' ' + date.toLocaleTimeString("fr-FR");
        },
        changeDate(direction) {
            let currentDate = new Date(this.date);

            // if (direction === 'previous') {
            //     currentDate.setDate(currentDate.getDate() - 1);
            //     this.date = currentDate
            // } else if (direction === 'next') {
            //     currentDate.setDate(currentDate.getDate() + 1);
            //     this.date = currentDate
            // }

            // console.warn(this.todayDate);
            let dateObject = new Date(this.todayDate);
            this.date = dateObject
            this.getOrganReboots();
        },


        displayEditPlatform() {
            this.show = true;
            this.formPlatform.name = this.platform.name
            this.formPlatform.platformType = this.platform.platformType
            this.formPlatform.ipAdress = this.platform.ipAdress
            this.formPlatform.loginAdmin = this.platform.loginAdmin
            this.formPlatform.passwordAdmin = this.platform.passwordAdmin
        },

        //CHANGE ROUTE
        displayDetail(id) {
            this.$router.push({ name: "DetailOrgan", query: { id: id } });
        },

        // VALIDE ELEMENT
        editUserPlatform() {
            this.$v.formPlatform.$touch();
            if (!this.$v.formPlatform.$invalid) {
                console.log('valid form');
                this.$store.dispatch('updatePlatform', {
                    PlatformId: this.$route.query.id,
                    PlatformData: this.formPlatform
                });
            }
        },
        addOrgan() {
            this.$v.formOrgan.$touch();
            if (!this.$v.formOrgan.$invalid) {
                console.log('valid form');

            }
        },

        deletebtn() {
            const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet organe ?");
            if (confirmed) {
                this.$store.dispatch('deletePlatform', {
                    platformId: this.$route.query.id,
                });
                this.$router.push("platforms");
            }
        },


        async getOrganReboots() {

            console.log(this.date);
            console.log(this.todayDate);

            const startOfDay = new Date(this.date).setHours(0, 0, 0, 0);
            const endOfDay = new Date(this.date).setHours(23, 59, 59, 999);

            if (!this.platform || !this.platform.organList) {
                console.error("Aucune liste d'organes disponible");
                this.isLoading = false; 
                return;
            }

            const promises = this.platform.organList.map((organ) => {
                return this.$store.dispatch('getOrganReboot', {
                    organId: organ.id,
                    begin: startOfDay,
                    end: endOfDay,
                }).then((response) => ({
                    organName: organ.name,
                    data: response || []
                })).catch(error => ({
                    organName: organ.name,
                    data: [],
                    error
                }));
            });

            try {
                const rebootsByOrgan = await Promise.all(promises);
                this.organReboots = rebootsByOrgan;
                console.log(this.organReboots);

            } catch (error) {
                console.error('Erreur lors de la récupération des reboots : ', error);
            } finally {
                this.isLoading = false;
            }
        }
        ,


        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        }


    },
    mounted() {
        this.$store.dispatch('getPlatformList');
        // this.date = new Date();
        changeDate()
        this.getOrganReboots();

    },
    computed: {
        ...mapState(['CurrentPlatform']),
        ...mapState(['PlatformList']),
        filteredOrganList() {
            return this.platform.organList.filter(item => {
                const searchStr = this.searchQuery.toLowerCase();
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchStr)
                );
            });
        },
        sortedOrganReboots() {
            if (!this.organReboots || this.organReboots.length === 0) {
                return [];
            }

            return this.organReboots.flatMap(organ =>
                (organ.data || []).map(reboot => ({
                    organName: organ.organName,
                    date: reboot.date
                }))
            ).sort((a, b) => a.date - b.date); // Tri par timestamp (du plus ancien au plus récent)
        },
        formattedDate() {
            const date = new Date(this.date);
            return date.toLocaleDateString("fr-FR", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

    },
    watch: {
        PlatformList(newList) {
            this.platformList = newList;
            this.platformList.forEach(platform => {
                if (platform.id === this.$route.query.id) {
                    this.platform = platform;
                    this.getOrganReboots()

                }

            });
        }
    },
    created() {
    }
}
</script>

<style scoped>
*:focus {
    outline: none;
}

.input-search {
    background-color: white;
    width: 200px;
    height: 40px;
    min-height: 40px;
    font-size: 15px;
    border: 1px solid rgb(187, 187, 187);
    padding-left: 5px;
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