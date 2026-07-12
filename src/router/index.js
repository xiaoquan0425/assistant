import { createRouter, createWebHistory } from 'vue-router'
import backendlayout from '@/components/backendlayout.vue'
import Authlayout from '@/components/Authlayout.vue'
import FrontedLayout from '@/components/FrontedLayout.vue'
const backendRoutes = [
    {
        path: '/back',
        redirect: '/back/dashboard',
        component: backendlayout,
        children: [{

            path: 'dashboard',
            component: () => import('@/views/dashboard.vue'),
            meta: {
                title: '数据分析',
                icon: 'PieChart'
            }
        },
        {
            path: 'knowledge',
            component: () => import('@/views/knowledge.vue'),
            meta: {
                title: '知识文章',
                icon: 'ChatLineSquare'
            }
        },
        {
            path: 'consultations',
            component: () => import('@/views/consultations.vue'),
            meta: {
                title: '咨询记录',
                icon: 'Message'
            }
        },
        {
            path: 'emotional',
            component: () => import('@/views/emotional.vue'),
            meta: {
                title: '情绪日志',
                icon: 'User'
            }
        }

        ]

    }, {
        path: '/auth',
        component: Authlayout,
        children: [{
            path: 'login',
            component: () => import('@/views/login.vue'),
            meta: {
                title: '登录',
            }
        },
        {
            path: 'register',
            component: () => import('@/views/register.vue'),
            meta: {
                title: '注册',
            }
        }
        ]
    }
]
const frontedRoutes = [
    {
        path: '/',
        component: FrontedLayout,
        children: [{
            path: '',
            component: () => import('@/views/home.vue'),
        }, {
            path: 'consultation',
            component: () => import('@/views/consultation.vue'),
        }, {
            path: 'emotion-diary',
            component: () => import('@/views/emotionDiary.vue'),
        }, {
            path: 'knowledge',
            component: () => import('@/views/frontedknowledge.vue'),
        }

        ]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: [...backendRoutes, ...frontedRoutes]
})
//路由前置守卫
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        //如果是后台用户
        if (userInfo.userType === 2) {
            if (to.path.startsWith('/back')) {
                next()
            } else {
                next('/back/dashboard')
            }
        } else if (userInfo.userType === 1) {
            //用户端只能访问前台路由
            if (to.path.startsWith('/back') || to.path.startsWith('/auth')) {
                next('/')
            } else {
                next();
            }
        }
    } else {
        if (to.path.startsWith('/back')) {
            //如果是访问后台页面，则跳转到登录页面
            next('/auth/login')
        } else {
            next()
        }
    }
})
export default router