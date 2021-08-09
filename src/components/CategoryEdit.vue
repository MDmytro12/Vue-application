<template>
    <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>{{"CE_edit" | locale}}</h4>
          </div>

          <form @submit.prevent="onSubmitHandler">
            <div class="input-field" >
              <select
              ref="select"
              v-model="current"
              > 
                <option
                v-for="c in categories"
                v-bind:key="c.id"
                v-bind:value="c.id"
                >{{c.title}}</option>
              </select>
              <label>{{"CE_chooseCategories" | locale}}</label>
            </div>

            <div class="input-field">
              <input type="text" id="name" v-model="title" :class="{ invalid : $v.title.$dirty && !$v.title.required }">
              <label for="name">{{"CE_name" | locale}}</label>
              <span
                v-if="$v.title.$dirty && !$v.title.required"
               class="helper-text invalid">
               {{"CE_inputNameCategory" | locale}}
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
               {{"CE_minimum" | locale}} {{$v.limit.$params.minValue.min }} !
               </span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
              {{"update" | locale}}
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import  { required , minValue } from 'vuelidate/lib/validators'

export default {
    name:"edit-category",
    props: {
        categories: Array
    },
    validations: {
        title:{required},
        limit:{minValue : minValue(100)}
    },
    mounted(){
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
    } ,
    destroyed() {
        if( this.select && this.select.destroy){
            this.select.destroy()
        }
    },
    created(){
        const {id , limit , title } = this.categories[0]
        this.current = id
        this.limit = limit
        this.title = title
        
    },
    data: () => ({
            select : null,
            current : null,
            limit: 100,
            title: '' 
    }), 
    methods: {
        async onSubmitHandler(){
            if( this.$v.$invalid ){
                this.$v.$touch()
                return
            }

            try{
                const categoryData = {
                    title : this.title,
                    limit : this.limit,
                    id : this.current
                }

                await this.$store.dispatch('updateCategory' , categoryData )
                this.$message("Категория успешно обновлена!")
                this.$emit('update' , categoryData)
            }catch(e) {}
        }
    },
    watch: {
        current(value){
            const { title , limit } = this.categories.find( c => c.id === value )
            this.title = title
            this.limit = limit
        }
    }
}
</script>
