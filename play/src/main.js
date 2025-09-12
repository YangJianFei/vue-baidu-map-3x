/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-10-13 17:22:05
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map-3x'
import Router from './router';
import '@/assets/css/common.scss';
import './util/AreaRestriction_min';

const app = createApp(App);

app.use(BaiduMap, {
    // v: '2.0',
    ak: 'Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK',
    // type: 'WebGL'
});
app.use(Router);
app.mount('#app');
