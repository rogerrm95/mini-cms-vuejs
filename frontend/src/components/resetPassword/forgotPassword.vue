<template>
    <div class="forgot-password-content">
        <div class="forgot-password-modal">
        <h2> Insira seu e-mail cadastrado: </h2>
        
        <b-form class="email-form">
            <i class="fa fa-at"/>
            <input type='email' id='email' v-model="user.email" placeholder="E-mail">
        </b-form>
        
        <b-button @click="sendEmail" variant='primary'>Enviar</b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '@/global'

export default {
    name: 'ForgotPassword',
    data: function(){
            return{
                user:{}
            }
    },
    methods:{
        sendEmail(){
            axios.post(`${baseApiUrl}/forgotPassword`,this.user)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.$router.push({path: '/auth'})
                })
            .catch(showError)
        }
    }
}
</script>

<style>

    .forgot-password-content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .forgot-password-modal{
        background-color: rgba(255, 255, 255);
        box-shadow: 0 2px 10px rgb(0, 0, 0);
        
        border-radius: 20px 20px;
        width: 350px;
        padding: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .forgot-password-modal h2{
        font-size: 1.5rem;
        margin: 5px;
        padding-bottom: 10px;
    }

    .email-form{
        margin-top: 20px;
        width:95%
    }

    .email-form input{
        outline: none;
        border:none;
        border-bottom: solid 1px rgb(0, 0, 0, 0.2);
        width: 95%;
        padding: 0px 5px;
        margin-bottom: 25px;
    }

    .forgot-password-modal button{
        width: 14rem;
        justify-self: center;
        align-self: center;
    }


</style>