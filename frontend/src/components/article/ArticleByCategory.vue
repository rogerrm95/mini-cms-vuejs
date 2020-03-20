<template>
    <div class="articles-by-category">
      <PageTitle :main='category.name' sub="Categoria" icon="fa fa-folder-o"/>
      
        <ul v-bind:class='{apllyGrid:isGrid}'>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article='article' v-if="!isGrid"/>
                <ArticleGrid :article='article' v-else/>
            </li>
        </ul>
      
        <div id="btn-load"> 
            <b-button variant='outline-primary' size="lg" v-if="loadMore" @click="getArticles" >
                Carregar Mais 
            </b-button>

            <b-button variant='outline-primary' @click="setGridLayout">
                <i class="fa fa-th"/> 
            </b-button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl} from '@/global'
import PageTitle from '../templates/PageTitle'
import ArticleItem from '../article/ArticleItem'
import ArticleGrid from '../article/ArticleGrid'

export default {
    name: 'ArticleByCategory',
    components: {PageTitle, ArticleItem, ArticleGrid},
    data: function(){
        return{
            loadMore: true,
            isGrid: false,
            page:1,
            category:{},
            articles:[],
        }
    },
    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data)
                this.page++

                if(res.data.length === 0 ) this.loadMore = false
            })
        },
        setGridLayout(){
            this.isGrid = !this.isGrid
        }
    },
    watch:{
        $route(to){
            this.category.id = to.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory();
            this.getArticles();        
        }
    },
    mounted(){
        this.category.id = this.$route.params.id;
        this.getCategory();
        this.getArticles();
    }
}
</script>

<style>

.articles-by-category ul{
    list-style: none;
    padding: 0px;
}

.apllyGrid{
    display: grid;
    grid-template-columns: repeat(3,1fr);
}

@media (max-width: 1235px){ .apllyGrid { grid-template-columns: repeat(2,1fr) } }
@media (max-width: 915px){ .apllyGrid { grid-template-columns: repeat(1,1fr) } }

.apllyGrid li{
    margin-right: 10px;
    margin-bottom: 10px;
    height: 450px;
}

#btn-load{  
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

#btn-load button{
    margin-right: 10px;
}
@media(max-width: 530px){ .btn-outline-primary{ font-size: 0.9rem;}}

.articles-by-category:last-child{
    margin: 10px;
}
</style>