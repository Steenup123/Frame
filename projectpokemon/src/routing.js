import { createRouter, createWebHistory } from "vue-router";

import Home from './Home.vue';
import Pokemon from './Pokemon.vue'
import ErrorPage from './ErrorPage.vue'

const routes = [
    {
        // Homepage
        path: '/',
        component: Home,
    },
    {
        // Détail d'un pokémon. Props true pour passer l'id du pokémon
        path: '/pokemon/:id',
        component: Pokemon,
        props: true,
    },
    // Tout ce qui n'est pas compris dans les deux premières routes
    {
        path: '/:pathMatch(.*)*',
        component: ErrorPage,
        name: 'ErrorPage'
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});