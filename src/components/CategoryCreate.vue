<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{"CC_create" | locale}}</h4>
          </div>

          <form @submit.prevent="onSubmitHandler">
            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="title"
                  :class="{ invalid : $v.title.$dirty && !$v.title.required }"
              >
              <label for="name">{{"CC_categoryName" | locale}}</label>
              <span
                v-if="$v.title.$dirty && !$v.title.required"
               class="helper-text invalid">
               {{"CC_inputCategoryName" | locale}}
               </span>
            </div>

            <div class="input-field">
              <input
                  id="limit"
                  type="number"
                  v-model="limit"
                  :class="{ invalid : ($v.limit.$dirty && !$v.limit.minValue) }"
              >
              <label for="limit">{{"limit" | locale}}</label>
              <span
              v-if="$v.limit.$dirty && !$v.limit.minValue"
               class="helper-text invalid">
               {{"CE_minimum" | locale}} {{this.$v.limit.$params.minValue.min }} !
               </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              {{"create" | locale}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import  { required , minValue } from 'vuelidate/lib/validators'

export default {
    name : 'category-create',
    data: () => ({
        title : '',
        limit : 100
    }),
    validations:{
        title : { required } ,
        limit: { minValue : minValue(100) }
    } ,
    mounted(){
        M.updateTextFields()
    },
    methods: {
        async onSubmitHandler(){
  
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            try{
                const category = await this.$store.dispatch('createCategory' , {
                    title : this.title ,
                    limit : this.limit
                })
                
                this.limit = 100
                this.title = ''
                this.$v.$reset()
                this.$emit('addCategory' , category)
                this.$message('Добавлено новую категорию!')
            }catch (e){}
        }
    }
}

</script>
