<template>
 <div class='register-step2'>
  <h1 class="title">确认挂号信息</h1>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>选择就诊人</span>
        <el-button type="success" size="large" @click="addUser">
          <el-icon><i-ep-UserFilled /></el-icon>
          <span>添加就诊人</span>
        </el-button>
      </div>
    </template>
    <div class="content">
      <Visitor v-for="(item,index) in visitors" :key="item.id" :visitor="item" :index="index" :curIndex="curIndex" @click="onSelect(index)" />
    </div>
  </el-card>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <div class="content-box">
      <el-descriptions
        class="margin-top"
        :column="2"
        border
      >
        <el-descriptions-item label="就诊日期：">{{ doctorInfo.workDate }}</el-descriptions-item>
        <el-descriptions-item label="就诊医院">{{ doctorInfo.param?.hosname }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室">{{ doctorInfo.param?.depname}}</el-descriptions-item>
        <el-descriptions-item label="医生姓名">{{ doctorInfo.docname }}</el-descriptions-item>
        <el-descriptions-item label="医生职称">{{ doctorInfo.title }}</el-descriptions-item>
        <el-descriptions-item label="医生专长">{{ doctorInfo.skill }}</el-descriptions-item>
        <el-descriptions-item label="医事服务费">
          <span style="color: red;">{{ doctorInfo.amount }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
  <el-button type="primary" size="large" :disabled="!isSelect" class="confirm-btn" @click="goUser">确认挂号</el-button>
 </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive,toRefs } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import Visitor from '@/components/visitor/index.vue';
import type { DoctorItf } from '@/type/api/hospital'
import type { VisitorItf } from '@/type/api/user'
import { reqDoctorInfo } from '@/api/hospital'
import { reqGuester } from '@/api/user'
import { reqCreateOrder } from '@/api/order'
import { msgError } from '@/utils/modal';



const $router = useRouter()
const $route = useRoute()


const data = reactive({
  visitors: ([] as VisitorItf[]),
  doctorInfo: ({} as DoctorItf),
  curIndex: -1, // 当前选择就诊人的索引
  isSelect: false, // 是否已选择就诊人
})

let { visitors,doctorInfo,curIndex,isSelect }= toRefs(data)

onMounted(() => {
  getVisitorData()
  getDoctorData()
})

// 获取就诊人信息
const getVisitorData = () => {
  reqGuester().then(res => {
    if(res.code === 200) {
      visitors.value = res.data
    }
  })
}
// 获取就诊医生信息
const getDoctorData = () => {
  reqDoctorInfo($route.query.docId as string).then(res => {
    if(res.code === 200) {
      doctorInfo.value = res.data
    }
  })
}

// 添加就诊人
const addUser = () => {
  $router.push({path: '/user/patient',query: {type: 'add'}})
}

// 选择就诊人
const onSelect = (index: number) => {
  curIndex.value = index
  isSelect.value = true

}

// 确认挂号
const goUser = () => {
  // 发送请求获取订单号
  reqCreateOrder(doctorInfo.value.hoscode,doctorInfo.value.id,visitors.value[curIndex.value].id).then(res => {
    if(res.code === 200) {
      $router.push({path: '/user/order',query: {id: res.data}})
    } else {
      msgError(res.message||'请求失败')
    }
  })
  
}
</script>

<style scoped lang='scss'>
.register-step2 {

  .title {
    font-size: 30px;
    font-weight: 900;
    line-height: 50px;
  }

  .box-card {
    margin: 20px 0;

    .card-header {
      @include flex-center(space-between);
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .visitor-box {
        width: 32%;
        margin: 5px;
      }
    }
  }
  .confirm-btn {
    width: 20%;
    margin: 0 auto;
    display: block;
    margin-bottom: 30px;
  }
}
</style>