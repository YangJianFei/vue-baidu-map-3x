/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 6th 2022, 12:09:56 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

import { createRouter, createWebHashHistory } from 'vue-router';
import PolyLine from '_c/polyline.vue';

const routes = [
    {
        path: '/',
        component: PolyLine
    },
    {
        path: '/map-contain',
        component: () => import('_c/map-contain.vue')
    },
    {
        path: '/map-view',
        component: () => import('_c/map-view.vue')
    },
    {
        path: '/scale',
        component: () => import('_c/scale.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;