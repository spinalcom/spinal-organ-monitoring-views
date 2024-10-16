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
                <BlueButton @click.native="show = true" :icon="'mdi-plus'" title="ADD USER" :val="'blue'" />
            </v-card>
        </div>
        <BachupInformation title="USERS TABLE">
            <div class="d-flex mb-2 mt-4">
                <!-- <div style="width: 20%">user Id</div> -->
                <div style="width: 24%">user Name</div>
                <!-- <div style="width: 20%">user Type</div> -->
                <div style="width: 25%">url</div>
                <div style="width: 24%">platform number</div>
                <div style="width: 25%">status</div>
            </div>

            <div v-for="item in this.user" :key="item.id">

                <div class="d-flex mb-2">
                    <!-- <div style="width: 20%" class="content-list rounded-l-lg pl-10">
                        {{ item.id }}
                    </div> -->
                    <div style="width: 25%" class="content-list">
                        {{ item.name }}
                    </div>
                    <!-- <div style="width: 20%" class="content-list">
                        {{ item.type }}
                    </div> -->
                    <div style="width: 25%" class="content-list">
                        {{ item.url }}
                    </div>

                    <div style="width: 25%" class="content-list">
                        {{ item.platformList.length }}
                    </div>
                    <div style="width: 25%" class="content-list">
                        {{ item.status }}
                    </div>
                    <div class="content-list rounded-r-lg hover">
                        <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                            <v-icon>mdi-arrow-right</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </BachupInformation>
        <!-- MODALE EDIT SITE -->
        <div v-if="show" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="show = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD USER</p>
                <InputUser v-model="formUser.name" title="USER NAME" id="userName" />
                <span class="errors" v-if="$v.formUser.name.$error"> User Name is required</span>
                <InputUser v-model="formUser.email" title="USER EMAIL" id="userName" />
                <span class="errors" v-if="$v.formUser.email.$error"> User Email is required</span>
                <InputUser v-model="formUser.password" title="USER PASSWORD" id="userName" />
                <span class="errors" v-if="$v.formUser.password.$error"> User Password is required</span>
                <div @click="addUser()" class="mt-4 ml-1 popup-btn-ajouter">
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
        formUser: {
            name: null,
            email: null,
            password: null
        },
        user: [
            {
                "id": "ID",
                "name": "name 1 ",
                "type": "le type 1",
                "userType": "PLAFTOMESTYPE",
                "url": 'url.user',
                "platformList": [
                    {
                        "platform 1": "test",
                    },
                    {
                        "platform 2": "test",
                    },
                    {
                        "platform 3": "test",
                    },
                ],
                "status": "?"
            },
        ],
    }),
    validations: {
        formUser: {
            name: {
                required,
            },
            email: {
                required,
            },
            password: {
                required,
            },
        },
    },

    methods: {
        displayDetail(item) {
            this.$router.push({ name: "DetailUser", query: { id: item.id } });
        },
        addUser() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                //ADD USER
                location.reload();
            }
        },
    },
    computed: {
    },
    created() {
    }
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
