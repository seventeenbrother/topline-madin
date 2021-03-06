import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import { getUser } from '@/utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        {
          name: 'media',
          path: '/media',
          component: () => import('@/views/media')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  // 获取登录状态
  // const user = window.localStorage.getItem('user_message')
  const user = getUser()
  if (to.path === '/login') {
    // 去的是登录页
    if (user) {
      // 已经是登录状态，跳转到home
      next({ name: 'home' })
      window.location.reload()
    } else {
      // 未登录状态允许访问
      next()
    }
  } else {
    // 去的不是登录页
    if (!user) {
      // 未登录状态不允许访问，跳转到登录页
      next({ path: '/login' })
    } else {
      // 登录状态允许通过
      next()
    }
  }
})
router.afterEach((to, from) => {
  nprogress.done()
})
export default router
/**
  当跳转成功后调到layout页面
 */
