<template>
    <div class="article-grid">
        <router-link :to="{name: 'articleById', params: {id: article.id}}" class="article-link">
            <div class="article-grid-image">
                <img v-if="article.urlImage" 
                :src="article.urlImage" width=275 height=260 alt="Artigo"
                >
                <img v-else
                src="@/assets/article.png"
                width=275 height=260 alt="Artigo"
                >
            </div>
            
            <div class="article-grid-info">
                <h2>{{article.name}}</h2>
                <p>{{article.description}}</p>
                <span> <strong>Autor: </strong>{{article.author}}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleGrid',
    props:['article']
}
</script>

<style>

.article-grid {
    width: 100%;
    height: 100%;
    background-color: white;
    border: solid 2px rgba(0, 105, 243, 0.2);
    box-shadow: 0px 5px 10px rgb(0,0,0,0.5);
}

.article-link{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.article-link:hover{
    text-decoration: none;
    color:black;
    background-color: rgb(0,0,0,0.05);
    border: 2px rgb(1, 162, 255) solid;
    border-radius: 5px;
}

.article-grid-image{
    width: 300px;
    height: 260px;
    margin-top: 10px;
    align-self: center;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center
}

.article-grid-image img{
    border: 6px rgb(212, 212, 212) solid;
    border-radius: 5px;
    margin: 0px;
}

.article-grid-info{
    border: none;
    color:black;
    padding-left: 10px;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-content: stretch  
}

.article-grid-info h2{
    font-size: 2rem;
    padding-left: 10px;
}

.article-grid-info p{
    font-size: 1rem;
    flex: 1;  
}

.article-grid-info span{
    font-size: 0.7rem;
    margin-bottom: 5px;
}
</style>

