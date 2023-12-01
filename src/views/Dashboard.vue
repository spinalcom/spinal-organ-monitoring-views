<template>
  <v-app>
    <v-main class="ml-12">
      <div>
        <div style="font-weight: bold; color: #9BBCC4;font-size: 25px;margin-bottom: 50px;" class="d-flex mt-4 b">
          <!-- <div style="min-width: 325px;">
            <v-icon style="color: black" class="input-icon">mdi-magnify</v-icon>
            <input v-model="filtersData.search" class="input-menu" placeholder="rechercher" type="text">
          </div> -->
          Liste des applications du portail de monitoring
        </div>
      </div>
      <div class="mt-5">
        <span class="admin-title">PORTAIL DE MONITORING</span>
        <div class="menu-card">
          <div class="menu-title">
            <hr class="line-division">
            APP
          </div>
          <div class="menu-administraton">
            <hr style="min-width: 1100px;" class="line-division">
            <div class="container-cardmenu">
              <CardMenu :icon="'mdi-shield-crown'" :verif="filtersData.search" :link="'platforms'"
                :title="'PLATFORMS LIST'" :subtitle="'Platforms list'">
              </CardMenu>
              <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :link="'UserList'" :title="'USER LIST'"
                :subtitle="'Users List'"></CardMenu>
              <CardMenu :icon="'mdi-account'" :verif="filtersData.search" :link="'Organ'" :title="'ORGAN LIST'"
                :subtitle="'Organs List'">
              </CardMenu>
              <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :link="'Server'" :title="'SERVER LIST'"
                :subtitle="'Servers List'"></CardMenu>
            </div>
          </div>
        </div>
        <div class="menu-card">
          <div class="menu-title">
            <hr class="line-division">
            APP
          </div>
          <div class="menu-administraton">
            <hr style="min-width: 1100px;" class="line-division">
            <div class="container-cardmenu">
              <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :link="'Customers'" :title="'CUSTOMERS LIST'"
                :subtitle="'Customers List'"></CardMenu>
              <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :link="'Site'" :title="'SITE LIST'"
                :subtitle="'Sites List'"></CardMenu>
              <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :link="'Buildings'" :title="'BUILDING LIST'"
                :subtitle="'Buildings List'"></CardMenu>
                <CardMenu :icon="'mdi-view-list'" :verif="filtersData.search" :newlink="true" :link="'http://141.94.203.43/zabbix/zabbix.php?action=dashboard.view'" :title="'ZABBIX'"
                :subtitle="'Online Server'"></CardMenu>
            </div>
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import CardMenu from "../Components/CardMenu";
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
export default {
  components: {
    CardMenu,
  },
  data: () => ({
    filtersData: {
      search: "",
    },
  }),
  computed: {
    // ...mapState({
    //   data: state => state.module.data
    // })

  },
  methods: {

  },
}
</script>

<style scoped>
.v-application {
  background-color: #d6e2e600;
}

.input-icon {
  background-color: white;
  height: 40px;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #F0F0F0;
  border-right: 0px;
  left: 5px;
  z-index: 1;
  border-bottom-left-radius: 6px;
  border-top-left-radius: 6px;
  padding: 5px;
}

.information-menu {
  text-align: left;
  font-size: 14px;
  letter-spacing: 0px;
  margin-top: 10px;
}

.input-menu {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #F0F0F0;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  height: 40px;
  padding-left: 10px;
  font: normal normal normal 13px/13px Charlevoix Pro;
  letter-spacing: 0.88px;
  padding-right: 100px;
  outline-width: 0;
}

.input-select {
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border: 1px solid #F0F0F0;
  border-bottom-right-radius: 6px;
  border-top-right-radius: 6px;
  height: 40px;
  margin-right: 10px;
  padding-left: 10px;
  position: relative;
  bottom: 1px;
  font: normal normal normal 11px/13px Charlevoix Pro;
  letter-spacing: 0.88px;
  padding-right: 20px;
  outline-width: 0;
}

.admin-title {
  letter-spacing: 2.2px;
  color: #9BBCC4;
  margin-left: 100px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 1000;
  font-size: 10px;
}

.menu-card {
  display: flex;
  margin-bottom: 5px;
}

.container-cardmenu {
  display: flex;
  position: relative;
  width: 100%;
  min-height: 100px;
}

.menu-administraton {
  margin-left: 6px;
  text-align: left;
  width: 90%;
}

.menu-title {
  letter-spacing: 1.7px;
  color: #6AA0AD;
  opacity: 1;
  color: #6AA0AD;
  min-width: 91px;
  width: 91px;
  font-size: 7px;
  font-weight: 900;
}

.option-Select-Menu {
  font-size: 15px;
}

hr.line-division {
  border-top: 1px solid #6AA0AD;
}
</style>