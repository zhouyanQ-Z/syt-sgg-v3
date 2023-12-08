<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/images/logo.png" alt="">
        <p class="title">尚医通 预约挂号统一平台</p>
      </div>
      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <el-button v-if="!userStore.userInfo.name" text class="login" @click="login">登录/注册</el-button>
        <el-dropdown v-else class="login user">
          <span>
            {{ userStore.userInfo.name }}
            <el-icon class="el-icon--right">
              <i-ep-arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import { msgError, msgSuccess } from '@/utils/modal'

const userStore = useUserStore()

const $router = useRouter()

const goHome = () => {
  $router.push('/home')
}

// 登录
const login = () => {
  userStore.toggleLogin()
}

// 退出登录
const logout = () => {
  userStore.logout().then(res => {
    msgSuccess('退出登录成功！！！')
    $router.replace('/home')
  }).catch(err => {    
    msgError('取消退出')
  })
}

//跳转到 指定路径
const goUser = (path: string) => {
  $router.push({path})
}

</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 90px;
  //background: #fff;
  position: fixed;
  z-index: 999;
  box-shadow: 0 0px 20px 0px #ddd;
  

  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    @include flex-center(space-between);
    box-sizing: border-box;
    background: #fff;
    .left {
      flex: 2;
      @include flex-center(flex-start);
      img {
        width: 70px;
        height: 70px;
        margin-right: 20px;
      }
      .title {
        color: $color-main;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .right {
      flex: 1;
      @include flex-center(flex-end);
      .login {
        margin-left: 20px;
        color: #ccc;
        font-size: 18px;

        &.user {
          color: $font-color;
        }
      }
      ::v-deep(.el-tooltip__trigger) {
        outline: none;
      }
    }
  }
}
</style>