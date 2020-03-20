<template>
  <div class='forgot-password-content'>
        <div class="forgot-password-modal">
        <h2>Recuperação de Senha:</h2>
        
        <b-form class="email-form">
            <input v-model='user.password' type="password" placeholder="Nova Senha"/>
            <input v-model='user.confirmPassword' type="password" placeholder="Confirme sua Senha"/>
        </b-form>

        <b-button @click="save" variant='info'> Salvar </b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import{baseApiUrl, showError} from '@/global'

export default {
    name: 'ResetPassword',
    data: function(){
        return{
            user: {             
                password:'',
                confirmPassword:'',
                email:'',
                token:''
            }
        }
    },
    methods:{
        save(){
            axios.post(`${baseApiUrl}/resetPassword`, this.user)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.$router.push({path: '/auth'})
                })
                .catch(showError)
            
        },

        getData(){
            const query = location.search.slice(1);
            const parts = query.split('&');
            const data = {}
            parts.forEach((part) =>{
                const keyValue = part.split('=');
                const key = keyValue[0];
                const value = keyValue[1];
                data[key] = value;
            });  
            
            this.user.email = data.email.replace('%40',"@")
            this.user.token = data.token
        }
    },
    mounted(){
        this.getData()
    }
}
</script>

<style>
</style>