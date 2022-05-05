/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 27th 2022, 4:45:56 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */


import DefaultTheme from 'vitepress/theme'
import BaiduMap from '/components'
import RunCode from '../components/run-code.vue'
import './common.scss'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(BaiduMap, {
            ak: 'Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK',
            // type: 'WebGL'
        });
        app.component('RunCode', RunCode);
    }
}