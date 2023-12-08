<template>
 <div class='register-step1' v-if="bookingData.bookingScheduleList?.length">
  <div class="top">
    <div class="hosname">{{ bookingData.baseMap?.hosname }}</div>
    <div class="line"></div>
    <div class="depname">{{ bookingData.baseMap?.bigname }}</div>
    <div class="dot">·</div>
    <div class="hosdepartment">{{ bookingData.baseMap?.depname }}</div>
  </div>
  <div class="center">
    <h1 class="time">{{ bookingData.baseMap?.workDateString }}</h1>
    <div class="content">
      <div class="item" 
        :class="{actived: (item.status != -1 && (item.availableNumber > 0||item.status == 1)),selected: curIndex===index}" 
        v-for="(item,index) in bookingData.bookingScheduleList" 
        :key="index"
        @click="onChoose(item.workDate,index)">
        <div class="item-top">{{ item.workDate }} {{ item.dayOfWeek }}</div>
        <div class="item-bottom">
          <span v-if="item.status === -1" >停止挂号</span>
          <span v-if="item.status === 0" >{{ item.availableNumber === -1 ? '约满了':`有号(${item.availableNumber})` }}</span>
          <span v-if="item.status === 1" >即将放号</span>
        </div>
      </div>
    </div>
    <el-pagination v-model:current-page="pageNo" layout="prev,pager,next" :total="bookingData.total" @current-change="getData" />
  </div>
  <div class="bottom">
    <!-- 即将放号 -->
    <div class="will" v-if="bookingData.bookingScheduleList[curIndex].status === 1">
      <span class="time">{{ bookingData.bookingScheduleList[curIndex].workDateMd }}</span>
      <span>放号</span>
    </div>
    <div class="detail" v-else>
      <div class="morning">
        <div class="header">
          <svg-icon name="morning" color="#1296db" size="30px" />
          <span>上午号源</span>
        </div>
        <div class="content">
          <div class="item-info" v-for="doc in morningArr" :key="doc.id">
            <div class="left">
              <div class="userinfo">
                <div class="doc-title">{{ doc.title }}</div>
                <div class="line"></div>
                <div class="doc-name">{{ doc.docname }}</div>
              </div>
              <div class="skill">{{ doc.skill }}</div>
            </div>
            <div class="right">
              <div class="price">￥{{ doc.amount }}</div>
              <el-button 
                type="primary" 
                size="large" 
                class="count"
                :disabled="bookingData.bookingScheduleList[curIndex].status==-1||bookingData.bookingScheduleList[curIndex].availableNumber<1"
                @click="toStep2(doc.id)">剩余{{ doc.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="afternoon">
        <div class="header">
          <svg-icon name="afternoon" color="#1296db" size="30px" />
          <span>下午号源</span>
        </div>
        <div class="content">
          <div class="item-info" v-for="doc in afternoonArr" :key="doc.id">
            <div class="left">
              <div class="userinfo">
                <div class="doc-title">{{ doc.title }}</div>
                <div class="line"></div>
                <div class="doc-name">{{ doc.docname }}</div>
              </div>
              <div class="skill">{{ doc.skill }}</div>
            </div>
            <div class="right">
              <div class="price">￥{{ doc.amount }}</div>
              <el-button 
                type="primary" 
                size="large" 
                class="count" 
                @click="toStep2(doc.id)"
                :disabled="bookingData.bookingScheduleList[curIndex].status==-1||bookingData.bookingScheduleList[curIndex].availableNumber<1"
                >剩余{{ doc.availableNumber }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script setup lang='ts'>
import { computed, onMounted, reactive, toRefs } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { reqBookingSchedule,reqDoctorSchedule } from '@/api/hospital'
import { BookingScheduleRes,DoctorScheduleRes } from '@/type/api/hospital'


const $router = useRouter()
const $route = useRoute()

const data = reactive({
  pageNo: 1,
  limit: 6,
  bookingData: ({} as BookingScheduleRes),
  curIndex: 0,
  scheduleData: ([] as DoctorScheduleRes[])
})

let { pageNo,limit,bookingData,curIndex,scheduleData }= toRefs(data)

onMounted(() => {
  getData()

})


// 上午号源
const morningArr = computed(() => {
  return scheduleData.value.filter(item => item.workTime===0)
})
// 下午号源
const afternoonArr = computed(() => {
  return scheduleData.value.filter(item => item.workTime===1)
})

// 获取数据
const getData = () => {
  reqBookingSchedule(pageNo.value,limit.value,$route.query.code as string,$route.query.depcode as string).then(res => {
    if(res.code === 200) {
      
      bookingData.value = res.data
      getScghedule(res.data.bookingScheduleList[curIndex.value].workDate)
    }
  })
}

// 获取排班信息
const getScghedule = (date: string) => {
  reqDoctorSchedule($route.query.code as string,$route.query.depcode as string,date).then(res => {
    if(res.code === 200) {
      scheduleData.value = res.data
    }
  })
}

// 查看某一天的医生排班信息
const onChoose = (date: string,index: number) => {
  curIndex.value = index
  getScghedule(date)
}

// 去预约
const toStep2 = (id: string) => {
  $router.push({path: '/hospital/register_step2',query: {docId: id}})
}
</script>

<style scoped lang='scss'>
.register-step1 {

  .line {
    width: 2px;
    height: 20px;
    background: $font-color;
    margin: 0 10px;
  }
  .top {
    margin-top: 50px;
    display: flex;
    font-size: 18px;
    align-items: center;
    .dot {
      margin: 0 10px;
      font-size: 30px;
    }
  }
  .center {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .time {
      font-weight: bold;
      line-height: 50px;
    }
    .content {
      width: 100%;
      margin: 10px 0;
      display: flex;
      justify-content: space-around;
      .item {
        border: 3px solid #ccc;
        &.actived {
          border-color: #e8f2ff;
          .item-top {
            background: #e8f2ff;
          }
        }
        &.selected {
          transform: scale(1.2);
          transition: all .5;
          color: #5bb8dd;
        }
        .item-top {
          height: 40px;
          line-height: 40px;
          background: #b3aeae;
          font-weight: bold;
          padding: 0 10px;
        }
        .item-bottom {
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }

  .bottom {
    .will {
      text-align: center;
      font-size: 30px;
      font-weight: 900;
      line-height: 50px;

      .time {
        color: #cc0505;
        margin-right: 10px;
      }
    }
    .detail {
      .header {
        display: flex;
        align-items: center;
        span {
          margin-left: 5px;
          font-size: 20px;
          font-weight: bold;
        }
      }
      .content {
        margin: 20px 0;
        .item-info {
          @include flex-center(space-between);
          border-bottom: 1px solid #ccc;
          padding: 20px;
          .left {

            .userinfo {
              display: flex;
              align-items: center;
              color: #5bb8dd;
              font-size: 18px;
              margin-bottom: 15px;
              font-weight: bold;
              .line {
                background-color: #5bb8dd;
              }
            }
          }
          .right {
            display: flex;
            align-items: center;
            margin-right: 80px;
            .price{
              margin-left: 5px;
              margin-right: 50px;
            }
          }
        }
      }
    }
  }
}
</style>