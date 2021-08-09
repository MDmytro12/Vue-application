<template>
    <form class="card auth-card" @submit.prevent ="onSubmit">
        <div class="card-content">
            <span class="card-title">{{ "L_homeAc" | locale}}</span>
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
                class="helper-text invalid">{{ "L_emptyField" | locale}}</small>

                <small 
                    v-else-if="$v.email.$dirty && !$v.email.email"
                class="helper-text invalid">{{ "L_emailWithoutMis" | locale}}</small>
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
                class="helper-text invalid">{{ "L_emptyField" | locale}}</small>
                <small 
                    v-else-if="$v.password.$dirty && !$v.password.minLength"
                class="helper-text invalid">{{ "L_passwordLength" | locale}} {{$v.password.$params.minLength.min}} символов , а сейчас {{password.length}} ! </small>
            </div>
        </div>
        <div class="card-action">
            <div>
            <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
            >
                {{ "login" | locale}}
                <i class="material-icons right">send</i>
            </button>
            </div>
            <p class="center">
            {{ "L_notaccount" | locale}}
            <router-link to="/register">{{ "L_reg" | locale}}</router-link>
            </p>
        </div>
    </form>
</template>
    
<script>
import {email , required , minLength} from 'vuelidate/lib/validators'
import messages from '../utils/messages'

export default {
    name : 'login',
    mounted() {
        if(messages[this.$route.query.message]){
            this.$message( messages[this.$route.query.message] )
        }
    },
    metaInfo(){
        return {
            title : this.$title("SB_log")
        }
    },
    methods:{
        
        async onSubmit() {
            if(this.$v.$invalid){
                this.$v.$touch()
                return
            }

            const formData = {
                email : this.email,
                password : this.password
            }
            
            try{
                await this.$store.dispatch('login' , formData)

                this.$router.push('/')
                
            }catch (e){
            }
            
        }
    },
    validations: {
        email: {email , required},
        password: {required , minLength: minLength(6)
        }
    },
    data: () =>({
        email: '',
        password : ''
    })
}
</script>
