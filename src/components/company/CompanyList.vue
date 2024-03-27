<template>
  <div>
    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Empresas</h2>

          <a href="/company/add" class="btn btn-primary">Cadastrar</a>

          <a href="/" class="btn btn-warning">Voltar</a>


      
          <div v-if="!items.length"> Sem items para mostrar</div>

          <div v-else>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Razão Social</th>
                <th>Sigla</th>
                <th>Código</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.razao_social }}</td>
                <td>{{ item.sigla }}</td>
                <td>{{ item.codigo }}</td>
                <td>
                  <button class="btn btn-secondary" @click="showItem(item)">Visualizar</button>
                  <button class="btn btn-primary" @click="editItem(item)">Editar</button>
                  <button class="btn btn-danger" @click="deleteItem(item.codigo)">Deletar</button>
                </td>
              </tr>
            </tbody>
          </table>

          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import baseUrl from '../../baseUrl';

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    editItem(item) {
      this.$router.push({ name: 'company-edit', params: { id: item.codigo } });
      // Implement edit functionality
    },
    showItem(item) {
      this.$router.push({ name: 'company-show', params: { id: item.codigo } });
      // Implement edit functionality
    },
    deleteItem(itemId) {
      console.log('Delete item:', itemId);


      this.$swal({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, exclua-o!",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {

          console.log('Delete item:', itemId);

          axios.delete(baseUrl + 'companies/' + itemId).then(() => {
            this.$swal({
              title: "Deletado!",
              text: "Registro deletado com sucesso.",
              icon: "success"
            });
            this.getItems();
          }).catch((error) => {
            console.log(error);
            this.showAlertError();
          });

        }
      });
      // Implement delete functionality
    },
    showAlert() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Sucesso",
        showConfirmButton: false,
        timer: 1500
      });
    },

    showAlertError() {
      this.$swal({
        position: "top-end",
        icon: "error",
        title: "Erro",
        text: "Registro possui um cliente, exclua o cliente antes de excluir o registro.",
        showConfirmButton: false,
        timer: 3500
      });
    },

    getItems() {
      axios.get(baseUrl + 'companies').then((response) => {
        this.items = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },

  },
  mounted() {

    this.getItems();

  },
};
</script>
