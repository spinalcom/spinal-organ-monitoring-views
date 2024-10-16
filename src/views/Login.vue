<!--
Copyright 2023 SpinalCom - www.spinalcom.com

This file is part of SpinalCore.

Please read all of the following terms and conditions
of the Free Software license Agreement ("Agreement")
carefully.

This Agreement is a legally binding contract between
the Licensee (as defined below) and SpinalCom that
sets forth the terms and conditions that govern your
use of the Program. By installing and/or using the
Program, you agree to abide by all the terms and
conditions stated or referenced herein.

If you do not agree to abide by these terms and
conditions, do not demonstrate your acceptance and do
not install or use the Program.
You should have received a copy of the license along
with this file. If not, see
<http://resources.spinalcom.com/licenses.pdf>.
-->

<template>
    <v-app class="app">
        <v-card class="pops" elevation="2">
            <div class="popup-closebtn">
                <span>X</span>
            </div>
            <p class="mb-12">CONNEXION</p>
            <InputUser v-model="formUser.email" class="mb-12 mt-6" title="EMAIL" :value="''"></InputUser>
            <!-- <InputUser v-model="formUser.password" class="mb-12 mt-6" title="MOT DE PASSE" :value="''"></InputUser> -->
            <InputPass title="MOT DE PASSE" id="clientSecret" v-model="formUser.password" />
            <div @click="login()" class="mt-4 ml-1 popup-btn-fermer">
                <span>VALIDER</span>
            </div>
        </v-card>
    </v-app>
</template>

<script>
import InputUser from "../Components/InputUser.vue";
import InputPass from "../Components/InputPassword";
import { mapActions } from 'vuex';
export default {
    name: "App",
    components: {
        InputUser,
        InputPass
    },
    data() {
        return {
            formUser: {
                email: "adminMonitoring@spinalcom.com",
                password: "",
            },
        };
    },

    methods: {
        login(){
            this.$store.dispatch('login/login', this.formUser);
        },

        ...mapActions({
            getUsers: 'login/getUsers'
        })
    },

}

</script>

<style scoped>
.app {
    font: normal normal normal 10px/12px Charlevoix Pro;
    letter-spacing: 1px;
    background: #881e1e00;

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
    right: 20px;
    bottom: 20px;
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

.pops {
    min-height: 350px;
    min-width: 400px;
    width: 30%;
    left: 50%;
    position: relative;
    transform: translate(-50%,-80%);
    height: 40vh;
    top: 50%;
    padding: 30px;
    border-radius: 6px;
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

</style>
