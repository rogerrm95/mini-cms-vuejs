<template>
    <header class="header">
        <a class='toggle' @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>

        <h1 class="header-title"> 
            <router-link to="/" class="link">{{title}}</router-link> 
        </h1>

        <UserDropdown v-if="!hideUserDropdown"/>
    </header>
</template>

<script>
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>

.header{
    grid-area: header;
    background:linear-gradient(to top, #338dc1, #00a8fd);
    color: white;

    display: flex;
    justify-content: center;
    align-items: center;
}

.header-title{
    font-size: 1.7rem;
    letter-spacing: 5px;
    color: white;
    font-weight: bolder;
    flex-grow: 1;
    text-align: center
}
@media (max-width: 790px){ .header-title{ font-size:1.4rem }}



.header-title .link{
    color: white;
    text-decoration: none;

}

.header > a.toggle{
    width: 60px;
    height: 100%;
    color: white;
    justify-self: flex-start;
    text-decoration: none;

    display: flex;
    justify-content: center;
    align-items: center;
}

.header > a.toggle:hover{
    background-color: rgb(0, 0, 0,0.2);

}

</style>