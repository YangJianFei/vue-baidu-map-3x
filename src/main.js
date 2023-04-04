/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-04-04 16:16:30
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'c'
import Router from './router';
import '@/assets/css/common.scss'

const app = createApp(App);

app.use(BaiduMap, {
    // v: '2.0',
    ak: 'YeoPwIR9MkozLsC0irBYIpFEPvjrc4bn',// LkW3zeVtdMjBZGhCggdGNHAkcuMDveOr    Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK   yU5nt3oggGqpGWqAj9GVGcZzRHttvIaD
    // ak: 'X9GswT5Unq8UAUy5irSYAMSN7R79wEpL', // 群-德德
    type: 'WebGL'
});
app.use(Router);
app.mount('#app');
