// createRouter:创建一个路由
import { createRouter, createWebHistory } from "vue-router"
import home from "../home.vue"
import briefIntroduction from "../briefIntroduction.vue"
import problem from "../problem.vue"
import position from "../position.vue"

const router = createRouter({
    linkExactActiveClass: 'exact',
    history: createWebHistory(),
    routes: [
        {
            //没写就是任意路由都是定向这个
            path: "",
            //重定向
            redirect: "/home",
        },
        {
            path: '/',
            component: home
        },
        {
            path: '/home',
            component: home
        },
        {
            path: '/briefIntroduction',
            component: briefIntroduction
        },
        {
            path: '/problem',
            component: problem
        },
        {
            path: '/position',
            component: position
        }
    ]
})
export default router