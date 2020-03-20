<template>
    <div class="article-item">
        <router-link :to="{name: 'articleById', params: {id: article.id}}">
            <div class="article-item-image d-sm-block">
                <img v-if="article.urlImage" 
                :src="article.urlImage"
                alt="Artigo"
                >
                <img v-else
                src="@/assets/article.png"
                alt="Artigo"
                >
            </div>
            
            <div class="article-info">
                <h2>{{article.name}}</h2>
                <p>{{article.description}}</p>
                <span> <strong>Autor: </strong>{{article.author}}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ArticleItem',
    props:['article']
}
</script>

<style>
.article-item{
    margin: 0px 10px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 10px;
    width: 100%;
    overflow: hidden;

    border-radius: 8px;
    border:solid 2px rgba(0, 162, 255, 0.3)
}

.article-item a{
    display: flex;
    flex-direction: row;
    text-decoration: none;
    color: #000;
    padding: 5px;
}

.article-item a:hover{
    background-color: rgb(0,0,0,0.1);
    border-radius: 8px;
}

.article-item-image img{
    border-radius: 20px;
    border: 5px solid rgb(0,0,0,0.2);
    max-height: 200px;
    max-height: 200px
}
@media (max-width: 915px){ .article-item-image img{ max-height: 150px; max-width: 150px } }
@media (max-width: 715px){ .article-item-image img{ display: none; } }

.article-info{
    margin-left:15px;
    border-left: 2px solid rgb(0,0,0,0.2);
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}
@media (max-width: 690px){ .article-info{ border-left: none; margin-left: 0px; padding-left: 0px;}}

.article-info h2{
    font-size: 2.3rem;
}
@media (max-width: 525px){ .article-info h2{ font-size: 1.9rem;}}

.article-info p{
    font-size: 1.3rem;
    flex:1;
    color:#555
}
@media (max-width: 525px){ .article-info p{ font-size: 1.1rem;}}

.article-info span{
    font-size: 0.8rem;
}
</style>