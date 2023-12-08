import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Icons from 'unplugin-icons/vite' // icon相关
import IconsResolver from 'unplugin-icons/resolver' // icon相关
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置svg
    createSvgIconsPlugin({
      // svg存放目录
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 定义 symbolId 格式
      symbolId: 'icon-[dir]-[name]',
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'], // 重点，记住这里配了个ep，参数别改，就用ep，改了后就不好使了
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `@import "@/style/common.scss";@import "@/style/variables.scss";`,
      }
    }
  },
  // 代理
  server: {
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  }
})
