<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-search">
      <i class="fa fa-search fa-lg"/>
      <input type="text" placeholder="Pesquisar..." v-model="treeFilter" class="filter-field"/>
    </div>
    
    <Tree :options='treeOptions' :data="treeData" :filter="treeFilter" ref='tree'/>

    <div class="menu-logo">
      <img src="@/assets/logo.png" alt="Logotipo - Web Roger's" width="175" height="175">
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import {baseApiUrl} from '@/global'
import axios from 'axios'
import Tree from 'liquor-tree'


export default {
    name: 'Menu',
    components: {Tree},
    data: function(){
      return{
        treeFilter:'',
        treeData: this.getTreeData(),
        treeOptions: { 
          propertyNames: {'text':'name'},
          filter: { emptyText: 'Resultado não encontrado!'} 
          },
        
      }
    },
    computed: mapState(['isMenuVisible']),
    methods: {
      getTreeData(){
        const url = `${baseApiUrl}/categories/tree`
        return axios.get(url).then(res => res.data)
      },
      onNodeSelect(node){
        this.$router.push({
          name:'articlesByCategory',
          params: {id: node.id}
        })

        if(this.$mq === 'xs' || this.$mq === 'sm' ){
          this.$store.commit('toggleMenu', false)
        }
      }
    },
    mounted(){
      this.$refs.tree.$on("node:selected", this.onNodeSelect)
    }
}
</script>

<style>
.menu {
  grid-area: menu;
  background: rgb(82, 81, 81);
  color: white;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu a{
  color: #fff;
  font-size: 1.1rem;
}
.menu a:hover{
    text-decoration: none;
    color:white;
    font-weight: bold;
}

.menu-search{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding-bottom: 5px;
  border-bottom:solid 1px rgba(255, 255, 255, 0.6)
}

.menu-search i{
  font-size: 1.5rem;
}

.menu-search .filter-field{
  width:100%;
  margin-left: 10px;
  outline: none;
  border:0;
  background-color: transparent;
  color:#fff;
}

.tree{
  flex:2
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover{
  background-color: rgb(255,255,255,0.1);
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.9)
}

.menu .tree-arrow.has-child{
  filter: brightness(5)
}



.menu-search .filter-field::placeholder{
  color: #fff;
  letter-spacing: 2px;
  padding-left: 5px;
}

.menu-logo{
  align-self: center;
}

.menu-logo img{
  width: 100%;

}

</style>