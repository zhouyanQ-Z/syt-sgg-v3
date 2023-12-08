<template>
 <div class='notice'>
    <h1 class="title">{{ detail.hospital?.hosname }}预约挂号须知</h1>
    <p class="start">为方便您早日康复，请您认真阅读预约挂号须知：</p>
    <div class="info">
      <div class="detai">
        <p class="tip">一、预约实名制：</p>
        <p class="content">统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
      </div>
      <div class="detail">
        <p class="tip">二、预约挂号：</p>
        <p class="tip2 content">按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
        <p class="content">在同一自然日，同一医院，同一就诊单元，同一就诊人，可以预约最多1个号源；</p>
        <p class="content">在同一自然周，同一就诊人，可以预约最多8个号源；</p>
        <p class="content">在同一自然月，同一就诊人，可以预约最多12个号源；</p>
        <p class="content">在同一自然季度，同一就诊人，可以预约最多24个号源。</p>
      </div>
      <div class="detail">
        <p class="tip">三、取消预约：</p>
        <p class="content">已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
      </div>
      <div class="detail">
        <p class="tip">四、爽约处理：</p>
        <p class="tip2 content">如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：</p>
        <p class="content">累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</p>
        <p class="content">累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</p>
      </div>
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
.notice {
  margin-top: 20px;
  .title {
    font-size: 30px;
    font-weight: 900;
    text-align: center;
    line-height: 50px;
  }
  p {
    line-height: 30px;
    &.start,&.tip,&.tip2 {
      line-height: 50px;
    }
    &.tip {
      font-weight: 900;
    }
    &.content {
      text-indent: 20px;
    }
  }
}
</style>