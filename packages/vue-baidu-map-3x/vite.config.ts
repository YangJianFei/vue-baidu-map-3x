import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'components/index.ts'),
      name: 'vue-baidu-map-3x',
      fileName: (format) => `vue-baidu-map-3x.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'c': path.resolve(__dirname, 'components'),
      '_c': path.resolve(__dirname, 'src/components'),
      'types': path.resolve(__dirname, 'types'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/variables.scss";`
      }
    }
  },
  plugins: [vue()],
  server: {
    host: true
  }
})
