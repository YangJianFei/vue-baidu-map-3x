/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { Bounds, ControlMethod, EventParams, getBounds, getPoint, getSize, LabelInstance, MapEventPixelParams, Point, Size } from "@vue-baidu-map-3x/utils";
import { Ref } from "vue";

export type Events = {
  click: [params: EventParams];
  dblclick: [params: EventParams];
  mousedown: [params: EventParams];
  mouseup: [params: EventParams];
  mouseout: [params: EventParams];
  mouseover: [params: EventParams];
  remove: [params: EventParams];
  rightclick: [params: EventParams];
};

export const events = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseout",
  "mouseover",
  "remove",
  "rightclick",
];

export const methods: ControlMethod[] = [
  {
    key: 'content',
    method: 'setContent',
  },
  {
    key: 'offset',
    method: 'setOffset',
    format: (offset: Size) => getSize(offset?.width, offset?.height),
  },
  {
    key: 'position',
    method: 'setPosition',
    format: (position: Point) => getPoint(position?.lng, position?.lat),
  },
  {
    key: 'enableMassClear',
    method: '',
    customMethod: (instance: Ref<LabelInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableMassClear?.();
      } else {
        instance.value?.disableMassClear?.();
      }
    }
  },
  {
    key: 'styles',
    method: 'setStyle',
  },
  {
    key: 'title',
    method: 'setTitle',
  },
  {
    key: 'zIndex',
    method: 'setZIndex',
  },
];
