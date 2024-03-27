
import { createWebHistory, createRouter } from "vue-router";

import CompanyList from '../components/company/CompanyList.vue';
import ComanyAdd from '../components/company/CompanyAdd.vue';
import CompanyEdit from '../components/company/CompanyEdit.vue';
import CompanyShow from '../components/company/CompanyShow.vue';


import CustomerList from '../components/customer/CustomerList.vue';
import CustomerAdd from '../components/customer/CustomerAdd.vue';
import CustomerEdit from '../components/customer/CustomerEdit.vue';
import CustomerShow from '../components/customer/CustomerShow.vue';


import HelloWorld from '../components/HelloWorld';


const routes = [
  { path: '/', component: HelloWorld },

  { path: '/company', component: CompanyList, name: 'company' },
  { path: '/company/add', component: ComanyAdd, name: 'company-add' },
  { path: '/company/edit/:id', component: CompanyEdit, name: 'company-edit' },
  { path: '/company/show/:id', component: CompanyShow, name: 'company-show' },
  { path: '/company/delete/:id' },

  { path: '/customer', component: CustomerList, name: 'customer' },
  { path: '/customer/add', component: CustomerAdd, name: 'customer-add' },
  { path: '/customer/edit/:id', component: CustomerEdit, name: 'customer-edit' },
  { path: '/customer/show/:id', component: CustomerShow, name: 'customer-show' },
  { path: '/customer/delete/:id'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;