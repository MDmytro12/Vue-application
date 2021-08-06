<template>
    <div>

        <NavBar v-on:click="isOpen = !isOpen" />

        <SideBar v-model="isOpen" />

        <div class="app-main-layout">
            <main class="app-content" :class="{full : isOpen }">
                <div class="app-page">
                    <router-view />
                </div>
            </main>

            <div class="fixed-action-btn">
                <a class="btn-floating btn-large blue" href="#">
                    <i class="large material-icons">add</i>
                </a>
            </div>
        </div>
    </div>

</template>

<script>
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'

export default {
    name : 'main-layout',
    components:{
        SideBar , NavBar
    },
    data: () => ({
        isOpen : true
    })
}
</script>
