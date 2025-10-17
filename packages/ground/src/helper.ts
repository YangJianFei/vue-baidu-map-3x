/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { Bounds, ControlMethod, EventParams, getBounds, getPoint, MapEventPixelParams, EventPointParams, PolygonInstance } from "@vue-baidu-map-3x/utils";
import { Ref } from "vue";

export type Events = {
  'click': [params: EventParams];
  'dblclick': [params: EventParams];
}

export const events = [
  'click',
  'dblclick',
];

export const methods: ControlMethod[] = [
  {
    key: 'bounds',
    method: 'setBounds',
    format: (bounds: Bounds) => getBounds(bounds.sw, bounds.ne),
  },
  {
    key: 'opacity',
    method: 'setOpacity',
  },
  {
    key: 'imageURL',
    method: 'setImageURL',
  },
  {
    key: 'displayOnMinLevel',
    method: 'setDisplayOnMinLevel',
  },
  {
    key: 'displayOnMaxLevel',
    method: 'setDispalyOnMaxLevel',
  },
];
