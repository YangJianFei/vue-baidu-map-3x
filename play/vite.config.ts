/*
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-10 17:08:11
 * @LastEditTime: 2025-09-12 15:54:09
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/play/vite.config.ts
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 'vue-baidu-map-3x': path.resolve(__dirname, '../packages/vue-baidu-map-3x/index.ts'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/css/variables.scss" as *;`
      }
    }
  },
  server: {
    host: true,
    port: 3000
  }
})