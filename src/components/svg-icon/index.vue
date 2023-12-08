<template>
  <svg :style="{ width:size, height:size }">
    <use :href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  // 图标前缀名
  prefix: {
    type: String,
    default: "#icon-",
  },
  // 图标名字
  name: String,
  // 图标颜色
  color: {
    type: String,
    default: "#000",
  },
  // 图标宽度
  width: {
    type: String,
    default: "16px",
  },
  // 图标长度
  height: {
    type: String,
    default: "16px",
  },
  size: {
    type: String,
    default: '16px'
  }
});
</script>

<style scoped></style>
