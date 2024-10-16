<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD'" :btn2Title="'EDIT SERVER'" :btn3Title="'DELETE SERVER'"
                v-on:btn1="showAdd = !showAdd" v-on:btn2="show = true;" v-on:btn3="deletebtn()" title="SERVER INFORMATION"
                :title2="this.server.name" :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class=" bar-information">{{ this.server.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ this.server.type }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">ADRESS</span>
                        <span class="bar-information">{{ this.server.ipAdress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">macAdress</span>
                        <span class="bar-information">{{ this.server.macAdress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">last_health_time</span>
                        <span class="bar-information">{{ this.server.last_health_time }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">sshPassword</span>
                        <span class="bar-information">{{ this.server.sshPassword }}</span>
                    </div>
                </div>
                <div v-if="showAdd" class="swing-in-right-fwd"
                    style="padding: 5px;position: absolute;right: 0;width: 180px;background-color: rgb(245, 245, 245);height: 100%;padding-bottom: 50px;top: 0;border-radius: 5px ;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
                    <div @click="showOrgan = true" class="addbtn">ADD ORGAN</div>
                    <div @click="showplatform = true" class="addbtn">ADD PLATFORM</div>
                </div>
            </InformationBar>
            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;" title="SERVER DETAILS">
                <Tabs :items="items">

                    <!-- TAB PLATFORM -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 49%">Platform Name</div>
                            <div style="width: 50%">Type</div>
                        </div>

                        <div v-for="item in this.platform" :key="item.id">
                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 100%" class="content-list rounded-l-lg pl-10">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>

                    <!-- TAB ORGANS -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 49%">Organ Name</div>
                            <div style="width: 50%">Type</div>
                        </div>

                        <div v-for="item in this.organ" :key="item.id">
                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 100%" class="content-list rounded-l-lg pl-10">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayOrgan(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>
                </Tabs>
            </BackupInformation>

            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT SERVER</p>
                    <InputUser v-model="formServer.name" title="SERVER NAME" id="userName" />
                    <span class="errors" v-if="$v.formServer.name.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.type" title="SERVER TYPE" id="type" />
                    <span class="errors" v-if="$v.formServer.type.$error"> Server Type is required</span>
                    <InputUser v-model="formServer.ipAdress" title="SERVER IP ADDRESS" id="userName" />
                    <span class="errors" v-if="$v.formServer.ipAdress.$error"> Server IP is required</span>
                    <InputUser v-model="formServer.macAdress" title="SERVER MAC ADRESS" id="userName" />
                    <span class="errors" v-if="$v.formServer.macAdress.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.sshLogin" title="SERVER ssh login" id="userName" />
                    <span class="errors" v-if="$v.formServer.sshLogin.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.sshPassword" title="SERVER ssh password" id="userName" />
                    <span class="errors" v-if="$v.formServer.sshPassword.$error"> Server ssh password is required</span>
                    <!-- <InputUser title="  CUSTOMER SERVICE" id="userName" /> -->
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

        <!-- MODALE ADD PLATFORM -->
        <div v-if="showplatform" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="showplatform = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD PLATFORM</p>
                <InputUser v-model="formPlatform.name" title="PLATFORM NAME" id="userName" />
                <span class="errors" v-if="$v.formPlatform.name.$error"> Customer Name is required</span>
                <div @click="addPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                    <span>ADD</span>
                </div>
                <div @click="showplatform = false" class="mt-4 ml-1 popup-btn-fermer">
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
            formOrgan: {
                name: null,
            },
            formPlatform: {
                name: null,
            },
            formServer: {
                type: null,
                name: null,
                ipAdress: null,
                macAdress: null,
                sshLogin: null,
                sshPassword: null
            },
            platform: [
                {
                    name: "platform name 1",
                    type: "type platform name 1",
                }
            ],
            organ: [
                {
                    name: "organ name 1",
                    type: "type organ name 1",
                }
            ],
            server:
            {
                "id": "id du server",
                "type": "type du server",
                "name": "nom du server",
                "ipAdress": "ip address",
                "macAdress": "macAdress",
                "sshLogin": "ssh log",
                "sshPassword": "ssh password",
                "boot_timestamp": "boot timestamp",
                "last_health_time": "last health time",
                "serverType": "servertype",
            },
            show: false,
            items: [
                'PLATFORMS',
                'ORGANS'
            ],
            showAdd: false,
            showOrgan: false,
            showplatform: false
        };

    },
    validations: {
        formServer: {
            name: {
                required,
            },
            type: {
                required,
            },
            ipAdress: {
                required,
            },
            macAdress: {
                required,
            },
            sshLogin: {
                required,
            },
            sshPassword: {
                required,
            },
        },
        formOrgan: {
            name: {
                required,
            },
        },
        formPlatform: {
            name: {
                required,
            },
        },

    },
    methods: {

        //CHANGE ROUTE
        displayDetail(id) {
            this.$router.push({ name: "DetailPlatform", query: { id: id } });
        },
        displayOrgan(id) {
            this.$router.push({ name: "DetailOrgan", query: { id: id } });
        },


        // VALIDE ELEMENT
        editUserPlatform() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                console.log('valid form');
            }
        },
        addOrgan() {
            this.$v.formOrgan.$touch();
            if (!this.$v.formOrgan.$invalid) {
                console.log('valid form');

            }
        },
        addPlatform() {
            this.$v.formPlatform.$touch();
            if (!this.$v.formPlatform.$invalid) {
                console.log('valid form');
            }
        },


        //DELETE ELEMENT
        deletebtn() {
        },

    },

    computed: {
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

.swing-in-right-fwd {
    -webkit-animation: swing-in-right-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
    animation: swing-in-right-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}

@-webkit-keyframes swing-in-right-fwd {
    0% {
        -webkit-transform: rotateY(-100deg);
        transform: rotateY(-100deg);
        -webkit-transform-origin: right;
        transform-origin: right;
        opacity: 0;
    }

    100% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
        -webkit-transform-origin: right;
        transform-origin: right;
        opacity: 1;
    }
}

@keyframes swing-in-right-fwd {
    0% {
        -webkit-transform: rotateY(-100deg);
        transform: rotateY(-100deg);
        -webkit-transform-origin: right;
        transform-origin: right;
        opacity: 0;
    }

    100% {
        -webkit-transform: rotateY(0);
        transform: rotateY(0);
        -webkit-transform-origin: right;
        transform-origin: right;
        opacity: 1;
    }
}

.addbtn {
    width: 100;
    padding: 5px;
    margin: 9px;
    background-color: #14202C;
    color: white;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 11px;
    height: 40px;
}
</style>