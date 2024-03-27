<template>
  <div>
    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Clientes</h2>

          <a href="/customer/add" class="btn btn-primary">Cadastrar</a>

          <a href="/" class="btn btn-warning">Voltar</a>


          <div v-if="!items.length"> Sem items para mostrar</div>

          <div v-else>
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Razão Social</th>
                <th>Tipo</th>
                <th>Cpf/Cnpj</th>
                <th>Empresa</th>
                <th>Sigla</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.codigo }}</td>
                <td>{{ item.razao_social }}</td>
                <td>{{ item.tipo }}</td>
                <td>{{ item.cpf_cnpj }}</td>
                <td>{{ item.empresa_data.razao_social }}</td>
                <td>{{ item.empresa_data.sigla }}</td>

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
      this.$router.push({ name: 'customer-edit', params: { id: item.codigo } });
      // Implement edit functionality
    },
    showItem(item) {
      this.$router.push({ name: 'customer-show', params: { id: item.codigo } });
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
          axios.delete(baseUrl + 'customers/' + itemId).then(() => {
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
        title: "Dados atualizados com sucesso",
        showConfirmButton: false,
        timer: 1500
      });
    },

    showAlertError() {
      this.$swal({
        position: "top-end",
        icon: "error",
        title: "Erro ao atualizar dados",
        showConfirmButton: false,
        timer: 1500
      });
    },

    getItems() {
      axios.get(baseUrl + 'customers').then((response) => {
        this.items = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    }

  },
  mounted() {
    this.getItems();
  },
};
</script>
