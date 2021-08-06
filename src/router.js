import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode : 'history',
    routes : [
        {
            path: '/login',
            name : 'login',
            component: () => import('./views/Login.vue'),
            meta: {
                layout : 'empty'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./views/Home.vue'),
            meta: {
                layout: 'main'
            }
        },
        {
            path: '/history',
            name: 'history',
            meta : {
                layout: 'main'
            },
            component: () => import('./views/History.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            meta:{
                layout: 'main'
            },
            component: () => import('./views/Categories.vue')
        },
        {
            path: '/detail-record',
            name: 'detaile-record',
            component: () => import('./views/DetailRecord.vue'),
            meta : {
                layout : 'main'
            }
        },
        {
            path: '/planning',
            name: 'planning',
            meta : {
                layout: 'main'
            },
            component: () => import('./views/Planning.vue')
        },
        {
            path: '/profile' ,
            name: 'profile',
            meta: {
                layout: 'main'
            },
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/record',
            name : 'record',
            meta : {
                layout: 'main'
            },
            component: () => import('./views/Record.vue')
        },
        {
            path: '/register',
            name: 'register',
            meta : {
                layout: 'empty'
            },
            component: () => import('./views/Register.vue')
        }
    ]
})
