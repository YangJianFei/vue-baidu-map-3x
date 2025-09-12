/*
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-10 17:08:11
 * @LastEditTime: 2025-09-12 11:32:41
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/play/src/router.js
 */

import { createRouter, createWebHashHistory } from 'vue-router';
import PolyLine from '@/components/polyline.vue';

const routes = [
    {
        path: '/',
        component: PolyLine
    },
    {
        path: '/map-contain',
        component: () => import('@/components/map-contain.vue')
    },
    {
        path: '/map-view',
        component: () => import('@/components/map-view.vue')
    },
    {
        path: '/control',
        component: () => import('@/components/control.vue')
    },
    // {
    //     path: '/cover',
    //     component: () => import('@/components/cover.vue')
    // },
    // {
    //     path: '/layer',
    //     component: () => import('@/components/layer.vue')
    // },
    // {
    //     path: '/search',
    //     component: () => import('@/components/search.vue')
    // },
    // {
    //     path: '/menu',
    //     component: () => import('@/components/menu.vue')
    // },
    // {
    //     path: '/else',
    //     component: () => import('@/components/else.vue')
    // },
    // {
    //     path: '/error',
    //     component: () => import('@/components/error.vue')
    // },
    // {
    //     path: '/test',
    //     component: () => import('@/components/test.vue')
    // },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;