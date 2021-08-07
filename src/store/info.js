import firebase from "firebase/app"

export default {
    state : {
        info : {}
    } ,
    getters: {
        info : s => s.info
    } ,
    actions : {
        async getInfo({dispatch , commit}) {
            const uid = await dispatch('getUserId')

            const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()

            commit('setInfo' , info )
        },
        clearInfo (state) {
            state.info = {}
        }
    } ,
    mutations:{  
        setInfo( state, newInfo ){
            state.info = newInfo
        }
    }
}
