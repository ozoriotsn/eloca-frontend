<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Cliente {{ razaoSocial }}</h2>
          <form @submit.prevent="updateItem">

            <label for="itemName">Razão social: </label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required disabled readonly/>

            <label for="itemName">Tipo:</label>
            <input type="text" class="form-control" id="itemName" v-model="tipo" required disabled readonly/>

            

            <label for="itemName">CPF/CNPJ:</label>
            <input type="text" class="form-control" id="itemName" v-model="cpfCnpj" required disabled readonly/>

            <label for="itemName">Codigo do cliente:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required disabled readonly/>

            <label for="itemName">Empresa:</label>
            <input type="text" class="form-control" id="itemName" v-model="empresaData.razao_social" required disabled readonly/>

            <br>

            <router-link to="/customer" class="btn btn-warning">Voltar</router-link>

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
      cpfCnpj: '',
      tipo: '',
      sigla: '',
      codigo: '',
      empresa: '',
      empresaData: ''

    };
  },
  methods: {

  },

  mounted() {
  
    axios.get(baseUrl + 'customers/' + this.$route.params.id).then((response) => {
      const item = response.data.data[0];
      this.razaoSocial = item.razao_social;
      this.sigla = item.sigla;
      this.codigo = item.codigo;
      this.empresa = item.empresa;
      this.empresaData = item.empresa_data;
      this.cpfCnpj = item.cpf_cnpj;
      this.tipo = item.tipo;

    }).catch((error) => {
      console.log(error);
    });
  }

};
</script>