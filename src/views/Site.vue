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
                <BlueButton @click.native="show = true" :icon="'mdi-plus'" title="ADD SITE" :val="'blue'" />
            </v-card>
        </div>
        <BachupInformation title="SITE TABLE">
            <div class="d-flex mb-2 mt-4">
                <div style="width: 33%">site Name</div>
                <div style="width: 33%">address</div>
                <div style="width: 33%">slas number</div>
            </div>

            <div v-for="item in this.site" :key="item.id">
                <div class="d-flex mb-2">
                    <div style="width: 33%" class="content-list">
                        {{ item.name }}
                    </div>
                    <div style="width: 33%" class="content-list">
                        {{ item.address }}
                    </div>
                    <div style="width: 33%" class="content-list">
                        {{ item.Slas.length }}
                    </div>
                    <div class="content-list rounded-r-lg hover">
                        <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                            <v-icon>mdi-arrow-right</v-icon>
                        </button>
                    </div>
                </div>
            </div>
        </BachupInformation>

        <!-- MODALE ADD SITE -->
        <div v-if="show" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="show = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD SITE</p>
                <InputUser v-model="formSite.name" title="SITE NAME" id="userName" />
                <span class="errors" v-if="$v.formSite.name.$error"> Site Name is required</span>
                <InputUser v-model="formSite.address" title="SITE ADDRESS" id="userName" />
                <span class="errors" v-if="$v.formSite.address.$error"> Site Address is required</span>
                <div @click="addSite()" class="mt-4 ml-1 popup-btn-ajouter">
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

    },
    data: () => ({
        formSite: {
            name: null,
            address: null,
        },
        show: false,
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
    }),

    validations: {
        formSite: {
            name: {
                required,
            },
            address: {
                required,
            },
        },
    },
    methods: {

        addSite() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                console.log('valid form');
                this.$store.dispatch('addSite', {
                    siteData: this.formSite
                });
                this.show = false;
                this.$store.dispatch('getSiteList');
            }
        },
        displayDetail(item) {
            this.$router.push({ name: "DetailSite", query: { id: item.id } });
        },
    },
    computed: {
        ...mapState(['SiteList'])
    },
    created() {
    },
    mounted() {
        this.$store.dispatch('getSiteList');
    },
    watch: {
        SiteList(newList) {
            this.site = newList;
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
