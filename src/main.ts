import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css' // element-plus css

import App from './App.vue'
import '@/style/index.scss'
import store from './store'
import router from './router/index'
// 引入自定义插件
import globalComponent from '@/components'
// 路由鉴权
import './permission'

// svg 配置代码
import 'virtual:svg-icons-register'

const app  = createApp(App)

// 全局组件
app.use(globalComponent)
app.use(store)

app.use(ElementPlus, {
  locale: zhCn,
})

app.use(router)

app.mount('#app')
