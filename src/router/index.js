import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import Products from "@/components/Products.vue";
import Error404 from "@/components/Error404.vue";
import Home from "@/components/Home.vue";
import {useUserStore} from "@/store/ProductStore.js"
const routes = [
    {
        path: '/',
        component: Home
    },
    {
      path: '/products',
      component: Products,
        meta: { requiresAuth: true,
        }
    },
    {
        path: '/notfound',
        component: Error404,
    },

]

const  router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    const user = useUserStore()
    if (to.meta.requiresAuth && !user.isUser) {
        next('/notfound');
    } else {
        next();
    }
});

export default  router