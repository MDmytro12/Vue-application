import firebase from "firebase/app"

export default {
    actions:{
        async createRecord( {dispatch , commit} , record ){
            try{
                const uid = await dispatch('getUserId')
                return await firebase.database().ref(`/users/${uid}/records`).push(record)
            }catch(e){
                commit("setError" , e )
                throw e
            }
        } ,

        async getRecords({commit , dispatch}){
            try{
                const uid = await dispatch('getUserId')
                const records = ( await firebase.database().ref(`/users/${uid}/records`).once('value')).val()
                return Object.keys(records).map( i => ({...records[i] , id : i }) )
            }catch (e) {
                commit('setError' , e)
                throw e
            }
        } ,

        async getRecordById({dispatch , commit} , id){
            try{
                const uid = await dispatch('getUserId')
                const record = ( await firebase.database().ref(`/users/${uid}/records`).child(id).once('value') ).val()
                return {
                    ...record,
                    id
                }
            }catch (e) {
                commit('setError' , e)
                throw e
            }
        }
    }
}
