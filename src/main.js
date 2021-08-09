import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import messagePlugin from './utils/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/date.filter.js'
import currencyFilter from './filters/currency.filter.js'
import localeFilter from './filters/localize.filter'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import Loader from './components/Loader'
import Paginate from 'vuejs-paginate'
import 'material-design-icons'


Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)

Vue.directive('tooltip' , tooltipDirective)

Vue.component("Loader",Loader)
Vue.component("Paginate" , Paginate)

Vue.filter('date' , dateFilter)
Vue.filter('currency' , currencyFilter)
Vue.filter('locale' , localeFilter)

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

