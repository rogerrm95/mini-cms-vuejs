<template>
  <div class="user-admin">
    <b-form class="p-2">
      <input type="hidden" id="user-id" v-model="user.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              :readonly="mode === 'remove'"
              type="text"
              required
              v-model="user.name"
              placeholder="Informe o nome do usuário..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              :readonly="mode === 'remove'"
              type="email"
              required
              v-model="user.email"
              placeholder="Informe o e-mail do usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-checkbox class="mt-2 mb-2" id="user-admin" v-show="mode ==='save'" v-model="user.admin">
        Administrador ?
      </b-checkbox>

      <b-row v-show="mode ==='save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              required
              v-model="user.password"
              placeholder="Informe a senha do usuário..."
            />
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group label="Confirmação de senha:" label-for="user-confirmPassword">
            <b-form-input
              id="user-confirmPassword"
              type="password"
              required
              v-model="user.confirmPassword"
              placeholder="Confirme a senha do usuário..."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" v-if="mode ==='save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode ==='remove'" @click="remove">Excluir</b-button>
      <b-button variant="info"  @click="reset" class="ml-2">Cancelar</b-button>
    </b-form>

    <b-table striped hover :items="users" :fields="fields" :per-page='limit' :current-page='page'>
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item)">
          <i class="fa fa-pencil" />
        </b-button>

        <b-button variant="danger" @click="loadUser(data.item,'remove')" class="ml-2">
          <i class="fa fa-trash" />
        </b-button>
      </template>
    </b-table>

    <b-pagination v-model="page" :per-page='limit' :total-rows='rows'/>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  data: function() {
    return {
      mode: "save",
      user: {},
      users: [],
      page:1,
      limit:5,      
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: value => (value ? "Sim" : "Não")
        },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.user = []), this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user.id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    }
  },
  computed:{
    rows(){
      return this.users.length   
    }
  },
  mounted() {
    this.loadUsers();
  },
  beforeUpdate(){
    this.rows;
  }
};
</script>

<style>
</style>