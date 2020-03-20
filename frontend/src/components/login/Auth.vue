<template>
    <transition name='fade' appear>
        
    <div class="auth-content"> 
        <div class="auth-modal">
            <img src="@/assets/logo.png" Alt='Logotipo' width="200">

            <hr/>

            <div class="auth-form"> {{showSignup ? 'Cadastro' : 'Login'}} </div>

            <div class="auth-input-group" v-if="showSignup">
                <i class="fa fa-user"/>
                <input v-model='user.name' placeholder="Nome">
            </div>

            <div class="auth-input-group">
                <i class="fa fa-at"/>
                <input v-model='user.email' type="email" placeholder="Email">
            </div>

            <div class="auth-input-group">
                <i class="fa fa-key"/>
                <input v-model='user.password' type="password" placeholder="Senha">
            </div>

            <div class="auth-input-group" v-if="showSignup">
                <i class="fa fa-key"/>
                <input v-model='user.confirmPassword' type="password" 
                placeholder="Confirme a senha">
            </div>          

            <router-link to='/forgotPassword' v-if="!showSignup">
               Esqueceu sua senha ?
            </router-link>
                    
            <div class="auth-btn">
                <b-button v-if='showSignup' variant='primary' @click="signUp" class="mt-2"> 
                    Cadastrar 
                </b-button> 

                <b-button v-else variant='primary' @click="signIn">
                    Login
                </b-button>
            </div>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já possiul login ? Clique Aqui</span>
                <span v-else>Não possui cadastro? Clique aqui !</span>
            </a>            

        </div>
    </div>

    </transition>
</template>

<script>
import {baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name:'Auth',
    data: function(){
        return{
            showSignup: false, // Alterna entre a tela de Login e de cadastro
            showForgotPassword: false,
            user:{},
        }
    },
    methods:{
        signIn(){
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser',res.data)
                    localStorage.setItem(userKey,JSON.stringify(res.data))
                    this.$router.push({path: '/'})
                })
                .catch(showError)
        },
        signUp(){
            axios.post(`${baseApiUrl}/signup`,this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    @keyframes shadow {
    0%   {box-shadow: 0 5px 10px rgb(0, 144, 228);}
    25%  {box-shadow: 0 2px 10px rgb(0, 0, 0);}
    50%  {box-shadow: 0 5px 10px rgb(0, 144, 228);}
    75%  {box-shadow: 0 2px 10px rgb(0, 0, 0);}
    100% {box-shadow: 0 5px 10px rgb(0, 144, 228);}
    }

    .fade-enter-active {
        transition: all 2.5s ease;
    }

    .auth-content{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .auth-modal{
        background-color: rgba(255, 255, 255);
        box-shadow: 0 2px 10px rgb(0, 0, 0);
        animation-name: shadow;
        animation-duration: 10s;
        animation-iteration-count: infinite;
        
        border-radius: 10px 40px;
        width: 350px;
        padding: 20px;

        display: flex;
        flex-direction: column;
        align-items: center
    }

    .auth-modal img{
        border: solid 5px rgb(0, 144, 228);
        border-radius: 20px 100px 100px;
        height: 100%;
    }

    .auth-form{
        font-weight: bolder;
        letter-spacing: 2px;
        margin-bottom: 30px;
    }

    .auth-modal input{
        margin: 10px;
        outline: none;
        border:none;
        border-bottom: 1px solid rgb(0, 160, 235);
        width: 80%
    }

    .auth-input-group{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .auth-input-group i{
        font-size: 1.3rem;
    }

    .auth-modal input::placeholder{
        padding-left: 5px;
        color:rgba(0, 0, 0, 0.6)
    }

    .auth-modal input:hover{
        background-color: rgb(0,0,0,0.05);
        border-radius: 6px;
        outline: none;
    }

    .auth-modal a{
        margin: 12px 0px;
        text-decoration: none;
    }
    .auth-btn button{
        font-weight: bold;
        letter-spacing: 3px
    } 

</style>