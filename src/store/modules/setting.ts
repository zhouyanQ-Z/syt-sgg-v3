// layout设置相关小仓库
import { defineStore } from 'pinia'

export default defineStore('Layoutsetting',{
  state: () => {
    return {
      refresh: false, // 控制组件刷新
      scroll: false, // 控制组件滚动到顶部
    }
  },
  actions: {
    updateRefresh() {
      this.refresh = !this.refresh
    },
    updateScroll() {
      this.scroll = !this.scroll
    }
  }
})