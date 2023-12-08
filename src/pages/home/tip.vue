<template>
 <div class='tip'>
  <!-- 常见科室结构 -->
  <div class="department">
    <div class="header">
      <div class="left">
        <svg-icon  name="department" size="18px" color="red" />
        <span>常见科室</span>
      </div>
      <div class="right">
        <span>全部</span>
        <svg-icon  name="arrow-right" size="18px" />
      </div>
    </div>
    <div class="content">
      <span class="item" v-for="(item,index) in departments" :key="index">{{ item }}</span>
    </div>
  </div>
  <!-- 平台公告 -->
  <div class="department mt-20">
    <div class="header">
      <div class="left">
        <svg-icon  name="alarm" size="18px" />
        <span>平台公告</span>
      </div>
      <div class="right">
        <span>全部</span>
        <svg-icon  name="arrow-right" size="18px" />
      </div>
    </div>
    <div class="notice">
      <span class="item" v-for="(item,index) in notice1" :key="index">{{ item }}</span>
    </div>
  </div>
  <!-- 停诊公告 -->
  <div class="department mt-20">
    <div class="header">
      <div class="left">
        <svg-icon  name="notice" size="18px" />
        <span>停诊公告</span>
      </div>
      <div class="right">
        <span>全部</span>
        <svg-icon  name="arrow-right" size="18px" />
      </div>
    </div>
    <div class="notice">
      <span class="item" v-for="(item,index) in notice2" :key="index">{{ item }}</span>
    </div>
  </div>
 </div>
</template>

<script setup lang='ts'>
import { reactive,toRefs } from 'vue';


const data = reactive({
  departments: ['神经内科','消化内科','呼吸内科','内科','神经外科','妇科','产科','儿科'],
  notice1: ['关于延长北京大学国际医院放假通知','北京中医药大学东方医院部分科室医生门诊','武警总医院号源暂停更新通知'],
  notice2: ['关于延长北京大学国际医院放假通知','北京中医药大学东方医院部分科室医生门诊','武警总医院号源暂停更新通知'],
})

let { departments,notice1,notice2 } = toRefs(data)
</script>

<style scoped lang='scss'>
.department {
  .header {
    @include flex-center(space-between);

    .left,.right {
      display: flex;
      align-items: center;
    }
    .left {
      span {
        margin-left: 5px;
      }
    }
    .right {
      span {
        margin-right: 5px;
      }
    }
  }
  .content {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      line-height: 30px;
    }
  }

  .notice {
    margin-top: 10px;
    .item {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 30px;
    }
  }
}

</style>