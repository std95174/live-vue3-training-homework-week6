import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from "axios";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomeView,
            children: [
                {
                    path: '',
                    name: 'Index',
                    component: () => import('../views/IndexView.vue')
                },
                {
                    path: 'products',
                    name: 'Products',
                    component: () => import('../views/ProductsView.vue')
                },
                {
                    path: 'product/:id',
                    name: 'Product',
                    component: () => import('../views/ProductView.vue')
                },
                {
                    path: 'cart',
                    name: 'Cart',
                    component: () => import('../views/CartView.vue')
                },
                {
                    path:'login',
                    name: 'Login',
                    component: () => import('../views/LoginView.vue')
                }
            ]
        },
        {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/admin/AdminView.vue'),
            meta: {requiresAuth: true},
            children: [
                {
                    path: '',
                    name: 'AdminProducts',
                    component: () => import('../views/admin/AdminProductsView.vue'),
                },
                {
                    path: 'orders',
                    name: 'AdminOrders',
                    component: () => import('../views/admin/AdminOrdersView.vue'),
                }
            ]
        }
    ]
})
router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // get hexToken from cookie
        const hexToken = getCookie('hexToken');
        if (hexToken) {
            try {
                axios.defaults.headers.common['Authorization'] = hexToken;
                const {data} = await axios.post(`https://vue3-course-api.hexschool.io/v2/api/user/check`)
                if (data.success) {
                    next();
                } else {
                    next({name: 'Login'})
                }
            } catch (e) {
                console.log(e)
                next({name: 'Login'})
            }
        } else {
            next({name: 'Login'})
        }
    } else {
        next();
    }
})

function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export default router
