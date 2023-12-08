// 路由鉴权
import router from "./router";
// @ts-ignore
import Nprogress from 'nprogress'
// 进度条样式
import 'nprogress/nprogress.css'
import useUserStore from '@/store/modules/user'

// 用户未登录可以访问的路径
let whiteList = ['/home','/hospital/register','/hospital/detail','/hospital/notice','/hospital/close','/hospital/check']

// 取消小圆圈效果
Nprogress.configure({showSpinner: false})

// 路由全局前置守卫
router.beforeEach((to,from,next) => {
  // 进度条开始显示
  Nprogress.start()
  // 注意：useUserStore()必须放在路由守卫中，否则，持久化无效
  let userStore = useUserStore()
  if(userStore.userInfo.token) { // 已登录
    next()
  } else {
    // 用户未登录可以访问
    if(whiteList.includes(to.path)) {
      next()
    } else {
      // 显示登录组件
      userStore.showLogin = true
      next({path: '/home',query: {redirect: to.fullPath}})
    }
  }
})
// 路由全局后置守卫
router.afterEach((to,from) => {
  // 进度条结束
  Nprogress.done()
  document.title = '尚医通-' + (to.meta.title as string)
})