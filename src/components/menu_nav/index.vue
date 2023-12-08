<template>
  <div class='hospital'>
   <!-- 左侧导航区 -->
   <div class="left">
     <div class="menu-header">
       <el-icon :size="25"><component :is="info.title.icon" /></el-icon>
       <h5 class="title">&nbsp;&nbsp;/&nbsp;&nbsp;{{ info.title.name }}</h5>
     </div>
     <el-menu router :default-active="info.defaultActive" class="menu">
       <el-menu-item 
        v-for="menu in info.menus" 
        :key="menu.path" 
        :index="menu.path" 
        :route="{'path': menu.path,'query': menu.param}"
        >
         <el-icon :size="20"><component :is="menu.icon" /></el-icon>
         <span>{{ menu.name }}</span>
       </el-menu-item>       
     </el-menu>
   </div>
   <!-- 右侧内容区 -->
   <div class="right">
     <router-view></router-view>
   </div>
  </div>
 </template>
 
 <script setup lang='ts'>
 
 const props = defineProps(['info'])
 
 </script>
 
 <style scoped lang='scss'>
 .hospital {
   display: flex;  
   width: 100%;
   .left {
     flex: 1.5;
     border-right: 1px solid #7f7f77;
     .menu-header {
       font-size: 20px;
       display: flex;
       align-items: center;
       line-height: 50px;
     }
 
     ::v-deep(.el-menu) {
       border: none;
       .el-menu-item {
         font-size: 16px;
       }
     }
   }
   .right {
     flex: 8.5;
     padding-left: 20px;
   }
 }
 </style>