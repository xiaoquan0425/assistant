import { createRouter, createWebHistory } from 'vue-router'
import backendlayout from '@/components/backendlayout.vue'
const backendRoutes = [
    {
        path: '/back',
        component: backendlayout,
        children: [{

            path: 'dashboard',
            component: () => import('@/views/dashboard.vue')

        }]

    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: backendRoutes
})
export default router