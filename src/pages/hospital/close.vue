<template>
 <div class='close'>
  <h1 class="title">{{ detail.hospital?.hosname }}停诊信息</h1>
  <!--<div v-if="detail.bookingRule?.quitDay"></div>-->
  <el-empty description="暂无数据" />
 </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import useDetailStore from '@/store/modules/hospital'

const detailStore = useDetailStore()

const { detail } = storeToRefs(detailStore)
</script>

<style scoped lang='scss'>
.close {
  margin-top: 20px;
  .title {
    font-size: 30px;
    font-weight: 900;
    text-align: center;
    line-height: 50px;
  }
}
</style>