import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Alarm'
import Add from '@/components/AddNewItem'
import Edit from '@/components/AlarmEdit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/add', component: Add },
    { path: '/home', component: Home },
    { path: '/edit/:id', component: Edit, props: true }
  ]
})
