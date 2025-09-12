/*
 * @Description:
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-12 11:03:37
 * @LastEditTime: 2025-09-12 11:05:08
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/vue-baidu-map-3x/vite.config.ts
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "vue-baidu-map-3x",
      fileName: (format) => `vue-baidu-map-3x.${format}.js`,
      // formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["vue"], // 不打包 Vue
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
});
