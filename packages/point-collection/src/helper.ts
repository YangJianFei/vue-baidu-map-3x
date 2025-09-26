/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { ControlMethod, getPoint, PointCollectionEventPointParams } from "@vue-baidu-map-3x/utils";


export type Events = {
  'click': [params: PointCollectionEventPointParams];
  'mouseout': [params: PointCollectionEventPointParams];
  'mouseover': [params: PointCollectionEventPointParams];
}

export const events = [
  'click',
  'mouseout',
  'mouseover',
];

export const methods: ControlMethod[] = [
  {
    key: 'points',
    method: 'setPoints',
    format: (points) => points?.map(point => getPoint(point.lng, point.lat)),
  },
  {
    key: 'shape',
    method: 'setStyles',
    format: (shape) => ({ styles: { shape } }),
  },
  {
    key: 'color',
    method: 'setStyles',
    format: (color) => ({ styles: { color } }),
  },
  {
    key: 'size',
    method: 'setStyles',
    format: (size) => ({ styles: { size } }),
  },
];
