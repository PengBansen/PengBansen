import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home.vue' //首页
import Position from '../components/position.vue' //职位
import Work from '../components/work.vue' //工作
import Mine from '../components/mine.vue' //我的
import Router from '../components/router.vue' //路由页
import Register from '../components/register.vue' //登录
import Information from '../components/information.vue' //消息
import Search from '../components/search.vue' //搜索
import PositionParticulars from '../components/positionParticulars.vue' //职位详情
import Basics from '../components/basics.vue' //基本资料
import Details from '../components/details.vue' //职位详细
const router = createRouter({
    linkExactActiveClass: 'exact',
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: '/',
            redirect: '/Mine/:iiusdis', //我的
            meta: { keepAlive: true } // 设置需要被缓存的组件
        },
        {
            path: '/router',
            name: 'Router',
            component: Router, //路由页
            meta: { keepAlive: true }, // 设置需要被缓存的组件
            children: [
                {
                    path: '/home/:iiusdis',
                    name: 'Home',
                    component: Home, //首页
                    meta: { keepAlive: true }, // 设置需要被缓存的组件
                },
                {
                    path: '/position/:iiusdis',
                    name: 'Position',
                    component: Position, //职位
                    meta: { keepAlive: true }, // 设置需要被缓存的组件
                },
            ]
        },

        {
            path: '/',
            name: 'Register',
            component: Register, //登录
            meta: { keepAlive: true }, // 设置需要被缓存的组件

        },
        {
            path: '/register',
            name: 'Register',
            component: Register, //登录
        },
        {
            path: '/information/:iiusdis',
            name: 'Information',
            component: Information,  //消息
        },
        {
            path: '/positionParticulars/:iiusdis',
            name: 'PositionParticulars',
            component: PositionParticulars, //职位申请详情
            meta: { keepAlive: true }, // 设置需要被缓存的组件
        },
        {
            path: '/search/:iiusdis',
            name: 'Search',
            component: Search, //搜索
            meta: { keepAlive: true }, // 设置需要被缓存的组件

        },
        {
            path: '/basics/:iiusdis',
            name: 'Basics',
            component: Basics, // 基本资料
            meta: { keepAlive: true }, // 设置需要被缓存的组件
        },
        {
            path: '/details/:iiusdis',
            name: 'Details',
            component: Details, //职位详细信息
            meta: { keepAlive: true }, // 设置需要被缓存的组件
        },
        {
            path: '/work/:iiusdis',
            name: 'Work',
            component: Work, //工作
            meta: { keepAlive: true }, // 设置需要被缓存的组件
        },
        {
            path: '/mine/:iiusdis',
            name: 'Mine',
            meta: { keepAlive: true }, // 设置需要被缓存的组件,
            component: Mine, //我的
        },
    ],
    // 初始化滚动条
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // 如果有保存的滚动位置，则恢复到该位置
            return savedPosition;
        } else {
            // 没有保存的滚动位置时，设置滚动条位置
            const scrollX = 0; // 设置水平滚动位置
            const scrollY = 0; // 设置垂直滚动位置
            return { top: scrollY, left: scrollX };
        }
    }
})


export default router
