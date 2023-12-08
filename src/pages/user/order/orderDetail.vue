<template>
  <el-card class="box-card">
    <!-- 头部 -->
   <template #header>
     <div class="card-title">挂号详情</div>
   </template>
   <!-- body 部分顶部 -->
   <div class="top">
     <el-tag type="success" effect="dark">
       <div class="tag">
        <el-icon><i-ep-select /></el-icon>
        <span>{{ orderInfo.param?.orderStatusString }}</span>
       </div>
     </el-tag>
     <div class="right-box">
      <img src="../../../assets/images/code_app.png" alt="">
      <div class="text-content">
        <p>微信 <svg-icon name="wechat" size="18px" /> 关注“北京114预约挂号”</p>
        <p>“快速预约挂号”</p>
      </div>
     </div>
   </div>
   <!-- body 部分底部 -->
   <div class="bottom">
    <div class="left-box">
      <el-descriptions
        class="margin-top"
        :column="1"
        border
      >
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="就诊人信息">{{ orderInfo.patientName }}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="就诊日期">{{ orderInfo.reservedDate }}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="就诊医院">{{ orderInfo.hosname}}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="就诊科室">{{ orderInfo.depname }}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="医生职称">{{ orderInfo.title }}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="医事服务费">
          <span style="color: red;">{{ orderInfo.amount }}</span>
        </el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="挂号单号">{{ orderInfo.outTradeNo }}</el-descriptions-item>
        <el-descriptions-item label-class-name="desc-label" label-align="right" label="挂号时间">{{ orderInfo.createTime }}</el-descriptions-item>
      </el-descriptions>
      <div class="btn-box mt-20" v-if="orderInfo.orderStatus !== -1">
        <el-popconfirm title="确定取消预约吗？" icon-color="red" @confirm="cancelOrder">
          <template #reference>
            <el-button size="large">取消预约</el-button>
          </template>
        </el-popconfirm>
        <el-button size="large" type="primary" v-if="orderInfo.orderStatus==0"  @click="toPay">支付</el-button>
      </div>
    </div>
    <!--<div class="right-box">-->
      <el-card class="right-box">
        <template #header>
          <div class="card-header">
            <span>注意事项</span>
          </div>
        </template>
        <div class="text-item">
          <p>1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</p>
          <p style="color: red;">2.【取号】就诊当天须在 {{ orderInfo.fetchTime }}前 在医院取号，未取号视为爽约，该号不退不换；</p>
          <p>3.【退号】在 {{ orderInfo.quitTime }} 前可在线退号，逾期将不可办理退号退费</p>
          <p>4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到医院取号；</p>
          <p>5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</p>
        </div>
      </el-card>
    <!--</div>-->
   </div>
  </el-card>
  <!-- 支付对话框 -->
  <!-- el-dialog 使用样式穿透 必须在外边加一层div 原因未知-->
  <div>
    <el-dialog v-model="showPay" title="微信支付" :before-close="close" width="25%">
      <!-- 放置二维码容器 -->
      <div class="qrcode">
        <img :src="qrCodeUrl" alt="">
        <p>请用微信扫一扫</p>
        <p>扫描二维码支付</p>
      </div>
      <template #footer>
        <el-button plain @click="close">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
 </template>
 
 <script setup lang='ts'>
 import { onMounted, reactive, toRefs } from 'vue';
 import { useRoute } from 'vue-router'
 // @ts-ignore
 import QRCode from 'qrcode'
 import { OrderInfoRes } from '@/type/api/order'
 import { reqOrderInfo,reqCancelOrder,reqWxCode, reqPayStatus } from '@/api/order';
 import { msgError, msgSuccess } from '@/utils/modal';

 const $route = useRoute()
 
 const data = reactive({
  orderInfo: ({} as OrderInfoRes),
  showPay: false,
  qrCodeUrl: '',
  timer: (null as any)
 })

 const { orderInfo,showPay,qrCodeUrl,timer } = toRefs(data)
 
 onMounted(() => {
   getOrderInfo()
 })
 
 // 获取 医院详情数据
 const getOrderInfo = () => {
  reqOrderInfo($route.query.id as string).then(res => {
    if(res.code === 200) {
      orderInfo.value = res.data
    }
  })
 }

 // 取消订单  订单状态有三种 (orderStatus)：-1 取消预约；0 预约了未支付；1 支付成功
 const cancelOrder = () => {
  reqCancelOrder($route.query.id as string).then(res => {
    if(res.code === 200) {
      msgSuccess('取消订单成功')
      getOrderInfo()
    } else {
      msgError('取消订单失败')
    }
  })
 }

// 去支付
const toPay = () => {
  showPay.value = true
  // 发送请求获取微信支付二维码
  reqWxCode($route.query.id as string).then(res => {
    if(res.code === 200) {
      // 根据后台返回来的数据生成二维码图片
      qrCodeUrl.value = QRCode.toDataURL(res.data.codeUrl)
      // 开启轮询 请求该订单支付状态
      timer.value = setInterval(() => {
        reqPayStatus($route.query.id as string).then(res => {
          if(res.code === 200) {
            // 支付成功 关闭窗口
            
            msgSuccess(res.message as string)
            clearInterval(timer.value)
            // 重新获取订单信息
            getOrderInfo()
          }
        })
      },1000)
    } else {
      msgError('取消订单失败')
    }
  }).finally(() => { showPay.value = false })
}
// 关闭窗口
const close = () => {
  showPay.value = false
  if(timer.value != null) clearInterval(timer.value)
}
 
 </script>
 
 <style scoped lang='scss'>
 .box-card {
   .card-title {
     font-size: 18px;
     font-weight: 900;
   }
   .top {
    @include flex-center(space-between);
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    .tag {
      @include flex-center();
      span {
        margin-left: 5px;
      }
    }
    .right-box {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        margin-right: 5px;
      }
      p {
        line-height: 20px;
        font-weight: bold;
      }
    }
   }
   .bottom {
    display: flex;
    margin: 20px 0;
    .left-box {
      flex: 4;
      //.btn-box {}
      ::v-deep(.desc-label) {
        width: 30%;
      }
    }
    .right-box {
      flex: 6;
      margin-left: 10px;
      p {
        line-height: 30px;
      }
    }
   }
 }
 

::v-deep(.el-dialog__body) {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.qrcode {
  margin: 0 auto;
  text-align: center;
  p {
    line-height: 30px;
  }
}

 </style>