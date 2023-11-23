/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 16:08:07
 * @LastEditTime: 2023-11-23 16:08:20
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\index.ts
 */

import BaiduMap from './src/index.vue';
import { withInstall } from '@vue-baidu-map-3x/utils';
import { bdmapKey } from './src/keys';
import useMap from './src/useMap';

withInstall(BaiduMap);

export default BaiduMap;

export { bdmapKey, useMap };