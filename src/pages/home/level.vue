<template>
 <div class='level'>
    <!--<h1>医院</h1>-->
    <div class="content">
      <span class="title">{{ title }}：</span>
      <div class="cate">
        <span :class="{actived: activeFlag === ''}" @click="onSelected()">全部</span>
        <span v-for="item in listData" :key="item.id" :class="{actived: activeFlag === item.value}" @click="onSelected(item.value)">{{ item.name }}</span>
      </div>
    </div>
 </div>
</template>

<script setup lang='ts'>
import { reactive, toRefs } from 'vue';
import { LevelAndRegionItf } from '@/type/api/hospital'

const props = defineProps<{
  title: String,
  listData: LevelAndRegionItf[]
}>()

const emits = defineEmits<{
  (e: 'onChoose',type: number,id: string): void
}>()


const data = reactive<{
  activeFlag: string
}>({
  activeFlag: ''
})

let { activeFlag } = toRefs(data)


const onSelected = (val: string='') => {
  activeFlag.value = val
  let type = props.title === '等级'? 1:2
  emits('onChoose',type,val)
  
}
</script>

<style scoped lang='scss'>
.level {
  
  .content {
    display: flex;


    .title {
      margin-right: 10px;
      width: 50px;

    }
    .cate {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      span {
        margin-right: 10px;
        margin-bottom: 15px;
        &:last-child {
          margin-right: 0;
        }
        &.actived {
          color: $color-main;
        }
        &:hover {
          color: $color-main;
          cursor: pointer;
        }
      }
      
    }
  }
}
</style>