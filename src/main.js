
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'

import 'materialize-css/dist/js/materialize.min'
// filters

import dateFilter from './filters/date.filter.js'

import 'material-design-icons'

Vue.config.productionTip = false

Vue.filter('date' , dateFilter)

Vue.use(Vuelidate)

new Vue({
    router,
    render: h => h(App)
}
).$mount('#app')
