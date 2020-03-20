<template>
    <div class="user-dropdown">
        <div class="user-bottom">
          <span class="d-none d-sm-block user-name">{{user.name}}</span>
          
          <div class="user-dropdown-img">
              <Gravatar :email="user.email" alt="User"/>
          </div>
          <i class="fa fa-angle-down"/>
        </div>
        
        <div class="user-dropdown-content">    
            <router-link to='/admin' class="link" v-if="user.admin">
                <i class="fa fa-cogs"/> Administração
            </router-link>
        
            <a href="" class="link" @click.prevent="logout">
                <i class="fa fa-sign-out"/> Sign-out
            </a>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods:{
        logout(){
            localStorage.removeItem(userKey)
            this.$store.commit('setUser',null)
            this.$router.push({name: 'Auth'})
        }
    }
}
</script>

<style>

.user-dropdown{
    height: 100%;
}

.user-dropdown:hover{
    background-color: rgba(0,0,0,0.2);
}

.user-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100%;
    padding: 0px 20px;
}

.user-dropdown-img{
    margin: 0px 10px;
}

.user-dropdown-img > img{
    height: 50px;
    border-radius: 4px
}

.user-dropdown-content{
    position: absolute;
    right: 1%; /*Podendp ser alterado*/
    min-width: 200px;
    box-shadow: 0px 1px 25px 0px black;
    border-radius: 2px;
    background-color: white;
    padding: 10px;
    z-index: 1;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content{
    visibility: visible;
    opacity: 1;
}

.user-dropdown-content .link{
    text-decoration: none;
    padding: 10px;
    color: black;
}

.user-dropdown-content a:hover{
    background-color: rgba(1, 13, 180, 0.18);
    border-radius: 10px;
}

.user-dropdown-content i{
    padding-right: 10px; 
}
</style>