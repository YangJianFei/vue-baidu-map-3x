/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-21 15:15:08
 * @LastEditTime: 2023-11-24 10:32:11
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\api-loader\index.ts
 */
import ApiLoader from './src/index.vue';
import { withInstall } from '@vue-baidu-map-3x/utils';
import useBMap from './src/useBMap';
import { getBMap } from './src/helper';

withInstall(ApiLoader);

export default ApiLoader;

export { useBMap, getBMap };