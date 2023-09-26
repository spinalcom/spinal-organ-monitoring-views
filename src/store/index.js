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
import module from '../modules/module'
import login from '../modules/Login'
import users from '../modules/users'
import applications from '../modules/applications'
import platforms from '../modules/platforms'
import logs from '../modules/logs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count : 2
  },
  mutations: {},
  actions: {
  },
  modules: { module,login,users,applications,platforms,logs},
})
