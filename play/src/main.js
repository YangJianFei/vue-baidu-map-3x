/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2025-09-28 11:14:25
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/play/src/main.js
 */
import { createApp } from "vue";
import App from "./App.vue";
import BaiduMap from "vue-baidu-map-3x";
import Router from "./router";
import "@/assets/css/common.scss";
import "./util/AreaRestriction_min";

const app = createApp(App);

app.use(BaiduMap, {
    // v: '2.0',
    ak: "oW2UEhdth2tRbEE4FUpF9E5YVDCIPYih", // 'zC6huAhvMoONWxPA8dYOuIgyckdqiL3G',
    // type: 'WebGL'
});
app.use(Router);
app.mount("#app");
