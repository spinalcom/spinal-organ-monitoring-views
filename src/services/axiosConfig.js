/*
 * Copyright 2022 SpinalCom - www.spinalcom.com
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

import axios from "axios";
import router from "../router";

// Instance pour les métriques et serveurs (port 5051)
export const instanceAxios = axios.create({
  baseURL: 'http://146.59.157.197:5051/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

// Instance pour les processus (port 5053) - socket io
export const instanceAxiosProcess = axios.create({
  baseURL: 'http://146.59.157.197:5053/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

// Interceptor commun pour les erreurs
const errorInterceptor = (error) => {
  // CORRECTION : Vérifie que error.response existe AVANT de lire status
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    router.push("/Login");
  } else if (error.response && error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
};

// Interceptor commun pour les succès
const responseInterceptor = (response) => {
  return response;
};

// Applique les interceptors aux deux instances
instanceAxios.interceptors.response.use(responseInterceptor, errorInterceptor);
instanceAxiosProcess.interceptors.response.use(responseInterceptor, errorInterceptor);
