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
        <BlueButton @click.native="show = true" :icon="'mdi-plus'" title="ADD BUILDING" :val="'blue'" />
      </v-card>
    </div>
    <BackupInformation @click.native="showapplist()" title="BUILDING TABLE">
      <div class="d-flex mb-2 mt-4">
        <div style="width: 49%">Building Name</div>
        <div style="width: 50%">adress</div>
      </div>
      <div v-for="item in this.buildings" :key="item.id">

        <div class="d-flex mb-2">
          <div style="width: 50%" class="content-list">
            {{ item.name }}
          </div>
          <div style="width: 50%" class="content-list">
            {{ item.address }}
          </div>
          <div class="content-list rounded-r-lg hover">
            <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
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
        <p class="mb-6">ADD BUILDING</p>
        <InputUser v-model="formBuilding.name" title="BUILDING NAME" id="userName" />
        <span class="errors" v-if="$v.formBuilding.name.$error"> building Name is required</span>
        <InputUser v-model="formBuilding.address" title="BUILDING ADDRESS" id="address" />
        <span class="errors" v-if="$v.formBuilding.address.$error"> building Address is required</span>
        <div @click="AddBuilding()" class="mt-4 ml-1 popup-btn-ajouter">
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
import BlueButton from "../Components/BlueButton.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import StateButton from "../Components/StateButton.vue";
import { mapActions, mapGetters } from "vuex";
import { mapState } from 'vuex';
import InputUser from "../Components/InputUser";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "App",
  components: {
    BlueButton,
    BackupInformation,
    StateButton,
    InputUser,
  },
  data: () => ({
    formBuilding: {
      name: null,
      address: null,
    },
    show: false,
    buildings: [
      {
        "id": "1bc9-11d3-bfd0-18acd067699",
        "type": "TypeDuBuilding",
        "name": "Building1",
        "adress": "2 rue des rues",
      },
    ]
  }),
  validations: {
    formBuilding: {
      name: {
        required,
      },
      address: {
        required,
      },
    },
  },
  methods: {
    displayDetail(item) {
      this.$router.push({ name: "DetailBuilding", query: { id: item.id } });
    },

    AddBuilding() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log('valid form');
        this.$store.dispatch('addBuilding', {
          BuildingData: this.formBuilding
        });
        this.show = false;
        this.$store.dispatch('getBuildingList');
      }
    },

  },
  computed: {
    ...mapState(['BuildingList'])
  },
  created() {
  },
  mounted() {
    this.$store.dispatch('getBuildingList');
  },
  watch: {
    BuildingList(newBuilding) {
      this.buildings = newBuilding;
    }
  },
};
</script>

<style scoped>
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

.hover:hover {
  background: rgb(228, 228, 228);
  transition: 0.3s;
}

.stateButton-container {
  width: 100%;
  display: flex;
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
