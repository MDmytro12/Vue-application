import store from '../store'
import uk from '../locales/uk.json'
import en from '../locales/en.json'

const locales = {
    'uk-UK' : uk ,
    'en-EN' : en    
}

export default function localizeFilter(key){
    try{
        const locale = store.getters.info.location.trim()
        return locales[locale][key] || "[Locale error] key " + key + " not found!"
    }catch (e){
        const locale = "uk-UK"
        return locales[locale][key] || "[Locale error] key " + key + " not found!"
    } 
}
