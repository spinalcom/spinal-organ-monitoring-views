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
            <linechart :dataRestartOrgan="dataRestartOrgan" :dataOrganAlive="dataOrganAlive" :temporalite="'week'" />


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
                    <span class="errors" v-if="$v.formOrgan.ip_adress.$error"> Organ ip_adress is required</span>
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

            formOrgan: {
                name: null,
                mac_adress: null,
                ip_adress: null,
                type: null
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
            dataRestartOrgan: [
                {
                    "date": 1698757444000,
                    "value": true
                },
                {
                    "date": 1698757444000
                    ,
                    "value": true
                },

            ],
            dataOrganAlive: [
                {
                    "date": 1698966000000,
                    "value": true
                },
                {
                    "date": 1698966060000,
                    "value": true
                },
                {
                    "date": 1698966120000,
                    "value": true
                },
                {
                    "date": 1698966180000,
                    "value": true
                },
                {
                    "date": 1698966240000,
                    "value": true
                },
                {
                    "date": 1698966300000,
                    "value": true
                },
                {
                    "date": 1698966360000,
                    "value": true
                },
                {
                    "date": 1698966420000,
                    "value": true
                },
                {
                    "date": 1698966480000,
                    "value": true
                },
                {
                    "date": 1698966540000,
                    "value": true
                },
                {
                    "date": 1698966600000,
                    "value": true
                },
                {
                    "date": 1698966660000,
                    "value": true
                },
                {
                    "date": 1698966720000,
                    "value": true
                },
                {
                    "date": 1698966780000,
                    "value": true
                },
                {
                    "date": 1698966840000,
                    "value": true
                },
                {
                    "date": 1698966900000,
                    "value": true
                },
                {
                    "date": 1698966960000,
                    "value": true
                },
                {
                    "date": 1698967020000,
                    "value": true
                },
                {
                    "date": 1698967080000,
                    "value": true
                },
                {
                    "date": 1698967140000,
                    "value": true
                },
                {
                    "date": 1698967200000,
                    "value": true
                },
                {
                    "date": 1698967260000,
                    "value": true
                },
                {
                    "date": 1698967320000,
                    "value": true
                },
                {
                    "date": 1698967380000,
                    "value": true
                },
                {
                    "date": 1698967440000,
                    "value": true
                },
                {
                    "date": 1698967500000,
                    "value": true
                },
                {
                    "date": 1698967560000,
                    "value": true
                },
                {
                    "date": 1698967620000,
                    "value": true
                },
                {
                    "date": 1698967680000,
                    "value": true
                },
                {
                    "date": 1698967740000,
                    "value": true
                },
                {
                    "date": 1698967800000,
                    "value": true
                },
                {
                    "date": 1698967860000,
                    "value": true
                },
                {
                    "date": 1698967920000,
                    "value": true
                },
                {
                    "date": 1698967980000,
                    "value": true
                },
                {
                    "date": 1698968040000,
                    "value": true
                },
                {
                    "date": 1698968100000,
                    "value": true
                },
                {
                    "date": 1698968160000,
                    "value": true
                },
                {
                    "date": 1698968220000,
                    "value": true
                },
                {
                    "date": 1698968280000,
                    "value": true
                },
                {
                    "date": 1698968340000,
                    "value": true
                },
                {
                    "date": 1698968400000,
                    "value": true
                },
                {
                    "date": 1698968460000,
                    "value": true
                },
                {
                    "date": 1698968520000,
                    "value": true
                },
                {
                    "date": 1698968580000,
                    "value": true
                },
                {
                    "date": 1698968640000,
                    "value": true
                },
                {
                    "date": 1698968700000,
                    "value": true
                },
                {
                    "date": 1698968760000,
                    "value": true
                },
                {
                    "date": 1698968820000,
                    "value": true
                },
                {
                    "date": 1698968880000,
                    "value": true
                },
                {
                    "date": 1698968940000,
                    "value": true
                },
                {
                    "date": 1698969000000,
                    "value": true
                },
                {
                    "date": 1698969060000,
                    "value": true
                },
                {
                    "date": 1698969120000,
                    "value": true
                },
                {
                    "date": 1698969180000,
                    "value": true
                },
                {
                    "date": 1698969240000,
                    "value": true
                },
                {
                    "date": 1698969300000,
                    "value": true
                },
                {
                    "date": 1698969360000,
                    "value": true
                },
                {
                    "date": 1698969420000,
                    "value": true
                },
                {
                    "date": 1698969480000,
                    "value": true
                },
                {
                    "date": 1698969540000,
                    "value": true
                },
                {
                    "date": 1698987600000,
                    "value": true
                },
                {
                    "date": 1698987660000,
                    "value": true
                },
                {
                    "date": 1698987720000,
                    "value": true
                },
                {
                    "date": 1698987780000,
                    "value": true
                },
                {
                    "date": 1698987840000,
                    "value": true
                },
                {
                    "date": 1698987900000,
                    "value": true
                },
                {
                    "date": 1698987960000,
                    "value": true
                },
                {
                    "date": 1698988020000,
                    "value": true
                },
                {
                    "date": 1698988080000,
                    "value": true
                },
                {
                    "date": 1698988140000,
                    "value": true
                },
                {
                    "date": 1698988200000,
                    "value": true
                },
                {
                    "date": 1698988260000,
                    "value": true
                },
                {
                    "date": 1698988320000,
                    "value": true
                },
                {
                    "date": 1698988380000,
                    "value": true
                },
                {
                    "date": 1698988440000,
                    "value": true
                },
                {
                    "date": 1698988500000,
                    "value": true
                },
                {
                    "date": 1698988560000,
                    "value": true
                },
                {
                    "date": 1698988620000,
                    "value": true
                },
                {
                    "date": 1698988680000,
                    "value": true
                },
                {
                    "date": 1698988740000,
                    "value": true
                },
                {
                    "date": 1698988800000,
                    "value": true
                },
                {
                    "date": 1698988860000,
                    "value": true
                },
                {
                    "date": 1698988920000,
                    "value": true
                },
                {
                    "date": 1698988980000,
                    "value": true
                },
                {
                    "date": 1698989040000,
                    "value": true
                },
                {
                    "date": 1698989100000,
                    "value": true
                },
                {
                    "date": 1698989160000,
                    "value": true
                },
                {
                    "date": 1698989220000,
                    "value": true
                },
                {
                    "date": 1698989280000,
                    "value": true
                },
                {
                    "date": 1698989340000,
                    "value": true
                },
                {
                    "date": 1698989400000,
                    "value": true
                },
                {
                    "date": 1698989460000,
                    "value": true
                },
                {
                    "date": 1698989520000,
                    "value": true
                },
                {
                    "date": 1698989580000,
                    "value": true
                },
                {
                    "date": 1698989640000,
                    "value": true
                },
                {
                    "date": 1698989700000,
                    "value": true
                },
                {
                    "date": 1698989760000,
                    "value": true
                },
                {
                    "date": 1698989820000,
                    "value": true
                },
                {
                    "date": 1698989880000,
                    "value": true
                },
                {
                    "date": 1698989940000,
                    "value": true
                },
                {
                    "date": 1698990000000,
                    "value": true
                },
                {
                    "date": 1698990060000,
                    "value": true
                },
                {
                    "date": 1698990120000,
                    "value": true
                },
                {
                    "date": 1698990180000,
                    "value": true
                },
                {
                    "date": 1698990240000,
                    "value": true
                },
                {
                    "date": 1698990300000,
                    "value": true
                },
                {
                    "date": 1698990360000,
                    "value": true
                },
                {
                    "date": 1698990420000,
                    "value": true
                },
                {
                    "date": 1698990480000,
                    "value": true
                },
                {
                    "date": 1698990540000,
                    "value": true
                },
                {
                    "date": 1698990600000,
                    "value": true
                },
                {
                    "date": 1698990660000,
                    "value": true
                },
                {
                    "date": 1698990720000,
                    "value": true
                },
                {
                    "date": 1698990780000,
                    "value": true
                },
                {
                    "date": 1698990840000,
                    "value": true
                },
                {
                    "date": 1698990900000,
                    "value": true
                },
                {
                    "date": 1698990960000,
                    "value": true
                },
                {
                    "date": 1698991020000,
                    "value": true
                },
                {
                    "date": 1698991080000,
                    "value": true
                },
                {
                    "date": 1698991140000,
                    "value": true
                },
                {
                    "date": 1698991200000,
                    "value": true
                },
                {
                    "date": 1698991260000,
                    "value": true
                },
                {
                    "date": 1698991320000,
                    "value": true
                },
                {
                    "date": 1698991380000,
                    "value": true
                },
                {
                    "date": 1698991440000,
                    "value": true
                },
                {
                    "date": 1698991500000,
                    "value": true
                },
                {
                    "date": 1698991560000,
                    "value": true
                },
                {
                    "date": 1698991620000,
                    "value": true
                },
                {
                    "date": 1698991680000,
                    "value": true
                },
                {
                    "date": 1698991740000,
                    "value": true
                },
                {
                    "date": 1698991800000,
                    "value": true
                },
                {
                    "date": 1698991860000,
                    "value": true
                },
                {
                    "date": 1698991920000,
                    "value": true
                },
                {
                    "date": 1698991980000,
                    "value": true
                },
                {
                    "date": 1698992040000,
                    "value": true
                },
                {
                    "date": 1698992100000,
                    "value": true
                },
                {
                    "date": 1698992160000,
                    "value": true
                },
                {
                    "date": 1698992220000,
                    "value": true
                },
                {
                    "date": 1698992280000,
                    "value": true
                },
                {
                    "date": 1698992340000,
                    "value": true
                },
                {
                    "date": 1698992400000,
                    "value": true
                },
                {
                    "date": 1698992460000,
                    "value": true
                },
                {
                    "date": 1698992520000,
                    "value": true
                },
                {
                    "date": 1698992580000,
                    "value": true
                },
                {
                    "date": 1698992640000,
                    "value": true
                },
                {
                    "date": 1698992700000,
                    "value": true
                },
                {
                    "date": 1698992760000,
                    "value": true
                },
                {
                    "date": 1698992820000,
                    "value": true
                },
                {
                    "date": 1698992880000,
                    "value": true
                },
                {
                    "date": 1698992940000,
                    "value": true
                },
                {
                    "date": 1698993000000,
                    "value": true
                },
                {
                    "date": 1698993060000,
                    "value": true
                },
                {
                    "date": 1698993120000,
                    "value": true
                },
                {
                    "date": 1698993180000,
                    "value": true
                },
                {
                    "date": 1698993240000,
                    "value": true
                },
                {
                    "date": 1698993300000,
                    "value": true
                },
                {
                    "date": 1698993360000,
                    "value": true
                },
                {
                    "date": 1698993420000,
                    "value": true
                },
                {
                    "date": 1698993480000,
                    "value": true
                },
                {
                    "date": 1698993540000,
                    "value": true
                },
                {
                    "date": 1698993600000,
                    "value": true
                },
                {
                    "date": 1698993660000,
                    "value": true
                },
                {
                    "date": 1698993720000,
                    "value": true
                },
                {
                    "date": 1698993780000,
                    "value": true
                },
                {
                    "date": 1698993840000,
                    "value": true
                },
                {
                    "date": 1698993900000,
                    "value": true
                },
                {
                    "date": 1698993960000,
                    "value": true
                },
                {
                    "date": 1698994020000,
                    "value": true
                },
                {
                    "date": 1698994080000,
                    "value": true
                },
                {
                    "date": 1698994140000,
                    "value": true
                },
                {
                    "date": 1698994200000,
                    "value": true
                },
                {
                    "date": 1698994260000,
                    "value": true
                },
                {
                    "date": 1698994320000,
                    "value": true
                },
                {
                    "date": 1698994380000,
                    "value": true
                },
                {
                    "date": 1698994440000,
                    "value": true
                },
                {
                    "date": 1698994500000,
                    "value": true
                },
                {
                    "date": 1698994560000,
                    "value": true
                },
                {
                    "date": 1698994620000,
                    "value": true
                },
                {
                    "date": 1698994680000,
                    "value": true
                },
                {
                    "date": 1698994740000,
                    "value": true
                },
                {
                    "date": 1699009200000,
                    "value": true
                },
                {
                    "date": 1699009260000,
                    "value": true
                },
                {
                    "date": 1699009320000,
                    "value": true
                },
                {
                    "date": 1699009380000,
                    "value": true
                },
                {
                    "date": 1699009440000,
                    "value": true
                },
                {
                    "date": 1699009500000,
                    "value": true
                },
                {
                    "date": 1699009560000,
                    "value": true
                },
                {
                    "date": 1699009620000,
                    "value": true
                },
                {
                    "date": 1699009680000,
                    "value": true
                },
                {
                    "date": 1699009740000,
                    "value": true
                },
                {
                    "date": 1699009800000,
                    "value": true
                },
                {
                    "date": 1699009860000,
                    "value": true
                },
                {
                    "date": 1699009920000,
                    "value": true
                },
                {
                    "date": 1699009980000,
                    "value": true
                },
                {
                    "date": 1699010040000,
                    "value": true
                },
                {
                    "date": 1699010100000,
                    "value": true
                },
                {
                    "date": 1699010160000,
                    "value": true
                },
                {
                    "date": 1699010220000,
                    "value": true
                },
                {
                    "date": 1699010280000,
                    "value": true
                },
                {
                    "date": 1699010340000,
                    "value": true
                },
                {
                    "date": 1699010400000,
                    "value": true
                },
                {
                    "date": 1699010460000,
                    "value": true
                },
                {
                    "date": 1699010520000,
                    "value": true
                },
                {
                    "date": 1699010580000,
                    "value": true
                },
                {
                    "date": 1699010640000,
                    "value": true
                },
                {
                    "date": 1699010700000,
                    "value": true
                },
                {
                    "date": 1699010760000,
                    "value": true
                },
                {
                    "date": 1699010820000,
                    "value": true
                },
                {
                    "date": 1699010880000,
                    "value": true
                },
                {
                    "date": 1699010940000,
                    "value": true
                },
                {
                    "date": 1699011000000,
                    "value": true
                },
                {
                    "date": 1699011060000,
                    "value": true
                },
                {
                    "date": 1699011120000,
                    "value": true
                },
                {
                    "date": 1699011180000,
                    "value": true
                },
                {
                    "date": 1699011240000,
                    "value": true
                },
                {
                    "date": 1699011300000,
                    "value": true
                },
                {
                    "date": 1699011360000,
                    "value": true
                },
                {
                    "date": 1699011420000,
                    "value": true
                },
                {
                    "date": 1699011480000,
                    "value": true
                },
                {
                    "date": 1699011540000,
                    "value": true
                },
                {
                    "date": 1699011600000,
                    "value": true
                },
                {
                    "date": 1699011660000,
                    "value": true
                },
                {
                    "date": 1699011720000,
                    "value": true
                },
                {
                    "date": 1699011780000,
                    "value": true
                },
                {
                    "date": 1699011840000,
                    "value": true
                },
                {
                    "date": 1699011900000,
                    "value": true
                },
                {
                    "date": 1699011960000,
                    "value": true
                },
                {
                    "date": 1699012020000,
                    "value": true
                },
                {
                    "date": 1699012080000,
                    "value": true
                },
                {
                    "date": 1699012140000,
                    "value": true
                },
                {
                    "date": 1699012200000,
                    "value": true
                },
                {
                    "date": 1699012260000,
                    "value": true
                },
                {
                    "date": 1699012320000,
                    "value": true
                },
                {
                    "date": 1699012380000,
                    "value": true
                },
                {
                    "date": 1699012440000,
                    "value": true
                },
                {
                    "date": 1699012500000,
                    "value": true
                },
                {
                    "date": 1699012560000,
                    "value": true
                },
                {
                    "date": 1699012620000,
                    "value": true
                },
                {
                    "date": 1699012680000,
                    "value": true
                },
                {
                    "date": 1699012740000,
                    "value": true
                },

                {
                    "date": 1698793200000,
                    "value": true
                },
                {
                    "date": 1698793260000,
                    "value": true
                },
                {
                    "date": 1698793320000,
                    "value": true
                },
                {
                    "date": 1698793380000,
                    "value": true
                },
                {
                    "date": 1698793440000,
                    "value": true
                },
                {
                    "date": 1698793500000,
                    "value": true
                },
                {
                    "date": 1698793560000,
                    "value": true
                },
                {
                    "date": 1698793620000,
                    "value": true
                },
                {
                    "date": 1698793680000,
                    "value": true
                },
                {
                    "date": 1698793740000,
                    "value": true
                },
                {
                    "date": 1698793800000,
                    "value": true
                },
                {
                    "date": 1698793860000,
                    "value": true
                },
                {
                    "date": 1698793920000,
                    "value": true
                },
                {
                    "date": 1698793980000,
                    "value": true
                },
                {
                    "date": 1698794040000,
                    "value": true
                },
                {
                    "date": 1698794100000,
                    "value": true
                },
                {
                    "date": 1698794160000,
                    "value": true
                },
                {
                    "date": 1698794220000,
                    "value": true
                },
                {
                    "date": 1698794280000,
                    "value": true
                },
                {
                    "date": 1698794340000,
                    "value": true
                },
                {
                    "date": 1698794400000,
                    "value": true
                },
                {
                    "date": 1698794460000,
                    "value": true
                },
                {
                    "date": 1698794520000,
                    "value": true
                },
                {
                    "date": 1698794580000,
                    "value": true
                },
                {
                    "date": 1698794640000,
                    "value": true
                },
                {
                    "date": 1698794700000,
                    "value": true
                },
                {
                    "date": 1698794760000,
                    "value": true
                },
                {
                    "date": 1698794820000,
                    "value": true
                },
                {
                    "date": 1698794880000,
                    "value": true
                },
                {
                    "date": 1698794940000,
                    "value": true
                },
                {
                    "date": 1698795000000,
                    "value": true
                },
                {
                    "date": 1698795060000,
                    "value": true
                },
                {
                    "date": 1698795120000,
                    "value": true
                },
                {
                    "date": 1698795180000,
                    "value": true
                },
                {
                    "date": 1698795240000,
                    "value": true
                },
                {
                    "date": 1698795300000,
                    "value": true
                },
                {
                    "date": 1698795360000,
                    "value": true
                },
                {
                    "date": 1698795420000,
                    "value": true
                },
                {
                    "date": 1698795480000,
                    "value": true
                },
                {
                    "date": 1698795540000,
                    "value": true
                },
                {
                    "date": 1698795600000,
                    "value": true
                },
                {
                    "date": 1698795660000,
                    "value": true
                },
                {
                    "date": 1698795720000,
                    "value": true
                },
                {
                    "date": 1698795780000,
                    "value": true
                },
                {
                    "date": 1698795840000,
                    "value": true
                },
                {
                    "date": 1698795900000,
                    "value": true
                },
                {
                    "date": 1698795960000,
                    "value": true
                },
                {
                    "date": 1698796020000,
                    "value": true
                },
                {
                    "date": 1698796080000,
                    "value": true
                },
                {
                    "date": 1698796140000,
                    "value": true
                },
                {
                    "date": 1698796200000,
                    "value": true
                },
                {
                    "date": 1698796260000,
                    "value": true
                },
                {
                    "date": 1698796320000,
                    "value": true
                },
                {
                    "date": 1698796380000,
                    "value": true
                },
                {
                    "date": 1698796440000,
                    "value": true
                },
                {
                    "date": 1698796500000,
                    "value": true
                },
                {
                    "date": 1698796560000,
                    "value": true
                },
                {
                    "date": 1698796620000,
                    "value": true
                },
                {
                    "date": 1698796680000,
                    "value": true
                },
                {
                    "date": 1698796740000,
                    "value": true
                },
                {
                    "date": 1698796800000,
                    "value": true
                },
                {
                    "date": 1698796860000,
                    "value": true
                },
                {
                    "date": 1698796920000,
                    "value": true
                },
                {
                    "date": 1698796980000,
                    "value": true
                },
                {
                    "date": 1698797040000,
                    "value": true
                },
                {
                    "date": 1698797100000,
                    "value": true
                },
                {
                    "date": 1698797160000,
                    "value": true
                },
                {
                    "date": 1698797220000,
                    "value": true
                },
                {
                    "date": 1698797280000,
                    "value": true
                },
                {
                    "date": 1698797340000,
                    "value": true
                },
                {
                    "date": 1698797400000,
                    "value": true
                },
                {
                    "date": 1698797460000,
                    "value": true
                },
                {
                    "date": 1698797520000,
                    "value": true
                },
                {
                    "date": 1698797580000,
                    "value": true
                },
                {
                    "date": 1698797640000,
                    "value": true
                },
                {
                    "date": 1698797700000,
                    "value": true
                },
                {
                    "date": 1698797760000,
                    "value": true
                },
                {
                    "date": 1698797820000,
                    "value": true
                },
                {
                    "date": 1698797880000,
                    "value": true
                },
                {
                    "date": 1698797940000,
                    "value": true
                },
                {
                    "date": 1698798000000,
                    "value": true
                },
                {
                    "date": 1698798060000,
                    "value": true
                },
                {
                    "date": 1698798120000,
                    "value": true
                },
                {
                    "date": 1698798180000,
                    "value": true
                },
                {
                    "date": 1698798240000,
                    "value": true
                },
                {
                    "date": 1698798300000,
                    "value": true
                },
                {
                    "date": 1698798360000,
                    "value": true
                },
                {
                    "date": 1698798420000,
                    "value": true
                },
                {
                    "date": 1698798480000,
                    "value": true
                },
                {
                    "date": 1698798540000,
                    "value": true
                },
                {
                    "date": 1698798600000,
                    "value": true
                },
                {
                    "date": 1698798660000,
                    "value": true
                },
                {
                    "date": 1698798720000,
                    "value": true
                },
                {
                    "date": 1698798780000,
                    "value": true
                },
                {
                    "date": 1698798840000,
                    "value": true
                },
                {
                    "date": 1698798900000,
                    "value": true
                },
                {
                    "date": 1698798960000,
                    "value": true
                },
                {
                    "date": 1698799020000,
                    "value": true
                },
                {
                    "date": 1698799080000,
                    "value": true
                },
                {
                    "date": 1698799140000,
                    "value": true
                },
                {
                    "date": 1698799200000,
                    "value": true
                },
                {
                    "date": 1698799260000,
                    "value": true
                },
                {
                    "date": 1698799320000,
                    "value": true
                },
                {
                    "date": 1698799380000,
                    "value": true
                },
                {
                    "date": 1698799440000,
                    "value": true
                },
                {
                    "date": 1698799500000,
                    "value": true
                },
                {
                    "date": 1698799560000,
                    "value": true
                },
                {
                    "date": 1698799620000,
                    "value": true
                },
                {
                    "date": 1698799680000,
                    "value": true
                },
                {
                    "date": 1698799740000,
                    "value": true
                },
                {
                    "date": 1698799800000,
                    "value": true
                },
                {
                    "date": 1698799860000,
                    "value": true
                },
                {
                    "date": 1698799920000,
                    "value": true
                },
                {
                    "date": 1698799980000,
                    "value": true
                },
                {
                    "date": 1698800040000,
                    "value": true
                },
                {
                    "date": 1698800100000,
                    "value": true
                },
                {
                    "date": 1698800160000,
                    "value": true
                },
                {
                    "date": 1698800220000,
                    "value": true
                },
                {
                    "date": 1698800280000,
                    "value": true
                },
                {
                    "date": 1698800340000,
                    "value": true
                },
                {
                    "date": 1698800400000,
                    "value": true
                },
                {
                    "date": 1698800460000,
                    "value": true
                },
                {
                    "date": 1698800520000,
                    "value": true
                },
                {
                    "date": 1698800580000,
                    "value": true
                },
                {
                    "date": 1698800640000,
                    "value": true
                },
                {
                    "date": 1698800700000,
                    "value": true
                },
                {
                    "date": 1698800760000,
                    "value": true
                },
                {
                    "date": 1698800820000,
                    "value": true
                },
                {
                    "date": 1698800880000,
                    "value": true
                },
                {
                    "date": 1698800940000,
                    "value": true
                },
                {
                    "date": 1698801000000,
                    "value": true
                },
                {
                    "date": 1698801060000,
                    "value": true
                },
                {
                    "date": 1698801120000,
                    "value": true
                },
                {
                    "date": 1698801180000,
                    "value": true
                },
                {
                    "date": 1698801240000,
                    "value": true
                },
                {
                    "date": 1698801300000,
                    "value": true
                },
                {
                    "date": 1698801360000,
                    "value": true
                },
                {
                    "date": 1698801420000,
                    "value": true
                },
                {
                    "date": 1698801480000,
                    "value": true
                },
                {
                    "date": 1698801540000,
                    "value": true
                },
                {
                    "date": 1698801600000,
                    "value": true
                },
                {
                    "date": 1698801660000,
                    "value": true
                },
                {
                    "date": 1698801720000,
                    "value": true
                },
                {
                    "date": 1698801780000,
                    "value": true
                },
                {
                    "date": 1698801840000,
                    "value": true
                },
                {
                    "date": 1698801900000,
                    "value": true
                },
                {
                    "date": 1698801960000,
                    "value": true
                },
                {
                    "date": 1698802020000,
                    "value": true
                },
                {
                    "date": 1698802080000,
                    "value": true
                },
                {
                    "date": 1698802140000,
                    "value": true
                },
                {
                    "date": 1698802200000,
                    "value": true
                },
                {
                    "date": 1698802260000,
                    "value": true
                },
                {
                    "date": 1698802320000,
                    "value": true
                },
                {
                    "date": 1698802380000,
                    "value": true
                },
                {
                    "date": 1698802440000,
                    "value": true
                },
                {
                    "date": 1698802500000,
                    "value": true
                },
                {
                    "date": 1698802560000,
                    "value": true
                },
                {
                    "date": 1698802620000,
                    "value": true
                },
                {
                    "date": 1698802680000,
                    "value": true
                },
                {
                    "date": 1698802740000,
                    "value": true
                },
                {
                    "date": 1698802800000,
                    "value": true
                },
                {
                    "date": 1698802860000,
                    "value": true
                },
                {
                    "date": 1698802920000,
                    "value": true
                },
                {
                    "date": 1698802980000,
                    "value": true
                },
                {
                    "date": 1698803040000,
                    "value": true
                },
                {
                    "date": 1698803100000,
                    "value": true
                },
                {
                    "date": 1698803160000,
                    "value": true
                },
                {
                    "date": 1698803220000,
                    "value": true
                },
                {
                    "date": 1698803280000,
                    "value": true
                },
                {
                    "date": 1698803340000,
                    "value": true
                },
                {
                    "date": 1698803400000,
                    "value": true
                },
                {
                    "date": 1698803460000,
                    "value": true
                },
                {
                    "date": 1698803520000,
                    "value": true
                },
                {
                    "date": 1698803580000,
                    "value": true
                },
                {
                    "date": 1698803640000,
                    "value": true
                },
                {
                    "date": 1698803700000,
                    "value": true
                },
                {
                    "date": 1698803760000,
                    "value": true
                },
                {
                    "date": 1698803820000,
                    "value": true
                },
                {
                    "date": 1698803880000,
                    "value": true
                },
                {
                    "date": 1698803940000,
                    "value": true
                },
                {
                    "date": 1698804000000,
                    "value": true
                },
                {
                    "date": 1698804060000,
                    "value": true
                },
                {
                    "date": 1698804120000,
                    "value": true
                },
                {
                    "date": 1698804180000,
                    "value": true
                },
                {
                    "date": 1698804240000,
                    "value": true
                },
                {
                    "date": 1698804300000,
                    "value": true
                },
                {
                    "date": 1698804360000,
                    "value": true
                },
                {
                    "date": 1698804420000,
                    "value": true
                },
                {
                    "date": 1698804480000,
                    "value": true
                },
                {
                    "date": 1698804540000,
                    "value": true
                },
                {
                    "date": 1698804600000,
                    "value": true
                },
                {
                    "date": 1698804660000,
                    "value": true
                },
                {
                    "date": 1698804720000,
                    "value": true
                },
                {
                    "date": 1698804780000,
                    "value": true
                },
                {
                    "date": 1698804840000,
                    "value": true
                },
                {
                    "date": 1698804900000,
                    "value": true
                },
                {
                    "date": 1698804960000,
                    "value": true
                },
                {
                    "date": 1698805020000,
                    "value": true
                },
                {
                    "date": 1698805080000,
                    "value": true
                },
                {
                    "date": 1698805140000,
                    "value": true
                },
                {
                    "date": 1698805200000,
                    "value": true
                },
                {
                    "date": 1698805260000,
                    "value": true
                },
                {
                    "date": 1698805320000,
                    "value": true
                },
                {
                    "date": 1698805380000,
                    "value": true
                },
                {
                    "date": 1698805440000,
                    "value": true
                },
                {
                    "date": 1698805500000,
                    "value": true
                },
                {
                    "date": 1698805560000,
                    "value": true
                },
                {
                    "date": 1698805620000,
                    "value": true
                },
                {
                    "date": 1698805680000,
                    "value": true
                },
                {
                    "date": 1698805740000,
                    "value": true
                },
                {
                    "date": 1698805800000,
                    "value": true
                },
                {
                    "date": 1698805860000,
                    "value": true
                },
                {
                    "date": 1698805920000,
                    "value": true
                },
                {
                    "date": 1698805980000,
                    "value": true
                },
                {
                    "date": 1698806040000,
                    "value": true
                },
                {
                    "date": 1698806100000,
                    "value": true
                },
                {
                    "date": 1698806160000,
                    "value": true
                },
                {
                    "date": 1698806220000,
                    "value": true
                },
                {
                    "date": 1698806280000,
                    "value": true
                },
                {
                    "date": 1698806340000,
                    "value": true
                },
                {
                    "date": 1698806400000,
                    "value": true
                },
                {
                    "date": 1698806460000,
                    "value": true
                },
                {
                    "date": 1698806520000,
                    "value": true
                },
                {
                    "date": 1698806580000,
                    "value": true
                },
                {
                    "date": 1698806640000,
                    "value": true
                },
                {
                    "date": 1698806700000,
                    "value": true
                },
                {
                    "date": 1698806760000,
                    "value": true
                },
                {
                    "date": 1698806820000,
                    "value": true
                },
                {
                    "date": 1698806880000,
                    "value": true
                },
                {
                    "date": 1698806940000,
                    "value": true
                },
                {
                    "date": 1698807000000,
                    "value": true
                },
                {
                    "date": 1698807060000,
                    "value": true
                },
                {
                    "date": 1698807120000,
                    "value": true
                },
                {
                    "date": 1698807180000,
                    "value": true
                },
                {
                    "date": 1698807240000,
                    "value": true
                },
                {
                    "date": 1698807300000,
                    "value": true
                },
                {
                    "date": 1698807360000,
                    "value": true
                },
                {
                    "date": 1698807420000,
                    "value": true
                },
                {
                    "date": 1698807480000,
                    "value": true
                },
                {
                    "date": 1698807540000,
                    "value": true
                },
                {
                    "date": 1698807600000,
                    "value": true
                },
                {
                    "date": 1698807660000,
                    "value": true
                },
                {
                    "date": 1698807720000,
                    "value": true
                },
                {
                    "date": 1698807780000,
                    "value": true
                },
                {
                    "date": 1698807840000,
                    "value": true
                },
                {
                    "date": 1698807900000,
                    "value": true
                },
                {
                    "date": 1698807960000,
                    "value": true
                },
                {
                    "date": 1698808020000,
                    "value": true
                },
                {
                    "date": 1698808080000,
                    "value": true
                },
                {
                    "date": 1698808140000,
                    "value": true
                },
                {
                    "date": 1698808200000,
                    "value": true
                },
                {
                    "date": 1698808260000,
                    "value": true
                },
                {
                    "date": 1698808320000,
                    "value": true
                },
                {
                    "date": 1698808380000,
                    "value": true
                },
                {
                    "date": 1698808440000,
                    "value": true
                },
                {
                    "date": 1698808500000,
                    "value": true
                },
                {
                    "date": 1698808560000,
                    "value": true
                },
                {
                    "date": 1698808620000,
                    "value": true
                },
                {
                    "date": 1698808680000,
                    "value": true
                },
                {
                    "date": 1698808740000,
                    "value": true
                },
                {
                    "date": 1698808800000,
                    "value": true
                },
                {
                    "date": 1698808860000,
                    "value": true
                },
                {
                    "date": 1698808920000,
                    "value": true
                },
                {
                    "date": 1698808980000,
                    "value": true
                },
                {
                    "date": 1698809040000,
                    "value": true
                },
                {
                    "date": 1698809100000,
                    "value": true
                },
                {
                    "date": 1698809160000,
                    "value": true
                },
                {
                    "date": 1698809220000,
                    "value": true
                },
                {
                    "date": 1698809280000,
                    "value": true
                },
                {
                    "date": 1698809340000,
                    "value": true
                },
                {
                    "date": 1698809400000,
                    "value": true
                },
                {
                    "date": 1698809460000,
                    "value": true
                },
                {
                    "date": 1698809520000,
                    "value": true
                },
                {
                    "date": 1698809580000,
                    "value": true
                },
                {
                    "date": 1698809640000,
                    "value": true
                },
                {
                    "date": 1698809700000,
                    "value": true
                },
                {
                    "date": 1698809760000,
                    "value": true
                },
                {
                    "date": 1698809820000,
                    "value": true
                },
                {
                    "date": 1698809880000,
                    "value": true
                },
                {
                    "date": 1698809940000,
                    "value": true
                },
                {
                    "date": 1698810000000,
                    "value": true
                },
                {
                    "date": 1698810060000,
                    "value": true
                },
                {
                    "date": 1698810120000,
                    "value": true
                },
                {
                    "date": 1698810180000,
                    "value": true
                },
                {
                    "date": 1698810240000,
                    "value": true
                },
                {
                    "date": 1698810300000,
                    "value": true
                },
                {
                    "date": 1698810360000,
                    "value": true
                },
                {
                    "date": 1698810420000,
                    "value": true
                },
                {
                    "date": 1698810480000,
                    "value": true
                },
                {
                    "date": 1698810540000,
                    "value": true
                },
                {
                    "date": 1698810600000,
                    "value": true
                },
                {
                    "date": 1698810660000,
                    "value": true
                },
                {
                    "date": 1698810720000,
                    "value": true
                },
                {
                    "date": 1698810780000,
                    "value": true
                },
                {
                    "date": 1698810840000,
                    "value": true
                },
                {
                    "date": 1698810900000,
                    "value": true
                },
                {
                    "date": 1698810960000,
                    "value": true
                },
                {
                    "date": 1698811020000,
                    "value": true
                },
                {
                    "date": 1698811080000,
                    "value": true
                },
                {
                    "date": 1698811140000,
                    "value": true
                },
                {
                    "date": 1698814800000,
                    "value": true
                },
                {
                    "date": 1698814860000,
                    "value": true
                },
                {
                    "date": 1698814920000,
                    "value": true
                },
                {
                    "date": 1698814980000,
                    "value": true
                },
                {
                    "date": 1698815040000,
                    "value": true
                },
                {
                    "date": 1698815100000,
                    "value": true
                },
                {
                    "date": 1698815160000,
                    "value": true
                },
                {
                    "date": 1698815220000,
                    "value": true
                },
                {
                    "date": 1698815280000,
                    "value": true
                },
                {
                    "date": 1698815340000,
                    "value": true
                },
                {
                    "date": 1698815400000,
                    "value": true
                },
                {
                    "date": 1698815460000,
                    "value": true
                },
                {
                    "date": 1698815520000,
                    "value": true
                },
                {
                    "date": 1698815580000,
                    "value": true
                },
                {
                    "date": 1698815640000,
                    "value": true
                },
                {
                    "date": 1698815700000,
                    "value": true
                },
                {
                    "date": 1698815760000,
                    "value": true
                },
                {
                    "date": 1698815820000,
                    "value": true
                },
                {
                    "date": 1698815880000,
                    "value": true
                },
                {
                    "date": 1698815940000,
                    "value": true
                },
                {
                    "date": 1698816000000,
                    "value": true
                },
                {
                    "date": 1698816060000,
                    "value": true
                },
                {
                    "date": 1698816120000,
                    "value": true
                },
                {
                    "date": 1698816180000,
                    "value": true
                },
                {
                    "date": 1698816240000,
                    "value": true
                },
                {
                    "date": 1698816300000,
                    "value": true
                },
                {
                    "date": 1698816360000,
                    "value": true
                },
                {
                    "date": 1698816420000,
                    "value": true
                },
                {
                    "date": 1698816480000,
                    "value": true
                },
                {
                    "date": 1698816540000,
                    "value": true
                },
                {
                    "date": 1698816600000,
                    "value": true
                },
                {
                    "date": 1698816660000,
                    "value": true
                },
                {
                    "date": 1698816720000,
                    "value": true
                },
                {
                    "date": 1698816780000,
                    "value": true
                },
                {
                    "date": 1698816840000,
                    "value": true
                },
                {
                    "date": 1698816900000,
                    "value": true
                },
                {
                    "date": 1698816960000,
                    "value": true
                },
                {
                    "date": 1698817020000,
                    "value": true
                },
                {
                    "date": 1698817080000,
                    "value": true
                },
                {
                    "date": 1698817140000,
                    "value": true
                },
                {
                    "date": 1698817200000,
                    "value": true
                },
                {
                    "date": 1698817260000,
                    "value": true
                },
                {
                    "date": 1698817320000,
                    "value": true
                },
                {
                    "date": 1698817380000,
                    "value": true
                },
                {
                    "date": 1698817440000,
                    "value": true
                },
                {
                    "date": 1698817500000,
                    "value": true
                },
                {
                    "date": 1698817560000,
                    "value": true
                },
                {
                    "date": 1698817620000,
                    "value": true
                },
                {
                    "date": 1698817680000,
                    "value": true
                },
                {
                    "date": 1698817740000,
                    "value": true
                },
                {
                    "date": 1698817800000,
                    "value": true
                },
                {
                    "date": 1698817860000,
                    "value": true
                },
                {
                    "date": 1698817920000,
                    "value": true
                },
                {
                    "date": 1698817980000,
                    "value": true
                },
                {
                    "date": 1698818040000,
                    "value": true
                },
                {
                    "date": 1698818100000,
                    "value": true
                },
                {
                    "date": 1698818160000,
                    "value": true
                },
                {
                    "date": 1698818220000,
                    "value": true
                },
                {
                    "date": 1698818280000,
                    "value": true
                },
                {
                    "date": 1698818340000,
                    "value": true
                },
                {
                    "date": 1698822000000,
                    "value": true
                },
                {
                    "date": 1698822060000,
                    "value": true
                },
                {
                    "date": 1698822120000,
                    "value": true
                },
                {
                    "date": 1698822180000,
                    "value": true
                },
                {
                    "date": 1698822240000,
                    "value": true
                },
                {
                    "date": 1698822300000,
                    "value": true
                },
                {
                    "date": 1698822360000,
                    "value": true
                },
                {
                    "date": 1698822420000,
                    "value": true
                },
                {
                    "date": 1698822480000,
                    "value": true
                },
                {
                    "date": 1698822540000,
                    "value": true
                },
                {
                    "date": 1698822600000,
                    "value": true
                },
                {
                    "date": 1698822660000,
                    "value": true
                },
                {
                    "date": 1698822720000,
                    "value": true
                },
                {
                    "date": 1698822780000,
                    "value": true
                },
                {
                    "date": 1698822840000,
                    "value": true
                },
                {
                    "date": 1698822900000,
                    "value": true
                },
                {
                    "date": 1698822960000,
                    "value": true
                },
                {
                    "date": 1698823020000,
                    "value": true
                },
                {
                    "date": 1698823080000,
                    "value": true
                },
                {
                    "date": 1698823140000,
                    "value": true
                },
                {
                    "date": 1698823200000,
                    "value": true
                },
                {
                    "date": 1698823260000,
                    "value": true
                },
                {
                    "date": 1698823320000,
                    "value": true
                },
                {
                    "date": 1698823380000,
                    "value": true
                },
                {
                    "date": 1698823440000,
                    "value": true
                },
                {
                    "date": 1698823500000,
                    "value": true
                },
                {
                    "date": 1698823560000,
                    "value": true
                },
                {
                    "date": 1698823620000,
                    "value": true
                },
                {
                    "date": 1698823680000,
                    "value": true
                },
                {
                    "date": 1698823740000,
                    "value": true
                },
                {
                    "date": 1698823800000,
                    "value": true
                },
                {
                    "date": 1698823860000,
                    "value": true
                },
                {
                    "date": 1698823920000,
                    "value": true
                },
                {
                    "date": 1698823980000,
                    "value": true
                },
                {
                    "date": 1698824040000,
                    "value": true
                },
                {
                    "date": 1698824100000,
                    "value": true
                },
                {
                    "date": 1698824160000,
                    "value": true
                },
                {
                    "date": 1698824220000,
                    "value": true
                },
                {
                    "date": 1698824280000,
                    "value": true
                },
                {
                    "date": 1698824340000,
                    "value": true
                },
                {
                    "date": 1698824400000,
                    "value": true
                },
                {
                    "date": 1698824460000,
                    "value": true
                },
                {
                    "date": 1698824520000,
                    "value": true
                },
                {
                    "date": 1698824580000,
                    "value": true
                },
                {
                    "date": 1698824640000,
                    "value": true
                },
                {
                    "date": 1698824700000,
                    "value": true
                },
                {
                    "date": 1698824760000,
                    "value": true
                },
                {
                    "date": 1698824820000,
                    "value": true
                },
                {
                    "date": 1698824880000,
                    "value": true
                },
                {
                    "date": 1698824940000,
                    "value": true
                },
                {
                    "date": 1698825000000,
                    "value": true
                },
                {
                    "date": 1698825060000,
                    "value": true
                },
                {
                    "date": 1698825120000,
                    "value": true
                },
                {
                    "date": 1698825180000,
                    "value": true
                },
                {
                    "date": 1698825240000,
                    "value": true
                },
                {
                    "date": 1698825300000,
                    "value": true
                },
                {
                    "date": 1698825360000,
                    "value": true
                },
                {
                    "date": 1698825420000,
                    "value": true
                },
                {
                    "date": 1698825480000,
                    "value": true
                },
                {
                    "date": 1698825540000,
                    "value": true
                },
                {
                    "date": 1698825600000,
                    "value": true
                },
                {
                    "date": 1698825660000,
                    "value": true
                },
                {
                    "date": 1698825720000,
                    "value": true
                },
                {
                    "date": 1698825780000,
                    "value": true
                },
                {
                    "date": 1698825840000,
                    "value": true
                },
                {
                    "date": 1698825900000,
                    "value": true
                },
                {
                    "date": 1698825960000,
                    "value": true
                },
                {
                    "date": 1698826020000,
                    "value": true
                },
                {
                    "date": 1698826080000,
                    "value": true
                },
                {
                    "date": 1698826140000,
                    "value": true
                },
                {
                    "date": 1698826200000,
                    "value": true
                },
                {
                    "date": 1698826260000,
                    "value": true
                },
                {
                    "date": 1698826320000,
                    "value": true
                },
                {
                    "date": 1698826380000,
                    "value": true
                },
                {
                    "date": 1698826440000,
                    "value": true
                },
                {
                    "date": 1698826500000,
                    "value": true
                },
                {
                    "date": 1698826560000,
                    "value": true
                },
                {
                    "date": 1698826620000,
                    "value": true
                },
                {
                    "date": 1698826680000,
                    "value": true
                },
                {
                    "date": 1698826740000,
                    "value": true
                },
                {
                    "date": 1698826800000,
                    "value": true
                },
                {
                    "date": 1698826860000,
                    "value": true
                },
                {
                    "date": 1698826920000,
                    "value": true
                },
                {
                    "date": 1698826980000,
                    "value": true
                },
                {
                    "date": 1698827040000,
                    "value": true
                },
                {
                    "date": 1698827100000,
                    "value": true
                },
                {
                    "date": 1698827160000,
                    "value": true
                },
                {
                    "date": 1698827220000,
                    "value": true
                },
                {
                    "date": 1698827280000,
                    "value": true
                },
                {
                    "date": 1698827340000,
                    "value": true
                },
                {
                    "date": 1698827400000,
                    "value": true
                },
                {
                    "date": 1698827460000,
                    "value": true
                },
                {
                    "date": 1698827520000,
                    "value": true
                },
                {
                    "date": 1698827580000,
                    "value": true
                },
                {
                    "date": 1698827640000,
                    "value": true
                },
                {
                    "date": 1698827700000,
                    "value": true
                },
                {
                    "date": 1698827760000,
                    "value": true
                },
                {
                    "date": 1698827820000,
                    "value": true
                },
                {
                    "date": 1698827880000,
                    "value": true
                },
                {
                    "date": 1698827940000,
                    "value": true
                },
                {
                    "date": 1698828000000,
                    "value": true
                },
                {
                    "date": 1698828060000,
                    "value": true
                },
                {
                    "date": 1698828120000,
                    "value": true
                },
                {
                    "date": 1698828180000,
                    "value": true
                },
                {
                    "date": 1698828240000,
                    "value": true
                },
                {
                    "date": 1698828300000,
                    "value": true
                },
                {
                    "date": 1698828360000,
                    "value": true
                },
                {
                    "date": 1698828420000,
                    "value": true
                },
                {
                    "date": 1698828480000,
                    "value": true
                },
                {
                    "date": 1698828540000,
                    "value": true
                },
                {
                    "date": 1698828600000,
                    "value": true
                },
                {
                    "date": 1698828660000,
                    "value": true
                },
                {
                    "date": 1698828720000,
                    "value": true
                },
                {
                    "date": 1698828780000,
                    "value": true
                },
                {
                    "date": 1698828840000,
                    "value": true
                },
                {
                    "date": 1698828900000,
                    "value": true
                },
                {
                    "date": 1698828960000,
                    "value": true
                },
                {
                    "date": 1698829020000,
                    "value": true
                },
                {
                    "date": 1698829080000,
                    "value": true
                },
                {
                    "date": 1698829140000,
                    "value": true
                },
                {
                    "date": 1698829200000,
                    "value": true
                },
                {
                    "date": 1698829260000,
                    "value": true
                },
                {
                    "date": 1698829320000,
                    "value": true
                },
                {
                    "date": 1698829380000,
                    "value": true
                },
                {
                    "date": 1698829440000,
                    "value": true
                },
                {
                    "date": 1698829500000,
                    "value": true
                },
                {
                    "date": 1698829560000,
                    "value": true
                },
                {
                    "date": 1698829620000,
                    "value": true
                },
                {
                    "date": 1698829680000,
                    "value": true
                },
                {
                    "date": 1698829740000,
                    "value": true
                },
                {
                    "date": 1698829800000,
                    "value": true
                },
                {
                    "date": 1698829860000,
                    "value": true
                },
                {
                    "date": 1698829920000,
                    "value": true
                },
                {
                    "date": 1698829980000,
                    "value": true
                },
                {
                    "date": 1698830040000,
                    "value": true
                },
                {
                    "date": 1698830100000,
                    "value": true
                },
                {
                    "date": 1698830160000,
                    "value": true
                },
                {
                    "date": 1698830220000,
                    "value": true
                },
                {
                    "date": 1698830280000,
                    "value": true
                },
                {
                    "date": 1698830340000,
                    "value": true
                },
                {
                    "date": 1698830400000,
                    "value": true
                },
                {
                    "date": 1698830460000,
                    "value": true
                },
                {
                    "date": 1698830520000,
                    "value": true
                },
                {
                    "date": 1698830580000,
                    "value": true
                },
                {
                    "date": 1698830640000,
                    "value": true
                },
                {
                    "date": 1698830700000,
                    "value": true
                },
                {
                    "date": 1698830760000,
                    "value": true
                },
                {
                    "date": 1698830820000,
                    "value": true
                },
                {
                    "date": 1698830880000,
                    "value": true
                },
                {
                    "date": 1698830940000,
                    "value": true
                },
                {
                    "date": 1698831000000,
                    "value": true
                },
                {
                    "date": 1698831060000,
                    "value": true
                },
                {
                    "date": 1698831120000,
                    "value": true
                },
                {
                    "date": 1698831180000,
                    "value": true
                },
                {
                    "date": 1698831240000,
                    "value": true
                },
                {
                    "date": 1698831300000,
                    "value": true
                },
                {
                    "date": 1698831360000,
                    "value": true
                },
                {
                    "date": 1698831420000,
                    "value": true
                },
                {
                    "date": 1698831480000,
                    "value": true
                },
                {
                    "date": 1698831540000,
                    "value": true
                },
                {
                    "date": 1698831600000,
                    "value": true
                },
                {
                    "date": 1698831660000,
                    "value": true
                },
                {
                    "date": 1698831720000,
                    "value": true
                },
                {
                    "date": 1698831780000,
                    "value": true
                },
                {
                    "date": 1698831840000,
                    "value": true
                },
                {
                    "date": 1698831900000,
                    "value": true
                },
                {
                    "date": 1698831960000,
                    "value": true
                },
                {
                    "date": 1698832020000,
                    "value": true
                },
                {
                    "date": 1698832080000,
                    "value": true
                },
                {
                    "date": 1698832140000,
                    "value": true
                },
                {
                    "date": 1698832200000,
                    "value": true
                },
                {
                    "date": 1698832260000,
                    "value": true
                },
                {
                    "date": 1698832320000,
                    "value": true
                },
                {
                    "date": 1698832380000,
                    "value": true
                },
                {
                    "date": 1698832440000,
                    "value": true
                },
                {
                    "date": 1698832500000,
                    "value": true
                },
                {
                    "date": 1698832560000,
                    "value": true
                },
                {
                    "date": 1698832620000,
                    "value": true
                },
                {
                    "date": 1698832680000,
                    "value": true
                },
                {
                    "date": 1698832740000,
                    "value": true
                },
                {
                    "date": 1698832800000,
                    "value": true
                },
                {
                    "date": 1698832860000,
                    "value": true
                },
                {
                    "date": 1698832920000,
                    "value": true
                },
                {
                    "date": 1698832980000,
                    "value": true
                },
                {
                    "date": 1698833040000,
                    "value": true
                },
                {
                    "date": 1698833100000,
                    "value": true
                },
                {
                    "date": 1698833160000,
                    "value": true
                },
                {
                    "date": 1698833220000,
                    "value": true
                },
                {
                    "date": 1698833280000,
                    "value": true
                },
                {
                    "date": 1698833340000,
                    "value": true
                },
                {
                    "date": 1698833400000,
                    "value": true
                },
                {
                    "date": 1698833460000,
                    "value": true
                },
                {
                    "date": 1698833520000,
                    "value": true
                },
                {
                    "date": 1698833580000,
                    "value": true
                },
                {
                    "date": 1698833640000,
                    "value": true
                },
                {
                    "date": 1698833700000,
                    "value": true
                },
                {
                    "date": 1698833760000,
                    "value": true
                },
                {
                    "date": 1698833820000,
                    "value": true
                },
                {
                    "date": 1698833880000,
                    "value": true
                },
                {
                    "date": 1698833940000,
                    "value": true
                },
                {
                    "date": 1698834000000,
                    "value": true
                },
                {
                    "date": 1698834060000,
                    "value": true
                },
                {
                    "date": 1698834120000,
                    "value": true
                },
                {
                    "date": 1698834180000,
                    "value": true
                },
                {
                    "date": 1698834240000,
                    "value": true
                },
                {
                    "date": 1698834300000,
                    "value": true
                },
                {
                    "date": 1698834360000,
                    "value": true
                },
                {
                    "date": 1698834420000,
                    "value": true
                },
                {
                    "date": 1698834480000,
                    "value": true
                },
                {
                    "date": 1698834540000,
                    "value": true
                },
                {
                    "date": 1698834600000,
                    "value": true
                },
                {
                    "date": 1698834660000,
                    "value": true
                },
                {
                    "date": 1698834720000,
                    "value": true
                },
                {
                    "date": 1698834780000,
                    "value": true
                },
                {
                    "date": 1698834840000,
                    "value": true
                },
                {
                    "date": 1698834900000,
                    "value": true
                },
                {
                    "date": 1698834960000,
                    "value": true
                },
                {
                    "date": 1698835020000,
                    "value": true
                },
                {
                    "date": 1698835080000,
                    "value": true
                },
                {
                    "date": 1698835140000,
                    "value": true
                },
                {
                    "date": 1698835200000,
                    "value": true
                },
                {
                    "date": 1698835260000,
                    "value": true
                },
                {
                    "date": 1698835320000,
                    "value": true
                },
                {
                    "date": 1698835380000,
                    "value": true
                },
                {
                    "date": 1698835440000,
                    "value": true
                },
                {
                    "date": 1698835500000,
                    "value": true
                },
                {
                    "date": 1698835560000,
                    "value": true
                },
                {
                    "date": 1698835620000,
                    "value": true
                },
                {
                    "date": 1698835680000,
                    "value": true
                },
                {
                    "date": 1698835740000,
                    "value": true
                },
                {
                    "date": 1698835800000,
                    "value": true
                },
                {
                    "date": 1698835860000,
                    "value": true
                },
                {
                    "date": 1698835920000,
                    "value": true
                },
                {
                    "date": 1698835980000,
                    "value": true
                },
                {
                    "date": 1698836040000,
                    "value": true
                },
                {
                    "date": 1698836100000,
                    "value": true
                },
                {
                    "date": 1698836160000,
                    "value": true
                },
                {
                    "date": 1698836220000,
                    "value": true
                },
                {
                    "date": 1698836280000,
                    "value": true
                },
                {
                    "date": 1698836340000,
                    "value": true
                },
                {
                    "date": 1698836400000,
                    "value": true
                },
                {
                    "date": 1698836460000,
                    "value": true
                },
                {
                    "date": 1698836520000,
                    "value": true
                },
                {
                    "date": 1698836580000,
                    "value": true
                },
                {
                    "date": 1698836640000,
                    "value": true
                },
                {
                    "date": 1698836700000,
                    "value": true
                },
                {
                    "date": 1698836760000,
                    "value": true
                },
                {
                    "date": 1698836820000,
                    "value": true
                },
                {
                    "date": 1698836880000,
                    "value": true
                },
                {
                    "date": 1698836940000,
                    "value": true
                },
                {
                    "date": 1698837000000,
                    "value": true
                },
                {
                    "date": 1698837060000,
                    "value": true
                },
                {
                    "date": 1698837120000,
                    "value": true
                },
                {
                    "date": 1698837180000,
                    "value": true
                },
                {
                    "date": 1698837240000,
                    "value": true
                },
                {
                    "date": 1698837300000,
                    "value": true
                },
                {
                    "date": 1698837360000,
                    "value": true
                },
                {
                    "date": 1698837420000,
                    "value": true
                },
                {
                    "date": 1698837480000,
                    "value": true
                },
                {
                    "date": 1698837540000,
                    "value": true
                },
                {
                    "date": 1698837600000,
                    "value": true
                },
                {
                    "date": 1698837660000,
                    "value": true
                },
                {
                    "date": 1698837720000,
                    "value": true
                },
                {
                    "date": 1698837780000,
                    "value": true
                },
                {
                    "date": 1698837840000,
                    "value": true
                },
                {
                    "date": 1698837900000,
                    "value": true
                },
                {
                    "date": 1698837960000,
                    "value": true
                },
                {
                    "date": 1698838020000,
                    "value": true
                },
                {
                    "date": 1698838080000,
                    "value": true
                },
                {
                    "date": 1698838140000,
                    "value": true
                },
                {
                    "date": 1698838200000,
                    "value": true
                },
                {
                    "date": 1698838260000,
                    "value": true
                },
                {
                    "date": 1698838320000,
                    "value": true
                },
                {
                    "date": 1698838380000,
                    "value": true
                },
                {
                    "date": 1698838440000,
                    "value": true
                },
                {
                    "date": 1698838500000,
                    "value": true
                },
                {
                    "date": 1698838560000,
                    "value": true
                },
                {
                    "date": 1698838620000,
                    "value": true
                },
                {
                    "date": 1698838680000,
                    "value": true
                },
                {
                    "date": 1698838740000,
                    "value": true
                },
                {
                    "date": 1698838800000,
                    "value": true
                },
                {
                    "date": 1698838860000,
                    "value": true
                },
                {
                    "date": 1698838920000,
                    "value": true
                },
                {
                    "date": 1698838980000,
                    "value": true
                },
                {
                    "date": 1698839040000,
                    "value": true
                },
                {
                    "date": 1698839100000,
                    "value": true
                },
                {
                    "date": 1698839160000,
                    "value": true
                },
                {
                    "date": 1698839220000,
                    "value": true
                },
                {
                    "date": 1698839280000,
                    "value": true
                },
                {
                    "date": 1698839340000,
                    "value": true
                },
                {
                    "date": 1698839400000,
                    "value": true
                },
                {
                    "date": 1698839460000,
                    "value": true
                },
                {
                    "date": 1698839520000,
                    "value": true
                },
                {
                    "date": 1698839580000,
                    "value": true
                },
                {
                    "date": 1698839640000,
                    "value": true
                },
                {
                    "date": 1698839700000,
                    "value": true
                },
                {
                    "date": 1698839760000,
                    "value": true
                },
                {
                    "date": 1698839820000,
                    "value": true
                },
                {
                    "date": 1698839880000,
                    "value": true
                },
                {
                    "date": 1698839940000,
                    "value": true
                },
                {
                    "date": 1698840000000,
                    "value": true
                },
                {
                    "date": 1698840060000,
                    "value": true
                },
                {
                    "date": 1698840120000,
                    "value": true
                },
                {
                    "date": 1698840180000,
                    "value": true
                },
                {
                    "date": 1698840240000,
                    "value": true
                },
                {
                    "date": 1698840300000,
                    "value": true
                },
                {
                    "date": 1698840360000,
                    "value": true
                },
                {
                    "date": 1698840420000,
                    "value": true
                },
                {
                    "date": 1698840480000,
                    "value": true
                },
                {
                    "date": 1698840540000,
                    "value": true
                },
                {
                    "date": 1698840600000,
                    "value": true
                },
                {
                    "date": 1698840660000,
                    "value": true
                },
                {
                    "date": 1698840720000,
                    "value": true
                },
                {
                    "date": 1698840780000,
                    "value": true
                },
                {
                    "date": 1698840840000,
                    "value": true
                },
                {
                    "date": 1698840900000,
                    "value": true
                },
                {
                    "date": 1698840960000,
                    "value": true
                },
                {
                    "date": 1698841020000,
                    "value": true
                },
                {
                    "date": 1698841080000,
                    "value": true
                },
                {
                    "date": 1698841140000,
                    "value": true
                },
                {
                    "date": 1698841200000,
                    "value": true
                },
                {
                    "date": 1698841260000,
                    "value": true
                },
                {
                    "date": 1698841320000,
                    "value": true
                },
                {
                    "date": 1698841380000,
                    "value": true
                },
                {
                    "date": 1698841440000,
                    "value": true
                },
                {
                    "date": 1698841500000,
                    "value": true
                },
                {
                    "date": 1698841560000,
                    "value": true
                },
                {
                    "date": 1698841620000,
                    "value": true
                },
                {
                    "date": 1698841680000,
                    "value": true
                },
                {
                    "date": 1698841740000,
                    "value": true
                },
                {
                    "date": 1698841800000,
                    "value": true
                },
                {
                    "date": 1698841860000,
                    "value": true
                },
                {
                    "date": 1698841920000,
                    "value": true
                },
                {
                    "date": 1698841980000,
                    "value": true
                },
                {
                    "date": 1698842040000,
                    "value": true
                },
                {
                    "date": 1698842100000,
                    "value": true
                },
                {
                    "date": 1698842160000,
                    "value": true
                },
                {
                    "date": 1698842220000,
                    "value": true
                },
                {
                    "date": 1698842280000,
                    "value": true
                },
                {
                    "date": 1698842340000,
                    "value": true
                },
                {
                    "date": 1698842400000,
                    "value": true
                },
                {
                    "date": 1698842460000,
                    "value": true
                },
                {
                    "date": 1698842520000,
                    "value": true
                },
                {
                    "date": 1698842580000,
                    "value": true
                },
                {
                    "date": 1698842640000,
                    "value": true
                },
                {
                    "date": 1698842700000,
                    "value": true
                },
                {
                    "date": 1698842760000,
                    "value": true
                },
                {
                    "date": 1698842820000,
                    "value": true
                },
                {
                    "date": 1698842880000,
                    "value": true
                },
                {
                    "date": 1698842940000,
                    "value": true
                },
                {
                    "date": 1698843000000,
                    "value": true
                },
                {
                    "date": 1698843060000,
                    "value": true
                },
                {
                    "date": 1698843120000,
                    "value": true
                },
                {
                    "date": 1698843180000,
                    "value": true
                },
                {
                    "date": 1698843240000,
                    "value": true
                },
                {
                    "date": 1698843300000,
                    "value": true
                },
                {
                    "date": 1698843360000,
                    "value": true
                },
                {
                    "date": 1698843420000,
                    "value": true
                },
                {
                    "date": 1698843480000,
                    "value": true
                },
                {
                    "date": 1698843540000,
                    "value": true
                },
                {
                    "date": 1698843600000,
                    "value": true
                },
                {
                    "date": 1698843660000,
                    "value": true
                },
                {
                    "date": 1698843720000,
                    "value": true
                },
                {
                    "date": 1698843780000,
                    "value": true
                },
                {
                    "date": 1698843840000,
                    "value": true
                },
                {
                    "date": 1698843900000,
                    "value": true
                },
                {
                    "date": 1698843960000,
                    "value": true
                },
                {
                    "date": 1698844020000,
                    "value": true
                },
                {
                    "date": 1698844080000,
                    "value": true
                },
                {
                    "date": 1698844140000,
                    "value": true
                },
                {
                    "date": 1698844200000,
                    "value": true
                },
                {
                    "date": 1698844260000,
                    "value": true
                },
                {
                    "date": 1698844320000,
                    "value": true
                },
                {
                    "date": 1698844380000,
                    "value": true
                },
                {
                    "date": 1698844440000,
                    "value": true
                },
                {
                    "date": 1698844500000,
                    "value": true
                },
                {
                    "date": 1698844560000,
                    "value": true
                },
                {
                    "date": 1698844620000,
                    "value": true
                },
                {
                    "date": 1698844680000,
                    "value": true
                },
                {
                    "date": 1698844740000,
                    "value": true
                },
                {
                    "date": 1698844800000,
                    "value": true
                },
                {
                    "date": 1698844860000,
                    "value": true
                },
                {
                    "date": 1698844920000,
                    "value": true
                },
                {
                    "date": 1698844980000,
                    "value": true
                },
                {
                    "date": 1698845040000,
                    "value": true
                },
                {
                    "date": 1698845100000,
                    "value": true
                },
                {
                    "date": 1698845160000,
                    "value": true
                },
                {
                    "date": 1698845220000,
                    "value": true
                },
                {
                    "date": 1698845280000,
                    "value": true
                },
                {
                    "date": 1698845340000,
                    "value": true
                },
                {
                    "date": 1698845400000,
                    "value": true
                },
                {
                    "date": 1698845460000,
                    "value": true
                },
                {
                    "date": 1698845520000,
                    "value": true
                },
                {
                    "date": 1698845580000,
                    "value": true
                },
                {
                    "date": 1698845640000,
                    "value": true
                },
                {
                    "date": 1698845700000,
                    "value": true
                },
                {
                    "date": 1698845760000,
                    "value": true
                },
                {
                    "date": 1698845820000,
                    "value": true
                },
                {
                    "date": 1698845880000,
                    "value": true
                },
                {
                    "date": 1698845940000,
                    "value": true
                },
                {
                    "date": 1698846000000,
                    "value": true
                },
                {
                    "date": 1698846060000,
                    "value": true
                },
                {
                    "date": 1698846120000,
                    "value": true
                },
                {
                    "date": 1698846180000,
                    "value": true
                },
                {
                    "date": 1698846240000,
                    "value": true
                },
                {
                    "date": 1698846300000,
                    "value": true
                },
                {
                    "date": 1698846360000,
                    "value": true
                },
                {
                    "date": 1698846420000,
                    "value": true
                },
                {
                    "date": 1698846480000,
                    "value": true
                },
                {
                    "date": 1698846540000,
                    "value": true
                },
                {
                    "date": 1698846600000,
                    "value": true
                },
                {
                    "date": 1698846660000,
                    "value": true
                },
                {
                    "date": 1698846720000,
                    "value": true
                },
                {
                    "date": 1698846780000,
                    "value": true
                },
                {
                    "date": 1698846840000,
                    "value": true
                },
                {
                    "date": 1698846900000,
                    "value": true
                },
                {
                    "date": 1698846960000,
                    "value": true
                },
                {
                    "date": 1698847020000,
                    "value": true
                },
                {
                    "date": 1698847080000,
                    "value": true
                },
                {
                    "date": 1698847140000,
                    "value": true
                },
                {
                    "date": 1698847200000,
                    "value": true
                },
                {
                    "date": 1698847260000,
                    "value": true
                },
                {
                    "date": 1698847320000,
                    "value": true
                },
                {
                    "date": 1698847380000,
                    "value": true
                },
                {
                    "date": 1698847440000,
                    "value": true
                },
                {
                    "date": 1698847500000,
                    "value": true
                },
                {
                    "date": 1698847560000,
                    "value": true
                },
                {
                    "date": 1698847620000,
                    "value": true
                },
                {
                    "date": 1698847680000,
                    "value": true
                },
                {
                    "date": 1698847740000,
                    "value": true
                },
                {
                    "date": 1698847800000,
                    "value": true
                },
                {
                    "date": 1698847860000,
                    "value": true
                },
                {
                    "date": 1698847920000,
                    "value": true
                },
                {
                    "date": 1698847980000,
                    "value": true
                },
                {
                    "date": 1698848040000,
                    "value": true
                },
                {
                    "date": 1698848100000,
                    "value": true
                },
                {
                    "date": 1698848160000,
                    "value": true
                },
                {
                    "date": 1698848220000,
                    "value": true
                },
                {
                    "date": 1698848280000,
                    "value": true
                },
                {
                    "date": 1698848340000,
                    "value": true
                },
                {
                    "date": 1698848400000,
                    "value": true
                },
                {
                    "date": 1698848460000,
                    "value": true
                },
                {
                    "date": 1698848520000,
                    "value": true
                },
                {
                    "date": 1698848580000,
                    "value": true
                },
                {
                    "date": 1698848640000,
                    "value": true
                },
                {
                    "date": 1698848700000,
                    "value": true
                },
                {
                    "date": 1698848760000,
                    "value": true
                },
                {
                    "date": 1698848820000,
                    "value": true
                },
                {
                    "date": 1698848880000,
                    "value": true
                },
                {
                    "date": 1698848940000,
                    "value": true
                },
                {
                    "date": 1698849000000,
                    "value": true
                },
                {
                    "date": 1698849060000,
                    "value": true
                },
                {
                    "date": 1698849120000,
                    "value": true
                },
                {
                    "date": 1698849180000,
                    "value": true
                },
                {
                    "date": 1698849240000,
                    "value": true
                },
                {
                    "date": 1698849300000,
                    "value": true
                },
                {
                    "date": 1698849360000,
                    "value": true
                },
                {
                    "date": 1698849420000,
                    "value": true
                },
                {
                    "date": 1698849480000,
                    "value": true
                },
                {
                    "date": 1698849540000,
                    "value": true
                },
                {
                    "date": 1698849600000,
                    "value": true
                },
                {
                    "date": 1698849660000,
                    "value": true
                },
                {
                    "date": 1698849720000,
                    "value": true
                },
                {
                    "date": 1698849780000,
                    "value": true
                },
                {
                    "date": 1698849840000,
                    "value": true
                },
                {
                    "date": 1698849900000,
                    "value": true
                },
                {
                    "date": 1698849960000,
                    "value": true
                },
                {
                    "date": 1698850020000,
                    "value": true
                },
                {
                    "date": 1698850080000,
                    "value": true
                },
                {
                    "date": 1698850140000,
                    "value": true
                },
                {
                    "date": 1698850200000,
                    "value": true
                },
                {
                    "date": 1698850260000,
                    "value": true
                },
                {
                    "date": 1698850320000,
                    "value": true
                },
                {
                    "date": 1698850380000,
                    "value": true
                },
                {
                    "date": 1698850440000,
                    "value": true
                },
                {
                    "date": 1698850500000,
                    "value": true
                },
                {
                    "date": 1698850560000,
                    "value": true
                },
                {
                    "date": 1698850620000,
                    "value": true
                },
                {
                    "date": 1698850680000,
                    "value": true
                },
                {
                    "date": 1698850740000,
                    "value": true
                },
                {
                    "date": 1698850800000,
                    "value": true
                },
                {
                    "date": 1698850860000,
                    "value": true
                },
                {
                    "date": 1698850920000,
                    "value": true
                },
                {
                    "date": 1698850980000,
                    "value": true
                },
                {
                    "date": 1698851040000,
                    "value": true
                },
                {
                    "date": 1698851100000,
                    "value": true
                },
                {
                    "date": 1698851160000,
                    "value": true
                },
                {
                    "date": 1698851220000,
                    "value": true
                },
                {
                    "date": 1698851280000,
                    "value": true
                },
                {
                    "date": 1698851340000,
                    "value": true
                },
                {
                    "date": 1698851400000,
                    "value": true
                },
                {
                    "date": 1698851460000,
                    "value": true
                },
                {
                    "date": 1698851520000,
                    "value": true
                },
                {
                    "date": 1698851580000,
                    "value": true
                },
                {
                    "date": 1698851640000,
                    "value": true
                },
                {
                    "date": 1698851700000,
                    "value": true
                },
                {
                    "date": 1698851760000,
                    "value": true
                },
                {
                    "date": 1698851820000,
                    "value": true
                },
                {
                    "date": 1698851880000,
                    "value": true
                },
                {
                    "date": 1698851940000,
                    "value": true
                },
                {
                    "date": 1698852000000,
                    "value": true
                },
                {
                    "date": 1698852060000,
                    "value": true
                },
                {
                    "date": 1698852120000,
                    "value": true
                },
                {
                    "date": 1698852180000,
                    "value": true
                },
                {
                    "date": 1698852240000,
                    "value": true
                },
                {
                    "date": 1698852300000,
                    "value": true
                },
                {
                    "date": 1698852360000,
                    "value": true
                },
                {
                    "date": 1698852420000,
                    "value": true
                },
                {
                    "date": 1698852480000,
                    "value": true
                },
                {
                    "date": 1698852540000,
                    "value": true
                },
                {
                    "date": 1698852600000,
                    "value": true
                },
                {
                    "date": 1698852660000,
                    "value": true
                },
                {
                    "date": 1698852720000,
                    "value": true
                },
                {
                    "date": 1698852780000,
                    "value": true
                },
                {
                    "date": 1698852840000,
                    "value": true
                },
                {
                    "date": 1698852900000,
                    "value": true
                },
                {
                    "date": 1698852960000,
                    "value": true
                },
                {
                    "date": 1698853020000,
                    "value": true
                },
                {
                    "date": 1698853080000,
                    "value": true
                },
                {
                    "date": 1698853140000,
                    "value": true
                },
                {
                    "date": 1698853200000,
                    "value": true
                },
                {
                    "date": 1698853260000,
                    "value": true
                },
                {
                    "date": 1698853320000,
                    "value": true
                },
                {
                    "date": 1698853380000,
                    "value": true
                },
                {
                    "date": 1698853440000,
                    "value": true
                },
                {
                    "date": 1698853500000,
                    "value": true
                },
                {
                    "date": 1698853560000,
                    "value": true
                },
                {
                    "date": 1698853620000,
                    "value": true
                },
                {
                    "date": 1698853680000,
                    "value": true
                },
                {
                    "date": 1698853740000,
                    "value": true
                },
                {
                    "date": 1698853800000,
                    "value": true
                },
                {
                    "date": 1698853860000,
                    "value": true
                },
                {
                    "date": 1698853920000,
                    "value": true
                },
                {
                    "date": 1698853980000,
                    "value": true
                },
                {
                    "date": 1698854040000,
                    "value": true
                },
                {
                    "date": 1698854100000,
                    "value": true
                },
                {
                    "date": 1698854160000,
                    "value": true
                },
                {
                    "date": 1698854220000,
                    "value": true
                },
                {
                    "date": 1698854280000,
                    "value": true
                },
                {
                    "date": 1698854340000,
                    "value": true
                },
                {
                    "date": 1698854400000,
                    "value": true
                },
                {
                    "date": 1698854460000,
                    "value": true
                },
                {
                    "date": 1698854520000,
                    "value": true
                },
                {
                    "date": 1698854580000,
                    "value": true
                },
                {
                    "date": 1698854640000,
                    "value": true
                },
                {
                    "date": 1698854700000,
                    "value": true
                },
                {
                    "date": 1698854760000,
                    "value": true
                },
                {
                    "date": 1698854820000,
                    "value": true
                },
                {
                    "date": 1698854880000,
                    "value": true
                },
                {
                    "date": 1698854940000,
                    "value": true
                },
                {
                    "date": 1698855000000,
                    "value": true
                },
                {
                    "date": 1698855060000,
                    "value": true
                },
                {
                    "date": 1698855120000,
                    "value": true
                },
                {
                    "date": 1698855180000,
                    "value": true
                },
                {
                    "date": 1698855240000,
                    "value": true
                },
                {
                    "date": 1698855300000,
                    "value": true
                },
                {
                    "date": 1698855360000,
                    "value": true
                },
                {
                    "date": 1698855420000,
                    "value": true
                },
                {
                    "date": 1698855480000,
                    "value": true
                },
                {
                    "date": 1698855540000,
                    "value": true
                },
                {
                    "date": 1698855600000,
                    "value": true
                },
                {
                    "date": 1698855660000,
                    "value": true
                },
                {
                    "date": 1698855720000,
                    "value": true
                },
                {
                    "date": 1698855780000,
                    "value": true
                },
                {
                    "date": 1698855840000,
                    "value": true
                },
                {
                    "date": 1698855900000,
                    "value": true
                },
                {
                    "date": 1698855960000,
                    "value": true
                },
                {
                    "date": 1698856020000,
                    "value": true
                },
                {
                    "date": 1698856080000,
                    "value": true
                },
                {
                    "date": 1698856140000,
                    "value": true
                },
                {
                    "date": 1698856200000,
                    "value": true
                },
                {
                    "date": 1698856260000,
                    "value": true
                },
                {
                    "date": 1698856320000,
                    "value": true
                },
                {
                    "date": 1698856380000,
                    "value": true
                },
                {
                    "date": 1698856440000,
                    "value": true
                },
                {
                    "date": 1698856500000,
                    "value": true
                },
                {
                    "date": 1698856560000,
                    "value": true
                },
                {
                    "date": 1698856620000,
                    "value": true
                },
                {
                    "date": 1698856680000,
                    "value": true
                },
                {
                    "date": 1698856740000,
                    "value": true
                },
                {
                    "date": 1698856800000,
                    "value": true
                },
                {
                    "date": 1698856860000,
                    "value": true
                },
                {
                    "date": 1698856920000,
                    "value": true
                },
                {
                    "date": 1698856980000,
                    "value": true
                },
                {
                    "date": 1698857040000,
                    "value": true
                },
                {
                    "date": 1698857100000,
                    "value": true
                },
                {
                    "date": 1698857160000,
                    "value": true
                },
                {
                    "date": 1698857220000,
                    "value": true
                },
                {
                    "date": 1698857280000,
                    "value": true
                },
                {
                    "date": 1698857340000,
                    "value": true
                },
                {
                    "date": 1698857400000,
                    "value": true
                },
                {
                    "date": 1698857460000,
                    "value": true
                },
                {
                    "date": 1698857520000,
                    "value": true
                },
                {
                    "date": 1698857580000,
                    "value": true
                },
                {
                    "date": 1698857640000,
                    "value": true
                },
                {
                    "date": 1698857700000,
                    "value": true
                },
                {
                    "date": 1698857760000,
                    "value": true
                },
                {
                    "date": 1698857820000,
                    "value": true
                },
                {
                    "date": 1698857880000,
                    "value": true
                },
                {
                    "date": 1698857940000,
                    "value": true
                },

                {
                    "date": 1698883200000,
                    "value": true
                },
                {
                    "date": 1698883260000,
                    "value": true
                },
                {
                    "date": 1698883320000,
                    "value": true
                },
                {
                    "date": 1698883380000,
                    "value": true
                },
                {
                    "date": 1698883440000,
                    "value": true
                },
                {
                    "date": 1698883500000,
                    "value": true
                },
                {
                    "date": 1698883560000,
                    "value": true
                },
                {
                    "date": 1698883620000,
                    "value": true
                },
                {
                    "date": 1698883680000,
                    "value": true
                },
                {
                    "date": 1698883740000,
                    "value": true
                },
                {
                    "date": 1698883800000,
                    "value": true
                },
                {
                    "date": 1698883860000,
                    "value": true
                },
                {
                    "date": 1698883920000,
                    "value": true
                },
                {
                    "date": 1698883980000,
                    "value": true
                },
                {
                    "date": 1698884040000,
                    "value": true
                },
                {
                    "date": 1698884100000,
                    "value": true
                },
                {
                    "date": 1698884160000,
                    "value": true
                },
                {
                    "date": 1698884220000,
                    "value": true
                },
                {
                    "date": 1698884280000,
                    "value": true
                },
                {
                    "date": 1698884340000,
                    "value": true
                },
                {
                    "date": 1698884400000,
                    "value": true
                },
                {
                    "date": 1698884460000,
                    "value": true
                },
                {
                    "date": 1698884520000,
                    "value": true
                },
                {
                    "date": 1698884580000,
                    "value": true
                },
                {
                    "date": 1698884640000,
                    "value": true
                },
                {
                    "date": 1698884700000,
                    "value": true
                },
                {
                    "date": 1698884760000,
                    "value": true
                },
                {
                    "date": 1698884820000,
                    "value": true
                },
                {
                    "date": 1698884880000,
                    "value": true
                },
                {
                    "date": 1698884940000,
                    "value": true
                },
                {
                    "date": 1698885000000,
                    "value": true
                },
                {
                    "date": 1698885060000,
                    "value": true
                },
                {
                    "date": 1698885120000,
                    "value": true
                },
                {
                    "date": 1698885180000,
                    "value": true
                },
                {
                    "date": 1698885240000,
                    "value": true
                },
                {
                    "date": 1698885300000,
                    "value": true
                },
                {
                    "date": 1698885360000,
                    "value": true
                },
                {
                    "date": 1698885420000,
                    "value": true
                },
                {
                    "date": 1698885480000,
                    "value": true
                },
                {
                    "date": 1698885540000,
                    "value": true
                },
                {
                    "date": 1698885600000,
                    "value": true
                },
                {
                    "date": 1698885660000,
                    "value": true
                },
                {
                    "date": 1698885720000,
                    "value": true
                },
                {
                    "date": 1698885780000,
                    "value": true
                },
                {
                    "date": 1698885840000,
                    "value": true
                },
                {
                    "date": 1698885900000,
                    "value": true
                },
                {
                    "date": 1698885960000,
                    "value": true
                },
                {
                    "date": 1698886020000,
                    "value": true
                },
                {
                    "date": 1698886080000,
                    "value": true
                },
                {
                    "date": 1698886140000,
                    "value": true
                },
                {
                    "date": 1698886200000,
                    "value": true
                },
                {
                    "date": 1698886260000,
                    "value": true
                },
                {
                    "date": 1698886320000,
                    "value": true
                },
                {
                    "date": 1698886380000,
                    "value": true
                },
                {
                    "date": 1698886440000,
                    "value": true
                },
                {
                    "date": 1698886500000,
                    "value": true
                },
                {
                    "date": 1698886560000,
                    "value": true
                },
                {
                    "date": 1698886620000,
                    "value": true
                },
                {
                    "date": 1698886680000,
                    "value": true
                },
                {
                    "date": 1698886740000,
                    "value": true
                },
                {
                    "date": 1698886800000,
                    "value": true
                },
                {
                    "date": 1698886860000,
                    "value": true
                },
                {
                    "date": 1698886920000,
                    "value": true
                },
                {
                    "date": 1698886980000,
                    "value": true
                },
                {
                    "date": 1698887040000,
                    "value": true
                },
                {
                    "date": 1698887100000,
                    "value": true
                },
                {
                    "date": 1698887160000,
                    "value": true
                },
                {
                    "date": 1698887220000,
                    "value": true
                },
                {
                    "date": 1698887280000,
                    "value": true
                },
                {
                    "date": 1698887340000,
                    "value": true
                },
                {
                    "date": 1698887400000,
                    "value": true
                },
                {
                    "date": 1698887460000,
                    "value": true
                },
                {
                    "date": 1698887520000,
                    "value": true
                },
                {
                    "date": 1698887580000,
                    "value": true
                },
                {
                    "date": 1698887640000,
                    "value": true
                },
                {
                    "date": 1698887700000,
                    "value": true
                },
                {
                    "date": 1698887760000,
                    "value": true
                },
                {
                    "date": 1698887820000,
                    "value": true
                },
                {
                    "date": 1698887880000,
                    "value": true
                },
                {
                    "date": 1698887940000,
                    "value": true
                },
                {
                    "date": 1698888000000,
                    "value": true
                },
                {
                    "date": 1698888060000,
                    "value": true
                },
                {
                    "date": 1698888120000,
                    "value": true
                },
                {
                    "date": 1698888180000,
                    "value": true
                },
                {
                    "date": 1698888240000,
                    "value": true
                },
                {
                    "date": 1698888300000,
                    "value": true
                },
                {
                    "date": 1698888360000,
                    "value": true
                },
                {
                    "date": 1698888420000,
                    "value": true
                },
                {
                    "date": 1698888480000,
                    "value": true
                },
                {
                    "date": 1698888540000,
                    "value": true
                },
                {
                    "date": 1698888600000,
                    "value": true
                },
                {
                    "date": 1698888660000,
                    "value": true
                },
                {
                    "date": 1698888720000,
                    "value": true
                },
                {
                    "date": 1698888780000,
                    "value": true
                },
                {
                    "date": 1698888840000,
                    "value": true
                },
                {
                    "date": 1698888900000,
                    "value": true
                },
                {
                    "date": 1698888960000,
                    "value": true
                },
                {
                    "date": 1698889020000,
                    "value": true
                },
                {
                    "date": 1698889080000,
                    "value": true
                },
                {
                    "date": 1698889140000,
                    "value": true
                },
                {
                    "date": 1698889200000,
                    "value": true
                },
                {
                    "date": 1698889260000,
                    "value": true
                },
                {
                    "date": 1698889320000,
                    "value": true
                },
                {
                    "date": 1698889380000,
                    "value": true
                },
                {
                    "date": 1698889440000,
                    "value": true
                },
                {
                    "date": 1698889500000,
                    "value": true
                },
                {
                    "date": 1698889560000,
                    "value": true
                },
                {
                    "date": 1698889620000,
                    "value": true
                },
                {
                    "date": 1698889680000,
                    "value": true
                },
                {
                    "date": 1698889740000,
                    "value": true
                },
                {
                    "date": 1698889800000,
                    "value": true
                },
                {
                    "date": 1698889860000,
                    "value": true
                },
                {
                    "date": 1698889920000,
                    "value": true
                },
                {
                    "date": 1698889980000,
                    "value": true
                },
                {
                    "date": 1698890040000,
                    "value": true
                },
                {
                    "date": 1698890100000,
                    "value": true
                },
                {
                    "date": 1698890160000,
                    "value": true
                },
                {
                    "date": 1698890220000,
                    "value": true
                },
                {
                    "date": 1698890280000,
                    "value": true
                },
                {
                    "date": 1698890340000,
                    "value": true
                },
                {
                    "date": 1698890400000,
                    "value": true
                },
                {
                    "date": 1698890460000,
                    "value": true
                },
                {
                    "date": 1698890520000,
                    "value": true
                },
                {
                    "date": 1698890580000,
                    "value": true
                },
                {
                    "date": 1698890640000,
                    "value": true
                },
                {
                    "date": 1698890700000,
                    "value": true
                },
                {
                    "date": 1698890760000,
                    "value": true
                },
                {
                    "date": 1698890820000,
                    "value": true
                },
                {
                    "date": 1698890880000,
                    "value": true
                },
                {
                    "date": 1698890940000,
                    "value": true
                },
                {
                    "date": 1698891000000,
                    "value": true
                },
                {
                    "date": 1698891060000,
                    "value": true
                },
                {
                    "date": 1698891120000,
                    "value": true
                },
                {
                    "date": 1698891180000,
                    "value": true
                },
                {
                    "date": 1698891240000,
                    "value": true
                },
                {
                    "date": 1698891300000,
                    "value": true
                },
                {
                    "date": 1698891360000,
                    "value": true
                },
                {
                    "date": 1698891420000,
                    "value": true
                },
                {
                    "date": 1698891480000,
                    "value": true
                },
                {
                    "date": 1698891540000,
                    "value": true
                },
                {
                    "date": 1698891600000,
                    "value": true
                },
                {
                    "date": 1698891660000,
                    "value": true
                },
                {
                    "date": 1698891720000,
                    "value": true
                },
                {
                    "date": 1698891780000,
                    "value": true
                },
                {
                    "date": 1698891840000,
                    "value": true
                },
                {
                    "date": 1698891900000,
                    "value": true
                },
                {
                    "date": 1698891960000,
                    "value": true
                },
                {
                    "date": 1698892020000,
                    "value": true
                },
                {
                    "date": 1698892080000,
                    "value": true
                },
                {
                    "date": 1698892140000,
                    "value": true
                },
                {
                    "date": 1698892200000,
                    "value": true
                },
                {
                    "date": 1698892260000,
                    "value": true
                },
                {
                    "date": 1698892320000,
                    "value": true
                },
                {
                    "date": 1698892380000,
                    "value": true
                },
                {
                    "date": 1698892440000,
                    "value": true
                },
                {
                    "date": 1698892500000,
                    "value": true
                },
                {
                    "date": 1698892560000,
                    "value": true
                },
                {
                    "date": 1698892620000,
                    "value": true
                },
                {
                    "date": 1698892680000,
                    "value": true
                },
                {
                    "date": 1698892740000,
                    "value": true
                },
                {
                    "date": 1698892800000,
                    "value": true
                },
                {
                    "date": 1698892860000,
                    "value": true
                },
                {
                    "date": 1698892920000,
                    "value": true
                },
                {
                    "date": 1698892980000,
                    "value": true
                },
                {
                    "date": 1698893040000,
                    "value": true
                },
                {
                    "date": 1698893100000,
                    "value": true
                },
                {
                    "date": 1698893160000,
                    "value": true
                },
                {
                    "date": 1698893220000,
                    "value": true
                },
                {
                    "date": 1698893280000,
                    "value": true
                },
                {
                    "date": 1698893340000,
                    "value": true
                },
                {
                    "date": 1698893400000,
                    "value": true
                },
                {
                    "date": 1698893460000,
                    "value": true
                },
                {
                    "date": 1698893520000,
                    "value": true
                },
                {
                    "date": 1698893580000,
                    "value": true
                },
                {
                    "date": 1698893640000,
                    "value": true
                },
                {
                    "date": 1698893700000,
                    "value": true
                },
                {
                    "date": 1698893760000,
                    "value": true
                },
                {
                    "date": 1698893820000,
                    "value": true
                },
                {
                    "date": 1698893880000,
                    "value": true
                },
                {
                    "date": 1698893940000,
                    "value": true
                },
                {
                    "date": 1698894000000,
                    "value": true
                },
                {
                    "date": 1698894060000,
                    "value": true
                },
                {
                    "date": 1698894120000,
                    "value": true
                },
                {
                    "date": 1698894180000,
                    "value": true
                },
                {
                    "date": 1698894240000,
                    "value": true
                },
                {
                    "date": 1698894300000,
                    "value": true
                },
                {
                    "date": 1698894360000,
                    "value": true
                },
                {
                    "date": 1698894420000,
                    "value": true
                },
                {
                    "date": 1698894480000,
                    "value": true
                },
                {
                    "date": 1698894540000,
                    "value": true
                },
                {
                    "date": 1698894600000,
                    "value": true
                },
                {
                    "date": 1698894660000,
                    "value": true
                },
                {
                    "date": 1698894720000,
                    "value": true
                },
                {
                    "date": 1698894780000,
                    "value": true
                },
                {
                    "date": 1698894840000,
                    "value": true
                },
                {
                    "date": 1698894900000,
                    "value": true
                },
                {
                    "date": 1698894960000,
                    "value": true
                },
                {
                    "date": 1698895020000,
                    "value": true
                },
                {
                    "date": 1698895080000,
                    "value": true
                },
                {
                    "date": 1698895140000,
                    "value": true
                },
                {
                    "date": 1698895200000,
                    "value": true
                },
                {
                    "date": 1698895260000,
                    "value": true
                },
                {
                    "date": 1698895320000,
                    "value": true
                },
                {
                    "date": 1698895380000,
                    "value": true
                },
                {
                    "date": 1698895440000,
                    "value": true
                },
                {
                    "date": 1698895500000,
                    "value": true
                },
                {
                    "date": 1698895560000,
                    "value": true
                },
                {
                    "date": 1698895620000,
                    "value": true
                },
                {
                    "date": 1698895680000,
                    "value": true
                },
                {
                    "date": 1698895740000,
                    "value": true
                },
                {
                    "date": 1698895800000,
                    "value": true
                },
                {
                    "date": 1698895860000,
                    "value": true
                },
                {
                    "date": 1698895920000,
                    "value": true
                },
                {
                    "date": 1698895980000,
                    "value": true
                },
                {
                    "date": 1698896040000,
                    "value": true
                },
                {
                    "date": 1698896100000,
                    "value": true
                },
                {
                    "date": 1698896160000,
                    "value": true
                },
                {
                    "date": 1698896220000,
                    "value": true
                },
                {
                    "date": 1698896280000,
                    "value": true
                },
                {
                    "date": 1698896340000,
                    "value": true
                },
                {
                    "date": 1698896400000,
                    "value": true
                },
                {
                    "date": 1698896460000,
                    "value": true
                },
                {
                    "date": 1698896520000,
                    "value": true
                },
                {
                    "date": 1698896580000,
                    "value": true
                },
                {
                    "date": 1698896640000,
                    "value": true
                },
                {
                    "date": 1698896700000,
                    "value": true
                },
                {
                    "date": 1698896760000,
                    "value": true
                },
                {
                    "date": 1698896820000,
                    "value": true
                },
                {
                    "date": 1698896880000,
                    "value": true
                },
                {
                    "date": 1698896940000,
                    "value": true
                },
                {
                    "date": 1698897000000,
                    "value": true
                },
                {
                    "date": 1698897060000,
                    "value": true
                },
                {
                    "date": 1698897120000,
                    "value": true
                },
                {
                    "date": 1698897180000,
                    "value": true
                },
                {
                    "date": 1698897240000,
                    "value": true
                },
                {
                    "date": 1698897300000,
                    "value": true
                },
                {
                    "date": 1698897360000,
                    "value": true
                },
                {
                    "date": 1698897420000,
                    "value": true
                },
                {
                    "date": 1698897480000,
                    "value": true
                },
                {
                    "date": 1698897540000,
                    "value": true
                },
                {
                    "date": 1698901200000,
                    "value": true
                },
                {
                    "date": 1698901260000,
                    "value": true
                },
                {
                    "date": 1698901320000,
                    "value": true
                },
                {
                    "date": 1698901380000,
                    "value": true
                },
                {
                    "date": 1698901440000,
                    "value": true
                },
                {
                    "date": 1698901500000,
                    "value": true
                },
                {
                    "date": 1698901560000,
                    "value": true
                },
                {
                    "date": 1698901620000,
                    "value": true
                },
                {
                    "date": 1698901680000,
                    "value": true
                },
                {
                    "date": 1698901740000,
                    "value": true
                },
                {
                    "date": 1698901800000,
                    "value": true
                },
                {
                    "date": 1698901860000,
                    "value": true
                },
                {
                    "date": 1698901920000,
                    "value": true
                },
                {
                    "date": 1698901980000,
                    "value": true
                },
                {
                    "date": 1698902040000,
                    "value": true
                },
                {
                    "date": 1698902100000,
                    "value": true
                },
                {
                    "date": 1698902160000,
                    "value": true
                },
                {
                    "date": 1698902220000,
                    "value": true
                },
                {
                    "date": 1698902280000,
                    "value": true
                },
                {
                    "date": 1698902340000,
                    "value": true
                },
                {
                    "date": 1698902400000,
                    "value": true
                },
                {
                    "date": 1698902460000,
                    "value": true
                },
                {
                    "date": 1698902520000,
                    "value": true
                },
                {
                    "date": 1698902580000,
                    "value": true
                },
                {
                    "date": 1698902640000,
                    "value": true
                },
                {
                    "date": 1698902700000,
                    "value": true
                },
                {
                    "date": 1698902760000,
                    "value": true
                },
                {
                    "date": 1698902820000,
                    "value": true
                },
                {
                    "date": 1698902880000,
                    "value": true
                },
                {
                    "date": 1698902940000,
                    "value": true
                },
                {
                    "date": 1698903000000,
                    "value": true
                },
                {
                    "date": 1698903060000,
                    "value": true
                },
                {
                    "date": 1698903120000,
                    "value": true
                },
                {
                    "date": 1698903180000,
                    "value": true
                },
                {
                    "date": 1698903240000,
                    "value": true
                },
                {
                    "date": 1698903300000,
                    "value": true
                },
                {
                    "date": 1698903360000,
                    "value": true
                },
                {
                    "date": 1698903420000,
                    "value": true
                },
                {
                    "date": 1698903480000,
                    "value": true
                },
                {
                    "date": 1698903540000,
                    "value": true
                },
                {
                    "date": 1698903600000,
                    "value": true
                },
                {
                    "date": 1698903660000,
                    "value": true
                },
                {
                    "date": 1698903720000,
                    "value": true
                },
                {
                    "date": 1698903780000,
                    "value": true
                },
                {
                    "date": 1698903840000,
                    "value": true
                },
                {
                    "date": 1698903900000,
                    "value": true
                },
                {
                    "date": 1698903960000,
                    "value": true
                },
                {
                    "date": 1698904020000,
                    "value": true
                },
                {
                    "date": 1698904080000,
                    "value": true
                },
                {
                    "date": 1698904140000,
                    "value": true
                },
                {
                    "date": 1698904200000,
                    "value": true
                },
                {
                    "date": 1698904260000,
                    "value": true
                },
                {
                    "date": 1698904320000,
                    "value": true
                },
                {
                    "date": 1698904380000,
                    "value": true
                },
                {
                    "date": 1698904440000,
                    "value": true
                },
                {
                    "date": 1698904500000,
                    "value": true
                },
                {
                    "date": 1698904560000,
                    "value": true
                },
                {
                    "date": 1698904620000,
                    "value": true
                },
                {
                    "date": 1698904680000,
                    "value": true
                },
                {
                    "date": 1698904740000,
                    "value": true
                },
                {
                    "date": 1698908400000,
                    "value": true
                },
                {
                    "date": 1698908460000,
                    "value": true
                },
                {
                    "date": 1698908520000,
                    "value": true
                },
                {
                    "date": 1698908580000,
                    "value": true
                },
                {
                    "date": 1698908640000,
                    "value": true
                },
                {
                    "date": 1698908700000,
                    "value": true
                },
                {
                    "date": 1698908760000,
                    "value": true
                },
                {
                    "date": 1698908820000,
                    "value": true
                },
                {
                    "date": 1698908880000,
                    "value": true
                },
                {
                    "date": 1698908940000,
                    "value": true
                },
                {
                    "date": 1698909000000,
                    "value": true
                },
                {
                    "date": 1698909060000,
                    "value": true
                },
                {
                    "date": 1698909120000,
                    "value": true
                },
                {
                    "date": 1698909180000,
                    "value": true
                },
                {
                    "date": 1698909240000,
                    "value": true
                },
                {
                    "date": 1698909300000,
                    "value": true
                },
                {
                    "date": 1698909360000,
                    "value": true
                },
                {
                    "date": 1698909420000,
                    "value": true
                },
                {
                    "date": 1698909480000,
                    "value": true
                },
                {
                    "date": 1698909540000,
                    "value": true
                },
                {
                    "date": 1698909600000,
                    "value": true
                },
                {
                    "date": 1698909660000,
                    "value": true
                },
                {
                    "date": 1698909720000,
                    "value": true
                },
                {
                    "date": 1698909780000,
                    "value": true
                },
                {
                    "date": 1698909840000,
                    "value": true
                },
                {
                    "date": 1698909900000,
                    "value": true
                },
                {
                    "date": 1698909960000,
                    "value": true
                },
                {
                    "date": 1698910020000,
                    "value": true
                },
                {
                    "date": 1698910080000,
                    "value": true
                },
                {
                    "date": 1698910140000,
                    "value": true
                },
                {
                    "date": 1698910200000,
                    "value": true
                },
                {
                    "date": 1698910260000,
                    "value": true
                },
                {
                    "date": 1698910320000,
                    "value": true
                },
                {
                    "date": 1698910380000,
                    "value": true
                },
                {
                    "date": 1698910440000,
                    "value": true
                },
                {
                    "date": 1698910500000,
                    "value": true
                },
                {
                    "date": 1698910560000,
                    "value": true
                },
                {
                    "date": 1698910620000,
                    "value": true
                },
                {
                    "date": 1698910680000,
                    "value": true
                },
                {
                    "date": 1698910740000,
                    "value": true
                },
                {
                    "date": 1698910800000,
                    "value": true
                },
                {
                    "date": 1698910860000,
                    "value": true
                },
                {
                    "date": 1698910920000,
                    "value": true
                },
                {
                    "date": 1698910980000,
                    "value": true
                },
                {
                    "date": 1698911040000,
                    "value": true
                },
                {
                    "date": 1698911100000,
                    "value": true
                },
                {
                    "date": 1698911160000,
                    "value": true
                },
                {
                    "date": 1698911220000,
                    "value": true
                },
                {
                    "date": 1698911280000,
                    "value": true
                },
                {
                    "date": 1698911340000,
                    "value": true
                },
                {
                    "date": 1698911400000,
                    "value": true
                },
                {
                    "date": 1698911460000,
                    "value": true
                },
                {
                    "date": 1698911520000,
                    "value": true
                },
                {
                    "date": 1698911580000,
                    "value": true
                },
                {
                    "date": 1698911640000,
                    "value": true
                },
                {
                    "date": 1698911700000,
                    "value": true
                },
                {
                    "date": 1698911760000,
                    "value": true
                },
                {
                    "date": 1698911820000,
                    "value": true
                },
                {
                    "date": 1698911880000,
                    "value": true
                },
                {
                    "date": 1698911940000,
                    "value": true
                },
                {
                    "date": 1698912000000,
                    "value": true
                },
                {
                    "date": 1698912060000,
                    "value": true
                },
                {
                    "date": 1698912120000,
                    "value": true
                },
                {
                    "date": 1698912180000,
                    "value": true
                },
                {
                    "date": 1698912240000,
                    "value": true
                },
                {
                    "date": 1698912300000,
                    "value": true
                },
                {
                    "date": 1698912360000,
                    "value": true
                },
                {
                    "date": 1698912420000,
                    "value": true
                },
                {
                    "date": 1698912480000,
                    "value": true
                },
                {
                    "date": 1698912540000,
                    "value": true
                },
                {
                    "date": 1698912600000,
                    "value": true
                },
                {
                    "date": 1698912660000,
                    "value": true
                },
                {
                    "date": 1698912720000,
                    "value": true
                },
                {
                    "date": 1698912780000,
                    "value": true
                },
                {
                    "date": 1698912840000,
                    "value": true
                },
                {
                    "date": 1698912900000,
                    "value": true
                },
                {
                    "date": 1698912960000,
                    "value": true
                },
                {
                    "date": 1698913020000,
                    "value": true
                },
                {
                    "date": 1698913080000,
                    "value": true
                },
                {
                    "date": 1698913140000,
                    "value": true
                },
                {
                    "date": 1698913200000,
                    "value": true
                },
                {
                    "date": 1698913260000,
                    "value": true
                },
                {
                    "date": 1698913320000,
                    "value": true
                },
                {
                    "date": 1698913380000,
                    "value": true
                },
                {
                    "date": 1698913440000,
                    "value": true
                },
                {
                    "date": 1698913500000,
                    "value": true
                },
                {
                    "date": 1698913560000,
                    "value": true
                },
                {
                    "date": 1698913620000,
                    "value": true
                },
                {
                    "date": 1698913680000,
                    "value": true
                },
                {
                    "date": 1698913740000,
                    "value": true
                },
                {
                    "date": 1698913800000,
                    "value": true
                },
                {
                    "date": 1698913860000,
                    "value": true
                },
                {
                    "date": 1698913920000,
                    "value": true
                },
                {
                    "date": 1698913980000,
                    "value": true
                },
                {
                    "date": 1698914040000,
                    "value": true
                },
                {
                    "date": 1698914100000,
                    "value": true
                },
                {
                    "date": 1698914160000,
                    "value": true
                },
                {
                    "date": 1698914220000,
                    "value": true
                },
                {
                    "date": 1698914280000,
                    "value": true
                },
                {
                    "date": 1698914340000,
                    "value": true
                },
                {
                    "date": 1698914400000,
                    "value": true
                },
                {
                    "date": 1698914460000,
                    "value": true
                },
                {
                    "date": 1698914520000,
                    "value": true
                },
                {
                    "date": 1698914580000,
                    "value": true
                },
                {
                    "date": 1698914640000,
                    "value": true
                },
                {
                    "date": 1698914700000,
                    "value": true
                },
                {
                    "date": 1698914760000,
                    "value": true
                },
                {
                    "date": 1698914820000,
                    "value": true
                },
                {
                    "date": 1698914880000,
                    "value": true
                },
                {
                    "date": 1698914940000,
                    "value": true
                },
                {
                    "date": 1698915000000,
                    "value": true
                },
                {
                    "date": 1698915060000,
                    "value": true
                },
                {
                    "date": 1698915120000,
                    "value": true
                },
                {
                    "date": 1698915180000,
                    "value": true
                },
                {
                    "date": 1698915240000,
                    "value": true
                },
                {
                    "date": 1698915300000,
                    "value": true
                },
                {
                    "date": 1698915360000,
                    "value": true
                },
                {
                    "date": 1698915420000,
                    "value": true
                },
                {
                    "date": 1698915480000,
                    "value": true
                },
                {
                    "date": 1698915540000,
                    "value": true
                }
            ],
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

    },

    watch: {
        dataOrganAlive(newData) {
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