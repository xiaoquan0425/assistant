import { createRouter, createWebHistory } from 'vue-router'
import backendlayout from '@/components/backendlayout.vue'
const backendRoutes = [
    {
        path: '/back',
        component: backendlayout,
        children: [

            //path: '/back/index',
            //component: () => import('@/views/backendindex.vue')

        ]

    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: backendRoutes
})
export default router