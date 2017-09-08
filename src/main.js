// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Alarm'
import Add from './components/AddNewItem'
import Edit from './components/AlarmEdit'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: Add },
  { path: '/home', component: Home },
  { path: '/edit/:id', component: Edit, props: true }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
