import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LocationView from '../views/LocationView.vue'
import Configureteams from '../views/Configureteams.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/location',
            name: 'location',
            component: LocationView,
        },
        {
            path: '/configureteams',
            name: 'configureteams',
            component: Configureteams,
        },
    ],
});
export default router;
