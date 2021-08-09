<template>
    <div>
        <Loader v-if="loading" />
        <div v-else  :key="$store.getters.info.location">

            <NavBar v-on:click="isOpen = !isOpen" />

            <SideBar v-model="isOpen" />

            <div class="app-main-layout">
                <main class="app-content" :class="{full : isOpen }">
                    <div class="app-page">
                        <router-view />
                    </div>
                </main>

                <div class="fixed-action-btn">
                    <router-link class="btn-floating btn-large blue" to="/record">
                        <i class="large material-icons">add</i>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'

export default {
    name : 'mai-layout',
    components:{
        SideBar , NavBar
    },
    data: () => ({
        isOpen : true,
        loading: true
    }) ,
    async mounted() {
        if (this.$store.getters.info){
           await this.$store.dispatch('getInfo') 
           this.loading = false
        }
        
    }
}
</script>
