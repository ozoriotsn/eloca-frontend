<template>
  <div class="hello">

    <div class="container text-center">

      <div class="row">

        <div class="col">
          <h1>ELOCA TEST</h1>
          <img src="https://academy.eloca.com.br/wp-content/uploads/2023/03/image16.png" alt="Eloca Logo" width="500px">

        </div>
      </div>

      <div class="row">

        <div class="col-lg-12">
          <router-link class="btn btn-primary btn-lg" to="company" role="button">Empresas</router-link>
        </div>

        <div class="col-lg-12">
          <router-link class="btn btn-primary btn-lg" to="customer" role="button">Clientes</router-link>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  margin: 10px;
}
</style>
