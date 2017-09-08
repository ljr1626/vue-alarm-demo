import Add from './AddNewItem.vue'
import VueRouter from 'vue-router'
const routes = [
  { path: '/add', component: Add }
]

const router = new VueRouter({
  routes 
})