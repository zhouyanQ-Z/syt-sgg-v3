<template>
 <div class="search">
    <el-autocomplete
      v-model="keyword"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      clearable
      class="search-input"
      placeholder="请输入医院名称"
      @select="handleSelect"
    />
    <el-button type="primary"  @click="onSearch">
      <el-icon :size="25"><i-ep-Search /></el-icon>
    </el-button>
    
 </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router'
import { HospContent } from '@/type/api/hospital'
import { reqHospByname } from '@/api/home'

const $router = useRouter()

const data = reactive<{
  keyword: string,
  hospitals: HospContent[]
}>({
  keyword: '',
  hospitals: []
})

const { keyword,hospitals } = toRefs(data)

// 整理数据
const createFilter = (data:HospContent[]) => {
  return data.map(item => {
    return {
      value: item.hosname,
      hoscode: item.hoscode
    }
  })
}

// Autocomplete 组件返回建议
const querySearch = (queryString: string, cb: any) => {
  // 当用户输入完关键字此函数执行一次，可进行发请求获取数据
  queryString && reqHospByname(queryString).then(res => {
    if(res.code === 200) {
      // 对返回来的数据进行整理并触发回调
      cb(createFilter(res.data))
    }
  })
}

// 选中搜索内容
const handleSelect = (item: {value: string,hoscode: string}) => {
  // 进入详情页，携带 query 参数
  $router.push({path: '/hospital/register',query: {code: item.hoscode}})
}

// 点击搜索
const onSearch = () => {

}
</script>

<style scoped lang='scss'>
.search {
  height: 100px;
  margin: 10px auto;
  @include flex-center();

  ::v-deep(.search-input) {
    width: 70%;

    .el-input__wrapper {
      box-sizing: border-box;
      height: 50px;
    }
  }

  .el-button  {
    width: 80px;
    height: 50px;
  }
}
</style>