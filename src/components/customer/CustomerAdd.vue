<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Cadastrar Cliente</h2>
          <form @submit.prevent="addItem">

            <label for="itemName">Razão social:</label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required maxlength="255"/>

            <label for="itemName">Tipo:</label>
            <select class="form-select" id="itemName" v-model="tipo" required aria-placeholder="Selecione">
              <option value="PJ">PJ</option>
              <option value="PF">PF</option>
            </select>

            <label for="itemName">Cpf/Cnpj:</label>
            <input type="text" class="form-control" id="itemName" v-model="cpfCnpj" required maxlength="14"/>


            <label for="itemName">Empresa:</label>
            <select class="form-select" id="itemName" v-model="empresa" required @change="getCompany($event)">

              <option 
              v-for="company in companies" 
              :key="company.codigo" 
              :value="company.codigo" >
              {{ company.razao_social }}
            </option>

            </select>

            
            <label for="itemName">Codigo do cliente:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required maxlength="4"/>


            <br>
            <button type="submit" class="btn btn-primary">Cadastrar</button>
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
      sigla: '',
      codigo: Math.floor(Math.random() * 6) + 1,
      empresa: '',
      tipo: 'PF',
      cpfCnpj: '',
      companies: [],

    };
  },
  methods: {
    addItem() {
      const newItem = {
        razao_social: this.razaoSocial,
        codigo: this.codigo,
        empresa: this.empresa,
        tipo: this.tipo,
        cpf_cnpj: this.cpfCnpj
      };
      console.log(newItem);
      axios.post(baseUrl + 'customers', newItem).then(() => {
        // Clear the input fields after adding the item
        this.razaoSocial = '';
        this.codigo = '';
        this.empresa = '';
        this.tipo = '';
        this.cpfCnpj = '';
        this.showAlert();

        // Redirect to the list of items
        this.$router.push('/customer');
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

    getCompany( company ) {
     console.log('Company event:', company.target.value);
     this.empresa = company.target.value;

    },
  },

  mounted() {

axios.get(baseUrl + 'companies').then((response) => {
  this.companies = response.data.data;
}).catch((error) => {
  console.log(error);
});

},



};
</script>