<template>
 <MenuNav :info="menuInfo" />
</template>

<script setup lang='ts'>
import { onMounted, reactive, toRefs,markRaw } from 'vue';
import { useRoute } from 'vue-router'
import { Menu,HomeFilled,Document,Setting,Lock,RefreshLeft } from '@element-plus/icons-vue'
import useHospitalStore from '@/store/modules/hospital'
import MenuNav from '@/components/menu_nav/index.vue'

const $route = useRoute()
const hospitalStore = useHospitalStore()

const data = reactive({
  menuInfo: {
    title: {
      name: '医院信息',
      icon: markRaw(HomeFilled),
    },
    defaultActive: $route.path,
    menus: [
      { path: '/hospital/register',param: {code: $route.query.code},icon: markRaw(Menu),name: '预约挂号' },
      { path: '/hospital/detail',param: {code: $route.query.code},icon: markRaw(Document),name: '医院详情' },
      { path: '/hospital/notice',param: {code: $route.query.code},icon: markRaw(Setting),name: '预约须知' },
      { path: '/hospital/close',param: {code: $route.query.code},icon: markRaw(Lock),name: '停诊信息' },
      { path: '/hospital/check',param: {code: $route.query.code},icon: markRaw(RefreshLeft),name: '查询/取消' }
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
  hospitalStore.getDetail($route.query.code as string)
}

// 获取 医院科室数据
const getHospDepartmet = () => {
  hospitalStore.getDepartment($route.query.code as string)
}

</script>

<style scoped lang='scss'>
</style>