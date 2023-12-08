<template>
 <div class=''></div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router'
import { setItem } from '@/utils/cache'

const $route = useRoute()

// 访问到此路由组件说明授权成功

// 持久化存储用户信息
setItem('USERINFO',JSON.stringify($route.query))

// 对此页面进行隐藏
let html:any = document.querySelector('html')
html.style.display = 'none'
</script>

<style scoped lang='scss'>

</style>