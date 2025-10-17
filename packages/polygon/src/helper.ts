/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { ControlMethod, EventParams, getPoint, MapEventPixelParams, PolygonInstance } from "@vue-baidu-map-3x/utils";
import { Ref } from "vue";

export type Events = {
  'click': [params: MapEventPixelParams];
  'dblclick': [params: MapEventPixelParams];
  'mousedown': [params: MapEventPixelParams];
  'mouseup': [params: MapEventPixelParams];
  'mouseout': [params: MapEventPixelParams];
  'mouseover': [params: MapEventPixelParams];
  'remove': [params: EventParams];
  'lineupdate': [params: EventParams];
}

export const events = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseout',
  'mouseover',
  'remove',
  'lineupdate',
];

export const methods: ControlMethod[] = [
  {
    key: 'strokeColor',
    method: 'setStrokeColor',
  },
  {
    key: 'strokeWeight',
    method: 'setStrokeWeight',
  },
  {
    key: 'strokeOpacity',
    method: 'setStrokeOpacity',
  },
  {
    key: 'strokeStyle',
    method: 'setStrokeStyle',
  },
  {
    key: 'fillColor',
    method: 'setFillColor',
  },
  {
    key: 'fillOpacity',
    method: 'setFillOpacity',
  },
  {
    key: 'enableMassClear',
    method: '',
    customMethod: (instance: Ref<PolygonInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableMassClear?.();
      } else {
        instance.value?.disableMassClear?.();
      }
    },
  },
  {
    key: 'enableEditing',
    method: '',
    customMethod: (instance: Ref<PolygonInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableEditing?.();
      } else {
        instance.value?.disableEditing?.();
      }
    },
  },
];
