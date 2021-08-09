import localizeFilter from "../filters/localize.filter"

export default {
    install(Vue){
        Vue.prototype.$title = function (key) {
            return localizeFilter(key) + "  | CRM app!"
        }
    }
}
