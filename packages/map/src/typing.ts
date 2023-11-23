/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 17:16:21
 * @LastEditTime: 2023-11-23 10:05:21
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\src\typing.ts
 */

export type Point = {
  lng: number;
  lat: number;
  equals: (other: Point) => void;
};

export type MapStyleV2 = {
  styleJson: any[];
};

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

type MapCallback = (params: any) => void;

export type MapInstance = {
  addEventListener: (evnet: string, cb: MapCallback) => void;
  removeEventListener: (evnet: string, cb: MapCallback) => void;
  centerAndZoom: (point: Point, zoom: number) => void
};