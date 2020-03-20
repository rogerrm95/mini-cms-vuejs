<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros Cia" />
        <div class="admin-pages-tabs">
        </div>
        
        <b-card no-body>
            <b-tabs>
                <b-tab title='Artigos'> <ArticleAdmin/></b-tab>
                <b-tab title='Categorias'>  <CategoryAdmin/> </b-tab>
                <b-tab title='Usuários'> <UserAdmin/> </b-tab>
            </b-tabs>
        </b-card>

        
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import UserAdmin from './UserAdmin'
import CategoryAdmin from './CategoryAdmin'
import ArticleAdmin from './ArticleAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin, CategoryAdmin, ArticleAdmin }
}
</script>

<style>

</style>
