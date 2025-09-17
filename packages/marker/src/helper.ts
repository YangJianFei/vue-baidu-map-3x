/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { MarkerEventParams, MarkerEventPointParams } from "@vue-baidu-map-3x/utils";


export type Events = {
  'click': [params: MarkerEventParams];
  'dblclick': [params: MarkerEventPointParams];
  'mousedown': [params: MarkerEventPointParams];
  'mouseup': [params: MarkerEventPointParams];
  'mouseout': [params: MarkerEventPointParams];
  'mouseover': [params: MarkerEventPointParams];
  'remove': [params: MarkerEventParams];
  'infowindowclose': [params: MarkerEventParams];
  'infowindowopen': [params: MarkerEventParams];
  'dragstart': [params: MarkerEventParams];
  'dragging': [params: MarkerEventPointParams];
  'dragend': [params: MarkerEventPointParams];
  'rightclick': [params: MarkerEventParams];
}

export const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseout',
  'mouseover',
  'remove',
  'infowindowclose',
  'infowindowopen',
  'dragstart',
  'dragging',
  'dragend',
  'rightclick'
];