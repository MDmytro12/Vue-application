
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'

import 'materialize-css/dist/js/materialize.min'
// filters

import dateFilter from './filters/date.filter.js'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

import 'material-design-icons'


Vue.config.productionTip = false

Vue.filter('date' , dateFilter)
Vue.use(messagePlugin)
Vue.use(Vuelidate)

firebase.initializeApp({
    apiKey: "AIzaSyDBSNWAn7Ln7M_CJ4U_LU8f7FWp9--Y0I8",
    authDomain: "vue-app-own.firebaseapp.com",
    projectId: "vue-app-own",
    storageBucket: "vue-app-own.appspot.com",
    messagingSenderId: "527942904350",
    appId: "1:527942904350:web:2aad3ebc7e89eefd131c0f",
    measurementId: "G-QCEQVPRDQB"
  })

let app

firebase.auth().onAuthStateChanged( () => {
    if(!app){
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')}
} )

