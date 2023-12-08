<template>
  <MenuNav :info="menuInfo" />
 </template>
 
 <script setup lang='ts'>
 import { onMounted, reactive, toRefs,markRaw } from 'vue';
 import { useRoute } from 'vue-router'
 import { User,House,Postcard,Memo,Document,ChatDotRound } from '@element-plus/icons-vue'
 import useHospitalStore from '@/store/modules/hospital'
 import MenuNav from '@/components/menu_nav/index.vue'
 
 const $route = useRoute()
 const hospitalStore = useHospitalStore()
 
 const data = reactive({
   menuInfo: {
     title: {
       name: '会员中心',
       icon: markRaw(House),
     },
     defaultActive: $route.path,
     menus: [
       { path: '/user/certification',param: {code: $route.query.code},icon: markRaw(Postcard),name: '实名认证' },
       { path: '/user/order',param: {code: $route.query.code},icon: markRaw(Memo),name: '挂号订单' },
       { path: '/user/patient',param: {code: $route.query.code},icon: markRaw(User),name: '就诊人管理' },
       { path: '/user/profile',param: {code: $route.query.code},icon: markRaw(Document),name: '账号信息' },
       { path: '/user/feedback',param: {code: $route.query.code},icon: markRaw(ChatDotRound),name: '意见反馈' }
     ]
   }
 })
 
 const { menuInfo } = toRefs(data)
 
 onMounted(() => {
   getHospDetail()
   getHospDepartmet()
 })
 
 // 获取 医院详情数据
 const getHospDetail = () => {
  if($route.query.code) hospitalStore.getDetail($route.query.code as string)
 }
 
 // 获取 医院科室数据
 const getHospDepartmet = () => {
  if($route.query.code) hospitalStore.getDepartment($route.query.code as string)
 }
 
 </script>
 
 <style scoped lang='scss'>
 
 </style>