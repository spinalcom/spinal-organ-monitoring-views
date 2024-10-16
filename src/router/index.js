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

import Vue from 'vue';
import Router from 'vue-router';
import DetailUser from '@/views/DetailUser';
// import Users from '@/views/Users';
import DetailPlatform from '@/views/DetailPlatform';
// import Application from '@/views/Application';
// import DetailApp from '@/views/DetailApp';
// import AddApp from '@/views/AddApp';
// import AddUser from '@/views/AddUser';
// import EditApp from '@/views/EditApp';
// import EditUser from '@/views/EditUser';
// import Logs from '@/views/Logs';
// import EditPlatform from '@/views/EditPlatform'

import Login from '@/views/Login';
import Organ from '@/views/Organ';
import Site from '@/views/Site';
import Server from '@/views/Server';
import Platforms from '@/views/Platforms';
import Dashboard from '@/views/Dashboard';
import Customers from '@/views/Customers';
import Buildings from '@/views/Buildings';
import DetailSite from '@/views/DetailSite';
import DetailCustomer from '@/views/DetailCustomer';
import DetailBuilding from '@/views/DetailBuilding';
import DetailOrgan from '@/views/DetailOrgan';
import DetailServer from '@/views/DetailServer';
// import AddCustomer from '@/views/AddCustomer';
// import AddOrgan from '@/views/AddOrgan';
// import AddBuilding from '@/views/AddBuilding';
// import AddPlatform from '@/views/AddPlatform';
// import AddSite from '@/views/AddSite';
// import AddServer from '@/views/AddServer';
import UserList from '@/views/UserList';
// import EditOrgan from '@/views/EditOrgan';
// import EditServer from '@/views/EditServer';
// import EditCustomer from '@/views/EditCustomer';
// import EditSite from '@/views/EditSite';
// import EditBuilding from '@/views/EditBuilding';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    // {
    //   path: '/Users',
    //   name: 'Users',
    //   component: Users
    // },
    {
      path: '/DetailUser',
      name: 'DetailUser',
      component: DetailUser
    },
    {
      path: '/Customers',
      name: 'Customers',
      component: Customers
    },
    // {
    //   path: '/EditCustomer',
    //   name: 'EditCustomer',
    //   component: EditCustomer
    // },
    // {
    //   path: '/EditSite',
    //   name: 'EditSite',
    //   component: EditSite
    // },
    // {
    //   path: '/EditOrgan',
    //   name: 'EditOrgan',
    //   component: EditOrgan
    // },
    // {
    //   path: '/EditServer',
    //   name: 'EditServer',
    //   component: EditServer
    // },
    // {
    //   path: '/EditBuilding',
    //   name: 'EditBuilding',
    //   component: EditBuilding
    // },
    {
      path: '/Organ',
      name: 'Organ',
      component: Organ
    },
    {
      path: '/DetailOrgan',
      name: 'DetailOrgan',
      component: DetailOrgan
    },
    {
      path: '/DetailServer',
      name: 'DetailServer',
      component: DetailServer
    },
    {
      path: '/UserList',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/Buildings',
      name: 'Buildings',
      component: Buildings
    },
    {
      path: '/Site',
      name: 'Site',
      component: Site
    },
    {
      path: '/Server',
      name: 'Server',
      component: Server
    },
    {
      path: '/DetailSite',
      name: 'DetailSite',
      component: DetailSite
    },
    {
      path: '/DetailCustomer',
      name: 'DetailCustomer',
      component: DetailCustomer
    },
    // {
    //   path: '/AddCustomer',
    //   name: 'AddCustomer',
    //   component: AddCustomer
    // },
    // {
    //   path: '/AddPlatform',
    //   name: 'AddPlatform',
    //   component: AddPlatform
    // },
    // {
    //   path: '/AddSite',
    //   name: 'AddSite',
    //   component: AddSite
    // },
    // {
    //   path: '/AddOrgan',
    //   name: 'AddOrgan',
    //   component: AddOrgan
    // },
    // {
    //   path: '/AddServer',
    //   name: 'AddServer',
    //   component: AddServer
    // },
    {
      path: '/DetailBuilding',
      name: 'DetailBuilding',
      component: DetailBuilding
    },
    {
      path: '/Platforms',
      name: 'Platforms',
      component: Platforms
    },
    {
      path: '/DetailPlatform',
      name: 'DetailPlatform',
      component: DetailPlatform
    },
    // {
    //   path: '/Application',
    //   name: 'Application',
    //   component: Application
    // },
    // {
    //   path: '/DetailApp',
    //   name: 'DetailApp',
    //   component: DetailApp
    // }, 
    // {
    //   path: '/AddUser',
    //   name: 'AddUser',
    //   component: AddUser
    // },
    // , {
    //   path: '/AddBuilding',
    //   name: 'AddBuilding',
    //   component: AddBuilding
    // },
    // {
    //   path: '/AddApp',
    //   name: 'AddApp',
    //   component: AddApp
    // },
    // {
    //   path: '/EditApp',
    //   name: 'EditApp',
    //   component: EditApp
    // },
    // {
    //   path: '/EditUser',
    //   name: 'EditUser',
    //   component: EditUser
    // },
    // {
    //   path: '/EditPlatform',
    //   name: 'EditPlatform',
    //   component: EditPlatform
    // },
    // {
    //   path: '/Logs',
    //   name: 'Logs',
    //   component: Logs
    // },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },

  ]
});
