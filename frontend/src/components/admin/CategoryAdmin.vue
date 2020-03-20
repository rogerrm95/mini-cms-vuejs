<template>
  <div>
    <b-card no-body>
      <b-form class="p-2">
        <input type="hidden" id="categories.id" />

        <b-form-group label="Nome da Categoria:" label-for="category-name">
          <b-form-input
            class="mb-4"
            id="category-name"
            placeholder="Informe a categoria..."
            type="text"
            required
            :readonly="mode ==='remove'"
            v-model="category.name"
          />

          <b-form-input
            id="category-path"
            type="text"
            readonly
            v-model="category.path"
            v-if="mode==='remove'"
          />

          <b-form-group label="Categoria Pai" label-for="category-path" v-else>
            <b-form-select id="category-path" :options="categories" v-model="category.parentId" />
          </b-form-group>
        </b-form-group>

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

    <b-table :items="categories" :fields="fields" :per-page='limit' :current-page='page'>
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadCategory(data.item)">
          <i class="fa fa-pencil" />
        </b-button>

        <b-button variant="danger" @click="loadCategory(data.item,'remove')" class="ml-2">
          <i class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>

    <b-pagination v-model="page" :per-page='limit' :total-rows='rows'/>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "CategoryAdmin",

  data: function() {
    return {
      mode: "save",
      category: {},
      categories: [],
      page:1,
      limit:5,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Categoria", sortable: true },
        { key: "path", label: "Categoria-Pai" },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },
    reset() {
      (this.mode = "save"), (this.category = {}), this.loadCategories();
    },
    remove() {
      const id = this.category.id;
      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";

      axios[method](`${baseApiUrl}/categories${id}`, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCategory(category, mode = "save") {
      this.category = { ...category };
      this.mode = mode;
    }
  },
  computed:{
    rows(){
      return this.categories.length   
    }
  },
  mounted() {
    this.loadCategories();
  },
  beforeUpdate(){
    this.rows;
  }
};
</script>

<style>
</style>