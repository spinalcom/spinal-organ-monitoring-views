<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD'" :btn2Title="'EDIT SITE'" :btn3Title="'DELETE SITE'"
                v-on:btn1="showAdd = !showAdd" v-on:btn2="displayEditUser()" v-on:btn3="deletebtn()"
                title="SITE INFORMATION" :title2="this.site.name" :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class=" bar-information">{{ this.site.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">AdDRESS</span>
                        <span class="bar-information">{{ this.site.address }}</span>
                    </div>
                </div>
                <div v-if="showAdd" class="swing-in-right-fwd"
                    style="padding: 5px;position: absolute;right: 0;width: 180px;background-color: rgb(245, 245, 245);height: 100%;padding-bottom: 50px;top: 0;border-radius: 5px ;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
                    <div @click="showsla = true" class="addbtn">ADD SLA</div>
                    <div @click="showbuilding = true, formBuilding.id = null" class="addbtn">ADD BUILDING</div>
                    <div @click="showplatform = true" class="addbtn">ADD PLATFORM</div>
                    <!-- <div class="addbtn">ADD CONTACT</div> -->
                </div>
            </InformationBar>

            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;" title="SITE DETAILS">
                <Tabs :items="items">
                    <!-- TAB SLA -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4">
                            <div style="width: 88% ; margin-left: 5px;">SLA Id</div>
                            <div style="width: 100%;margin-left: 10px;">SLA Name</div>
                        </div>
                        <div v-for="item in this.site.slas" :key="item.id">
                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 100%" class="content-list">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div @click="deleteSla(item.id)" style="width: 5.5% ;cursor: pointer;" class="content-list">
                                    <v-icon class="mx-1 mr-2" color="red darken-2" dark>mdi-delete</v-icon>
                                </div>
                                <div @click="showeditSla(item)" style="width: 5.5%;cursor: pointer;"
                                    class="content-list mr-2">
                                    <v-icon class="mx-1 mr-2" color="green darken-2" dark>mdi-file-edit</v-icon>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>

                    <!-- TAB BUILDING -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 25%">Building Id</div>
                            <div style="width: 24%">Building Name</div>
                            <div style="width: 25%">Type</div>
                            <div style="width: 25%">address</div>
                        </div>
                        <div v-for="item in this.buildings" :key="item.id">

                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 25%" class="content-list rounded-l-lg pl-10">
                                    {{ item.id }}
                                </div>
                                <div style="width: 25%" class="content-list">
                                    {{ item.name }}
                                </div>
                                <div style="width: 25%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div style="width: 25%" class="content-list">
                                    {{ item.address }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetailBuilding(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>
                    <!-- TAB PLATFORM -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 49%">Platform Name</div>
                            <div style="width: 50%">Type</div>
                            <!-- <div style="width: 22%">status</div> -->
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
                </Tabs>
            </BackupInformation>

            <!-- MODALE EDIT SITE -->
            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT SITE</p>
                    <InputUser v-model="formSite.name" title="SITE NAME" id="userName" />
                    <span class="errors" v-if="$v.formSite.name.$error"> Site Name is required</span>
                    <InputUser v-model="formSite.address" title="SITE ADDRESS" id="userName" />
                    <span class="errors" v-if="$v.formSite.address.$error"> Site Address is required</span>
                    <div @click="editSite()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>

            <!-- MODALE ADD SLA -->
            <div v-if="showsla" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showsla = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">ADD SLA</p>
                    <InputUser v-model="formSLA.name" title="SLA NAME" id="userName" />
                    <span class="errors" v-if="$v.formSLA.name.$error"> SLA Name is required</span>
                    <input type="file" @change="handleFileUpload" class="custom-file-input" />
                    <!-- <InputUser title="  CUSTOMER SERVICE" id="userName" /> -->
                    <div @click="addsla()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>ADD</span>
                    </div>
                    <div @click="showsla = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>


            <!-- MODALE EDIT SLA -->
            <div v-if="showslaedit" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showslaedit = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT SLA</p>
                    <InputUser v-model="formEditSLA.name" title="SLA NAME" id="userName" />
                    <span class="errors" v-if="$v.formEditSLA.name.$error"> SLA Name is required</span>
                    <span class="errors" v-if="$v.formSLA.name.$error"> SLA Name is required</span>
                    <input type="file" @change="handleFileUpload" class="custom-file-input" />
                    <div @click="editSLA()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="showslaedit = false" class="mt-4 ml-1 popup-btn-fermer">
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
                    <span class="errors" v-if="$v.formPlatform.name.$error"> Platform Name is required</span>
                    <div @click="addPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>ADD</span>
                    </div>
                    <div @click="showplatform = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>


            <!-- MODALE ADD BUILDING -->
            <div v-if="showbuilding" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showbuilding = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">ADD BUILDING</p>
                    <SelectUser title="BUILDING NAME" id="userType" :tab="buildingsList" v-model="formBuilding.id" />
                    <span class="errors" v-if="$v.formBuilding.id.$error"> Building Name is required</span>
                    <div @click="addBuilding()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>ADD</span>
                    </div>
                    <div @click="showbuilding = false" class="mt-4 ml-1 popup-btn-fermer">
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
            buildingsList: [],
            formSite: {
                name: null,
                address: null
            },
            formPlatform: {
                name: null,
            },
            formSLA: {
                name: null,
            },
            formEditSLA: {
                name: null
            },
            formBuilding: {
                id: null,
            },
            buildings: [
                {
                    "id": "1bc9-11d3-bfd0-18acd067699",
                    "type": "TypeDuBuilding",
                    "name": "Building1",
                    "address": "2 rue des rues",
                },
            ],
            site:
            {
                "id": "1bc9-11d3-bfd0-18acd067699",
                "type": "TypeDuBuilding",
                "name": "SITE 1",
                "address": "2 rue des rues",
                "slas": [{
                    "name": "slas1",
                    "type": "type slas"
                },
                {
                    "name": "slas2",
                    "type": "type slas"
                }]
            },
            platform: [
                {
                    name: "platform name 1",
                    type: "type platform name 1",
                }
            ],
            showsla: false,
            show: false,
            items: [
                'SLAS',
                'BUILDING',
                'PLATFORM'
            ],
            showAdd: false,
            showplatform: false,
            showbuilding: false,
            showslaedit: false,
        };

    },
    validations: {
        formSLA: {
            name: {
                required,
            },
        },
        formPlatform: {
            name: {
                required,
            },
        },
        formBuilding: {
            id: {
                required,
            },
        },
        formEditSLA: {
            name: {
                required,
            },
        },
        formSite: {
            name: {
                required,
            },
            address: {
                required,
            }
        },
    },
    methods: {

        // CHANGE ROUTE 
        displayDetail(id) {
            this.$router.push({ name: "DetailPlatform", query: { id: id } });
        },

        displayDetailBuilding(id) {
            this.$router.push({ name: "DetailBuilding", query: { id: id } });
        },

        // VALIDE ELEMENT 
        editSite() {
            this.$v.formSite.$touch();
            if (!this.$v.formSite.$invalid) {
                this.$store.dispatch('updateSite', {
                    siteId: this.$route.query.id,
                    siteData: this.formSite
                });
                location.reload();
            }
        },

        addPlatform() {
            this.$v.formPlatform.$touch();
            if (!this.$v.formPlatform.$invalid) {
                console.log('valid form');
            }
        },
        addBuilding() {
            this.$v.formBuilding.$touch();
            if (!this.$v.formBuilding.$invalid) {
                console.log('add');
                this.$store.dispatch('linkSiteToBuilding', {
                    siteId: this.$route.query.id,
                    buildingId: this.formBuilding.id,
                });
            }
        },
        addsla() {
            this.$v.formSLA.$touch();
            if (!this.$v.formSLA.$invalid) {
                console.log('valid form');
            }
        },
        editSLA() {
            this.$v.formEditSLA.$touch();
            if (!this.$v.formEditSLA.$invalid) {
                console.log('valid form');
            }
        },

        // SHOW MODALE
        displayEditUser() {
            this.formSite.name = this.site.name
            this.formSite.address = this.site.address
            this.show = true;
        },
        showeditSla(item) {
            this.formEditSLA = item
            this.showslaedit = true;
        },

        //SELECT FILE
        handleFileUpload(event) {
            const selectedFile = event.target.files[0];
            console.log("Fichier sélectionné :", selectedFile);
        },

        // DELETE ELEMENT 
        deletebtn() {
            const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer le site ?");
            if (confirmed) {
                this.$store.dispatch('deleteSite', {
                    siteId: this.$route.query.id,
                });
                this.$router.push({ name: "Site" });
            }
        },

    },
    computed: {
        ...mapState(['CurrentSite']),
        ...mapState(['BuildingList'])
    },
    mounted() {
        this.$store.dispatch('getSite', {
            siteId: this.$route.query.id,
        });

        //get la list des sites pour add site
        this.$store.dispatch('getBuildingList');
    },
    watch: {
        CurrentSite(newSite) {
            this.site = newSite
        },
        BuildingList(newList) {
            console.log('log');
            this.buildingsList = newList;
            console.log(this.buildingsList);
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

.custom-file-input {
    margin-top: 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    height: 50px;
}

/* Style personnalisé pour mettre en évidence le bouton lorsqu'il est survolé */
.custom-file-input:hover {
    background-color: #f0f0f0;
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
</style>