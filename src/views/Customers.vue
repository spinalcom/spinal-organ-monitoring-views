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
        <BlueButton @click.native="addCustomer()" :icon="'mdi-plus'" title="ADD CUSTOMER" :val="'blue'" />
      </v-card>
    </div>

    <BackupInformation @click.native="showapplist()" title="CUSTOMERS TABLE">
      <div class="d-flex mb-2 mt-4">
        <div style="width: 25%">Customer Name</div>
        <div style="width: 24.2%">Service</div>
        <div style="width: 24.2%">Platform Number</div>
        <div style="width: 25%">Contact Number</div>
      </div>
      <div v-for="item in this.customers" :key="item.id">
        <div class="d-flex mb-2">
          <div style="width: 50%" class="content-list rounded-l-lg pl-10">
            {{ item.name }}
          </div>
          <div style="width: 50%" class="content-list">
            {{ item.service }}
          </div>
          <div style="width: 50%" class="content-list">
            <!-- {{ item.platform.length }} -->
          </div>
          <div style="width: 50%" class="content-list">
            {{ item.contacts.length }}
          </div>
          <div class="content-list rounded-r-lg hover">
            <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
              <v-icon>mdi-arrow-right</v-icon>
            </button>
          </div>
        </div>
      </div>
    </BackupInformation>

    <!-- MODALE EDIT CUSTOMER-->
    <div v-if="show" class="popup_platform">
      <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
        <div @click="show = false" class="popup-closebtn">
          <span>X</span>
        </div>
        <p class="mb-6">ADD CUSTOMER</p>
        <InputUser v-model="formCustomer.name" title="CUSTOMER NAME" id="userName" />
        <span class="errors" v-if="$v.formCustomer.name.$error"> Customer Name is required</span>
        <InputUser v-model="formCustomer.service" title="CUSTOMER SERVICE" id="service" />
        <span class="errors" v-if="$v.formCustomer.service.$error"> Customer Service is required</span>
        <div @click="valideCustomer()" class="mt-4 ml-1 popup-btn-ajouter">
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
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import InputUser from "../Components/InputUser";

export default {
  name: "App",
  components: {
    BlueButton,
    BackupInformation,
    StateButton,
    InputUser
  },
  data: () => ({
    show: false,
    formCustomer: {
      name: null,
      service: null,
      contacts: []
    },
    customers: [
      {
        "type": "MonitoringServiceCustomer",
        "name": "Test",
        "service": "Test",
        "id": "1bc9-11d3-bfd0-18acd067699",
        "contacts": [
          {
            "id": "fe50-a24f-d6cf-18acd06769a",
            "name": "Gabriel",
            "type": "MonitoringServiceContact",
            "email": "Gabriel@email.com",
            "telephone": 88887878787,
            "category": "service finance"
          }
        ],
        "platform": [
          {
            name: "platform1",
            type: "le type de platform"
          },
          {
            name: "platform1",
            type: "le type de platform"
          },
        ]
      },
    ],

  }),
  validations: {
    formCustomer: {
      name: {
        required,
      },
      service: {
        required,
      },
    },
  },
  methods: {
    // CHANGE ROUTE 
    displayDetail(item) {
      this.$router.push({ name: "DetailCustomer", query: { id: item.id } });
    },

    addCustomer() {
      // this.$router.push("/AddCustomer");
      this.show = true
    },

    valideCustomer() {
      this.$v.formCustomer.$touch();
      if (!this.$v.formCustomer.$invalid) {
        this.$store.dispatch('addCustomer', {
          customerData: this.formCustomer
        });
        location.reload();
      }
    }

  },
  computed: {
    ...mapState(['CustomerList'])
  },
  created() {
  },
  mounted() {
    this.$store.dispatch('getCustomerList');
  },
  watch: {
    CustomerList(newList) {
      this.customers = newList;
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

.errors {
    margin: 0;
    transform: translate(0, -10%);
    font-size: 10px;
    color: red;
    padding-left: 2px;
    letter-spacing: 1.1px;
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

.hover:hover {
  background: rgb(228, 228, 228);
  transition: 0.3s;
}

.stateButton-container {
  width: 100%;
  display: flex;
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
</style>
