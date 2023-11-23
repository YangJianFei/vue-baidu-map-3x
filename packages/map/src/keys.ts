/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 16:08:25
 * @LastEditTime: 2023-11-23 18:58:05
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\src\keys.ts
 */
import { InjectionKey, Ref } from 'vue';
import type { BMap } from '@vue-baidu-map-3x/api-loader';
import { MapInstance } from './typing';

export const bdmapKey = Symbol() as InjectionKey<{
  BMap: Ref<BMap | undefined>,
  map: Ref<MapInstance | undefined>
}>;