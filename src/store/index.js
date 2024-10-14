/*
 * Copyright 2023 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

import Vue from 'vue'
import Vuex from 'vuex'
const instanceAxios = require("../services/axiosConfig");
import login from '../modules/Login';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CustomerList: null,
    SiteList: null,
    BuildingList: null,
    PlatformList: null,
    CurrentCustomer: null,
    CurrentSite: null,
    CurrentBuilding: null,
    CurrentPlatform: null,
    OrganList: null,
    CurrentOrgan: null,
    OrganHealth: null,
    OrganReboot: null,
    OrganRAM: null,
    InformationText: "default",
    modal: false,
    OrganStatus : false,
    color: 'green'
  },

  mutations: {
    setCurrentBuilding: (state, Building) => (
      state.CurrentBuilding = Building
    ),
    setCurrentCustomer: (state, Customer) => (
      state.CurrentCustomer = Customer
    ),
    setCustomerList: (state, CustomerList) => (
      state.CustomerList = CustomerList
    ),
    setPlatformList: (state, PlatformList) => (
      state.PlatformList = PlatformList
    ),
    setCurrentPlatform: (state, platform) => (
      state.CurrentPlatform = platform
    ),
    setBuildingList: (state, BuildingList) => (
      state.BuildingList = BuildingList
    ),
    setSiteList: (state, SiteList) => (
      state.SiteList = SiteList
    ),
    setCurrentSite: (state, Site) => (
      state.CurrentSite = Site
    ),
    setCurrentOrgan: (state, Organ) => (
      state.CurrentOrgan = Organ
    ),
    setOrganList: (state, Organ) => (
      state.OrganList = Organ
    ),
    setOrganHealth: (state, Organ) => (
      state.OrganHealth = Organ
    ),
    setOrganStatus: (state, Organ) => (
      state.OrganStatus = Organ
    ),
    setOrganReboot: (state, Organ) => (
      state.OrganReboot = Organ
    ),
    setOrganRAM: (state, Organ) => (
      state.OrganRAM = Organ
    ),

    setInformationText: (state, Text) => (
      state.InformationText = Text,
      state.modal = true
    ),
    setInformationTextFalse(state) {
      state.InformationText = null;
      state.modal = false;
    },
    setColor(state, color) {
      state.color = color;
    },
    
  },

  getters: {
    CurrentBuilding: state => state.CurrentBuilding,
    CustomerList: state => state.CustomerList,
    SiteList: state => state.SiteList,
    BuildingList: state => state.BuildingList,
    PlatformList: state => state.PlatformList,
    CurrentCustomer: state => state.CurrentCustomer,
    CurrentSite: state => state.CurrentSite,
    CurrentOrgan: state => state.CurrentOrgan,
    OrganList: state => state.OrganList,
    InformationText: state => state.InformationText,
    Color: state => state.Color
  },

  actions: {

    //-------------------------------- CUSTOMERS PAGES -------------------------:
    async addCustomer({ commit }, { customerData }) {
      try {
        const response = await instanceAxios.instanceAxios.post(`/customers/`, customerData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Customer ajouté ! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de l'ajout du client:", error);
        commit("setInformationText", "erreur lors de l'ajout du customer");
        commit("setColor", "red");
      }
    },

    async addContactToCustomer({ commit }, { customerId, contactData }) {
      try {
        const response = await instanceAxios.instanceAxios.post(`/customers/${customerId}/addContact`, contactData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("addContactToCustomer", { customerId, newContact: response.data });
        commit("setInformationText", "Contact ajouté ! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de l'ajout du contact:", error);
        commit("setInformationText", "Echec de l'ajout du contact  ! ");
        commit("setColor", "red");
      }
    },

    async getCustomerList({ commit }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/customers`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCustomerList", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste du client", error);
      }
    },

    async updateCustomer({ commit }, { CustomerId, CustomerData }) {
      try {
        await instanceAxios.instanceAxios.put(`/customers/${CustomerId}`, CustomerData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Client mis à jour! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du client:", error);
        commit("setInformationText", "Echec de la mise a jour du client  !");
        commit("setColor", "red");
      }
    },

    async updateContact({ commit }, { ContactId, ContactData }) {
      try {
        await instanceAxios.instanceAxios.put(`/customers/${ContactId}/updateContact`, ContactData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Contact mis à jour! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du contact:", error);
        commit("setInformationText", "Echec de la mise a jour du contact  ! ");
        commit("setColor", "red");
      }
    },

    async deleteContact({ commit }, { contactId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/customers/${contactId}/deleteContact`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Contact supprimé ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la suppression du contact", error);
        commit("setInformationText", "Echec de la suppression du contact  ! ");
        commit("setColor", "red");
      }
    },

    async getCustomer({ commit }, { customerId }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/customers/${customerId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCurrentCustomer", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du contact:", error);
      }
    },


    async linkCustomerToSite({ commit }, { customerId, siteId }) {
      try {
        const response = await instanceAxios.instanceAxios.post('/customers/linkCustomerToSite', {
          customerId: customerId,
          siteId: siteId
        }, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Echec de la liaison ! ");
        commit("setColor", "green");
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du site:", error);
        commit("setInformationText", "Liaisn effectué ! ");
        commit("setColor", "red");
      }
    },


    //----------------------LES SITES PAGES---------------------------:
    async addSite({ commit }, { siteData }) {
      try {
        const response = await instanceAxios.instanceAxios.post(`/sites/`, siteData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Site ajouté !");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de l'ajout du site:", error);
        commit("setInformationText", "Echec de l'ajout du Site! ");
        commit("setColor", "red");
      }
    },


    async updateSite({ commit }, { siteId, siteData }) {
      try {
        await instanceAxios.instanceAxios.put(`/sites/${siteId}`, siteData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Site mis à jour ! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
        commit("setInformationText", "Echec de la mise à jour du Site! ");
        commit("setColor", "red");
      }
    },

    async deleteSite({ commit }, { siteId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/sites/${siteId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Site supprimé! ");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la suppression de site", error);
        commit("setInformationText", "Echec de la suppression du Site! ");
        commit("setColor", "red");
      }
    },

    async getSiteList({ commit }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/sites`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setSiteList", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des sites", error);
      }
    },

    async getSite({ commit }, { siteId }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/sites/${siteId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCurrentSite", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du site:", error);
      }
    },

    async linkSiteToBuilding({ commit }, { siteId, buildingId }) {
      try {
        const response = await instanceAxios.instanceAxios.post('/sites/linkSiteToBuilding', {
          siteId: siteId,
          buildingId: buildingId,
        }, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Liaison efféctué");
        commit("setColor", "green");
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du site", error);
        commit("setInformationText", "Echec de la liaison ");
        commit("setColor", "red");
      }
    },

    //----------------------LES BUILDINGS PAGES---------------------------:

    async getBuildingList({ commit }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/buildings`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setBuildingList", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des buildings:", error);
      }
    },

    async deleteBuilding({ commit }, { BuildingId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/buildings/${BuildingId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Building supprimé");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la suppression du building:", error);
        commit("setInformationText", "Echec de la suppression");
        commit("setColor", "red");
      }
    },

    async addBuilding({ commit }, { BuildingData }) {
      try {
        await instanceAxios.instanceAxios.post(`/buildings/`, BuildingData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Building ajouté");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de l'ajout du building:", error);
        commit("setInformationText", "Echec de l'ajout");
        commit("setColor", "red");
      }
    },

    async updateBuilding({ commit }, { BuildingId, BuildingData }) {
      try {
        await instanceAxios.instanceAxios.put(`/buildings/${BuildingId}`, BuildingData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Building mis à jour");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du building:", error);
        commit("setInformationText", "Echec de la mise à jour du building");
        commit("setColor", "red");
      }
    },


    async getBuilding({ commit }, { buildingId }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/buildings/${buildingId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCurrentBuilding", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du building:", error);
      }
    },


    //-------------------------------- PLATFORMS PAGES -------------------------:
    async addPlatform({ commit }, { platformData }) {
      try {
        const response = await instanceAxios.instanceAxios.post(`/platforms/`, platformData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Plateforme ajouté");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de l'ajout de la plateforme:", error);
        commit("setInformationText", "Echec de l'ajout de Plateforme");
        commit("setColor", "red");
      }
    },

    async getPlatformList({ commit }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/platforms`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setPlatformList", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des plateformes", error);
      }
    },
    async getPlatform({ commit }, { platformId }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/platforms/${platformId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCurrentPlatform", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la plateforme", error);
      }
    },
    async deletePlatform({ commit }, { platformId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/platforms/${platformId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Suppresion de la plateforme effectué");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        commit("setInformationText", "Echec de lasuppression de la plateforme");
        commit("setColor", "red");
      }
    },
    async updatePlatform({ commit }, { PlatformId, PlatformData }) {
      try {
        await instanceAxios.instanceAxios.put(`/platforms/${PlatformId}`, PlatformData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "mise à jour du plateforme effectué");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la plateforme:", error);
        commit("setInformationText", "Echec de la mise à jour de la plateforme");
        commit("setColor", "red");
      }
    },

    //-------------------------------- ORGANS PAGES -------------------------:

    async getOrganList({ commit }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setOrganList", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des organes:", error);
      }
    },

    async deleteOrgan({ commit }, { organId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/organs/${organId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setInformationText", "Suppression de l'organe effectué");
        commit("setColor", "green");
      } catch (error) {
        console.error("Erreur lors de la suppression de l'organe:", error);
        commit("setInformationText", "Echec de la suppression de l'organe");
        commit("setColor", "red");
      }
    },
    async getOrgan({ commit }, { organId }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs/${organId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setCurrentOrgan", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'organe:", error);
      }
    },


    async gettoto({ commit }, { organId, begin, end }) {
      // console.log('test22', organId, begin, end);
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs/${organId}/health/${begin}/${end}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        // console.log(rep,'ORGANE LIVE ,');
        commit("setOrganHealth", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'organe:", error);
      }
    },

    async getOrganReboot({ commit }, { organId, begin, end }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs/${organId}/reboot/${begin}/${end}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        // console.log(rep);
        commit("setOrganReboot", rep.data);
        return rep.data
      } catch (error) {
        console.error("Erreur lors de la récupération de l'organe:", error);
      }
    },


    async getOrganStatus({ commit }, { organId, begin, end }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs/${organId}/status/${begin}/${end}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("setOrganStatus", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'organe:", error);
      }
    },


    async getOrganRAM({ commit }, { organId, begin, end }) {
      try {
        const rep = await instanceAxios.instanceAxios.get(`/organs/${organId}/ram/${begin}/${end}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        // console.log(rep,'LA REPPPP');
        commit("setOrganRAM", rep.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'organe:", error);
      }
    }



  },

  modules: {
    login
  }

})
