/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:30:32
 * @LastEditTime: 2023-11-24 10:30:32
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\typing.ts
 */
import type { Point, MapStyleV2 } from '@vue-baidu-map-3x/utils';

export type Map = {
  center: Point;
  zoom: number;
  minZoom?: number;
  maxZoom?: number;
  highResolution?: boolean;
  mapClick?: boolean;
  mapType?: string;
  dragging?: boolean;
  scrollWheelZoom?: boolean;
  doubleClickZoom?: boolean;
  keyboard?: boolean;
  inertialDragging?: boolean;
  continuousZoom?: boolean;
  pinchToZoom?: boolean;
  autoResize?: boolean;
  theme?: boolean;
  mapStyle?: MapStyleV2;
  // hasAnimation?: boolean;
  // defaultAnimation?: boolean;
  preserveDrawingBuffer?: boolean;
};