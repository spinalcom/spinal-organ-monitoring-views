<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD ORGAN'" :btn2Title="'EDIT PLATFORM '" :btn3Title="'DELETE PLATFORM'"
                v-on:btn1="showOrgan = true" v-on:btn2="displayEditPlatform" v-on:btn3="deletebtn()"
                title="PLATFORM INFORMATION" :title2="this.platform.name" :icon="require('../assets/image/USE_icon.svg')">
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


            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;" title="ORGAN LIST">
                <div class="d-flex mb-2 mt-4">
                    <div style="width: 48.5%;margin-left: 10px;">Organs Name</div>
                    <div style="width: 50%">Id</div>
                </div>
                <div v-for="item in this.platform.organList" :key="item.id">
                    <div class="d-flex mb-2">
                        <div style="width: 100%" class="content-list">
                            {{ item.name }}
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
                    <span class="errors" v-if="$v.formPlatform.loginAdmin.$error"> Platform login admin is required</span>
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
        InputUser
    },
    data() {
        return {

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

        //DELETE ELEMENT
        deletebtn() {
            const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet organe ?");
            if (confirmed) {
                this.$store.dispatch('deletePlatform', {
                    platformId: this.$route.query.id,
                });
                this.$router.push("platforms");
            }
        },


    },
    mounted() {
        this.$store.dispatch('getPlatformList');
    },
    computed: {
        ...mapState(['CurrentPlatform']),
        ...mapState(['PlatformList'])
    },
    watch: {
        PlatformList(newList) {
            this.platformList = newList;
            this.platformList.forEach(platform => {
                if (platform.id === this.$route.query.id) {
                    this.platform = platform;
                }
            });
            // console.log(this.platformList, 'maisss');
        }
    },
    created() {
    }
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