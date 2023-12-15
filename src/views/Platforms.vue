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
                <BlueButton @click.native="show = true" :icon="'mdi-plus'" title="ADD PLATFORM" :val="'blue'" />
            </v-card>
        </div>
        <BachupInformation title="LISTE DES PLATEFORMES">
            <div class="d-flex mb-2 mt-4">
                <!-- <div style="width: 20%">Platform Id</div> -->
                <div style="width: 20%">Platform Name</div>
                <div style="width: 20%">Platform Type</div>
                <div style="width: 20%">url</div>
                <div style="width: 20%">Organ number</div>
                <div style="width: 22%">TokenBosRegister</div>
            </div>

            <div v-for="item in this.platform" :key="item.id">

                <div class="d-flex mb-2">
                    <!-- <div style="width: 20%" class="content-list rounded-l-lg pl-10">
                        {{ item.id }}
                    </div> -->
                    <div style="width: 20%" class="content-list">
                        {{ item.name }}
                    </div>
                    <div style="width: 20%" class="content-list">
                        {{ item.platformType }}
                    </div>
                    <div style="width: 20% ; cursor: pointer; overflow: hidden; " @click="openurl(item.url)"
                        class=" content-list copytooltip">
                        {{ item.url }}
                    </div>

                    <div style="width: 20%" class="content-list">
                        {{ item.organList.length }}
                    </div>
                    <div style="width: 20%; overflow: hidden; cursor: pointer;" class="content-list copytooltip"
                        @click="copyToClipboard(item.TokenBosRegister, item.id)">
                        Click to copy
                        <span v-if="clickedItemId === item.id" class="tooltip">Token copié</span>
                    </div>
                    <div class="content-list rounded-r-lg hover">
                        <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                            <v-icon>mdi-arrow-right</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </BachupInformation>

        <div v-if="show" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="show = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD PLATFORM</p>
                <InputUser title="  PLATFORM NAME" id="userName" v-model="formPlatform.name" />
                <span class="errors" v-if="$v.formPlatform.name.$error"> Platform Name is required</span>
                <InputUser title="  PLATFORM TYPE" id="userName" v-model="formPlatform.platformType" />
                <span class="errors" v-if="$v.formPlatform.platformType.$error"> Platform Type is required</span>
                <InputUser title="  PLATFORM IP_ADRESS" id="userName" v-model="formPlatform.ipAdress" />
                <span class="errors" v-if="$v.formPlatform.ipAdress.$error"> Platform IP address is required</span>
                <InputUser title="  PLATFORM URL" id="userName" v-model="formPlatform.url" />
                <span class="errors" v-if="$v.formPlatform.url.$error"> Platform IP address is required</span>
                <!-- <InputUser title="  PLATFORM TokenBosRegister" id="userName" v-model="formPlatform.TokenBosRegister" />
                <span class="errors" v-if="$v.formPlatform.TokenBosRegister.$error"> Platform TokenBosRegister is
                    required</span> -->
                <InputUser title="  PLATFORM loginAdmin" id="userName" v-model="formPlatform.loginAdmin" />
                <span class="errors" v-if="$v.formPlatform.loginAdmin.$error"> Platform login admin is required</span>
                <InputUser title="  PLATFORM passwordAdmin" id="userName" v-model="formPlatform.passwordAdmin" />
                <span class="errors" v-if="$v.formPlatform.passwordAdmin.$error"> Platform password admin is
                    required</span>
                <div @click="AddPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
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
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { mapState } from 'vuex';
import { required, email, minLength, numeric } from "vuelidate/lib/validators";


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
        show: false,
        clickedItemId2: null,
        clickedItemId: null,
        showTooltip: false,
        formPlatform: {
            name: null,
            platformType: null,
            ipAdress: null,
            url: null,
            loginAdmin: null,
            passwordAdmin: null,
            TokenBosRegister: null,
            hubOrgan: {},
            organList: [
            ]
        },
        platform: [
            {
                "id": "ID",
                "name": "name 1 ",
                "type": "le type 1",
                "platformType": "PLAFTOMESTYPE",
                "url": 'url.platform',
                "TokenBosRegister": "",
                "organList": [
                    {
                        "organ 1": "test",
                    },
                    {
                        "organ 2": "test",
                    },
                    {
                        "organ 3": "test",
                    },
                ],
                "status": "?"
            },
        ],
    }),
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
            url: {
                required
            },
            loginAdmin: {
                required,
            },
            passwordAdmin: {
                required,
            },

        },
    },

    methods: {
        copyToClipboard(textToCopy, id, type) {
            const temp = document.createElement("textarea");
            temp.value = textToCopy;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand("copy");
            document.body.removeChild(temp);
            console.log(id);

            if (type == 'url')
                this.clickedItemId2 = id
            else
                this.clickedItemId = id;
            setTimeout(() => {
                this.clickedItemId = null;
                this.clickedItemId2 = null;
            }, 800);
        },

        openurl(url) {
            window.open(url, '_blank');
        },

        AddPlatform() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                //AJOUTER LA PLATFORM SABu0Rk3tZnTORE
                this.$store.dispatch('addPlatform', {
                    platformData: this.formPlatform
                });
                this.show = false;
                this.$store.dispatch('getPlatformList');
            }
        },

        displayDetail(item) {
            this.$router.push({ name: "DetailPlatform", query: { id: item.id } });
        },
    },
    computed: {
        ...mapState(['PlatformList'])
    },
    mounted() {
        this.$store.dispatch('getPlatformList');
    },
    watch: {
        PlatformList(newList) {

            this.platform = newList;
            console.log(this.platform );
            // console.log(this.platform, 'testtt');

        }
    },
    created() {
    }
}
</script>
  
<style scoped >
.tooltip {
    position: absolute;
    background-color: rgb(50, 199, 62);
    color: white;
    border-radius: 4px;
    height: 32px;
    width: 135px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 15px;
    /* Autres styles pour la positionner et l'animer comme souhaité */
}

.app {
    font: normal normal normal 10px/12px Charlevoix Pro;
    letter-spacing: 1px;
    background: #ffffff00;
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

.content-list {
    border: 1px solid rgba(227, 227, 227, 0.623);
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


.copytooltip {
    background-color: rgb(255, 255, 255);
}

.copytooltip:hover {
    background-color: rgb(232, 232, 232);
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

.hover:hover {
    background: rgb(228, 228, 228);
    transition: 0.3s;
}
</style>
