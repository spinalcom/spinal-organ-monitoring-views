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
                <BlueButton @click.native="addUser()" :icon="'mdi-plus'" title="ADD USER" :val="'blue'" />
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

    methods: {
        displayDetail(item) {
            this.$router.push({ name: "DetailUser", query: { id: item.id } });
        },
        addUser() {
            this.$router.push({ name: "AddUser" });
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

.popup {
    position: relative;
    width: 415px;
    height: 269px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -100%);
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
    left: 60%;
    top: 75%;
    width: 145px;
    height: 40px;
    background-color: #14202C;
    border-radius: 6px !important;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
</style>
