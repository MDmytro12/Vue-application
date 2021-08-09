<template>
    <div>
  <div class="page-title">
    <h3>{{"Profile_title" | locale }}</h3>
  </div>

  <form class="form" @submit.prevent="onSubmitHandler">
    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid : $v.name.$dirty && !$v.name.required}"
      >
      <label for="description">{{"Profile_userName" | locale }}</label>
      <span
        class="helper-text invalid" 
        v-if="$v.name.$dirty && !$v.name.required"    
      >{{"Profile_inputUserName" | locale}}</span>
    </div>

    <div class="switch" style="padding-bottom: 30px;">
        <label>
          English
          <input type="checkbox" v-model="isUK">
          <span class="lever"></span>
          Українська мова
        </label>
      </div>

    <button class="btn waves-effect waves-light" type="submit">
      {{'Profile_update' | locale}}
      <i class="material-icons right">send</i>
    </button>
  </form>

  

</div>

</template>

<script>
import {mapGetters} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
  name: 'profile',
  data: () => ({
    name : '' ,
    isUK: true
  }) ,
  metaInfo(){
    return {
      title : this.$title("Profile_title")
    }
  },
  validations: {
    name: {required}
  } ,
  mounted(){  
    this.name = this.info.name

    this.isUK = this.info.location === "uk-UK"

    setTimeout( () => {
      M.updateTextFields()
    } )
  } ,
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async onSubmitHandler(){
      if( this.$v.$invalid ){
        this.$v.$touch()
        return
      }

      try{
        await this.$store.dispatch('updateInfo'  , {
          name : this.name ,
          location : this.isUK ? "uk-UK" : "en-EN "
        })
        this.$message("Ім'я було успішно змінено!")
      }catch (e) {}

    }
  }
}
</script>
