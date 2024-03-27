<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Empresa {{ razaoSocial }}</h2>
          <form @submit.prevent="updateItem">

            <label for="itemName">Razão social: </label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required disabled readonly/>

            <label for="itemName">Sigla:</label>
            <input type="text" class="form-control" id="itemName" v-model="sigla" required disabled readonly/>


            <label for="itemName">Codigo:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required disabled readonly/>

            <label for="itemName">Empresa:</label>
            <input type="text" class="form-control" id="itemName" v-model="empresa" required disabled readonly/>

            <br>

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

  },

  mounted() {
  
    axios.get(baseUrl + 'companies/' + this.$route.params.id).then((response) => {
      const item = response.data.data[0];
      this.razaoSocial = item.razao_social;
      this.sigla = item.sigla;
      this.codigo = item.codigo;
      this.empresa = item.empresa;

    }).catch((error) => {
      console.log(error);
    });
  }

};
</script>