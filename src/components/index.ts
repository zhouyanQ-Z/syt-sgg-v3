// 对外暴露自定义插件对象
import { App } from 'vue'
import SvgIcon from "./svg-icon/index.vue";
//import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Pagination from './pagination/index.vue'
import hospitalTop from './hospital_top/index.vue'
import hospitalBottom from './hospital_bottom/index.vue'
import Login from './login/index.vue'


const allGloabalComponent:Record<string,any> = { SvgIcon,Pagination,hospitalTop,hospitalBottom,Login }
export default {
  install(app:App<Element>) {
    Object.keys(allGloabalComponent).forEach(key => {
      app.component(key,allGloabalComponent[key])
    })
    // 注册图标
    //for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    //  app.component(key, component)
    //}
  }
}