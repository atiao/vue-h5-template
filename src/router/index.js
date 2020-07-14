import Vue from "vue"
import VueRouter from "vue-router"

import Index from "../pages/index"
import OffLine from '../pages/offline'
import Error from '../pages/error404'

// 解决路由多次点击导致的router push  replace 报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 异步加载可用
function loadView(view) {
    return () => import(/* webpackChunkName: "load-[request]" */ `@/pages/${view}/${view}.vue`);
}

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/offLine',
        name: 'offLine',
        component: OffLine,
        meta: {
            title: '断网页面'
        }
    },
    {
        path: '*',
        component: Error
    }
]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     next
// })

// router.afterEach(to => {
//     let title = to.meta.title
// })

export default router
