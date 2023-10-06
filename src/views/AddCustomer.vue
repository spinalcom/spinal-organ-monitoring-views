<template>
  <v-app>
    <v-main>
      <BachupInformation style="max-height: 87vh;" title="ADD CUSTOMER">
        <form class="formulaire" novalidate @submit.prevent="validateUser">
          <p style="margin: 0;">Enter Customer information </p>
          <InputUser title="CUSTOMER NAME" id="userName" v-model="formCustomer.name" />
          <span class="errors" v-if="$v.formCustomer.name.$error"> Customer Name is required</span>
          <InputUser title="CUSTOMER SERVICE" id="Email" v-model="formCustomer.service" />
          <span class="errors" v-if="$v.formCustomer.service.$error"> Customer service is required</span>
          
          <!-- <div style="display: flex;" v-for="(contacts, index) in formCustomer.contacts" :key="index">
            <SelectUser :tab="contact" :value="contacts.name" title="CONTACT"></SelectUser>
            <button @click="deleteContact(index)" type="button" class="red-cross">X</button>
          </div>
          <div class="d-flex justify-end">
            <button @click="addContact" type="button" class="btn-ajout-platform">+ ADD CONTACT</button>
          </div> -->
          <div class="d-flex justify-end">
            <button class="btn-retour" @click="cancelAdd()">RETOUR</button>
            <button type="submit" class="btn-creer">CREATE CUSTOMER</button>
          </div>
        </form>
      </BachupInformation>
    </v-main>
  </v-app>
</template>
  
<script>
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
      formCustomer: {
        name: null,
        service: null,
        contacts: []
      },
      contact: [{
        name: "salut",
        type: 'le type de user'
      }],
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
  },

  methods: {
    cancelAdd() {
      this.$router.push("/Customers");
    },
    addContact() {
      this.formCustomer.contacts.push({}); // Ajoute un nouvel élément au tableau pour afficher un nouveau composant SelectUser
    },
    deleteContact(index) {
      this.formCustomer.contacts.splice(index, 1);
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