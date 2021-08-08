<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading"/>

    <p v-else-if="!categories.length" class='center'>Список категорий пуст! <router-link to='/categories'>Добавьте новую категорию!</router-link></p>

    <form v-else class="form" @submit.prevent="onSubmitHandler">
      <div class="input-field" >
        <select ref='select' v-model="category">
          <option
          v-for="c in categories"
          :key="c.id"
          :value="c.id"
          >{{ c.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model="amount"
            :class="{invalid : ($v.amount.$dirty && !$v.amount.minValue)}"
        >
        <label for="amount">Сумма</label>
        <span
              v-if="$v.amount.$dirty && !$v.amount.minValue"
               class="helper-text invalid">
               Минимальное значение {{$v.amount.$params.minValue.min }} !
               </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{ invalid : $v.description.$dirty && !$v.description.required }"
        >
        <label for="description">Описание</label>
        <span
                v-if="$v.description.$dirty && !$v.description.required"
               class="helper-text invalid">
               Введите описание!
               </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>

  </div>
</template>
<script>
import {required , minValue} from 'vuelidate/lib/validators'
import {mapGetters} from 'vuex'

export default {
    name: 'record',
    data: () => ({
      categories: [],
      loading : true ,
      select : null , 
      type: 'outcome' ,
      category : null ,
      amount: 1,
      description: ''
    }),
    validations:{
        description : {required},
        amount: {minValue : minValue(1)}
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select) 
        M.updateTextFields()
        } , 0) 

      if(this.categories.length){
        this.category = this.categories[0].id
      }
    },
    destroyed(){
      if(this.select && this.select.destroy){
        this.select.destroy()
      }
    } ,
    computed: {
      ...mapGetters(['info']),
      canCreateRecord(){
        if(this.type === 'income'){
          return true
        }

        if( this.type === 'outcome' && this.info.bill < this.amount ){
          return false
        }else{
          return true
        } 
    } 
    } ,
    methods: {
      async onSubmitHandler(){                      
        if(this.$v.$invalid){
          this.$v.$touch()
          return
        }
      
        if(this.canCreateRecord){

          try{
            await this.$store.dispatch('createRecord' , {
            categoryId : this.category ,
            amount: this.amount,
            description: this.description , 
            type : this.type ,
            date : new Date().toString()
          })
          const bill = this.type === 'income' ?
            this.info.bill + this.amount 
            :
            this.info.bill - this.amount
          
          await this.$store.dispatch('updateInfo' , {bill})
          this.$message('Запись успешно додано!')
          this.amount = 1
          this.description = ''
          this.$v.$reset()
          }catch(e){}
          
        }else{
          this.$message(`Недостаточно средств на счете , не достаточно ${this.amount - this.info.bill}`)}
        }
      }
}
</script>
