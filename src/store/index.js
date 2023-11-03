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
    CurrentCustomer: null,
    CurrentSite: null,
    CurrentBuilding: null
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
    setBuildingList: (state, BuildingList) => (
      state.BuildingList = BuildingList
    ),
    setSiteList: (state, SiteList) => (
      state.SiteList = SiteList
    ),
    setCurrentSite: (state, Site) => (
      state.CurrentSite = Site
    ),
  },

  getters: {
    CurrentBuilding: state => state.CurrentBuilding,
    CustomerList: state => state.CustomerList,
    SiteList: state => state.SiteList,
    BuildingList: state => state.BuildingList,
    CurrentCustomer: state => state.CurrentCustomer,
    CurrentSite: state => state.CurrentSite,
  },

  actions: {

    //-------------------------------- CUSTOMERS PAGES -------------------------:
    async addCustomer(_, { customerData }) {
      try {
        console.log('envoi');
        const response = await instanceAxios.instanceAxios.post(`/customers/`, customerData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        // La ligne commit a été supprimée
      } catch (error) {
        console.error("Erreur lors de l'ajout du contact:", error);
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
      } catch (error) {
        console.error("Erreur lors de l'ajout du contact:", error);
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
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },

    async updateCustomer(_, { CustomerId, CustomerData }) {
      try {
        await instanceAxios.instanceAxios.put(`/customers/${CustomerId}`, CustomerData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
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
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },


    async linkCustomerToSite(_, { customerId, siteId }) {
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
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du site:", error);
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
        commit("addContactToCustomer", { siteData: response.data });
      } catch (error) {
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },


    async updateSite(_, { siteId, siteData }) {
      try {
        await instanceAxios.instanceAxios.put(`/sites/${siteId}`, siteData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
      }
    },

    async deleteSite(_, { siteId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/sites/${siteId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
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
        console.error("Erreur lors de l'ajout du contact:", error);
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

    async linkSiteToBuilding(_, { siteId, buildingId }) {
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
        return response.data;
      } catch (error) {
        console.error("Erreur lors de l'ajout du site:", error);
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
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },

    async deleteBuilding(_, { BuildingId }) {
      try {
        await instanceAxios.instanceAxios.delete(`/buildings/${BuildingId}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
      }
    },

    async addBuilding({ commit }, { BuildingData }) {
      try {
        const response = await instanceAxios.instanceAxios.post(`/buildings/`, BuildingData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
        commit("addContactToCustomer", { BuildingData: response.data });
      } catch (error) {
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },

    async updateBuilding(_, { BuildingId, BuildingData }) {
      try {
        await instanceAxios.instanceAxios.put(`/buildings/${BuildingId}`, BuildingData, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          }
        });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du site:", error);
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
        console.error("Erreur lors de l'ajout du contact:", error);
      }
    },

  },

  modules: {
    login
  }

})
