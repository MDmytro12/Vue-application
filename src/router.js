import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'

Vue.use(Router)

const router = new Router({
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
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            meta: {
                layout: 'main',
                auth : true
            }
        },
        {
            path: '/history',
            name: 'history',
            meta : {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/History.vue')
        },
        {
            path: '/categories',
            name: 'categories',
            meta:{
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Categories.vue')
        },
        {
            path: '/detail-record',
            name: 'detaile-record',
            component: () => import('./views/DetailRecord.vue'),
            meta : {
                layout : 'main',
                auth: true
            }
        },
        {
            path: '/planning',
            name: 'planning',
            meta : {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Planning.vue')
        },
        {
            path: '/profile' ,
            name: 'profile',
            meta: {
                layout: 'main',
                auth: true
            },
            component: () => import('./views/Profile.vue')
        },
        {
            path: '/record',
            name : 'record',
            meta : {
                layout: 'main',
                auth: true
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

router.beforeEach(( to , from , next ) => {
    const currentUser = firebase.auth().currentUser
    const requireAuth = to.matched.some( record => record.meta.auth )
    console.log(currentUser , requireAuth)
    next()
})

export default router
