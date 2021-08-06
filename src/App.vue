<template>
  <div>
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout.vue'
import MainLayout from './layouts/MainLayout.vue'

export default {
  computed: {
    layout(){
      return (this.$route.meta.layout || 'empty') + "-layout"
     }
  } ,
  components : {
    EmptyLayout , MainLayout
  }
}

</script>

<style  >
  @import "./assets/styles/index.css";
  @import "~materialize-css/dist/css/materialize.min.css";
</style>
