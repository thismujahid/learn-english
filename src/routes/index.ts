import { createRouter, createWebHistory } from "vue-router";

const appRouter = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import("../pages/Home.vue")
        },
        {
            path: '/tenses-cards',
            component: () => import("../pages/TensesCards.vue")
        },
        {
            path:"/:pathMatch(.*)*",
            component: () => import("../pages/NotFound.vue")
        }
    ],
})
export default appRouter