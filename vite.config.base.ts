/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-21 11:12:21
 * @LastEditTime: 2023-11-21 11:12:34
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\vite.config.base.ts
 */
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export const viteBaseConfig = {
  build: {
    // sourcemap: true,
    // lib: {
    // entry: path.resolve(__dirname, 'components/index.ts'),
    // name: 'vue-baidu-map-3x',
    // fileName: (format) => `vue-baidu-map-3x.${format}.js`
    // },
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
  plugins: [vue(), vueJsx()],
};