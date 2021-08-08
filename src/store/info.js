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
        },
        async updateInfo({dispatch , commit , getters} , newBill ){
            try{
                const uid = await dispatch('getUserId')
                const someData = {...getters.info , ...newBill} 
                await firebase.database().ref(`/users/${uid}/info`).update(someData)
                commit('setInfo' , someData)
            }catch (e) {
                commit('setError' , e )
                throw e
            }
            
        }
    } ,
    mutations:{  
        setInfo( state, newInfo ){
            state.info = newInfo
        }
    }
}
