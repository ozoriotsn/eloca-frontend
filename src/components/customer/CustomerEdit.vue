<template>
  <div>

    <div class="container">

      <div class="row">

        <div class="col">

          <h2>Editar Cliente</h2>
          <form @submit.prevent="updateItem">

            <label for="itemName">Razão social:</label>
            <input type="text" class="form-control" id="itemName" v-model="razaoSocial" required maxlength="255" />

            <label for="itemName">Tipo:</label>
            <select class="form-select" id="itemName" v-model="tipo" required aria-placeholder="Selecione">
              <option value="PJ">PJ</option>
              <option value="PF">PF</option>
            </select>

            <label for="itemName">Cpf/Cnpj:</label>
            <input type="text" class="form-control" id="itemName" v-model="cpfCnpj" required maxlength="14" disabled
              readonly />


            <label for="itemName">Empresa:</label>
            <select class="form-select" id="itemName" v-model="empresa" required @change="getCompany($event)">

              <option v-for="company in companies" :key="company.codigo" :value="company.codigo">
                {{ company.razao_social }}
              </option>

            </select>


            <label for="itemName">Codigo do cliente:</label>
            <input type="text" class="form-control" id="itemName" v-model="codigo" required maxlength="4" disabled
              readonly />

            <br>

            <button type="submit" class="btn btn-primary">Atualizar</button>
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
      codigo: '',
      empresa: '',
      tipo: '',
      empresaData: '',
      companies: [],
      cpfCnpj: '',

    };
  },
  methods: {
    updateItem() {
      const newItem = {
        razao_social: this.razaoSocial,
        sigla: this.sigla,
        codigo: this.codigo,
        empresa: this.empresa,
        tipo: this.tipo,
        cpf_cnpj: this.cpfCnpj
      };
      console.log(newItem);
      axios.put(baseUrl + 'customers/' + this.$route.params.id, newItem).then(() => {
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

    getCompany( company ) {
     console.log('Company event:', company.target.value);
     this.empresa = company.target.value;

    },
  },

  mounted() {

    axios.get(baseUrl + 'customers/' + this.$route.params.id).then((response) => {
      console.log('DATA EDIT: ', response.data.data);

      const item = response.data.data[0];

      this.razaoSocial = item.razao_social;
      this.sigla = item.sigla;
      this.codigo = item.codigo;
      this.empresa = item.empresa;
      this.empresaData = item.empresa_data;
      this.cpfCnpj = item.cpf_cnpj;
      this.tipo = item.tipo;

      console.log('DATA: ', this.razaoSocial);
    }).catch((error) => {
      console.log(error);
    });


    axios.get(baseUrl + 'companies').then((response) => {
      this.companies = response.data.data;
    }).catch((error) => {
      console.log(error);
    });

  }

};
</script>