<template>
 <div class='order'>
  <!-- 订单详情 -->
  <OrderDetail v-if="$route.query.id"/>
  <!-- 所有订单 -->
  <AllOrder  v-else/>
 </div>
</template>

<script setup lang='ts'>
import { useRouter,useRoute } from 'vue-router';
import AllOrder from './allOrder.vue';
import OrderDetail from './orderDetail.vue';


const $router = useRouter()
const $route = useRoute()


</script>

<style scoped lang='scss'>

</style>