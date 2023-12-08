<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
//import { scrollTo } from "@/utils/scroll-to";
import useLayoutSettingStore from "@/store/modules/setting";

const layoutSettingStore = useLayoutSettingStore();

const props = defineProps({
  hidden: {
    type: Boolean,
    default: false,
  },
  background: {
    type: Boolean,
    default: true,
  },
  layout: {
    type: String,
    default: "prev, pager, next, jumper,->,sizes,total",
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 40, 50];
    },
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7,
  },
  total: {
    required: true,
    type: Number,
  },
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 20,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (event: "update:page", val: number): void;
  (event: "update:limit", val: number): void;
  (event: "pagination", obj: { page: number; limit: number }): void;
}>();

const currentPage = computed({
  get() {
    return props.page;
  },
  set(newVal) {
    emits("update:page", newVal);
  },
});
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(newVal) {
    emits("update:limit", newVal);
  },
});

const handleSizeChange = (val: number) => {
  if (currentPage.value * val > props.total) currentPage.value = 1;
  emits("pagination", { page: currentPage.value, limit: val });
  //if (props.autoScroll) scrollTo(0, 800);
  if (props.autoScroll) layoutSettingStore.updateScroll();
};
const handleCurrentChange = (val: number) => {
  emits("pagination", { page: val, limit: pageSize.value });
  //if (props.autoScroll) scrollTo(0, 800);
  if (props.autoScroll) layoutSettingStore.updateScroll();
};
</script>

<style scoped lang="scss">
.pagination-container {
  // background: #fff;
  padding: 32px 0;
  // display: flex;
  // justify-content: flex-end;
}
.pagination-container.hidden {
  display: none;
}
</style>
