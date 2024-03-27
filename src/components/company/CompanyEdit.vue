<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Editar Empresa</h2>
          <form @submit.prevent="updateItem">

            <label for="itemName">Razão social: </label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required />

            <label for="itemName">Sigla:</label>
            <input type="text" class="form-control" id="itemName" v-model="sigla" required />


            <label for="itemName">Codigo:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required disabled readonly />

            <label for="itemName">Empresa:</label>
            <input type="text" class="form-control" id="itemName" v-model="empresa" required  disabled readonly/>

            <br>
        
            <button type="submit" class="btn btn-primary">Atualizar</button>
            <router-link to="/company" class="btn btn-warning">Voltar</router-link>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseUrl from '@/baseUrl';
import axios from 'axios';
export default {
  data() {
    return {
      razaoSocial: '',
      sigla: '',
      codigo: '',
      empresa: '',

    };
  },
  methods: {
    updateItem() {
      const newItem = {
        razao_social: this.razaoSocial,
        sigla: this.sigla,
        codigo: this.codigo,
        empresa: this.empresa
      };
      console.log(newItem);
      axios.put(baseUrl + 'companies/' + this.$route.params.id, newItem).then(() => {
        this.showAlert();
      }).catch((error) => {
        this.showAlertError();
        console.log(error);
      });
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
  },

  mounted() {

    axios.get(baseUrl + 'companies/' + this.$route.params.id).then((response) => {
      console.log('DATA EDIT: ', response.data.data);

      const item = response.data.data[0];

      this.razaoSocial = item.razao_social;
      this.sigla = item.sigla;
      this.codigo = item.codigo;
      this.empresa = item.empresa;

      console.log('DATA: ', this.razaoSocial);
    }).catch((error) => {
      console.log(error);
    });
  }

};
</script>