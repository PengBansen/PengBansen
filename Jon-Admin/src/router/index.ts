import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/admin.vue' //管理员
import Entry from '../views/entry.vue' //已入职
import ApplyFor from '../views/applyFor.vue' //申请
import Inform from '../views/inform.vue' //通知

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '/',
      redirect: '/Admin', //管理员
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin //管理员
    },
    {
      path: '/entry',
      name: 'entry',
      component: Entry //已入职
    },
    {
      path: '/applyFor',
      name: 'applyFor',
      component: ApplyFor  //申请
    },
    {
      path: '/inform',
      name: 'inform',
      component: Inform //通知
    },
  ]
})

export default router
