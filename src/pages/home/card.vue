<template>
  <el-card shadow="hover" @click="goDetail"> 
    <div class="content">
      <div class="left">
        <div class="hospital-name">{{ info.hosname }}</div>
        <div class="tip">
          <div class="level">
            <svg-icon  name="dianzan" />
            <span>{{ info.param.hostypeString }}</span>
          </div>
          <div class="time">
            <svg-icon  name="clock" />
            <span>每天{{ info.bookingRule?.releaseTime }}放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${info.logoData}`" alt="">
      </div>
    </div>  
  </el-card>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'


const $router = useRouter()

const props = defineProps(['info'])


const goDetail = () => {
  $router.push({path: '/hospital/register',query: {code: props.info.hoscode}})
}
</script>

<style scoped lang='scss'>
.el-card {
  margin: 10px 0;
}
.content {
  @include flex-center(space-between);
  color: $font-color;
  
  .left {
    width: 60%;
    .tip {
      @include flex-center(space-between);
      margin-top: 15px;
      .level,.time {
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
    }
  }
  .right {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>