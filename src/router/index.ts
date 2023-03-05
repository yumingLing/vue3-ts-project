import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/login',
        component: () => import('@/views/login/login.vue')
      }
    ]
    // children: [] -> 根据userMenus来决定 -> children
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL)
})

// 用户默认是跳到首页的，如果没有登录就跳到登录页面
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      console.log('没有登，跳转登页面')

      router.push('/login')
    }
  }
})

export default router
