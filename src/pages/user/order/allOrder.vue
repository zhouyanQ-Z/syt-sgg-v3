<template>
  <el-card class="box-card">
    <!-- 头部 -->
   <template #header>
     <div class="card-title">挂号订单</div>
   </template>
   <!-- body 部分顶部 -->
   <el-form inline :model="formParam" class="demo-form-inline">
    <el-form-item label="就诊人">
      <el-select
        v-model="formParam.patient"
        placeholder="选择所有患者"
        clearable
        @change="selectPatient"
      >
        <el-option label="全部就诊人" value="" />
        <el-option v-for="item in patientArr"  :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="就诊状态">
      <el-select
        v-model="formParam.status"
        placeholder="选择所有订单状态"
        clearable
        @change="selectStatus"
      >
        <el-option label="全部订单" value="" />
        <el-option v-for="(item,index) in statusArr"  :key="index" :label="item.comment" :value="item.status" />
      </el-select>
    </el-form-item>
  </el-form>
   <!-- body 部分底部 -->
   <el-table :data="orderData" style="width: 100%" border>
    <el-table-column align="center" prop="reserveDate" label="就诊时间" />
    <el-table-column align="center" prop="hosname" label="就诊医院"  />
    <el-table-column align="center" prop="depname" label="科室"  />
    <el-table-column align="center" prop="title" label="医生" />
    <el-table-column align="center" prop="amount" label="医事服务费" />
    <el-table-column align="center" prop="patientName" label="就诊人" />
    <el-table-column align="center" prop="param.orderStatusString" label="订单状态" width="180" />
    <el-table-column align="center" fixed="right" label="操作" width="120">
      <template #default="{row}">
        <el-button link type="primary" size="small" @click="toDetail(row.id)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页器 -->
  <Pagination 
    :hidden="orderData.length==0" 
    :total="pagination.total" 
    v-model:page="pagination.pageNo" 
    v-model:limit="pagination.pageSize" 
    @pagination="getOrderList" />
  </el-card>
 </template>
 
 <script setup lang='ts'>
 import { onMounted, reactive, toRefs } from 'vue';
 import { useRouter } from 'vue-router'
 import { OrderInfoRes,OrderStatusItf } from '@/type/api/order'
 import { VisitorItf } from '@/type/api/user'
 import { reqOrderList,reqOrderStatus } from '@/api/order';
 import { reqAllPatient } from '@/api/user';


 const $router = useRouter()
 
 const data = reactive({
  orderData: ([] as OrderInfoRes[]),
  formParam: {
    patient: '',
    status: ''
  },
  pagination: {
    pageNo: 1,
    pageSize: 10,
    total: 0
  },
  patientArr: ([] as VisitorItf[]),
  statusArr: ([] as OrderStatusItf[])
 })

 const { orderData,formParam,pagination,patientArr,statusArr } = toRefs(data)
 
 onMounted(() => {
  // 获取 订单列表数据
  getOrderList()
  // 获取 所有就诊人数据
  getPatients()
  // 获取 订单状态数据
  getOrderStatus()
 })
 
 // 获取 订单列表数据
 const getOrderList = () => {
  reqOrderList(pagination.value.pageNo,pagination.value.pageSize,formParam.value.patient,formParam.value.status).then(res => {
    if(res.code === 200) {
      orderData.value = res.data.records
      pagination.value.total = res.data.total
    }
  })
 }
 // 获取 所有就诊人数据
 const getPatients = () => {
  reqAllPatient().then(res => {
    if(res.code === 200) {
      patientArr.value = res.data
    }
  })
 }
 // 获取 订单状态数据
 const getOrderStatus = () => {
  reqOrderStatus().then(res => {
    if(res.code === 200) {
      statusArr.value = res.data
    }
  })
 }

// 查看订单详情
const toDetail = (id: string) => {
  $router.push({path: '/user/order',query: {id}})
}
// 选择就诊人
const selectPatient = (val: any) => {
  getOrderList()
}
// 选择订单状态
const selectStatus = (val: any) => {
  getOrderList()
}

 </script>
 
 <style scoped lang='scss'>
 .box-card {
   .card-title {
     font-size: 18px;
     font-weight: 900;
   }
 }
 

 </style>