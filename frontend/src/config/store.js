import axios from "axios"
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isMenuVisible: false,
        isGridLayout: false,
        user: null
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if (isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }

            if(!state.user){
              state.isMenuVisible = false
              return
            }
        },
        gridLayout(state, isGrid) {
            if (isGrid === undefined) {
                state.isGridLayout = !state.isGridLayout
            } else {
                state.isGridLayout = isGrid
            }
        },
        setUser(state, user){
            state.user = user
            if(user){
                axios.defaults.headers.common["Authorization"] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common["Authorization"]
                state.isMenuVisible = false               
            }
        }
    }
})