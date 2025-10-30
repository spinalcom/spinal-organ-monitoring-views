<template>
    <v-app>
        <v-main>
            <InformationBar :btn1Title="'ADD'" :btn2Title="'EDIT SERVER'" :btn3Title="'DELETE SERVER'"
                :btn4Title="'REFRESH'"
                v-on:btn1="showAdd = !showAdd" v-on:btn2="show = true;" v-on:btn3="deletebtn()" v-on:btn4="refreshServerData()"
                title="SERVER INFORMATION"
                :title2="this.server.name" :icon="require('../assets/image/USE_icon.svg')">
                <div class="d-flex">
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">NAME</span>
                        <span class=" bar-information">{{ this.server.name }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">TYPE</span>
                        <span class="bar-information">{{ this.server.type }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">ADRESS</span>
                        <span class="bar-information">{{ this.server.ipAdress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">macAdress</span>
                        <span class="bar-information">{{ this.server.macAdress }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">last_health_time</span>
                        <span class="bar-information">{{ this.server.last_health_time }}</span>
                    </div>
                    <div class="d-flex flex-column mr-16">
                        <span class="bar-sub-title">sshPassword</span>
                        <span class="bar-information">{{ this.server.sshPassword }}</span>
                    </div>
                </div>
                <div v-if="showAdd" class="swing-in-right-fwd"
                    style="padding: 5px;position: absolute;right: 0;width: 180px;background-color: rgb(245, 245, 245);height: 100%;padding-bottom: 50px;top: 0;border-radius: 5px ;box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;">
                    <div @click="showOrgan = true" class="addbtn">ADD ORGAN</div>
                    <div @click="showplatform = true" class="addbtn">ADD PLATFORM</div>
                </div>
            </InformationBar>
            <BackupInformation class="app" style="max-BackupInformationheight: 70%; min-height: 70%;" title="SERVER DETAILS">
                <Tabs :items="items">

                    <!-- TAB PLATFORM -->
                    <v-tab-item >
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 49%">Platform Name</div>
                            <div style="width: 50%">Type</div>
                        </div>

                        <div v-for="item in this.platform" :key="item.id">
                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 100%" class="content-list rounded-l-lg pl-10">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayDetail(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>

                   <!-- TAB METRICS -->
                          <v-tab-item style="display: flex; flex-direction: column;">
                            <div class="d-flex justify-space-between align-center">
                                <div class="machine-status-indicator d-flex align-center">
                                    <div 
                                    class="status-light"
                                    :class="isMachineOn ? 'green--lighten-1' : 'red--lighten-1'"
                                    :style="{
                                        backgroundColor: isMachineOn ? '#4CAF50' : '#F44336',
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        marginRight: '8px'
                                    }"
                                    ></div>
                                    <span class="status-text">
                                    {{ isMachineOn ? 'EN MARCHE' : 'HORS LIGNE' }}
                                    </span>
                                </div>

                                <!-- Bouton redémarrage -->
                                <v-btn
                                    color="orange"
                                    @click="restartServer"
                                    class="ml-auto"
                                >
                                    <v-icon left>mdi-restart</v-icon>
                                    Restart
                                </v-btn>
                            </div>
                             <div class="d-flex mb-2 mt-4 ml-1 align-center">
                                <div style="width: 49%; font-size: 14px; font-weight: 500;">Metric Type</div>
                                <div style="width: 51%" class="d-flex justify-end align-center">
                                    <span style="font-size: 14px; font-weight: 500; margin-right: 12px;">Value</span>
                                    <v-select 
                                    v-model="selectedTimeRange"
                                    :items="timeRangeOptions"
                                    item-text="text"
                                    item-value="value"
                                    label="Plage de temps"
                                    @change="onTimeRangeChange"
                                    ></v-select>
                                </div>
                                </div>                    

                                <div v-for="(metric, index) in myChartData" :key="index">
                                <div class="metric-item">
                                    <div class="metric-info">
                                    <div class="metric-name">{{ metric.name }}</div>
                                    
                                    </div>
                                    
                                    <div class="pl-10 pr-10 pt-2" style="height:350px">
                                       <LineChart
                                        :data="metric.data"
                                        :label="metric.name" :id="`chart_${index}`"
                                        />
                                

                                        
                                     </div>
                                </div>
                                </div>

                       
                        </v-tab-item>

                        

                  

                  
                                                
                    <!-- TAB ORGANS -->
                    <v-tab-item>
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 49%">Organ Name</div>
                            <div style="width: 50%">Type</div>
                        </div>

                        <div v-for="item in this.organ" :key="item.id">
                            <div class="d-flex mb-2 pl-1 pr-1">
                                <div style="width: 100%" class="content-list rounded-l-lg pl-10">
                                    {{ item.name }}
                                </div>
                                <div style="width: 100%" class="content-list">
                                    {{ item.type }}
                                </div>
                                <div class="content-list rounded-r-lg hover">
                                    <button class="pr-2" style="height: 100%" @click="displayOrgan(item)">
                                        <v-icon>mdi-arrow-right</v-icon>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </v-tab-item>

                    <!-- TAB PROCESSES -->
                    <v-tab-item>
                        <div class="d-flex justify-space-between align-center mb-2 mt-4">
                            <div>
                                <h4>{{ processList.length }} processus détectés</h4>
                                <p v-if="lastUpdate" class="text-sm text-muted">
                                    Dernière mise à jour: {{ formatDate(lastUpdate) }}
                                </p>
                            </div>
                        </div>
                        
                        <div class="d-flex mb-2 mt-4 ml-1">
                            <div style="width: 15%">Nom du Processus</div>
                            <div style="width: 8%">Process ID</div>
                            <div style="width: 6%">PM2 ID</div>
                            <div style="width: 20%">Path</div>
                            <div style="width: 8%">Restarts</div>
                            <div style="width: 8%">Memory</div>
                            <div style="width: 8%">CPU</div>
                            <div style="width: 8%">Uptime</div>
                            <div style="width: 10%">Statut</div>
                            <div style="width: 9%">Actions</div>
                        </div>

                        <div v-for="process in processList" :key="process.id">
                            <div class="d-flex mb-2 pl-1 pr-1 align-center" :class="{ 'process-restarting': process.restarting }">
                                <div style="width: 15%" class="content-list rounded-l-lg pl-10" :title="process.alias">
                                    {{ process.name }}
                                    <span v-if="process.restarting" class="ml-2 text-orange">(En cours de redémarrage...)</span>
                                </div>
                                <div style="width: 8%" class="content-list text-center">
                                    {{ process.processId }}
                                </div>
                                <div style="width: 6%" class="content-list text-center">
                                    {{ process.pm2_id }}
                                </div>
                                <div style="width: 20%" class="content-list text-center" :title="process.path">
                                    {{ process.path.length > 30 ? '...' + process.path.slice(-30) : process.path }}
                                </div>
                                <div style="width: 8%" class="content-list text-center">
                                    {{ process.restartCount }}
                                </div>
                                <div style="width: 8%" class="content-list text-center">
                                    {{ formatMemory(process.memory) }}
                                </div>
                                <div style="width: 8%" class="content-list text-center">
                                    {{ process.cpu }}%
                                </div>
                                <div style="width: 8%" class="content-list text-center">
                                    {{ formatUptime(process.uptime) }}
                                </div>
                                <div style="width: 10%" class="content-list d-flex align-center justify-center">
                                    <div 
                                        class="status-light"
                                        :class="process.isOnline ? 'green--lighten-1' : 'red--lighten-1'"
                                        :style="{
                                            backgroundColor: process.isOnline ? '#4CAF50' : '#F44336',
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            marginRight: '8px'
                                        }"
                                    ></div>
                                    <span class="status-text">
                                        {{ process.restarting ? 'RESTARTING' : (process.isOnline ? 'ONLINE' : 'OFFLINE') }}
                                    </span>
                                </div>
                                <div style="width: 9%" class="content-list rounded-r-lg d-flex justify-center">
                                    <v-btn
                                        color="orange"
                                        small
                                        @click="restartProcess(process.id)"
                                        :disabled="!process.isOnline || process.restarting"
                                        :loading="process.restarting"
                                    >
                                        <v-icon left small>mdi-restart</v-icon>
                                        {{ process.restarting ? 'Restart...' : 'Restart' }}
                                    </v-btn>
                                </div>
                            </div>
                        </div>

                        <!-- Message si aucun processus -->
                        <div v-if="processList.length === 0" class="text-center mt-4">
                            <span class="text-muted">Aucun processus trouvé</span>
                        </div>
                    </v-tab-item>
                  
                                                
                </Tabs>
            </BackupInformation>

            <div v-if="show" class="popup_platform">
                <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                    <div @click="show = false" class="popup-closebtn">
                        <span>X</span>
                    </div>
                    <p class="mb-6">EDIT SERVER</p>
                    <InputUser v-model="formServer.name" title="SERVER NAME" id="userName" />
                    <span class="errors" v-if="$v.formServer.name.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.type" title="SERVER TYPE" id="type" />
                    <span class="errors" v-if="$v.formServer.type.$error"> Server Type is required</span>
                    <InputUser v-model="formServer.ipAdress" title="SERVER IP ADDRESS" id="userName" />
                    <span class="errors" v-if="$v.formServer.ipAdress.$error"> Server IP is required</span>
                    <InputUser v-model="formServer.macAdress" title="SERVER MAC ADRESS" id="userName" />
                    <span class="errors" v-if="$v.formServer.macAdress.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.sshLogin" title="SERVER ssh login" id="userName" />
                    <span class="errors" v-if="$v.formServer.sshLogin.$error"> Server Name is required</span>
                    <InputUser v-model="formServer.sshPassword" title="SERVER ssh password" id="userName" />
                    <span class="errors" v-if="$v.formServer.sshPassword.$error"> Server ssh password is required</span>
                    <!-- <InputUser title="  CUSTOMER SERVICE" id="userName" /> -->
                    <div @click="editUserPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                        <span>EDIT</span>
                    </div>
                    <div @click="show = false" class="mt-4 ml-1 popup-btn-fermer">
                        <span>CLOSE</span>
                    </div>
                </v-card>
            </div>
        </v-main>

        <!-- MODALE ADD Organ -->
        <div v-if="showOrgan" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="showOrgan = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD ORGAN</p>
                <InputUser v-model="formOrgan.name" title="PLATFORM NAME" id="userName" />
                <span class="errors" v-if="$v.formOrgan.name.$error"> Organ Name is required</span>
                <div @click="addOrgan()" class="mt-4 ml-1 popup-btn-ajouter">
                    <span>ADD</span>
                </div>
                <div @click="showOrgan = false" class="mt-4 ml-1 popup-btn-fermer">
                    <span>CLOSE</span>
                </div>
            </v-card>
        </div>

        <!-- MODALE ADD PLATFORM -->
        <div v-if="showplatform" class="popup_platform">
            <v-card class="popup" style="padding-bottom: 100px;padding-left: 20px; padding-right:20px ;">
                <div @click="showplatform = false" class="popup-closebtn">
                    <span>X</span>
                </div>
                <p class="mb-6">ADD PLATFORM</p>
                <InputUser v-model="formPlatform.name" title="PLATFORM NAME" id="userName" />
                <span class="errors" v-if="$v.formPlatform.name.$error"> Customer Name is required</span>
                <div @click="addPlatform()" class="mt-4 ml-1 popup-btn-ajouter">
                    <span>ADD</span>
                </div>
                <div @click="showplatform = false" class="mt-4 ml-1 popup-btn-fermer">
                    <span>CLOSE</span>
                </div>
            </v-card>
        </div>


    </v-app>
</template>
  
<script>
import LineChart from "../Components/LineChart.vue";
import InputUser from "../Components/InputUser";
import InformationBar from "../Components/InformationBar.vue";
import BackupInformation from "../Components/BackupInformation.vue";
import BlueButton from "../Components/BlueButton.vue";
import Tabs from "../Components/Tabs.vue";
import FiltreBar from "../Components/FiltreBar.vue";
import SelectUser from "../Components/SelectUser.vue";
import { mapActions, mapGetters } from "vuex";
import { mapState } from "vuex";
import {instanceAxios, instanceAxiosProcess} from "../services/axiosConfig.js";


import InputPass from "../Components/InputPassword.vue"
import { validationMixin } from "vuelidate";
import { required, email, minLength, numeric } from "vuelidate/lib/validators";

//import { SpinalGraphService } from 'spinal-env-viewer-graph-service';

import io from 'socket.io-client';

// Connecter au serveur de processus via WebSocket
const socket = io('http://146.59.157.197:5053/servers');
const processSocket = io('http://146.59.157.197:5053');




export default {
    name: "App",
    components: {
        InformationBar,
        BackupInformation,
        Tabs,
        FiltreBar,
        SelectUser,
        BlueButton,
        LineChart,
        InputPass,
        InputUser
    },
    



    data() {
        return {
            myChartData: [],
            searchQuery: '',
            formOrgan: { name: null },
            formPlatform: { name: null },
            formServer: {
                type: null,
                name: null,
                ipAdress: null,
                macAdress: null,
                sshLogin: null,
                sshPassword: null
            },
            
            metrics: [],
            
            // ✅ AJOUTER CES PROPRIÉTÉS MANQUANTES
            selectedTimeRange: '1d',
            timeRangeOptions: [
                { text: '24 heures', value: '1d' },
                { text: '7 jours', value: '1w' },
                { text: '30 jours', value: '1m' }
            ],
            serverId: null,
            
            show: false,
            items: ['PLATFORMS', 'METRICS', 'ORGANS', 'PROCESSES'],
            processList: [],
            serverList: [],
            metriquesList: [],
            metricsData: [],
            server: {
                id: null,
                name: '',
                type: '',
                ipAdress: '',
                macAdress: '',
                last_health_time: '',
                sshPassword: '',
                organList: [],      // ✅ IMPORTANT
                platformList: []    // ✅ IMPORTANT
            },
            showAdd: false,
            showOrgan: false,
            showplatform: false,
            metricHistories: {},
            lastUpdate: null,
            
            // ... reste de tes propriétés existantes
        };
    },
    validations: {
        formServer: {
            name: {
                required,
            },
            type: {
                required,
            },
            ipAdress: {
                required,
            },
            macAdress: {
                required,
            },
            sshLogin: {
                required,
            },
            sshPassword: {
                required,
            },
        },
        formOrgan: {
            name: {
                required,
            },
        },
        formPlatform: {
            name: {
                required,
            },
        },

    },
    

    
    

    computed: {
        ...mapState(['CurrentServer']),
        ...mapState(['ServerList']),
        ...mapState(['MetriquesList']),

        // ✅ AJOUTER CES COMPUTED PROPERTIES
        platform() {
            return this.server && this.server.platformList ? this.server.platformList : [];
        },
        
        organ() {
            return this.server && this.server.organList ? this.server.organList : [];
        },

        // ... tes autres computed existants
        isMachineOn() {
            const now = new Date();
            const histories = this.metricHistories;
            console.log('[isMachineOn] now:', now.toISOString());

            function parseDateFr(dateStr) {
                if (!dateStr) return new Date('');
                // Remplace la virgule et espace par un espace simple
                dateStr = dateStr.replace(',', '').replace(/\s+/, ' ');
                const [d, m, yAndTime] = dateStr.split('/');
                if (!d || !m || !yAndTime) return new Date('');
                const [y, time] = yAndTime.trim().split(' ');
                if (!y || !time) return new Date('');
                return new Date(`${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${time}`);
            }

            for (const key in histories) {
                const serie = histories[key];
                if (Array.isArray(serie) && serie.length > 0) {
                    console.log(`[isMachineOn] key=${key}, toutes les dates:`, serie.map(item => item.time));
                    const mapped = serie.map(item => ({
                        ...item,
                        date: item.time ? new Date(item.time) : new Date('')
                    }));
                    console.log(`[isMachineOn] key=${key}, mapped:`, mapped.map(x => x.date.toISOString()));
                    const filtered = mapped.filter(item => item.date <= now);
                    console.log(`[isMachineOn] key=${key}, filtered:`, filtered.map(x => x.date.toISOString()));
                    const lastValid = filtered.sort((a, b) => b.date - a.date)[0];

                    if (lastValid) {
                        const diff = (now - lastValid.date) / 1000 / 60; // minutes
                        console.log(`[isMachineOn] key=${key}, lastValid=${lastValid.date.toISOString()}, diff=${diff}`);
                        if (diff < 3) {
                            console.log('[isMachineOn] VM ON');
                            return true;
                        }
                    } else {
                        console.log(`[isMachineOn] key=${key}, aucune donnée passée trouvée`);
                    }
                } else {
                    console.log(`[isMachineOn] key=${key}, pas de données`);
                }
            }
            console.log('[isMachineOn] VM OFF');
            return false;
        },
        filteredOrganList() {
            return this.organ.filter(item => {
                const searchStr = this.searchQuery.toLowerCase();
                return Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchStr)
                );
            });

            },
            formattedLastUpdate() {
            return this.lastUpdate ? new Date(this.lastUpdate).toLocaleString() : 'N/A'
            }

},

    watch: {    
        ServerList(newList) {
            console.log('[WATCH] ServerList updated:', newList);
            this.serverList = newList;
            
            // Trouve le serveur correspondant
            const foundServer = newList.find(server => server.id === this.$route.query.id);
            
            if (foundServer) {
                console.log('[WATCH] Serveur trouvé:', foundServer);
                this.server = foundServer;
                
                // Si l'adresse MAC est maintenant disponible, charge les processus
                if (this.server.macAdress && this.server.macAdress !== 'unknown') {
                    console.log('[WATCH] Adresse MAC disponible, chargement des processus...');
                    this.fetchProcessList();
                }
            }
        },
        MetriquesList(newList) {
            console.warn('metriquesList', newList);
            
            this.metricsData = newList;
           
        },
        metricHistories: {
            handler(newVal) {
              console.log('[WATCH] metricHistories updated:', JSON.parse(JSON.stringify(newVal)));
              // Ceci force la réévaluation de tous les computed dépendants, dont isMachineOn
              // Tu peux aussi forcer une action ici si besoin
              // Exemple :
              if (this.isMachineOn) {
                console.log('[WATCH] La VM est ON');
              } else {
                console.log('[WATCH] La VM est OFF');
              }
            },
            deep: true,
            immediate: true
          },
        

        
    },

    created() {

    },

    mounted() {
        console.log('[MOUNTED] Début du mounted()');
        
        // ✅ AJOUTER CETTE LIGNE
        this.serverId = this.$route.query.id;
        
        this.loadMetrics();
        
        const promises = [
            this.$store.dispatch('getServerList').catch(error => {
                console.error('[MOUNTED] Erreur getServerList:', error);
                return [];
            }),
            this.$store.dispatch('getMetriquesList', { serverId: this.$route.query.id }).catch(error => {
                console.error('[MOUNTED] Erreur getMetriquesList:', error);
                return [];
            })
        ];

        Promise.all(promises)
            .then(async () => {
                console.log('[MOUNTED] Promises résolues');
                console.log('[MOUNTED] ServerList reçu:', this.ServerList);
                
                // Vérification si pas de serveurs
                if (!this.ServerList || this.ServerList.length === 0) {
                    console.warn('[MOUNTED] Aucun serveur, redirection vers /servers');
                    this.$router.push('/servers');
                    return;
                }
                
                await this.$nextTick();
                
                const foundServer = this.ServerList.find(s => s.id === this.$route.query.id);
                console.log('[MOUNTED] Serveur trouvé:', foundServer);
                
                if (foundServer) {
                    this.server = foundServer;
                    console.log('[MOUNTED] Server assigné:', this.server);
                    
                    if (this.server.macAdress && this.server.macAdress !== 'unknown') {
                        console.log('[MOUNTED] Adresse MAC valide, chargement des données...');
                        
                        this.metrics = this.metricsData;
                        await this.fetchMetricHistory(this.selectedTimeRange);
                        this.myChartData = this.formatData(this.metricHistories);
                        
                        // Charge les processus avec gestion d'erreur
                        console.log('[MOUNTED] Chargement des processus...');
                        await this.fetchProcessList();
                    } else {
                        console.warn('[MOUNTED] Adresse MAC non disponible:', this.server.macAdress);
                    }
                } else {
                    console.error('[MOUNTED] Serveur non trouvé avec ID:', this.$route.query.id);
                    this.$router.push('/servers');
                }
            })
            .catch(error => {
                console.error("[MOUNTED] Erreur finale:", error);
                this.$router.push('/servers');
            });

        this.refreshInterval = setInterval(() => {
            if (this.ServerList && Array.isArray(this.ServerList) && this.ServerList.length > 0) {
                this.refreshServerData();
            }
        }, 30000);

        // Écouter les mises à jour temps réel des processus
        if (socket) {
            socket.on('process-list-updated', (data) => {
                console.log('[REALTIME] Mise à jour processus reçue:', data);
                
                if (data.serverID === this.server.macAdress) {
                    console.log(`[REALTIME] ${data.processCount} processus mis à jour pour ${data.serverID}`);
                    console.log('[REALTIME] Source:', data.source);
                    
                    // Mettre à jour la liste des processus automatiquement
                    this.processList = data.processes.map((proc, index) => ({
                        id: proc.pid || proc.pm2_id || `process_${index}`, // ID unique basé sur PID
                        name: proc.name || proc.alias || 'N/A',
                        processId: proc.pid || 'N/A',
                        pm2_id: proc.pm2_id || proc.id || 'N/A',
                        path: proc.path || 'N/A',
                        restartCount: proc.restarts || 0,
                        isOnline: proc.status === 'online',
                        memory: proc.memory || 0,
                        cpu: proc.cpu || 0,
                        uptime: proc.uptime || 0,
                        alias: proc.alias || proc.name
                    }));
                    
                    this.lastUpdate = data.lastUpdate || new Date();
                    console.log(`[REALTIME] Interface mise à jour avec ${this.processList.length} processus`);
                }
            });
        }

        // ✅ ÉCOUTER les événements du processSocket
        if (processSocket) {
            processSocket.on('connect', () => {
                console.log('[WEBSOCKET] Connecté au serveur de processus');
                console.log('[WEBSOCKET] ID de connexion:', processSocket.id);
            });

            processSocket.on('disconnect', () => {
                console.log('[WEBSOCKET] Déconnecté du serveur de processus');
            });

            processSocket.on('error', (error) => {
                console.error('[WEBSOCKET] Erreur de connexion:', error);
            });

            // Écouter tous les événements pour debugging
            if (processSocket.onAny) {
                processSocket.onAny((event, ...args) => {
                    console.log(`[WEBSOCKET] Événement reçu: ${event}`, args);
                });
            }

            // Tester la connexion
            if (!processSocket.connected) {
                console.log('[WEBSOCKET] Tentative de connexion...');
                processSocket.connect();
            } else {
                console.log('[WEBSOCKET] Déjà connecté');
            }
        }
    },
    
    beforeDestroy() {
        // Nettoie l'interval
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
        
        // Nettoyer les listeners Socket.IO
        if (socket) {
            socket.off('process-list-updated');
        }
        
        // Nettoyer les listeners du processSocket
        if (processSocket) {
            processSocket.off('action-result');
            processSocket.disconnect();
        }
    },

    methods: {

        formatData(metricHistories) {
            const names = {
                cpuUsage: 'CPU Usage (%)',
                ramUsage: 'RAM Usage (%)',
                totalRam: 'Total RAM (GB)',
                freeRam: 'Free RAM (GB)',
                totalDisk: 'Total Disk (GB)',
                freeDisk: 'Free Disk (GB)',
                diskUsage: 'Disk Usage (%)'
            };
            const d = []
            console.log("formatData called with metricHistories:", metricHistories);

            for (const key in metricHistories) {
                if (Object.prototype.hasOwnProperty.call(metricHistories, key)) {
                    const value = metricHistories[key];
                    d.push({
                        calc: key,
                        name: names[key],
                        value,
                        data : metricHistories[key].map(item => item.value)
                    });
                }
            }

            return d;
            
        },

     //CHANGE ROUTE
        restartServer() {
           console.log("Redémarrage du serveur...");
        },
        displayDetail(item) {
            // Utilise item.id au lieu de juste item
            this.$router.push({ name: "DetailPlatform", query: { id: item.id } });
        },
        displayOrgan(item) {
            // Utilise item.id au lieu de juste item
            this.$router.push({ name: "DetailOrgan", query: { id: item.id } });
        },


        // VALIDE ELEMENT
        editUserPlatform() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                console.log('valid form');
            }
        },
        addOrgan() {
            this.$v.formOrgan.$touch();
            if (!this.$v.formOrgan.$invalid) {
                console.log('valid form');

            }
        },
        onTimeRangeChange() {
    this.fetchMetricHistory(this.selectedTimeRange);
    this.myChartData = this.formatData(this.metricHistories);
    },

        
        addPlatform() {
            this.$v.formPlatform.$touch();
            if (!this.$v.formPlatform.$invalid) {
                console.log('valid form');
            }
        },


        //DELETE ELEMENT
        deletebtn() {
            const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet organe ?");
            if (confirmed) {
                this.$store.dispatch('deleteServers', {
                    serverId: this.$route.query.id,
                });
                this.$router.push("servers");
        }

        },

        

    async loadMetrics() {
      try {
        //const endpoints = await SpinalGraphService.getChildren(server.id, 'hasBmsEndpoint');
       // vérifie qu’il y a bien des enfants

        const response = await instanceAxios.get(`/servers/${this.serverId}/pushDataServer`);
        const data = response.data;
        console.log("Données des métriques :", data);
        
        // Assure que chaque valeur est bien définie ou vide (pas de `?` ni `??`)
        this.metrics = [
          { type: "CPU Usage", value: (data.cpuUsage !== undefined ? data.cpuUsage : "N/A") },
          { type: "RAM Usage", value: (data.ramUsage !== undefined ? data.ramUsage : "N/A") },
          { type: "Total RAM", value: (data.totalRam !== undefined ? data.totalRam : "N/A") },
          { type: "Free RAM", value: (data.freeRam !== undefined ? data.freeRam : "N/A") },
          { type: "Total Disk", value: (data.totalDisk !== undefined ? data.totalDisk : "N/A") },
          { type: "Free Disk", value: (data.freeDisk !== undefined ? data.freeDisk : "N/A") },
          { type: "Disk Usage", value: (data.diskUsage !== undefined ? data.diskUsage : "N/A") }
        ];


      // Appel à l'historique après le chargement réussi
      await this.fetchMetricHistory(this.selectedTimeRange);
      } catch (error) {
        console.error("Erreur lors de la récupération des métriques :", error);
        this.metrics = [];
      }
    },

   

     async fetchMetricHistory(range, metricType) {
        range = ['1d', '1w', '1m'].includes(range) ? range : '1d';
        metricType = [
            'diskUsage',
            'cpuUsage',
            'ramUsage',
            'totalRam',
            'freeRam',
            'totalDisk',
            'freeDisk'
        ];
        
        for (const metric of metricType) {
            try {
                console.log(`[HISTORY] Chargement ${metric} pour ${range}`);
                const response = await instanceAxios.get(
                    `http://146.59.157.197:5051/metrics/${this.server.id}/${metric}?range=${range}&mac_adress=${this.server.macAdress}`
                );
                console.log('[HISTORY] Réponse API:', response.data);
                const historyData = response.data.labels.map((label, index) => ({
                    time: label,
                    value: response.data.values[index]
                }));
                this.$set(this.metricHistories, metric, historyData);
            } catch (error) {
                console.error(`[HISTORY] Erreur ${metric}:`, error); // <- maintenant 'metric' est défini
            }
        }
    },

    async loadAllHistories(range) {
  const metricsToLoad = [
    'diskUsage',
    'cpuUsage',
    'ramUsage',
    'totalRam',
    'freeRam',
    'totalDisk',
    'freeDisk'
  ];

  // Chargement en parallèle
  await Promise.all(
    metricsToLoad.map(metric => 
      this.fetchMetricHistory(range, metric)
    )
  );
},

    getChartData(metricHistories, calcType, metricName) {
  const labels = metricHistories.labels || [];
  const data = ((metricHistories.metrics || []).find(m => m.name === metricName) || {}).values || [];


  return {
    labels,
    datasets: [
      {
        label: metricName,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data,
        fill: false,
        tension: 0.1
      }
    ]
  };
},
async restartProcess(processId) {
    try {
        console.log(`[RESTART] Redémarrage du processus ID: ${processId}`);
        console.log(`[RESTART] État WebSocket avant restart: ${processSocket.connected ? 'connecté' : 'déconnecté'}`);
        
        const process = this.processList.find(p => p.id === processId);
        if (!process) {
            console.error('[RESTART] Processus non trouvé avec ID:', processId);
            console.log('[RESTART] Liste des processus disponibles:', this.processList.map(p => ({ id: p.id, name: p.name })));
            return;
        }

        console.log('[RESTART] Processus trouvé:', {
            id: process.id,
            name: process.name,
            pid: process.processId,
            pm2_id: process.pm2_id
        });

        // Vérifier la connexion WebSocket
        if (!processSocket.connected) {
            console.error('[RESTART] WebSocket non connecté, tentative de reconnexion...');
            processSocket.connect();
            
            // Attendre la connexion
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error('Connexion WebSocket échouée')), 5000);
                processSocket.once('connect', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });
        }

        this.$set(process, 'restarting', true);

        // Envoyer la commande via WebSocket
        const requestData = {
            macAddress: this.server.macAdress,
            processId: process.processId || process.pm2_id,
            processName: process.name,
            pm2_id: process.pm2_id,
            serverId: this.server.id
        };

        console.log('[RESTART] Données envoyées via WebSocket:', requestData);
        console.log(`[RESTART] Envoi sur processSocket connecté: ${processSocket.connected}`);
        
        processSocket.emit('restart-process', requestData);

        // ✅ ÉCOUTER la réponse avec l'ID du processus
        let result;
        try {
            result = await this.waitForRestartResult(process.pm2_id || process.processId);
        } catch (timeoutError) {
            console.warn('[RESTART] WebSocket timeout, tentative fallback HTTP...');
            
            // Fallback HTTP en cas d'échec WebSocket
            try {
                const response = await instanceAxiosProcess.post('/restart-process', {
                    macAddress: this.server.macAdress,
                    processId: process.processId || process.pm2_id,
                    pm2_id: process.pm2_id
                }, {
                    timeout: 15000
                });
                
                result = { 
                    success: response.data.success, 
                    message: response.data.message || 'Redémarrage via HTTP réussi' 
                };
                console.log('[RESTART] Fallback HTTP réussi:', result);
            } catch (httpError) {
                console.error('[RESTART] Fallback HTTP échoué:', httpError);
                throw new Error('WebSocket et HTTP ont échoué: ' + timeoutError.message);
            }
        }
        
        console.log('[RESTART] Résultat reçu:', result);
        
        if (result.success) {
            console.log('[RESTART] Processus redémarré avec succès');
            if (result.newRestartCount !== undefined) {
                process.restartCount = result.newRestartCount;
            } else {
                process.restartCount++;
            }
            
            // Simuler le redémarrage
            process.isOnline = false;
            setTimeout(() => {
                process.isOnline = true;
                console.log(`[RESTART] Processus ${process.name} est de nouveau en ligne`);
            }, 3000);
        } else {
            throw new Error(result.message || 'Restart failed');
        }

    } catch (error) {
        console.error('[RESTART] Erreur lors du redémarrage du processus:', error);
        console.error('[RESTART] Stack trace:', error.stack);
        
        let errorMessage = 'Erreur lors du redémarrage du processus';
        if (error.message.includes('Timeout')) {
            errorMessage = 'Le serveur n\'a pas répondu dans les temps. Vérifiez la connexion WebSocket.';
        } else if (error.message.includes('Connexion WebSocket échouée')) {
            errorMessage = 'Impossible de se connecter au serveur WebSocket.';
        }
        
        alert(errorMessage + '\n\nDétails: ' + error.message);
    } finally {
        const process = this.processList.find(p => p.id === processId);
        if (process) {
            this.$set(process, 'restarting', false);
        }
    }
},

// ✅ MÉTHODE pour attendre le résultat du redémarrage
waitForRestartResult(processId) {
    return new Promise((resolve) => {
        console.log(`[RESTART] Attente de la réponse pour processId: ${processId}`);
        console.log(`[RESTART] État de la connexion WebSocket: ${processSocket.connected ? 'connecté' : 'déconnecté'}`);
        
        const timeout = setTimeout(() => {
            console.warn(`[RESTART] Timeout après 30 secondes pour le processus ${processId}`);
            console.log(`[RESTART] État final WebSocket: ${processSocket.connected ? 'connecté' : 'déconnecté'}`);
            processSocket.off('action-result'); // Nettoyer le listener
            resolve({ success: false, message: 'Timeout après 30 secondes - Le serveur n\'a pas répondu' });
        }, 30000);

        // Écouter TOUS les événements action-result pour debugging
        const resultHandler = (data) => {
            console.log('[RESTART] Réponse WebSocket reçue:', data);
            console.log(`[RESTART] Comparaison IDs - Attendu: ${processId}, Reçu: ${data.targetId || data.processId || data.id}`);
            
            // Essayer plusieurs champs pour l'ID
            const receivedId = data.targetId || data.processId || data.id || data.pm2_id;
            
            if (receivedId == processId || data.targetId == processId) {
                console.log('[RESTART] ID correspond, résolution du Promise');
                clearTimeout(timeout);
                processSocket.off('action-result', resultHandler);
                resolve(data);
            } else {
                console.log(`[RESTART] ID ne correspond pas, en attente... (${receivedId} != ${processId})`);
            }
        };

        processSocket.on('action-result', resultHandler);
        
        // Ajouter un listener pour détecter les autres événements
        const debugHandler = (eventName) => {
            processSocket.onAny((event, ...args) => {
                if (event !== 'action-result') {
                    console.log(`[RESTART] Autre événement WebSocket reçu: ${event}`, args);
                }
            });
        };
        
        if (processSocket.onAny) {
            debugHandler();
        }
    });
},

    async fetchProcessList() {
        console.log('[FETCHPROCESSLIST] Version avec support temps réel');
        
        if (!this.server || !this.server.macAdress || this.server.macAdress === 'unknown') {
            console.warn('[FETCHPROCESSLIST] MAC non disponible');
            this.processList = [];
            return;
        }

        const macAddress = this.server.macAdress;
        console.log('[FETCHPROCESSLIST] MAC Address:', macAddress);

        try {
            // ESSAIE D'ABORD LA NOUVELLE API /api/processes/ (RECOMMANDÉ car données temps réel)
            console.log('[FETCHPROCESSLIST] Tentative nouvelle API /api/processes/...');
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            const response = await fetch(`http://146.59.157.197:5053/api/processes/${macAddress}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                console.log('[FETCHPROCESSLIST] Réponse nouvelle API:', data);
                
                if (data.success && data.processes) {
                    // Les processus viennent maintenant de l'événement process-list
                    this.processList = data.processes.map((proc, index) => ({
                        id: proc.pid || proc.pm2_id || `process_${index}`, // ID unique basé sur PID
                        name: proc.name || proc.alias || 'N/A',
                        processId: proc.pid || 'N/A',
                        pm2_id: proc.pm2_id || proc.id || 'N/A',
                        path: proc.path || 'N/A',
                        restartCount: proc.restarts || 0,
                        isOnline: proc.status === 'online',
                        memory: proc.memory || 0,
                        cpu: proc.cpu || 0,
                        uptime: proc.uptime || 0,
                        alias: proc.alias || proc.name
                    }));
                    
                    console.log(`[FETCHPROCESSLIST] ${this.processList.length} processus chargés (nouvelle API)`);
                    console.log('[FETCHPROCESSLIST] Source des données:', data.source || 'API');
                    console.log('[FETCHPROCESSLIST] Dernière mise à jour:', data.lastUpdate);
                    this.lastUpdate = data.lastUpdate || new Date();
                    return;
                }
            }
        } catch (error) {
            console.warn('[FETCHPROCESSLIST] Nouvelle API échouée, tentative ancienne API...');
        }

        // FALLBACK: Essai de l'ancienne API au cas où
        try {
            console.log('[FETCHPROCESSLIST] Tentative ancienne API...');
            
            const response = await fetch(`http://146.59.157.197:5053/process-list/${macAddress}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('[FETCHPROCESSLIST] Réponse ancienne API:', data);
                
                const processes = Array.isArray(data) ? data : (data.processes || []);
                
                this.processList = processes.map((proc, index) => ({
                    id: proc.pid || proc.pm2_id || `process_${index}`, // ID unique basé sur PID
                    name: proc.name || proc.alias || 'N/A',
                    processId: proc.pid || 'N/A',
                    pm2_id: proc.pm2_id || proc.id || 'N/A',
                    path: proc.path || 'N/A',
                    restartCount: proc.restarts || 0,
                    isOnline: proc.status === 'online',
                    memory: proc.memory || 0,
                    cpu: proc.cpu || 0,
                    uptime: proc.uptime || 0,
                    alias: proc.alias || proc.name
                }));
                
                console.log(`[FETCHPROCESSLIST] ${this.processList.length} processus chargés (ancienne API)`);
                this.lastUpdate = new Date();
                return;
            }
        } catch (error) {
            console.error('[FETCHPROCESSLIST] Toutes les APIs ont échoué:', error);
        }
        
        // Si tout échoue, liste vide
        console.warn('[FETCHPROCESSLIST] Tous les endpoints ont échoué, liste vide');
        this.processList = [];
    },
    async refreshServerData() {
        try {
            console.log('[REFRESH] Actualisation des données du serveur...');
            
            // Recharge la liste des serveurs depuis l'API
            await this.$store.dispatch('getServerList');
            
            // Trouve le serveur mis à jour
            const foundServer = this.ServerList.find(s => s.id === this.$route.query.id);
            
            if (foundServer) {
                const oldMacAddress = this.server.macAdress;
                this.server = foundServer;
                
                console.log('[REFRESH] Ancienne MAC:', oldMacAddress);
                console.log('[REFRESH] Nouvelle MAC:', this.server.macAdress);
                
                // Si l'adresse MAC a changé, recharge les processus
                if (oldMacAddress !== this.server.macAdress) {
                    console.log('[REFRESH] Adresse MAC modifiée, rechargement des processus...');
                    await this.fetchProcessList();
                }
            }
        } catch (error) {
            console.error('[REFRESH] Erreur lors de l\'actualisation:', error);
        }
    },

    // Méthodes utilitaires pour l'affichage des processus
    formatMemory(memory) {
        if (!memory) return '0 MB';
        return `${(memory / 1024 / 1024).toFixed(1)} MB`;
    },

    formatUptime(uptime) {
        if (!uptime) return '0s';
        const seconds = Math.floor(uptime / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days}j ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    },

    formatDate(date) {
        if (!date) return 'N/A';
        return new Date(date).toLocaleString('fr-FR');
    }
}

}
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

*:focus {
    outline: none;
}

/* Conteneur principal des métriques */
.metric-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    padding: 16px;
}

.metric-item {
    border: 1px solid #e1e5e9;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 24px;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.metric-item:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
}

/* En-tête du graphique */
.metric-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    background-color: #f8fafc;
    border-radius: 12px 12px 0 0;
    font-family: 'Inter', sans-serif;
    font-size: 1.1em;
    font-weight: 600;
    color: #1a232b;
    margin-bottom: 16px;
}

.metric-name {
    font-weight: 700;
    font-size: 1.15em;
    color: #14202c;
    letter-spacing: 0.3px;
}

/* Conteneur du graphique */
.metric-chart-container {
    flex-grow: 1;
    position: relative;
    min-height: 500px;
    background: #fff;
    border-radius: 12px;
    padding: 8px;
}

/* Styles pour Chart.js */
.metric-chart,
canvas {
    font-family: inherit !important;
    font-size: inherit !important;
    color: inherit !important;
    font-weight: normal !important;
    text-shadow: none !important;
}

/* Axes et légendes */
.chartjs-render-monitor {
    font-family: inherit !important;
    font-size: inherit !important;
    color: inherit !important;
    font-weight: normal !important;
    text-shadow: none !important;
}

.chartjs-size-monitor,
.chartjs-size-monitor-expand,
.chartjs-size-monitor-shrink,
.chartjs-tick,
.chartjs-axis-tick,
.chartjs-tooltip,
.chartjs-legend,
.chartjs-axis-label {
    font-family: inherit !important;
    font-size: inherit !important;
    color: inherit !important;
    font-weight: normal !important;
    text-shadow: none !important;
}

.chartjs-tick {
    font-size: 25px !important;
}

/* Étiquettes des axes */
.chartjs-axis-label {
    font-family: 'Inter', sans-serif !important;
    font-size: 14px !important;
    color: #64748b !important;
    font-weight: 500 !important;
}

/* Graduations des axes */
.chartjs-tick {
    font-family: 'Roboto Mono', monospace !important;
    font-size: 14px !important;
    color: #475569 !important;
    font-weight: 500 !important;
}

/* Tooltips */
.chartjs-tooltip {
    font-family: 'Inter', sans-serif !important;
    font-size: 14px !important;
    background: rgba(20, 32, 44, 0.95) !important;
    color: #fff !important;
    border-radius: 6px !important;
    border: none !important;
    padding: 10px 16px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    backdrop-filter: blur(4px);
    pointer-events: none;
    z-index: 1000;
}

.chartjs-tooltip-key {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    margin-right: 8px;
}

/* Légende */
.chartjs-legend {
    font-family: 'Inter', sans-serif !important;
    font-size: 14px !important;
    padding: 16px 0 !important;
}

/* Animation */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.metric-chart {
    animation: fadeIn 0.6s ease-out;
}

/* Responsive */
@media (max-width: 768px) {
    .metric-container {
        grid-template-columns: 1fr;
    }
    
    .metric-item {
        padding: 16px;
        min-width: auto;
    }
    
    .metric-info {
        padding: 12px 16px;
        font-size: 1em;
    }
    
    .metric-name {
        font-size: 1.1em;
    }
    
    .chartjs-tick,
    .chartjs-axis-label,
    .chartjs-tooltip {
        font-size: 12px !important;
    }
}

/* Styles pour les données affichées sous le graphique */
.metric-data {
    margin-top: 16px;
    font-family: 'Roboto Mono', monospace;
    font-size: 14px;
    color: #475569;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
}

.metric-data-item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #e2e8f0;
}

.metric-data-item:last-child {
    border-bottom: none;
}

.metric-data-label {
    font-weight: 500;
    color: #64748b;
}

.metric-data-value {
    font-weight: 600;
    color: #14202c;
}

/* Ajout de styles pour les graphiques avec peu de données (comme dans votre capture) */
.empty-chart-message {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-family: 'Inter', sans-serif;
    color: #94a3b8;
    font-size: 16px;
    text-align: center;
    padding: 20px;
}

/* TITRES, textes, légendes, tooltips : sans-serif */
.metric-info,
.metric-name,
.chartjs-axis-label {
    font-family: 'Inter', Arial, sans-serif !important;
}

/* CHIFFRES, données, ticks, valeurs : monospace */
.chartjs-tick,
.metric-data,
.metric-data-item,
.metric-data-label,
.metric-data-value {
    font-family: 'Roboto Mono', 'Consolas', monospace !important;
}

/* Styles pour les processus en cours de redémarrage */
.process-restarting {
    background-color: #fff3cd !important;
    border-left: 4px solid #ff9800 !important;
    opacity: 0.8;
}

.text-orange {
    color: #ff9800 !important;
    font-size: 0.85em;
    font-style: italic;
}
</style>
