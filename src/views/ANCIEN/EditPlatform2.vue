<template>
  <v-app>
    <v-main>
      <BachupInformation style="max-height: 87vh;" title="EDIT  PLATFORM">
        <form class="formulaire" novalidate @submit.prevent="validateUser">
          <p style="margin: 0;">Rentrez les informations de l’utilisateur. </p>
          <InputUser title="  PLATFORM NAME" id="userName" v-model="platform.name" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.name.required">Un nom est
            requis</span>
          <InputUser title="  PLATFORM TYPE" id="password" v-model="platform.type" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>
          <InputUser title="  PLATFORM TYPE" id="password" v-model="platform.platformType" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>
          <InputUser title="  PLATFORM TOKEN BOS REGISTER" id="password" v-model="platform.TokenBosRegister" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>
          <InputUser title="  PLATFORM IP ADDRESS" id="Email" v-model="platform.ipAdress" />
          <span title="ADD CONTACT" class="errors" :class="{ 'showspan': iserrors }"
            v-if="!$v.platform.address.required">Un Email est
            requis</span>
          <InputUser title="  PLATFORM URL" id="password" v-model="platform.url" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>
          <InputUser title="  PLATFORM LOGIN ADMIN" id="password" v-model="platform.loginAdmin" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>

          <InputUser title="  PLATFORM PASSWORD ADMIN" id="password" v-model="platform.passwordAdmin" />
          <span class="errors" :class="{ 'showspan': iserrors }" v-if="!$v.platform.type.required">Le type
            obligatoire.</span>
          <div style="display: flex;" v-for="(organ, index) in platform.organList" :key="index">
            <SelectUser :tab="organs" :value="organ.name" title="ORGAN"></SelectUser>
            <button @click="deleteOrgan(index)" type="button" class="red-cross">X</button>
          </div>

          <div class="d-flex justify-end">
            <button @click="addOrgan" type="button" class="btn-ajout-platform">+ ADD ORGAN</button>
          </div>
          <div class="d-flex justify-end">
            <button class="btn-retour" @click="cancelAdd()">RETOUR</button>
            <button type="submit" class="btn-creer">CREATE CUSTOMER</button>
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
      platform: {
        "id": { "dataType": "string", "required": true },
        "name": "nom de platfomr",
        "type": "type de platform",
        "platformType": "platformtype",
        "TokenBosRegister": "token bos register",
        "ipAdress": "l'adresse ip",
        "url": "l 'url",
        "loginAdmin": "le login admin",
        "passwordAdmin": "le password admin",
        "hubOrgan": { "ref": "IOrganHub" },
        "organList": [
          {
            "name": "le nom de l organ 1",
            "type": "le type de l organ",
          },
          {
            "name": "le nom de l organ 2",
            "type": "le type de l organ",
          }],
      },
      organs: [
        {
          "name": "organ a ajouter 1",
          "type": "le type de l organ",
        },
        {
          "name": "organ a ajouter 2",
          "type": "le type de l organ",
        }],
      error_platform: false,
      iserrors: true,
      userType: [{
        name: 'Simple User'
      },
      {
        name: 'Super User'
      }],
      conf_pass: false,
    };
  },

  validations: {
    platform: {
      name: {
        required,
      },
      type: {
        required,
      },
      address: {
        required,
      },
    },
  },

  methods: {
    cancelAdd() {
      this.$router.push({ name: 'Detail PLATFORM', query: { id: this.$route.query.id } });
    },
    addOrgan() {
      this.platform.organList.push({}); // Ajoute un nouvel élément au tableau pour afficher un nouveau composant SelectUser
    },
    deleteOrgan(index) {
      console.log('lement', index);

      this.platform.organList.splice(index, 1); // Supprime l'élément du tableau à l'index donné
    },

    ...mapActions({ saveUser: 'users/saveUser' }),

    async validateUser() {
      await this.$refs.refplatform.maFonction();


      this.$v.$touch();


      if (!this.$v.$invalid && this.platform.confirm_password == this.platform.password) {
        console.log('valid form');
        var objectBody = {
          userName: this.platform.userName,
          password: this.platform.password,
          email: this.platform.email,
          telephone: this.platform.telephone,
          info: this.platform.info,
          userType: this.platform.userType.name,
          platformList: this.platformObjectList.map(el => {
            return {
              platformId: el.platformId,
              userProfile: {
                name: el.userProfile.name,
                userProfileId: el.userProfile.userProfileId
              }
            };
          })
        };
        this.saveUser(objectBody);
      } else {
        this.iserrors = false;
        if (this.platform.confirm_password != this.platform.password) {
          this.conf_pass = true;
        } else {
          this.conf_pass = false;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      platformObjectList: 'users/selectedplatformObjectList',
    }),
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