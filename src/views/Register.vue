<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
  <div class="card-content">
    <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid : ($v.email.$dirty && !$v.email.required) || ( $v.email.$dirty && !$v.email.email ) }"
        >
        <label for="email">Email</label>
        <small 
            v-if="$v.email.$dirty && !$v.email.required"
        class="helper-text invalid">Не оставляйте поле пустим!</small>

        <small 
            v-else-if="$v.email.$dirty && !$v.email.email"
        class="helper-text invalid">Введите свой emial без ошибок!</small>
      </div>

      <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    :class="{invalid : ($v.password.$dirty && !$v.password.required) || ( $v.password.$dirty && !$v.password.minLength ) }"
                >
                <label for="password">Пароль</label>
                <small 
                    v-if="$v.password.$dirty && !$v.password.required"
                class="helper-text invalid">Не оставляйте поле пустим!</small>
                <small 
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                class="helper-text invalid">Пароль должен бить длиной не менше {{$v.password.$params.minLength.min}} символов , а сейчас {{password.length}} ! </small>
            </div>

    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid : ( $v.name.$dirty && !$v.name.required ) }"
      >
      <label for="name">Имя</label>
      <small 
        v-if="$v.name.$dirty && !$v.name.required"
      class="helper-text invalid">Не оставляйте поле пустим!</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="agree"/>
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <a href="/login">Войти!</a>
    </p>
  </div>
</form>

</template>


<script>
import {required , email , minLength  } from 'vuelidate/lib/validators'
 
export default {
  name: 'register',
  validations:{
    email : {email , required},
    password : {required , minLength: minLength(8)},
    name: {required},
    agree: {checked : v => v}
  },
  data : () => ({
    email : '',
    password : '',
    name : '' ,
    agree : false
  }) ,
  methods : {
    onSubmit() {
  
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      const formData = {
        email : this.email,
        password : this.password,
        name : this.password
      }
      
      try{
        this.$store.dispatch('register' , formData )
        this.$router.push('/login')
      }catch (e){}
      
    }
  }
}
</script>
