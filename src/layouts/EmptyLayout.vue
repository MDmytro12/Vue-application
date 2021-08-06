<template>
    <div class="grey darken-1 empty-layout">
          <router-view/>
    </div>
</template>

<script>
import messages from '../utils/messages'

export default {
    naem: 'empty-layout',
    computed: {
        error(){
            return this.$store.getters.error
        }
    },
    watch:{
        error(fbError){
            this.$error(messages[fbError.code] ? messages[fbError.code] : 'Што-то пошло не так!')
        }
    }
}
</script>
