/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 27th 2022, 4:45:56 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */


import DefaultTheme from 'vitepress/theme'
import BaiduMap from 'vue-baidu-map-3x';
import RunCode from '../components/run-code.vue'
import './common.scss'
import Layout from '../components/layout.vue';
console.log(DefaultTheme);

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(BaiduMap, {
            ak: 'Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK',
            // v: '2.0'
            // type: 'WebGL'
        });
        app.component('RunCode', RunCode);
    }
}