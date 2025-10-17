/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

import { Bounds, ControlMethod, EventParams, EventPointParams, getPoint, getSize, InfoWindowInstance, LabelInstance, MapEventPixelParams, Point, PolygonInstance, Size } from "@vue-baidu-map-3x/utils";
import { Ref } from "vue";

export type Events = {
  close: [params: EventPointParams];
  open: [params: EventPointParams];
  maximize: [params: EventParams];
  restore: [params: EventParams];
  clickclose: [params: EventParams];
};

export const events = [
  "close",
  "open",
  "maximize",
  "restore",
  "clickclose",
];

export const methods: ControlMethod[] = [
  {
    key: 'content',
    method: 'setContent',
  },
  {
    key: 'width',
    method: 'setWidth',
  },
  {
    key: 'height',
    method: 'setHeight',
  },
  {
    key: 'title',
    method: 'setTitle',
  },
  {
    key: 'enableAutoPan',
    method: '',
    customMethod: (instance: Ref<InfoWindowInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableAutoPan?.();
      } else {
        instance.value?.disableAutoPan?.();
      }
    }
  },
  {
    key: 'enableCloseOnClick',
    method: '',
    customMethod: (instance: Ref<InfoWindowInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableCloseOnClick?.();
      } else {
        instance.value?.disableCloseOnClick?.();
      }
    }
  },
  {
    key: 'maximize',
    method: '',
    customMethod: (instance: Ref<InfoWindowInstance | undefined>, value) => {
      if (value) {
        instance.value?.enableMaximize?.();
      } else {
        instance.value?.disableMaximize?.();
      }
    }
  },
];
