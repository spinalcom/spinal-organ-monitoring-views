<template>
    <v-app>
        <v-main>

            <InformationBar :btn1Title="'ADD'" :btn2Title="'EDIT CUSTOMER'" :btn3Title="'DELETE CUSTOMER'"
                v-on:btn1="showAdd = !showAdd" v-on:btn2="displayEditCustomer()" v-on:btn3="deleteCustomer()"
                title="CUSTOMER INFORMATION" :title2="this.customers.name" :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class=" bar-information">{{ this.customers.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">SERVICE</span>
                        <span class="bar-information">{{ this.customers.service }}</span>
                    </div>
                </div>
                <div v-if="showAdd" class="swing-in-right-fwd"
                    style="padding: 5px;position: absolute;right: 0;width: 180px;background-color: rgb(245, 245, 245);height: 100%;padding-bottom: 50px;top: 0;border-radius: 5px ;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
                    <div @click="showcontact = true" class="addbtn">ADD CONTACT</div>
                    <div @click="showsite = true" class="addbtn">ADD SITE</div>
                    <div @click="showplatform = true" class="addbtn">ADD PLATFORM</div>
                    <!-- <div class="addbtn">ADD CONTACT</div> -->
                </div>
            </InformationBar>


            <BackupInformation class="app" style="max-height: 70%; min-height: 70%;" title="CUSTOMER DETAILS">
                <Tabs :items="items">
                    <!-- TAB contact -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-2">
                            <div style="width: 23%;margin-left: 5px;">contact Name</div>
                            <div style="width: 24%">Email</div>
                            <div style="width: 24%">Téléphone</div>
                            <div style="width: 24%">Category</div>
                            <!-- <div style="width: 100%">ADD/DELETE</div> -->
                        </div>

                        <div v-for="item in this.customers.contacts" :key="item.id">
                            <div class="d-flex mb-2">
                                <div style="width: 100%" class="content-list">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.email }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.telephone }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.category }}
                                </div>
                                <div @click="deleteContact(item.id)" style="width: 8% ;cursor: pointer;"
                                    class="content-list">
                                    <v-icon class="mx-1 mr-2" color="red darken-2" dark>mdi-delete</v-icon>
                                </div>
                                <div @click="editContact(item)" style="width: 8%;cursor: pointer;"
                                    class="content-list mr-2">
                                    <v-icon class="mx-1 mr-2" color="green darken-2" dark>mdi-file-edit</v-icon>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>

                    <!-- TAB SITE -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 32.5%">Site Name</div>
                            <div style="width: 32.5%">Address</div>
                            <div style="width: 33%">Slas number</div>
                        </div>

                        <div v-for="item in this.site" :key="item.id">
                            <div class="d-flex mb-2">
                                <div style="width: 100%" class="content-list">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.address }}
                                </div>

                                <div style="width: 100%" class="content-list">
                                    {{ item.slas.length }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
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
                            <div class="d-flex mb-2">
                                <div style="width: 100%" class="content-list rounded-l-lg pl-10">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetailPlatform(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>
                </Tabs>
            </BackupInformation>


            <!-- MODALE EDIT CUSTOMER-->
            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT CUSTOMER</p>
                    <InputUser v-model="formCustomer.name" title="CUSTOMER NAME" id="userName" />
                    <span class="errors" v-if="$v.formCustomer.name.$error"> Customer Name is required</span>
                    <InputUser v-model="formCustomer.service" title="CUSTOMER SERVICE" id="service" />
                    <span class="errors" v-if="$v.formCustomer.service.$error"> Customer Server is required</span>
                    <div @click="editCustomer()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>




            <!-- MODALE ADD CONTACT -->
            <div v-if="showcontact" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showcontact = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">ADD CONTACT</p>
                    <InputUser v-model="formContact.name" title="CONTACT NAME" id="userName" />
                    <span class="errors" v-if="$v.formContact.name.$error"> Contact Name is required</span>
                    <InputUser v-model="formContact.email" title="CONTACT MAIL" id="userName" />
                    <span class="errors" v-if="$v.formContact.email.$error"> Contact Email is required</span>
                    <InputUser v-model="formContact.telephone" title="CONTACT PHONE NUMBER" id="service" />
                    <span class="errors" v-if="$v.formContact.telephone.$error"> Contact phone number is required</span>
                    <InputUser v-model="formContact.category" title="CONTACT CATEGORY" id="service" />
                    <span class="errors" v-if="$v.formContact.category.$error"> Contact Category is required</span>
                    <div @click="addContact()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>ADD</span>
                    </div>
                    <div @click="showcontact = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>


            <!-- MODALE EDIT CONTACT -->
            <div v-if="showEditContact" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showEditContact = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT CONTACT</p>
                    <InputUser v-model="formEditContact.name" title="CONTACT NAME" id="userName" />
                    <span class="errors" v-if="$v.formEditContact.name.$error"> Contact Name is required</span>
                    <InputUser v-model="formEditContact.email" title="CONTACT MAIL" id="userName" />
                    <span class="errors" v-if="$v.formEditContact.email.$error"> Contact Email is required</span>
                    <InputUser v-model="formEditContact.telephone" title="CONTACT PHONE NUMBER" id="service" />
                    <span class="errors" v-if="$v.formEditContact.telephone.$error"> Contact phone number is required</span>
                    <InputUser v-model="formEditContact.category" title="CONTACT CATEGORY" id="service" />
                    <span class="errors" v-if="$v.formEditContact.category.$error"> Contact Category is required</span>
                    <div @click="editContactvalide(formEditContact.id)" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="showEditContact = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>


            <!-- MODALE ADD SITE -->
            <div v-if="showsite" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="showsite = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">ADD SITE</p>
                    <InputUser v-model="formSite.name" title="SITE NAME" id="userName" />
                    <span class="errors" v-if="$v.formSite.name.$error"> Customer Name is required</span>
                    <div @click="addSite()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>ADD</span>
                    </div>
                    <div @click="showsite = false" class="mt-4 ml-1 popup-btn-fermer">
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
            site: [
                {
                    "id": "ID",
                    "name": "name 1 ",
                    "type": "le type 1",
                    "address": 'une address',
                    "slas": [
                        {
                            "slas 1": "test",
                        },
                        {
                            "slas 2": "test",
                        },
                        {
                            "slas 3": "test",
                        },
                    ],
                },
            ],

            platform: [
                {
                    name: "platform name 1",
                    type: "type platform name 1",
                }
            ],
            customers:
            {
                "type": "MonitoringServiceCustomer",
                "name": "vinci",
                "service": "dsi",
                "id": "1bc9-11d3-bfd0-18acd067699",
                "contacts": [
                    {
                        "id": "fe50-a24f-d6cf-18acd06769a",
                        "name": "Gabriel",
                        "type": "MonitoringServiceContact",
                        "email": "Gabriel@email.com",
                        "telephone": "88887878787",
                        "category": "service finance"
                    },
                    {
                        "id": "fe50-a24f-d6cf-18acd06769a",
                        "name": "Test1",
                        "type": "MonitoringServiceContact",
                        "email": "b@email.com",
                        "telephone": "09876543521",
                        "category": "service finance"
                    },
                    {
                        "id": "fe50-a24f-d6cf-18acd06769a",
                        "name": "Test2",
                        "type": "MonitoringServiceContact",
                        "email": "a@email.com",
                        "telephone": "0123456789",
                        "category": "service finance"
                    }
                ],
            },
            formPlatform: {
                name: null,
            },
            formSite: {
                name: null,
            },
            formCustomer: {
                name: null,
                service: null,
            },
            formContact: {
                name: null,
                email: null,
                telephone: null,
                category: null,
            },
            formEditContact: {
                name: null,
                email: null,
                telephone: null,
                category: null,
            },
            showcontact: false,
            show: false,
            items: [
                'CONTACT',
                'SITE',
                'PLATFORM',
            ],
            showAdd: false,
            showsite: false,
            showplatform: false,
            showEditContact: false
        };
    },
    validations: {
        formCustomer: {
            name: {
                required,
            },
            service: {
                required,
            },
        },
        formContact: {
            name: {
                required,
            },
            email: {
                required,
            },
            telephone: {
                required,
            },
            category: {
                required,
            },
        },
        formEditContact: {
            name: {
                required,
            },
            email: {
                required,
            },
            telephone: {
                required,
            },
            category: {
                required,
            },
        },
        formSite: {
            name: {
                required,
            },
        },
        formPlatform: {
            name: {
                required,
            },
        }
    },
    methods: {

        //CHANGE PAGE
        displayDetail(id) {
            this.$router.push({ name: "DetailSite", query: { id: id } });
        },
        displayDetailPlatform(id) {
            this.$router.push({ name: "DetailPlatform", query: { id: id } });
        },

        //SHOW MODALE
        editContact(item) {
            this.showEditContact = true;
            this.formEditContact = item
        },
        displayEditCustomer() {
            this.show = true;
            this.formCustomer.name = this.customers.name
            this.formCustomer.service = this.customers.service
        },

        //EDIT ELEMENT
        editContactvalide(id) {
            this.$v.formEditContact.$touch();
            if (!this.$v.formEditContact.$invalid) {
                console.log('valid form', id);
            }
        },
        editCustomer() {
            this.$v.formCustomer.$touch();
            if (!this.$v.formCustomer.$invalid) {
                console.log('valid form');
            }
        },

        // ADD ELEMENT 
        addContact() {
            console.log('add le contact');
            this.$v.formContact.$touch();
            if (!this.$v.formContact.$invalid) {
                console.log('valid form');
            }
        },
        addSite() {
            console.log('add le site');
            this.$v.formSite.$touch();
            if (!this.$v.formSite.$invalid) {
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
        deleteCustomer() {
            console.log('delete le customer ', id);
        },
        deleteContact(id) {
            console.log('delete le contact ', id);
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
</style>