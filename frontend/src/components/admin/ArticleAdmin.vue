<template>
  <div>
    <b-card no-body>
      <b-form class="p-2">
        <input type="hidden" id="articles.id" />

        <b-form-group label="Nome do Artigo:" label-for="article-name">
          <b-form-input
            class="mb-4"
            id="article-name"
            placeholder="Informe o título do artigo..."
            type="text"
            required
            :readonly="mode ==='remove'"
            v-model="article.name"
          />
        </b-form-group>

        <b-form-group label="Descrição do Artigo:" label-for="description">
          <b-form-input
            class="mb-4"
            id="description"
            placeholder="Descrição do artigo..."
            type="text"
            required
            :readonly="mode ==='remove'"
            v-model="article.description"
          />
        </b-form-group>

        <div v-if="mode ==='save'">
          <b-form-group label="URL da Imagem" label-for="image-URL">
            <b-form-input
              class="mb-4"
              id="image-URL"
              placeholder="Informe a URL da Imagem"
              type="text"
              :readonly="mode ==='remove'"
              v-model="article.urlImage"
            />
          </b-form-group>

          <b-form-group label="Categoria:" label-for="category">
            <b-form-select id="category" :options="categories" v-model="article.categoryId" />
          </b-form-group>

          <b-form-group label="Autor:" label-for="user">
            <b-form-select id="user" :options="users" v-model="article.userId" />
          </b-form-group>

          <b-form-group label="Conteúdo:">
            <VueEditor placeholder="Informe o conteúdo do artigo..." v-model="article.content" />
          </b-form-group>
        </div>

        <hr />

        <b-row>
          <b-col xs="12">
            <b-button variant="primary" v-if="mode === 'save'" class="mx-2" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" class="mx-2" @click="remove">Excluir</b-button>
            <b-button variant="info" class="mx-2" @click="reset">Cancelar</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <b-table :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)">
          <i class="fa fa-pencil" />
        </b-button>

        <b-button variant="danger" @click="loadArticle(data.item,'remove')" class="ml-2">
          <i class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>

    <b-pagination v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data: function() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      count: 0,
      limit: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Titulo", sortable: true },
        { key: "path", label: "Categoria" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then(res => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, text: category.path };
        });
      });
    },
    reset() {
      (this.mode = "save"), (this.article = {}), this.loadArticles();
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";

      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then(res => (this.article = res.data));
    }
  },
  watch: {
    page() {
      this.loadArticles();
    }
  },
  mounted() {
    this.loadArticles();
    this.loadUsers();
    this.loadCategories();
  }
};
</script>

<style>
</style>