<template>
  <div class="bottom">
    <div class="context">
      <div class="left">京IC备 13018369号 电话挂号010-56253825</div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.bottom {
  width: 100%;
  height: 50px;
  background-color: #f0f2f5;
  font-size: 16px;
  color: #7a7979;
  box-shadow: 0 -1px 10px 0px #ddd;

  .context {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    @include flex-center(space-between);

    .right {
      span {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

</style>