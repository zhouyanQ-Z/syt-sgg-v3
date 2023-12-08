<template>
  <div class="container">
    <!-- 顶部 -->
    <hospitalTop />
    <!-- 中间部分内容 -->
    <div class="content">
      <!-- 展示路由组件 -->
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <hospitalBottom />
    <!-- 登录组件 -->
    <Login />
  </div>
</template>

<script setup lang="ts">
</script>


<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $font-color;
  
  .content {
    margin-top: 90px;
    width: 90%;
    min-height: 700px;
    padding: 20px 0;
  }
}

</style>
