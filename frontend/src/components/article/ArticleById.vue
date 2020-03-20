<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-newspapper" :main="article.name" :sub="article.description"/>
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl} from '@/global'
import PageTitle from '../templates/PageTitle'

import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack'

export default {
    name: "ArticleById",
    components: {PageTitle},
    data: function() {
        return{
            article:{}
        }
    },
    mounted(){
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`
        axios.get(url).then(res => this.article = res.data)
    },
    updated(){
        document.querySelectorAll('.article-content pre').forEach(e => {
            hljs.highlightBlock(e)
        })
    }

}
</script>

<style>

.article-content{
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    border: solid 2px rgba(0, 162, 255, 0.3);
}

.article-content pre{
    background-color: #1e1e1e;
    color: white;
    font-size: 1.2rem;
    padding: 10px;
    border-radius: 5px
}

.article-content img{
    max-width:100%;
    border: 2px solid rgb(0,0,0,0.2);
    border-radius: 1px;
}

.articles-by-category:last-child{
    margin: 10px;
}
</style>