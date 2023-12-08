<template>
 <div class='visitor-box'>
  <div class="header">
    <div class="left">
      <span class="fee">{{ visitor.isInsure == 0 ? '自费':'医保' }}</span>
      <span class="username">{{ visitor.name }}</span>
    </div>
    <div class="btn-box">
      <el-button type="primary" circle @click.stop="onEdit">
        <el-icon><i-ep-edit /></el-icon>
      </el-button>
      <el-popconfirm title="确定删除该就诊人吗？" width="180" icon-color="red" @confirm="onDelete" v-if="$route.path=='/user/patient'">
        <template #reference>
          <el-button type="danger" circle>
            <el-icon><i-ep-delete /></el-icon>
          </el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
  <div class="content">
    <p>证件类型：{{ visitor.param?.certificatesTypeString  }}</p>
    <p>证件号码：{{ visitor.certificatesNo }}</p>
    <p>用户性别：{{ visitor.sex == 0 ? '女':'男' }}</p>
    <p>出生日期：{{ visitor.birthdate }}</p>
    <p>手机号码：{{ visitor.phone }}</p>
    <p>婚姻状况：{{ visitor.isMarry == 0 ? '未婚':'已婚' }}</p>
    <p>当前住址：{{ visitor.param.cityString }}</p>
    <p>详细住址：{{ visitor.param.fullAddress }}</p>
    <transition name="select-box">
      <div class="selected" v-if="index===curIndex">已选择</div>
    </transition>
  </div>
 </div>
</template>

<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router';

const $router = useRouter()
const $route = useRoute()

const props = defineProps(['visitor','index','curIndex'])
const emits = defineEmits<{
  (e: 'onEdit',val: number):void
  (e: 'onDelete',val: number):void
}>()


// 编辑就诊人
const onEdit = () => {
  // 就诊人管理模块的编辑按钮
  if($route.path == '/user/patient') {
    emits('onEdit',props.visitor.id)
  } else {
    // 预约挂号模块的编辑按钮，进行路由跳转
    $router.push({path: '/user/patient',query: {type: 'edit',id: props.visitor.id}})
  }
  
}
// 删除就诊人
const onDelete = () => {
  emits('onDelete',props.visitor.id)
}

</script>

<style scoped lang='scss'>
.visitor-box {
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  position: relative;
  width: 32%;
  margin: 5px;
  border-radius: 10px;
  
  .header {
    background: #e5e5e5;
    @include flex-center(space-between);
    padding: 10px 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .left {
      display: flex;
      align-items: center;
      .fee {
        background: #fff;
        padding: 3px;
        font-size: 12px;
        border-radius: 5px;
        margin-right: 5px;
      }
      .username {
        color: #7f7f7f;
      }
    }
  }
  .content {
    padding: 20px;
    p {
      line-height: 40px;
    }
    
  }
  .selected {
    height: 180px;
    width: 180px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) rotate(45deg);
    font-size: 40px;
    font-style: italic;
    color: rgba(255, 0, 0, 0.5);
    border: 1px dotted rgba(255, 0, 0, 0.2);
    border-radius: 50%;
    text-align: center;
    line-height: 150px;
  }
  .select-box-enter-from {
    transform: scale(1);
  }
  .select-box-enter-to {
    transform: scale(1.2);
  }
  .select-box-enter-active {
    transition: all .3s;
  }
}
</style>