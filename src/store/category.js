import firebase from "firebase/app"

export default {
    actions: {
        async createCategory({dispatch , commit} , {title , limit} ){
            try{
                const uid = await dispatch('getUserId')
                const category = await firebase.database().ref(`/users/${uid}/categories`).push({
                    title ,
                    limit
                })

                return {
                    title ,
                    limit,
                    id: category.key
                }
            }catch (e) {
                throw e
            }
        } ,

        async fetchCategories({dispatch , commit}){
            
            try{
                const uid = await dispatch('getUserId')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
                return Object.keys(categories).map( key => ({ ...categories[key] , id : key}) )
            }catch(e){
                throw e
            }
        } ,

        async updateCategory({dispatch , commit} , {id , title , limit}){
            try{
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title , limit })
            }catch (e) {
                this.$error("setError" , e)
                throw e
            }
        } ,

        async getCategoryById({dispatch , commit} , id){
            try{
                const uid = await dispatch("getUserId")
                const category = ( await firebase.database().ref(`/users/${uid}/categories`).child(id).once("value") ).val() || {}
                return {
                    ...category,
                    id
                }
            }catch (e){
                commit('setError' , e)
                throw e
            }
        }
    }
}
