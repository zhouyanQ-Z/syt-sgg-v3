<template>
 <div class='register'>
  <div class="header">
    <span class="title">{{ detail.hospital?.hosname }}</span>
    <div class="level">
      <svg-icon  name="dianzan" color="red" />
      <span class="level-content">{{ detail.hospital?.param.hostypeString }}</span>
    </div>
  </div>
  <div class="content">
    <div class="left">
      <img :src="`data:image/jpeg;base64,${detail.hospital?.logoData}`" alt="">
    </div>
    <div class="right">
      <div class="title">挂号规则</div>
      <div class="time">
        <p>预约周期：10天；</p>
        <p>放号时间：{{ detail.bookingRule?.releaseTime }}；</p>
        <p>停挂时间：{{ detail.bookingRule?.quitTime }}</p>
      </div>
      <div class="address">
        <p>具体地址：{{ detail.hospital?.param.fullAddress }}</p>
      </div>
      <div class="route">
        <p>规划路线：{{ detail.hospital?.route }}</p>
        <!--<span>乘车路线：{{  }}</span>-->
      </div>
      <div class="stop">
        <p>退号时间：就诊前一工作日 <span style="{color: blue;}">{{ detail.bookingRule?.stopTime }}</span> 前取消</p>
      </div>
      <div class="title">医院预约规划</div>
      <div class="rule">
        <p class="ruleInfo" v-for="(item,index) in detail.bookingRule?.rule" :key="index">{{ (index+1)+'.'+item }}</p>
      </div>
    </div>
  </div>
  <!-- 科室结构 -->
  <div class="department-box">
    <div class="left">
      <div class="nav-item" :class="{ actived: currentIndex=== index}" v-for="(nav,index) in department" :key="nav.depcode" @click="changeIndex(index)">{{ nav.depname }}</div>
    </div>
    <div class="right">
      <div class="department-item"  v-for="(dep,index) in department" :key="dep.depcode">
        <div class="dep-name">{{ dep.depname }}</div>
        <div class="children" v-if="dep.children?.length">
          <span v-for="item in dep.children" :key="item.depcode" class="child" @click="goRegister(item)">{{ item.depname }}</span>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import useDetailStore from '@/store/modules/hospital'
import useUserStore from '@/store/modules/user'

const $router = useRouter()
const $route = useRoute()

const data = reactive({
  currentIndex: 0
})

const detailStore = useDetailStore()
const userStore = useUserStore()

const { detail,department } = storeToRefs(detailStore)
const { currentIndex } = toRefs(data)

// 切换科室
const changeIndex = (index: number) => {
  currentIndex.value = index
  // 获取 右侧 标题行
  let allTitle = document.querySelectorAll('.dep-name')
  // 让右侧对应科室滚动到顶部
  allTitle[index].scrollIntoView({
    behavior: 'smooth', // 匀速效果（过渡动画效果）
    block: 'start' // 滚动到的位置 默认位置为 start
  })
}

// 去预约
const goRegister = (item:any) => {
  // 跳转到预约挂号详情页
  $router.push({path: '/hospital/register_step1',query:{code: $route.query.code,depcode: item.depcode}})
  // 没登录，先登录
  //if(!userStore.userInfo.name) {
  //  userStore.toggleLogin()
  //} else {
  //  // 跳转到预约挂号详情页
  //  $router.push({path: '/hospital/register_step1',query:{code: $route.query.code,depcode: item.depcode}})
  //}
}

</script>

<style scoped lang='scss'>
.register {
  width: 100%;
  .header {
    @include flex-center(flex-start);
    height: 50px;

    .title {
      font-size: 30px;
      font-weight: 900;
    }
    .level {
      margin-left: 10px;
      font-size: 16px;
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

      .title {
        color: #000;
        font-size: 18px;
        line-height: 30px;
      }
    }
  }

  .department-box {
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: 500px;

    .left {
      height: 100%;
      width: 100px;
      background: rgb(248, 248, 248);
      display: flex;
      flex-direction: column;
      
      .nav-item {
        flex: 1;
        //height: 50px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        &.actived {
          color: red;
          font-weight: bold;
          background: #fff;
          border-left: 3px solid red;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      
      .department-item {
        margin: 20px 0;
        &:first-child {
          margin-top: 0;
        }
        width: 100%;
        .dep-name {
          background: rgb(248, 248, 248);
          line-height: 40px;
          padding: 0 10px;
        }
        .children {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
          padding-left: 10px;
          .child {
            width: calc(100% / 3);
            line-height: 40px;
            cursor: default;
          }
        }
      }
    }
  }
}
</style>