/*
 * @Description:
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2024-12-25 16:49:12
 * @LastEditTime: 2025-09-10 16:43:50
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/theme/index.js
 */

import DefaultTheme from "vitepress/theme";
import BaiduMap from "vue-baidu-map-3x";
import RunCode from "../components/run-code.vue";
import "./common.scss";
import Loading from "../components/loading.vue";
import Download from "../components/download.vue";
import CLayout from "../components/layout.vue";
import { showHolidayTheme } from "../plugin/util";
import { vue3xAk } from './config';

export default {
    Layout: CLayout,
    NotFound: DefaultTheme.NotFound,
    enhanceApp({ app }) {
        let ak = vue3xAk;
        if (!import.meta.env.SSR) {
            ak = localStorage.getItem('userAk') || vue3xAk;
        }
        app.use(BaiduMap, {
            ak,
            // v: '2.0'
            // type: 'WebGL'
        });
        showHolidayTheme();
        app.component("RunCode", RunCode);
        app.component("Loading", Loading);
        app.component("Download", Download);
    },
};
