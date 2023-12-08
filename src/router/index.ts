import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue'),
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue'),
          meta: { title: '预约挂号' }
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail.vue'),
          meta: { title: '医院详情' }
        },
        {
          path: 'notice',
          component: () => import('@/pages/hospital/notice.vue'),
          meta: { title: '预约须知' }
        },
        {
          path: 'close',
          component: () => import('@/pages/hospital/close.vue'),
          meta: { title: '停诊信息' }
        },
        {
          path: 'check',
          component: () => import('@/pages/hospital/check.vue'),
          meta: { title: '查询/取消' }
        },
        {
          path: 'register_step1',
          component: () => import('@/pages/hospital/register/register-step1.vue'),
          meta: { title: '预约第1步' }
        },
        {
          path: 'register_step2',
          component: () => import('@/pages/hospital/register/register-step2.vue'),
          meta: { title: '预约第2步' }
        },
      ]
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/user/certification.vue'),
          meta: { title: '实名认证' }
        },
        {
          path: 'order',
          component: () => import('@/pages/user/order/index.vue'),
          meta: { title: '挂号订单' }
        },
        {
          path: 'patient',
          component: () => import('@/pages/user/patient.vue'),
          meta: { title: '就诊人管理' }
        },
        {
          path: 'profile',
          component: () => import('@/pages/user/profile.vue'),
          meta: { title: '账号信息' }
        },
        {
          path: 'feedback',
          component: () => import('@/pages/user/feedback.vue'),
          meta: { title: '意见反馈' }
        },
      ]
    },
    {
      path: '/wxlogin',
      component: () => import('@/pages/wxlogin/index.vue')
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],
  // 滚动行为：控制滚动条的位置
  scrollBehavior(){
    return {
      left: 0,
      top: 0
    }
  }
})