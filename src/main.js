/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2025-06-26 17:33:55
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'c'
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
