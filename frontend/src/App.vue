<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header title="Gerenciamento de Conteúdos" 
			:hideToggle="!user"
			:hideUserDropdown="!user" />
		<Menu v-if="user"/>
		<Loading v-if="validatingToken"/>
		<Content v-else/>
		<Footer/>
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import { mapState } from 'vuex'

import Menu from './components/templates/Menu'
import Header from './components/templates/Header'
import Footer from './components/templates/Footer'
import Content from './components/templates/Content'
import Loading from './components/templates/Loading'

export default {
	name: "App",
	components: { Menu, Header, Footer, Content, Loading},
	computed: mapState(['isMenuVisible','user']),
	data: function(){
		return{
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)
			
			const url = await window.location.pathname

			if(!userData && url === "/resetPassword/") {
				this.validatingToken = false
				return
			}
			if (!userData) {
				this.validatingToken = false
				this.$router.push({ name: 'Auth' })
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)
				
				if(this.$mq === 'sm' || this.$mq === 'xs'){
					this.$store.commit('toggleMenu', false)}
				
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'Auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
*{ font-family: "Lato", sans-serif; }
body{ margin: 0; }

#app{
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	height: 100vh;
	overflow: hidden;

	display: grid;
	grid-template-rows: 60px 1fr 40px;
	grid-template-columns: 250px 1fr;
	grid-template-areas: 
		"header header"
		"menu content"
		"menu footer";
}

#app.hide-menu{
	grid-template-areas: 
	"header header"
	"content content"
	"footer footer";
}

</style>