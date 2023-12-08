<template>
 <div class='detail'>
  <div class="header">
    <span class="title">{{ detail.hospital?.hosname }}</span>
    <div class="level">
      <svg-icon  name="dianzan" color="red" />
      <span class="level-content">{{ detail.hospital?.param.hostypeString }}</span>
    </div>
  </div>
  <div class="content">
    <div class="left">
      <img :src="`data:image/jpeg;base64,${ detail.hospital?.logoData }`" alt="">
    </div>
    <div class="right">
      <div class="address">
        <svg-icon name="locate" />
        <p>具体地址：{{ detail.hospital?.param.fullAddress }}</p>
      </div>
      <div class="route">
        <p>规划路线：{{ detail.hospital?.route }}</p>
      </div>
    </div>
  </div>
  <div class="footer">
    <p class="title">医院介绍</p>
    <p class="intro">{{ detail.hospital?.intro }}</p>
  </div>
 </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia';
import useDetailStore from '@/store/modules/hospital'

const detailStore = useDetailStore()

const { detail } = storeToRefs(detailStore)
</script>

<style scoped lang='scss'>
.detail {
  font-size: 16px;

  .header {
    @include flex-center(flex-start);
    height: 50px;

    .title {
      font-size: 30px;
      font-weight: 900;
    }
    .level {
      margin-left: 10px;
      .level-content {
        margin-left: 10px;
      }
    }
  }
  .content {
    display: flex;
    font-size: 16px;
    margin-top: 20px;
    .left {
      width: 100px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right {
      flex: 1;
      p {
        line-height: 30px;
        text-indent: 10px;
        display: inline-block;
        
      }
      .route {
        p {
          text-indent: 0;
          padding-left: 25px;
        }
      }
    }
  }

  .footer {
    .title {
      font-size: 30px;
      font-weight: 900;
      line-height: 50px;
    }
    .intro {
      line-height: 30px;
      text-indent: 20px;
      display: inline-block;
    }
  }
}
</style>