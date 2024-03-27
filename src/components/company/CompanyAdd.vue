<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Cadastrar Empresa</h2>
          <form @submit.prevent="addItem">

            <label for="itemName">Razão social:</label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required maxlength="255"/>

            <label for="itemName">Sigla:</label>
            <input type="text" class="form-control" id="itemName" v-model="sigla" required maxlength="40"/>


            <label for="itemName">Codigo:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required maxlength="4"/>

            <label for="itemName">Empresa:</label>
            <input type="text" class="form-control" id="itemName" v-model="empresa" required maxlength="4" />

            <br>
            <button type="submit" class="btn btn-primary">Cadastrar</button>
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
    addItem() {
      const newItem = {
        razao_social: this.razaoSocial,
        sigla: this.sigla,
        codigo: this.codigo,
        empresa: this.empresa
      };
      console.log(newItem);
      axios.post(baseUrl + 'companies', newItem).then(() => {
        // Clear the input fields after adding the item
        this.razaoSocial = '';
        this.sigla = '';
        this.codigo = '';
        this.empresa = '';
        this.showAlert();

        // Redirect to the list of items
        this.$router.push('/company');
      }).catch((error) => {
        console.log(error);
        this.showAlertError();
      });
    },
    showAlert() {
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Dados cadastrados com sucesso",
        showConfirmButton: false,
        timer: 1500
      });
    },
    showAlertError() {
      this.$swal({
        position: "top-end",
        icon: "error",
        title: "Erro ao cadastrar dados",
        showConfirmButton: false,
        timer: 1500
      });
    },
  },
};
</script>