<template>
  <v-app>
    <v-main>
      <BachupInformation style="max-height: 87vh;" title="ADD SITE">
        <form class="formulaire" novalidate @submit.prevent="validateUser">
          <p style="margin: 0;">Enter SIte information</p>
          <InputUser title="SITE NAME" id="userName" v-model="formSite.name" />
          <span class="errors" v-if="$v.formSite.name.$error"> Site Name is required</span>
          <InputUser title="SITE ADDRESS" id="Email" v-model="formSite.address" />
          <span class="errors" v-if="$v.formSite.address.$error"> Site address is required</span>
          
          <!-- <div style="display: flex;" v-for="(slas, index) in formSite.slas" :key="index">
            <SelectUser :tab="el_slas" :value="slas.name" title="SLAS"></SelectUser>
            <button @click="deleteslas(index)" type="button" class="red-cross">X</button>
          </div>
          <div class="d-flex justify-end">
            <button @click="addslas" type="button" class="btn-ajout-platform">+ ADD SLAS</button>
          </div> -->
          <div class="d-flex justify-end">
            <button class="btn-retour" @click="cancelAdd()">RETOUR</button>
            <button type="submit" class="btn-creer">CREATE SITE</button>
          </div>
        </form>
      </BachupInformation>
    </v-main>
  </v-app>
</template>
    
<script >
import InputUser from "../Components/InputUser";
import SelectUser from "../Components/SelectUser.vue";
import TextareaUser from "../Components/TextareaUser.vue";
import BachupInformation from "../Components/BackupInformation.vue";
import InputPass from "../Components/InputPassword";
import AddPlatform from "../Components/AddPlatform";
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [validationMixin],
  components: {
    InputUser,
    SelectUser,
    TextareaUser,
    BachupInformation,
    InputPass,
    AddPlatform
  },

  data() {
    return {
      formSite: {
        name: null,
        address: null,
        slas : []
      },
      el_slas :[{
        name: "sla1",
        type : "type 1",
      },
      {
        name: "sla2",
        type : "type 2",
      }]
    };
  },

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
    cancelAdd() {
      this.$router.push("/Site");
    },
    addslas() {
      this.formSite.slas.push({}); // Ajoute un nouvel élément au tableau pour afficher un nouveau composant SelectUser
    },
    deleteslas(index) {
      this.formSite.slas.splice(index, 1); // Supprime l'élément du tableau à l'index donné
    },

    async validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log('valid form');

      }
    },
  },
  computed: {

  },
}
</script>
    
<style scoped>
.errors {
  margin: 0;
  position: absolute;
  transform: translate(0, -10%);
  font-size: 10px;
  color: red;
  padding-left: 2px;
  letter-spacing: 1.1px;
}

.v-application {
  background-color: #d6e2e600;
}

.btn-retour {
  border: 1px solid #14202C;
  border-radius: 6px;
  opacity: 1;
  width: 120px;
  height: 40px;
  margin-right: 5px;
  margin-top: 20px;
  font-size: 10px;
  letter-spacing: 1.1px;
  transition: 0.1s;
}

.btn-retour:hover {
  background-color: #e2e2e2;
}

.btn-creer {
  border: 0px;
  padding-left: 30px;
  padding-right: 30px;
  background: #14202C;
  border-radius: 6px;
  color: white;
  margin-left: 5px;
  margin-top: 20px;
  font-size: 10px;
  letter-spacing: 1.1px;
  transition: 0.1s;
  border: 1px solid #14202C;
  transition: 0.1s;
}

.btn-creer:hover {
  background-color: #e2e2e2;
  color: #14202C;
}

.showspan {
  display: none;
}

.formulaire {
  padding-left: 25%;
  padding-right: 25%;
  padding-bottom: 20px;
  font-size: 14px;
}

.showspan {
  display: none;
}

.btn-ajout-platform {
  border: 0px;
  height: 40px;
  margin-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 6px;
  background: #ebf0ea;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1.3px;
  font-siplatform_copiee: 10px;
  transition: 0.2s;
  font-size: 10px;
}

.btn-ajout-platform:hover {
  background-color: rgb(189, 189, 189);
  /* color: white; */
}

.red-cross {
  margin-top: 22px;
  margin-left: 10px;
  border-radius: 10px;
  height: 42px;
  width: 45px;
  color: orangered;
  border: 1px solid orangered;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-siplatform_copiee: 15px;
  padding-top: 2px;
  transition: 0.2s;
}

.red-cross:hover {
  background: #EF5F32;
  color: #ffffff;
  border: 1px solid #ffffff;
}
</style>