/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { RangefinderAddPointEventType, RangefinderDrawendEventType } from "@vue-baidu-map-3x/utils";

export type Events = {
  'addpoint': [params: RangefinderAddPointEventType];
  'drawend': [params: RangefinderDrawendEventType];
}

export const events = ['addpoint', 'drawend'];