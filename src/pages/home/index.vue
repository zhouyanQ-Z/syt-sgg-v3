<template>
  <div class="home">
    <!--首页轮播图-->
    <Carousel />
    <!-- 搜索输入框 -->
    <Search />
    <!-- 首页医院结构 -->
    <el-row :gutter="20">
      <el-col :span="20">
        <h1 class="name">医院</h1>
        <!-- 等级 -->
        <Level :title="'等级'" :list-data="levelList" @on-choose="onChoose"/>
        <!-- 地区 --> 
        <Level :title="'地区'" :list-data="regionList" @on-choose="onChoose" />
        <!-- 医院信息 -->
        <div class="hospital" v-if="hospital.length">
          <Card class="item" v-for="item in hospital" :key="item.id" :info="item" />
        </div>
        <el-empty description="没有数据" v-else />
        <!-- 分页器 -->
        <Pagination 
          :hidden="hospital.length==0" 
          :total="pagination.total" 
          v-model:page="pagination.pageNo" 
          v-model:limit="pagination.pageSize" 
          @pagination="getHospital" />
      </el-col>
      <el-col :span="4">
        <Tip />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs,onMounted } from 'vue';
import Carousel from './carousel.vue'
import Search from './search.vue'
import Level from './level.vue'
import Card from './card.vue'
import Tip from './tip.vue'
import { HomeData, } from '@/type/home'
import { reqHospital,reqLevelAndRegion } from '@/api/home'

const data = reactive(new HomeData())

const { levelList,regionList,pagination,hospital,hostype,districtCode } = toRefs(data)

onMounted(() => {
  getHospital()
  getLevel()
  getRegion()
})

// 获取医院数据
const getHospital = () => {  
  reqHospital(pagination.value.pageNo,pagination.value.pageSize,hostype.value,districtCode.value).then(res => {    
    if(res.code === 200) {
      hospital.value = res.data.content
      pagination.value.total = res.data.totalElements
    }
  })
}

// 获取医院等级数据
const getLevel = () => {
  reqLevelAndRegion('HosType').then(res => {
    if(res.code === 200) {
      levelList.value = res.data
    }
  })
}
// 获取医院地区数据
const getRegion = () => {
  reqLevelAndRegion('Beijin').then(res => {
    if(res.code === 200) {
      regionList.value = res.data
    }
  })
}

// 选择等级或地区的自定义回调
const onChoose = (type: number,id: string) => {  
  if(type === 1) {
    hostype.value = id
  } else {
    districtCode.value = id
  }
  getHospital()
}
</script>

<style scoped lang="scss">
.home {

  .name {
    font-weight: 900;
    line-height: 50px;
  
  }

  .hospital {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      width: 48%;
    }
  }
}
</style>