import { createPinia } from 'pinia'
// Pinia 的 状态管理的数据持久化
//import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

let store = createPinia()
//store.use(piniaPluginPersistedstate)

export default store