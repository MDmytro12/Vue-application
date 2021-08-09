import Vue from 'vue'
import Vuex from 'vuex'
import auth from  './auth'
import info from './info'
import category from './category'
import record from './record'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error : null
    },
    mutations: {
        setError(state , error){
            state.error = error
        },
        clearError(state){
            state.erro = null
        }
    },
    actions:{
        async getCurrencyInfo(){
            const key = process.env.VUE_APP_FIXER
            const rezult = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)

            return await rezult.json()
        } ,

        async updateName({dispatch , commit} , newInfo){
            try{
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).update({...newInfo})
                commit("setInfo" , newInfo )
            }catch (r){
                commit('setError' , e )
                throw e
            }
        }
    },
    getters:{
        error: s => s.error 
    },
    modules :{
        auth , info , category , record
    }
})
