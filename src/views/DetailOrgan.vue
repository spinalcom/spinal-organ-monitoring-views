<template>
    <v-app>
        <v-main>
            <button @click="generateTimeSeries()">toto</button>
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

            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;" title="CUSTOMER DETAILS">
                <canvas style="height: 60vh;z-index: ;" ref="myChart"></canvas>
            </BackupInformation>
            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT ORGAN</p>
                    <InputUser v-model="formOrgan.name" title="  ORGAN NAME" id="name" />
                    <span class="errors" v-if="$v.formOrgan.name.$error"> Customer Name is required</span>
                    <InputUser v-model="formOrgan.mac_adress" title="MAC ADDRESS" id="mac_address" />
                    <span class="errors" v-if="$v.formOrgan.mac_adress.$error"> Customer Name is required</span>
                    <InputUser v-model="formOrgan.ip_adress" title="  IP ADDRESS" id="ip_address" />
                    <span class="errors" v-if="$v.formOrgan.ip_adress.$error"> Customer Name is required</span>
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
import BackupInformation from "../Components/BackupInformation.vue";
import BlueButton from "../Components/BlueButton.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import SelectUser from "../Components/SelectUser.vue";
import { mapActions, mapGetters } from "vuex";
import InputPass from "../Components/InputPassword.vue"
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { Chart } from "chart.js";
import 'chartjs-plugin-zoom';

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

    },
    data() {
        return {

            formOrgan: {
                name: null,
                mac_adress: null,
                ip_adress: null,
            },
            organ: {
                "id": "id de l organe",
                "bosId": "id du boss",
                "name": "nom de l'organ",
                "type": "type de l'organ",
                "mac_adress": "mac address",
                "ip_adress": "ip address",
                "organType": "organ type",
                "platformId": "id de la platform",
                "status": "off",
            },

            show: false,
            myChart: null,
            donnees2: [
                {
                    "date": 1698184800000,
                    "value": true
                },

            ],
            donnees: [
                {
                    "date": 1698184800000,
                    "value": true
                },
                {
                    "date": 1698184860000,
                    "value": true
                },
                {
                    "date": 1698184920000,
                    "value": true
                },
                {
                    "date": 1698184980000,
                    "value": true
                },
                {
                    "date": 1698185040000,
                    "value": true
                },
                {
                    "date": 1698185100000,
                    "value": true
                },
                {
                    "date": 1698185160000,
                    "value": true
                },
                {
                    "date": 1698185220000,
                    "value": true
                },
                {
                    "date": 1698185280000,
                    "value": true
                },
                {
                    "date": 1698185340000,
                    "value": true
                },
                {
                    "date": 1698185400000,
                    "value": true
                },
                {
                    "date": 1698185460000,
                    "value": true
                },
                {
                    "date": 1698185520000,
                    "value": true
                },
                {
                    "date": 1698185580000,
                    "value": true
                },
                {
                    "date": 1698185640000,
                    "value": true
                },
                {
                    "date": 1698185700000,
                    "value": true
                },
                {
                    "date": 1698185760000,
                    "value": true
                },
                {
                    "date": 1698185820000,
                    "value": true
                },
                {
                    "date": 1698185880000,
                    "value": true
                },
                {
                    "date": 1698185940000,
                    "value": true
                },
                {
                    "date": 1698186000000,
                    "value": true
                },
                {
                    "date": 1698186060000,
                    "value": true
                },
                {
                    "date": 1698186120000,
                    "value": true
                },
                {
                    "date": 1698186180000,
                    "value": true
                },
                {
                    "date": 1698186240000,
                    "value": true
                },
                {
                    "date": 1698186300000,
                    "value": true
                },
                {
                    "date": 1698186360000,
                    "value": true
                },
                {
                    "date": 1698186420000,
                    "value": true
                },
                {
                    "date": 1698186480000,
                    "value": true
                },
                {
                    "date": 1698186540000,
                    "value": true
                },
                {
                    "date": 1698186600000,
                    "value": true
                },
                {
                    "date": 1698186660000,
                    "value": true
                },
                {
                    "date": 1698186720000,
                    "value": true
                },
                {
                    "date": 1698186780000,
                    "value": true
                },
                {
                    "date": 1698186840000,
                    "value": true
                },
                {
                    "date": 1698186900000,
                    "value": true
                },
                {
                    "date": 1698186960000,
                    "value": true
                },
                {
                    "date": 1698187020000,
                    "value": true
                },
                {
                    "date": 1698187080000,
                    "value": true
                },
                {
                    "date": 1698187140000,
                    "value": true
                },
                {
                    "date": 1698187200000,
                    "value": true
                },
                {
                    "date": 1698187260000,
                    "value": true
                },
                {
                    "date": 1698187320000,
                    "value": true
                },
                {
                    "date": 1698187380000,
                    "value": true
                },
                {
                    "date": 1698187440000,
                    "value": true
                },
                {
                    "date": 1698187500000,
                    "value": true
                },
                {
                    "date": 1698187560000,
                    "value": true
                },
                {
                    "date": 1698187620000,
                    "value": true
                },
                {
                    "date": 1698187680000,
                    "value": true
                },
                {
                    "date": 1698187740000,
                    "value": true
                },
                {
                    "date": 1698187800000,
                    "value": true
                },
                {
                    "date": 1698187860000,
                    "value": true
                },
                {
                    "date": 1698187920000,
                    "value": true
                },
                {
                    "date": 1698187980000,
                    "value": true
                },
                {
                    "date": 1698188040000,
                    "value": true
                },
                {
                    "date": 1698188100000,
                    "value": true
                },
                {
                    "date": 1698188160000,
                    "value": true
                },
                {
                    "date": 1698188220000,
                    "value": true
                },
                {
                    "date": 1698188280000,
                    "value": true
                },
                {
                    "date": 1698188340000,
                    "value": true
                },
                {
                    "date": 1698188400000,
                    "value": true
                },
                {
                    "date": 1698188460000,
                    "value": true
                },
                {
                    "date": 1698188520000,
                    "value": true
                },
                {
                    "date": 1698188580000,
                    "value": true
                },
                {
                    "date": 1698188640000,
                    "value": true
                },
                {
                    "date": 1698188700000,
                    "value": true
                },
                {
                    "date": 1698188760000,
                    "value": true
                },
                {
                    "date": 1698188820000,
                    "value": true
                },
                {
                    "date": 1698188880000,
                    "value": true
                },
                {
                    "date": 1698188940000,
                    "value": true
                },
                {
                    "date": 1698189000000,
                    "value": true
                },
                {
                    "date": 1698189060000,
                    "value": true
                },
                {
                    "date": 1698189120000,
                    "value": true
                },
                {
                    "date": 1698189180000,
                    "value": true
                },
                {
                    "date": 1698189240000,
                    "value": true
                },
                {
                    "date": 1698189300000,
                    "value": true
                },
                {
                    "date": 1698189360000,
                    "value": true
                },
                {
                    "date": 1698189420000,
                    "value": true
                },
                {
                    "date": 1698189480000,
                    "value": true
                },
                {
                    "date": 1698189540000,
                    "value": true
                },
                {
                    "date": 1698189600000,
                    "value": true
                },
                {
                    "date": 1698189660000,
                    "value": true
                },
                {
                    "date": 1698189720000,
                    "value": true
                },
                {
                    "date": 1698189780000,
                    "value": true
                },
                {
                    "date": 1698189840000,
                    "value": true
                },
                {
                    "date": 1698189900000,
                    "value": true
                },
                {
                    "date": 1698189960000,
                    "value": true
                },
                {
                    "date": 1698190020000,
                    "value": true
                },
                {
                    "date": 1698190080000,
                    "value": true
                },
                {
                    "date": 1698190140000,
                    "value": true
                },
                {
                    "date": 1698190200000,
                    "value": true
                },
                {
                    "date": 1698190260000,
                    "value": true
                },
                {
                    "date": 1698190320000,
                    "value": true
                },
                {
                    "date": 1698190380000,
                    "value": true
                },
                {
                    "date": 1698190440000,
                    "value": true
                },
                {
                    "date": 1698190500000,
                    "value": true
                },
                {
                    "date": 1698190560000,
                    "value": true
                },
                {
                    "date": 1698190620000,
                    "value": true
                },
                {
                    "date": 1698190680000,
                    "value": true
                },
                {
                    "date": 1698190740000,
                    "value": true
                },
                {
                    "date": 1698190800000,
                    "value": true
                },
                {
                    "date": 1698190860000,
                    "value": true
                },
                {
                    "date": 1698190920000,
                    "value": true
                },
                {
                    "date": 1698190980000,
                    "value": true
                },
                {
                    "date": 1698191040000,
                    "value": true
                },
                {
                    "date": 1698191100000,
                    "value": true
                },
                {
                    "date": 1698191160000,
                    "value": true
                },
                {
                    "date": 1698191220000,
                    "value": true
                },
                {
                    "date": 1698191280000,
                    "value": true
                },
                {
                    "date": 1698191340000,
                    "value": true
                },
                {
                    "date": 1698191400000,
                    "value": true
                },
                {
                    "date": 1698191460000,
                    "value": true
                },
                {
                    "date": 1698191520000,
                    "value": true
                },
                {
                    "date": 1698191580000,
                    "value": true
                },
                {
                    "date": 1698191640000,
                    "value": true
                },
                {
                    "date": 1698191700000,
                    "value": true
                },
                {
                    "date": 1698191760000,
                    "value": true
                },
                {
                    "date": 1698191820000,
                    "value": true
                },
                {
                    "date": 1698191880000,
                    "value": true
                },
                {
                    "date": 1698191940000,
                    "value": true
                },
                {
                    "date": 1698192000000,
                    "value": true
                },
                {
                    "date": 1698192060000,
                    "value": true
                },
                {
                    "date": 1698192120000,
                    "value": true
                },
                {
                    "date": 1698192180000,
                    "value": true
                },
                {
                    "date": 1698192240000,
                    "value": true
                },
                {
                    "date": 1698192300000,
                    "value": true
                },
                {
                    "date": 1698192360000,
                    "value": true
                },
                {
                    "date": 1698192420000,
                    "value": true
                },
                {
                    "date": 1698192480000,
                    "value": true
                },
                {
                    "date": 1698192540000,
                    "value": true
                },
                {
                    "date": 1698192600000,
                    "value": true
                },
                {
                    "date": 1698192660000,
                    "value": true
                },
                {
                    "date": 1698192720000,
                    "value": true
                },
                {
                    "date": 1698192780000,
                    "value": true
                },
                {
                    "date": 1698192840000,
                    "value": true
                },
                {
                    "date": 1698192900000,
                    "value": true
                },
                {
                    "date": 1698192960000,
                    "value": true
                },
                {
                    "date": 1698193020000,
                    "value": true
                },
                {
                    "date": 1698193080000,
                    "value": true
                },
                {
                    "date": 1698193140000,
                    "value": true
                },
                {
                    "date": 1698193200000,
                    "value": true
                },
                {
                    "date": 1698193260000,
                    "value": true
                },
                {
                    "date": 1698193320000,
                    "value": true
                },
                {
                    "date": 1698193380000,
                    "value": true
                },
                {
                    "date": 1698193440000,
                    "value": true
                },
                {
                    "date": 1698193500000,
                    "value": true
                },
                {
                    "date": 1698193560000,
                    "value": true
                },
                {
                    "date": 1698193620000,
                    "value": true
                },
                {
                    "date": 1698193680000,
                    "value": true
                },
                {
                    "date": 1698193740000,
                    "value": true
                },
                {
                    "date": 1698193800000,
                    "value": true
                },
                {
                    "date": 1698193860000,
                    "value": true
                },
                {
                    "date": 1698193920000,
                    "value": true
                },
                {
                    "date": 1698193980000,
                    "value": true
                },
                {
                    "date": 1698194040000,
                    "value": true
                },
                {
                    "date": 1698194100000,
                    "value": true
                },
                {
                    "date": 1698194160000,
                    "value": true
                },
                {
                    "date": 1698194220000,
                    "value": true
                },
                {
                    "date": 1698194280000,
                    "value": true
                },
                {
                    "date": 1698194340000,
                    "value": true
                },
                {
                    "date": 1698194400000,
                    "value": true
                },
                {
                    "date": 1698194460000,
                    "value": true
                },
                {
                    "date": 1698194520000,
                    "value": true
                },
                {
                    "date": 1698194580000,
                    "value": true
                },
                {
                    "date": 1698194640000,
                    "value": true
                },
                {
                    "date": 1698194700000,
                    "value": true
                },
                {
                    "date": 1698194760000,
                    "value": true
                },
                {
                    "date": 1698194820000,
                    "value": true
                },
                {
                    "date": 1698194880000,
                    "value": true
                },
                {
                    "date": 1698194940000,
                    "value": true
                },
                {
                    "date": 1698195000000,
                    "value": true
                },
                {
                    "date": 1698195060000,
                    "value": true
                },
                {
                    "date": 1698195120000,
                    "value": true
                },
                {
                    "date": 1698195180000,
                    "value": true
                },
                {
                    "date": 1698195240000,
                    "value": true
                },
                {
                    "date": 1698195300000,
                    "value": true
                },
                {
                    "date": 1698195360000,
                    "value": true
                },
                {
                    "date": 1698195420000,
                    "value": true
                },
                {
                    "date": 1698195480000,
                    "value": true
                },
                {
                    "date": 1698195540000,
                    "value": true
                },
                {
                    "date": 1698195600000,
                    "value": true
                },
                {
                    "date": 1698195660000,
                    "value": true
                },
                {
                    "date": 1698195720000,
                    "value": true
                },
                {
                    "date": 1698195780000,
                    "value": true
                },
                {
                    "date": 1698195840000,
                    "value": true
                },
                {
                    "date": 1698195900000,
                    "value": true
                },
                {
                    "date": 1698195960000,
                    "value": true
                },
                {
                    "date": 1698196020000,
                    "value": true
                },
                {
                    "date": 1698196080000,
                    "value": true
                },
                {
                    "date": 1698196140000,
                    "value": true
                },
                {
                    "date": 1698196200000,
                    "value": true
                },
                {
                    "date": 1698196260000,
                    "value": true
                },
                {
                    "date": 1698196320000,
                    "value": true
                },
                {
                    "date": 1698196380000,
                    "value": true
                },
                {
                    "date": 1698196440000,
                    "value": true
                },
                {
                    "date": 1698196500000,
                    "value": true
                },
                {
                    "date": 1698196560000,
                    "value": true
                },
                {
                    "date": 1698196620000,
                    "value": true
                },
                {
                    "date": 1698196680000,
                    "value": true
                },
                {
                    "date": 1698196740000,
                    "value": true
                },
                {
                    "date": 1698196800000,
                    "value": true
                },
                {
                    "date": 1698196860000,
                    "value": true
                },
                {
                    "date": 1698196920000,
                    "value": true
                },
                {
                    "date": 1698196980000,
                    "value": true
                },
                {
                    "date": 1698197040000,
                    "value": true
                },
                {
                    "date": 1698197100000,
                    "value": true
                },
                {
                    "date": 1698197160000,
                    "value": true
                },
                {
                    "date": 1698197220000,
                    "value": true
                },
                {
                    "date": 1698197280000,
                    "value": true
                },
                {
                    "date": 1698197340000,
                    "value": true
                },
                {
                    "date": 1698197400000,
                    "value": true
                },
                {
                    "date": 1698197460000,
                    "value": true
                },
                {
                    "date": 1698197520000,
                    "value": true
                },
                {
                    "date": 1698197580000,
                    "value": true
                },
                {
                    "date": 1698197640000,
                    "value": true
                },
                {
                    "date": 1698197700000,
                    "value": true
                },
                {
                    "date": 1698197760000,
                    "value": true
                },
                {
                    "date": 1698197820000,
                    "value": true
                },
                {
                    "date": 1698197880000,
                    "value": true
                },
                {
                    "date": 1698197940000,
                    "value": true
                },
                {
                    "date": 1698198000000,
                    "value": true
                },
                {
                    "date": 1698198060000,
                    "value": true
                },
                {
                    "date": 1698198120000,
                    "value": true
                },
                {
                    "date": 1698198180000,
                    "value": true
                },
                {
                    "date": 1698198240000,
                    "value": true
                },
                {
                    "date": 1698198300000,
                    "value": true
                },
                {
                    "date": 1698198360000,
                    "value": true
                },
                {
                    "date": 1698198420000,
                    "value": true
                },
                {
                    "date": 1698198480000,
                    "value": true
                },
                {
                    "date": 1698198540000,
                    "value": true
                },
                {
                    "date": 1698198600000,
                    "value": true
                },
                {
                    "date": 1698198660000,
                    "value": true
                },
                {
                    "date": 1698198720000,
                    "value": true
                },
                {
                    "date": 1698198780000,
                    "value": true
                },
                {
                    "date": 1698198840000,
                    "value": true
                },
                {
                    "date": 1698198900000,
                    "value": true
                },
                {
                    "date": 1698198960000,
                    "value": true
                },
                {
                    "date": 1698199020000,
                    "value": true
                },
                {
                    "date": 1698199080000,
                    "value": true
                },
                {
                    "date": 1698199140000,
                    "value": true
                },
                {
                    "date": 1698199200000,
                    "value": true
                },
                {
                    "date": 1698199260000,
                    "value": true
                },
                {
                    "date": 1698199320000,
                    "value": true
                },
                {
                    "date": 1698199380000,
                    "value": true
                },
                {
                    "date": 1698199440000,
                    "value": true
                },
                {
                    "date": 1698199500000,
                    "value": true
                },
                {
                    "date": 1698199560000,
                    "value": true
                },
                {
                    "date": 1698199620000,
                    "value": true
                },
                {
                    "date": 1698199680000,
                    "value": true
                },
                {
                    "date": 1698199740000,
                    "value": true
                },
                {
                    "date": 1698199800000,
                    "value": true
                },
                {
                    "date": 1698199860000,
                    "value": true
                },
                {
                    "date": 1698199920000,
                    "value": true
                },
                {
                    "date": 1698199980000,
                    "value": true
                },
                {
                    "date": 1698200040000,
                    "value": true
                },
                {
                    "date": 1698200100000,
                    "value": true
                },
                {
                    "date": 1698200160000,
                    "value": true
                },
                {
                    "date": 1698200220000,
                    "value": true
                },
                {
                    "date": 1698200280000,
                    "value": true
                },
                {
                    "date": 1698200340000,
                    "value": true
                },
                {
                    "date": 1698200400000,
                    "value": true
                },
                {
                    "date": 1698200460000,
                    "value": true
                },
                {
                    "date": 1698200520000,
                    "value": true
                },
                {
                    "date": 1698200580000,
                    "value": true
                },
                {
                    "date": 1698200640000,
                    "value": true
                },
                {
                    "date": 1698200700000,
                    "value": true
                },
                {
                    "date": 1698200760000,
                    "value": true
                },
                {
                    "date": 1698200820000,
                    "value": true
                },
                {
                    "date": 1698200880000,
                    "value": true
                },
                {
                    "date": 1698200940000,
                    "value": true
                },
                {
                    "date": 1698201000000,
                    "value": true
                },
                {
                    "date": 1698201060000,
                    "value": true
                },
                {
                    "date": 1698201120000,
                    "value": true
                },
                {
                    "date": 1698201180000,
                    "value": true
                },
                {
                    "date": 1698201240000,
                    "value": true
                },
                {
                    "date": 1698201300000,
                    "value": true
                },
                {
                    "date": 1698201360000,
                    "value": true
                },
                {
                    "date": 1698201420000,
                    "value": true
                },
                {
                    "date": 1698201480000,
                    "value": true
                },
                {
                    "date": 1698201540000,
                    "value": true
                },
                {
                    "date": 1698201600000,
                    "value": true
                },
                {
                    "date": 1698201660000,
                    "value": true
                },
                {
                    "date": 1698201720000,
                    "value": true
                },
                {
                    "date": 1698201780000,
                    "value": true
                },
                {
                    "date": 1698201840000,
                    "value": true
                },
                {
                    "date": 1698201900000,
                    "value": true
                },
                {
                    "date": 1698201960000,
                    "value": true
                },
                {
                    "date": 1698202020000,
                    "value": true
                },
                {
                    "date": 1698202080000,
                    "value": true
                },
                {
                    "date": 1698202140000,
                    "value": true
                },
                {
                    "date": 1698202200000,
                    "value": true
                },
                {
                    "date": 1698202260000,
                    "value": true
                },
                {
                    "date": 1698202320000,
                    "value": true
                },
                {
                    "date": 1698202380000,
                    "value": true
                },
                {
                    "date": 1698202440000,
                    "value": true
                },
                {
                    "date": 1698202500000,
                    "value": true
                },
                {
                    "date": 1698202560000,
                    "value": true
                },
                {
                    "date": 1698202620000,
                    "value": true
                },
                {
                    "date": 1698202680000,
                    "value": true
                },
                {
                    "date": 1698202740000,
                    "value": true
                },
                {
                    "date": 1698202800000,
                    "value": true
                },
                {
                    "date": 1698202860000,
                    "value": true
                },
                {
                    "date": 1698202920000,
                    "value": true
                },
                {
                    "date": 1698202980000,
                    "value": true
                },
                {
                    "date": 1698203040000,
                    "value": true
                },
                {
                    "date": 1698203100000,
                    "value": true
                },
                {
                    "date": 1698203160000,
                    "value": true
                },
                {
                    "date": 1698203220000,
                    "value": true
                },
                {
                    "date": 1698203280000,
                    "value": true
                },
                {
                    "date": 1698203340000,
                    "value": true
                },
                {
                    "date": 1698203400000,
                    "value": true
                },
                {
                    "date": 1698203460000,
                    "value": true
                },
                {
                    "date": 1698203520000,
                    "value": true
                },
                {
                    "date": 1698203580000,
                    "value": true
                },
                {
                    "date": 1698203640000,
                    "value": true
                },
                {
                    "date": 1698203700000,
                    "value": true
                },
                {
                    "date": 1698203760000,
                    "value": true
                },
                {
                    "date": 1698203820000,
                    "value": true
                },
                {
                    "date": 1698203880000,
                    "value": true
                },
                {
                    "date": 1698203940000,
                    "value": true
                },
                {
                    "date": 1698204000000,
                    "value": true
                },
                {
                    "date": 1698204060000,
                    "value": true
                },
                {
                    "date": 1698204120000,
                    "value": true
                },
                {
                    "date": 1698204180000,
                    "value": true
                },
                {
                    "date": 1698204240000,
                    "value": true
                },
                {
                    "date": 1698204300000,
                    "value": true
                },
                {
                    "date": 1698204360000,
                    "value": true
                },
                {
                    "date": 1698204420000,
                    "value": true
                },
                {
                    "date": 1698204480000,
                    "value": true
                },
                {
                    "date": 1698204540000,
                    "value": true
                },
                {
                    "date": 1698204600000,
                    "value": true
                },
                {
                    "date": 1698204660000,
                    "value": true
                },
                {
                    "date": 1698204720000,
                    "value": true
                },
                {
                    "date": 1698204780000,
                    "value": true
                },
                {
                    "date": 1698204840000,
                    "value": true
                },
                {
                    "date": 1698204900000,
                    "value": true
                },
                {
                    "date": 1698204960000,
                    "value": true
                },
                {
                    "date": 1698205020000,
                    "value": true
                },
                {
                    "date": 1698205080000,
                    "value": true
                },
                {
                    "date": 1698205140000,
                    "value": true
                },
                {
                    "date": 1698205200000,
                    "value": true
                },
                {
                    "date": 1698205260000,
                    "value": true
                },
                {
                    "date": 1698205320000,
                    "value": true
                },
                {
                    "date": 1698205380000,
                    "value": true
                },
                {
                    "date": 1698205440000,
                    "value": true
                },
                {
                    "date": 1698205500000,
                    "value": true
                },
                {
                    "date": 1698205560000,
                    "value": true
                },
                {
                    "date": 1698205620000,
                    "value": true
                },
                {
                    "date": 1698205680000,
                    "value": true
                },
                {
                    "date": 1698205740000,
                    "value": true
                },
                {
                    "date": 1698205800000,
                    "value": true
                },
                {
                    "date": 1698205860000,
                    "value": true
                },
                {
                    "date": 1698205920000,
                    "value": true
                },
                {
                    "date": 1698205980000,
                    "value": true
                },
                {
                    "date": 1698206040000,
                    "value": true
                },
                {
                    "date": 1698206100000,
                    "value": true
                },
                {
                    "date": 1698206160000,
                    "value": true
                },
                {
                    "date": 1698206220000,
                    "value": true
                },
                {
                    "date": 1698206280000,
                    "value": true
                },
                {
                    "date": 1698206340000,
                    "value": true
                },
                {
                    "date": 1698206400000,
                    "value": true
                },
                {
                    "date": 1698206460000,
                    "value": true
                },
                {
                    "date": 1698206520000,
                    "value": true
                },
                {
                    "date": 1698206580000,
                    "value": true
                },
                {
                    "date": 1698206640000,
                    "value": true
                },
                {
                    "date": 1698206700000,
                    "value": true
                },
                {
                    "date": 1698206760000,
                    "value": true
                },
                {
                    "date": 1698206820000,
                    "value": true
                },
                {
                    "date": 1698206880000,
                    "value": true
                },
                {
                    "date": 1698206940000,
                    "value": true
                },
                {
                    "date": 1698207000000,
                    "value": true
                },
                {
                    "date": 1698207060000,
                    "value": true
                },
                {
                    "date": 1698207120000,
                    "value": true
                },
                {
                    "date": 1698207180000,
                    "value": true
                },
                {
                    "date": 1698207240000,
                    "value": true
                },
                {
                    "date": 1698207300000,
                    "value": true
                },
                {
                    "date": 1698207360000,
                    "value": true
                },
                {
                    "date": 1698207420000,
                    "value": true
                },
                {
                    "date": 1698207480000,
                    "value": true
                },
                {
                    "date": 1698207540000,
                    "value": true
                },
                {
                    "date": 1698207600000,
                    "value": true
                },
                {
                    "date": 1698207660000,
                    "value": true
                },
                {
                    "date": 1698207720000,
                    "value": true
                },
                {
                    "date": 1698207780000,
                    "value": true
                },
                {
                    "date": 1698207840000,
                    "value": true
                },
                {
                    "date": 1698207900000,
                    "value": true
                },
                {
                    "date": 1698207960000,
                    "value": true
                },
                {
                    "date": 1698208020000,
                    "value": true
                },
                {
                    "date": 1698208080000,
                    "value": true
                },
                {
                    "date": 1698208140000,
                    "value": true
                },
                {
                    "date": 1698208200000,
                    "value": true
                },
                {
                    "date": 1698208260000,
                    "value": true
                },
                {
                    "date": 1698208320000,
                    "value": true
                },
                {
                    "date": 1698208380000,
                    "value": true
                },
                {
                    "date": 1698208440000,
                    "value": true
                },
                {
                    "date": 1698208500000,
                    "value": true
                },
                {
                    "date": 1698208560000,
                    "value": true
                },
                {
                    "date": 1698208620000,
                    "value": true
                },
                {
                    "date": 1698208680000,
                    "value": true
                },
                {
                    "date": 1698208740000,
                    "value": true
                },
                {
                    "date": 1698208800000,
                    "value": true
                },
                {
                    "date": 1698208860000,
                    "value": true
                },
                {
                    "date": 1698208920000,
                    "value": true
                },
                {
                    "date": 1698208980000,
                    "value": true
                },
                {
                    "date": 1698209040000,
                    "value": true
                },
                {
                    "date": 1698209100000,
                    "value": true
                },
                {
                    "date": 1698209160000,
                    "value": true
                },
                {
                    "date": 1698209220000,
                    "value": true
                },
                {
                    "date": 1698209280000,
                    "value": true
                },
                {
                    "date": 1698209340000,
                    "value": true
                },
                {
                    "date": 1698209400000,
                    "value": true
                },
                {
                    "date": 1698209460000,
                    "value": true
                },
                {
                    "date": 1698209520000,
                    "value": true
                },
                {
                    "date": 1698209580000,
                    "value": true
                },
                {
                    "date": 1698209640000,
                    "value": true
                },
                {
                    "date": 1698209700000,
                    "value": true
                },
                {
                    "date": 1698209760000,
                    "value": true
                },
                {
                    "date": 1698209820000,
                    "value": true
                },
                {
                    "date": 1698209880000,
                    "value": true
                },
                {
                    "date": 1698209940000,
                    "value": true
                },
                {
                    "date": 1698210000000,
                    "value": true
                },
                {
                    "date": 1698210060000,
                    "value": true
                },
                {
                    "date": 1698210120000,
                    "value": true
                },
                {
                    "date": 1698210180000,
                    "value": true
                },
                {
                    "date": 1698210240000,
                    "value": true
                },
                {
                    "date": 1698210300000,
                    "value": true
                },
                {
                    "date": 1698210360000,
                    "value": true
                },
                {
                    "date": 1698210420000,
                    "value": true
                },
                {
                    "date": 1698210480000,
                    "value": true
                },
                {
                    "date": 1698210540000,
                    "value": true
                },
                {
                    "date": 1698210600000,
                    "value": true
                },
                {
                    "date": 1698210660000,
                    "value": true
                },
                {
                    "date": 1698210720000,
                    "value": true
                },
                {
                    "date": 1698210780000,
                    "value": true
                },
                {
                    "date": 1698210840000,
                    "value": true
                },
                {
                    "date": 1698210900000,
                    "value": true
                },
                {
                    "date": 1698210960000,
                    "value": true
                },
                {
                    "date": 1698211020000,
                    "value": true
                },
                {
                    "date": 1698211080000,
                    "value": true
                },
                {
                    "date": 1698211140000,
                    "value": true
                },
                {
                    "date": 1698211200000,
                    "value": true
                },
                {
                    "date": 1698211260000,
                    "value": true
                },
                {
                    "date": 1698211320000,
                    "value": true
                },
                {
                    "date": 1698211380000,
                    "value": true
                },
                {
                    "date": 1698211440000,
                    "value": true
                },
                {
                    "date": 1698211500000,
                    "value": true
                },
                {
                    "date": 1698211560000,
                    "value": true
                },
                {
                    "date": 1698211620000,
                    "value": true
                },
                {
                    "date": 1698211680000,
                    "value": true
                },
                {
                    "date": 1698211740000,
                    "value": true
                },
                {
                    "date": 1698211800000,
                    "value": true
                },
                {
                    "date": 1698211860000,
                    "value": true
                },
                {
                    "date": 1698211920000,
                    "value": true
                },
                {
                    "date": 1698211980000,
                    "value": true
                },
                {
                    "date": 1698212040000,
                    "value": true
                },
                {
                    "date": 1698212100000,
                    "value": true
                },
                {
                    "date": 1698212160000,
                    "value": true
                },
                {
                    "date": 1698212220000,
                    "value": true
                },
                {
                    "date": 1698212280000,
                    "value": true
                },
                {
                    "date": 1698212340000,
                    "value": true
                },
                {
                    "date": 1698212400000,
                    "value": true
                },
                {
                    "date": 1698212460000,
                    "value": true
                },
                {
                    "date": 1698212520000,
                    "value": true
                },
                {
                    "date": 1698212580000,
                    "value": true
                },
                {
                    "date": 1698212640000,
                    "value": true
                },
                {
                    "date": 1698212700000,
                    "value": true
                },
                {
                    "date": 1698212760000,
                    "value": true
                },
                {
                    "date": 1698212820000,
                    "value": true
                },
                {
                    "date": 1698212880000,
                    "value": true
                },
                {
                    "date": 1698212940000,
                    "value": true
                },
                {
                    "date": 1698213000000,
                    "value": true
                },
                {
                    "date": 1698213060000,
                    "value": true
                },
                {
                    "date": 1698213120000,
                    "value": true
                },
                {
                    "date": 1698213180000,
                    "value": true
                },
                {
                    "date": 1698213240000,
                    "value": true
                },
                {
                    "date": 1698213300000,
                    "value": true
                },
                {
                    "date": 1698213360000,
                    "value": true
                },
                {
                    "date": 1698213420000,
                    "value": true
                },
                {
                    "date": 1698213480000,
                    "value": true
                },
                {
                    "date": 1698213540000,
                    "value": true
                },
                {
                    "date": 1698217200000,
                    "value": true
                },
                {
                    "date": 1698217260000,
                    "value": true
                },
                {
                    "date": 1698217320000,
                    "value": true
                },
                {
                    "date": 1698217380000,
                    "value": true
                },
                {
                    "date": 1698217440000,
                    "value": true
                },
                {
                    "date": 1698217500000,
                    "value": true
                },
                {
                    "date": 1698217560000,
                    "value": true
                },
                {
                    "date": 1698217620000,
                    "value": true
                },
                {
                    "date": 1698217680000,
                    "value": true
                },
                {
                    "date": 1698217740000,
                    "value": true
                },
                {
                    "date": 1698217800000,
                    "value": true
                },
                {
                    "date": 1698217860000,
                    "value": true
                },
                {
                    "date": 1698217920000,
                    "value": true
                },
                {
                    "date": 1698217980000,
                    "value": true
                },
                {
                    "date": 1698218040000,
                    "value": true
                },
                {
                    "date": 1698218100000,
                    "value": true
                },
                {
                    "date": 1698218160000,
                    "value": true
                },
                {
                    "date": 1698218220000,
                    "value": true
                },
                {
                    "date": 1698218280000,
                    "value": true
                },
                {
                    "date": 1698218340000,
                    "value": true
                },
                {
                    "date": 1698218400000,
                    "value": true
                },
                {
                    "date": 1698218460000,
                    "value": true
                },
                {
                    "date": 1698218520000,
                    "value": true
                },
                {
                    "date": 1698218580000,
                    "value": true
                },
                {
                    "date": 1698218640000,
                    "value": true
                },
                {
                    "date": 1698218700000,
                    "value": true
                },
                {
                    "date": 1698218760000,
                    "value": true
                },
                {
                    "date": 1698218820000,
                    "value": true
                },
                {
                    "date": 1698218880000,
                    "value": true
                },
                {
                    "date": 1698218940000,
                    "value": true
                },
                {
                    "date": 1698219000000,
                    "value": true
                },
                {
                    "date": 1698219060000,
                    "value": true
                },
                {
                    "date": 1698219120000,
                    "value": true
                },
                {
                    "date": 1698219180000,
                    "value": true
                },
                {
                    "date": 1698219240000,
                    "value": true
                },
                {
                    "date": 1698219300000,
                    "value": true
                },
                {
                    "date": 1698219360000,
                    "value": true
                },
                {
                    "date": 1698219420000,
                    "value": true
                },
                {
                    "date": 1698219480000,
                    "value": true
                },
                {
                    "date": 1698219540000,
                    "value": true
                },
                {
                    "date": 1698219600000,
                    "value": true
                },
                {
                    "date": 1698219660000,
                    "value": true
                },
                {
                    "date": 1698219720000,
                    "value": true
                },
                {
                    "date": 1698219780000,
                    "value": true
                },
                {
                    "date": 1698219840000,
                    "value": true
                },
                {
                    "date": 1698219900000,
                    "value": true
                },
                {
                    "date": 1698219960000,
                    "value": true
                },
                {
                    "date": 1698220020000,
                    "value": true
                },
                {
                    "date": 1698220080000,
                    "value": true
                },
                {
                    "date": 1698220140000,
                    "value": true
                },
                {
                    "date": 1698220200000,
                    "value": true
                },
                {
                    "date": 1698220260000,
                    "value": true
                },
                {
                    "date": 1698220320000,
                    "value": true
                },
                {
                    "date": 1698220380000,
                    "value": true
                },
                {
                    "date": 1698220440000,
                    "value": true
                },
                {
                    "date": 1698220500000,
                    "value": true
                },
                {
                    "date": 1698220560000,
                    "value": true
                },
                {
                    "date": 1698220620000,
                    "value": true
                },
                {
                    "date": 1698220680000,
                    "value": true
                },
                {
                    "date": 1698220740000,
                    "value": true
                },
                {
                    "date": 1698220800000,
                    "value": true
                },
                {
                    "date": 1698220860000,
                    "value": true
                },
                {
                    "date": 1698220920000,
                    "value": true
                },
                {
                    "date": 1698220980000,
                    "value": true
                },
                {
                    "date": 1698221040000,
                    "value": true
                },
                {
                    "date": 1698221100000,
                    "value": true
                },
                {
                    "date": 1698221160000,
                    "value": true
                },
                {
                    "date": 1698221220000,
                    "value": true
                },
                {
                    "date": 1698221280000,
                    "value": true
                },
                {
                    "date": 1698221340000,
                    "value": true
                },
                {
                    "date": 1698221400000,
                    "value": true
                },
                {
                    "date": 1698221460000,
                    "value": true
                },
                {
                    "date": 1698221520000,
                    "value": true
                },
                {
                    "date": 1698221580000,
                    "value": true
                },
                {
                    "date": 1698221640000,
                    "value": true
                },
                {
                    "date": 1698221700000,
                    "value": true
                },
                {
                    "date": 1698221760000,
                    "value": true
                },
                {
                    "date": 1698221820000,
                    "value": true
                },
                {
                    "date": 1698221880000,
                    "value": true
                },
                {
                    "date": 1698221940000,
                    "value": true
                },
                {
                    "date": 1698222000000,
                    "value": true
                },
                {
                    "date": 1698222060000,
                    "value": true
                },
                {
                    "date": 1698222120000,
                    "value": true
                },
                {
                    "date": 1698222180000,
                    "value": true
                },
                {
                    "date": 1698222240000,
                    "value": true
                },
                {
                    "date": 1698222300000,
                    "value": true
                },
                {
                    "date": 1698222360000,
                    "value": true
                },
                {
                    "date": 1698222420000,
                    "value": true
                },
                {
                    "date": 1698222480000,
                    "value": true
                },
                {
                    "date": 1698222540000,
                    "value": true
                },
                {
                    "date": 1698222600000,
                    "value": true
                },
                {
                    "date": 1698222660000,
                    "value": true
                },
                {
                    "date": 1698222720000,
                    "value": true
                },
                {
                    "date": 1698222780000,
                    "value": true
                },
                {
                    "date": 1698222840000,
                    "value": true
                },
                {
                    "date": 1698222900000,
                    "value": true
                },
                {
                    "date": 1698222960000,
                    "value": true
                },
                {
                    "date": 1698223020000,
                    "value": true
                },
                {
                    "date": 1698223080000,
                    "value": true
                },
                {
                    "date": 1698223140000,
                    "value": true
                },
                {
                    "date": 1698223200000,
                    "value": true
                },
                {
                    "date": 1698223260000,
                    "value": true
                },
                {
                    "date": 1698223320000,
                    "value": true
                },
                {
                    "date": 1698223380000,
                    "value": true
                },
                {
                    "date": 1698223440000,
                    "value": true
                },
                {
                    "date": 1698223500000,
                    "value": true
                },
                {
                    "date": 1698223560000,
                    "value": true
                },
                {
                    "date": 1698223620000,
                    "value": true
                },
                {
                    "date": 1698223680000,
                    "value": true
                },
                {
                    "date": 1698223740000,
                    "value": true
                },
                {
                    "date": 1698223800000,
                    "value": true
                },
                {
                    "date": 1698223860000,
                    "value": true
                },
                {
                    "date": 1698223920000,
                    "value": true
                },
                {
                    "date": 1698223980000,
                    "value": true
                },
                {
                    "date": 1698224040000,
                    "value": true
                },
                {
                    "date": 1698224100000,
                    "value": true
                },
                {
                    "date": 1698224160000,
                    "value": true
                },
                {
                    "date": 1698224220000,
                    "value": true
                },
                {
                    "date": 1698224280000,
                    "value": true
                },
                {
                    "date": 1698224340000,
                    "value": true
                }
            ]
            // donnees: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0, 0, 0, 0, 1, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5,],
            // etiquettes: ["1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1', "1", "1", "1", '1',],
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
        },
    },
    methods: {

        generateTimeSeries() {
            const timeSeries = [];
            const oneMinute = 60 * 1000; // en millisecondes
            const startDate = new Date();
            startDate.setHours(0, 0, 0, 0); // début de la journée

            // Par exemple, pour avoir des séries `true` de 10h à 12h, puis de 15h à 20h :
            const trueIntervals = [
                { start: 18, end: 20 },
                // { start: 9, end: 11 },
            ];

            for (let i = 0; i < 1440; i++) {
                const currentTime = new Date(startDate.getTime() + i * oneMinute);
                const hour = currentTime.getHours();

                const isTrue = trueIntervals.some(interval => hour >= interval.start && hour < interval.end);

                if (isTrue) { // n'ajouter à la liste que si la valeur est true
                    timeSeries.push({
                        date: currentTime.getTime(),
                        value: isTrue
                    });
                }
            }
            console.log(timeSeries);
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
        },

        roundToMinute(date) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
        },

        createChart() {
            const ctx = this.$refs.myChart.getContext("2d");

            const now = new Date();
            const labels = Array.from({ length: 1440 }).map((_, i) => {
                const minute = new Date(now - (1439 - i) * 60 * 1000);
                return `${minute.getHours()}:${String(minute.getMinutes()).padStart(2, '0')}`;
            });

            const data2 = Array(1440).fill(null);
            this.donnees2.forEach(entry => {
                const date = this.roundToMinute(new Date(entry.date));
                const label = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                const index = labels.indexOf(label);
                console.log(label, 'le label');
                if (index !== -1 && entry.value) {
                    data2[index] = 2;
                }
            });
            const data = Array(1440).fill(null);
            this.donnees.forEach(entry => {
                const date = this.roundToMinute(new Date(entry.date));
                const label = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                const index = labels.indexOf(label);
                if (index !== -1 && entry.value) {
                    data[index] = 1;
                }
            });

            this.myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            yAxisID: 'A',
                            label: "Alive",
                            data: data,
                            backgroundColor: "rgba(75, 192, 192, 1)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            categoryPercentage: 0.5, // vous pouvez ajuster cette valeur
                            barPercentage: 1
                        },
                        {
                            yAxisID: 'B',
                            label: "Restart",
                            data: data2,
                            backgroundColor: "rgba(255, 99, 132, 0.5)", // 50% transparent
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 2,
                            categoryPercentage: 2,   // cela rendra la barre deux fois plus large que la barre "Alive"
                            barPercentage: 2
                        }
                    ],
                },
                options: {

                    scales: {
                        xAxes: [{
                            ticks: {
                                maxTicksLimit: 24  // Limiter à 24 étiquettes sur l'axe des abscisses
                            }
                        }],
                        yAxes: [{
                            id: 'A',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                max: 2,
                                min: 0,
                                stepSize: 1
                            },
                            gridLines: {
                                display: false  // Ne pas afficher les lignes de grille pour cet axe
                            }
                        }
                            , {
                            id: 'B',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                max: 2,
                                min: 0,
                                stepSize: 1
                            },
                            gridLines: {
                                display: false  // Ne pas afficher les lignes de grille pour cet axe
                            }
                        }],
                    },
                }

            });
        }


    },
    computed: {
    },
    mounted() {
        this.createChart();
    },
    created() {

    },
    watch: {
        donnees(newData) {
            this.myChart.data.datasets[0].data = newData;
            this.myChart.update();
        },
        etiquettes(newLabels) {
            this.myChart.data.labels = newLabels;
            this.myChart.update();
        },
    },
}
</script>
  
<style scoped >
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