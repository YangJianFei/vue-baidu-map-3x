/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-21 15:15:08
 * @LastEditTime: 2023-11-21 15:31:44
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\api-loader\index.ts
 */
import ApiLoader from './src/index.vue';
import { withInstall } from '@vue-baidu-map-3x/utils';
import useBMap from './src/useBMap';
import { getBMap } from './src/helper';
import type { BMap } from './src/typing';

withInstall(ApiLoader);

export default ApiLoader;

export { useBMap, getBMap, BMap };