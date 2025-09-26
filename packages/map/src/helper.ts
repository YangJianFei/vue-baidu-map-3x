/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 09:05:43
 * @LastEditTime: 2023-11-23 15:30:25
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\src\helper.ts
 */
import type { BMap, EventParams, MapEventPixelOverlayParams, MapEventPixelParams, MapInstance, Point, Size } from "@vue-baidu-map-3x/utils";

export const methodsMap = new Map<string, string | string[]>([
  ['center', 'setCenter'],
  ['zoom', 'setZoom'],
  ['minZoom', 'setMinZoom'],
  ['maxZoom', 'setMaxZoom'],
  ['mapType', 'setMapType'],
  ['dragging', ['enableDragging', 'disableDragging']],
  ['scrollWheelZoom', ['enableScrollWheelZoom', 'disableScrollWheelZoom']],
  ['doubleClickZoom', ['enableDoubleClickZoom', 'disableDoubleClickZoom']],
  ['keyboard', ['enableKeyboard', 'disableKeyboard']],
  ['inertialDragging', ['enableInertialDragging', 'disableInertialDragging']],
  ['continuousZoom', ['enableContinuousZoom', 'disableContinuousZoom']],
  ['pinchToZoom', ['enablePinchToZoom', 'disablePinchToZoom']],
  ['autoResize', ['enableAutoResize', 'disableAutoResize']],
  ['theme', 'setMapStyle'],
  ['mapStyle', 'setMapStyle'],
]);


export type Events = {
  click: [params: MapEventPixelOverlayParams];
  dblclick: [params: MapEventPixelParams];
  rightclick: [params: MapEventPixelOverlayParams];
  rightdblclick: [params: MapEventPixelOverlayParams];
  maptypechange: [params: EventParams];
  mousemove: [params: MapEventPixelOverlayParams];
  mouseover: [params: EventParams];
  mouseout: [params: EventParams];
  movestart: [params: EventParams];
  moving: [params: EventParams];
  moveend: [params: EventParams];
  zoomstart: [params: EventParams];
  zoomend: [params: EventParams];
  addoverlay: [params: EventParams];
  addcontrol: [params: EventParams];
  removecontrol: [params: EventParams];
  removeoverlay: [params: EventParams];
  clearoverlays: [params: EventParams];
  dragstart: [params: MapEventPixelParams];
  dragging: [params: MapEventPixelParams];
  dragend: [params: MapEventPixelParams];
  addtilelayer: [params: EventParams];
  removetilelayer: [params: EventParams];
  loaded: [params: MapEventPixelParams & { zoom: number }];
  resize: [params: EventParams & { size: Size }];
  hotspotclick: [params: EventParams & { spots: any }];
  hotspotover: [params: EventParams & { spots: any }];
  hotspotout: [params: EventParams & { spots: any }];
  tilesloaded: [params: EventParams];
  touchstart: [params: MapEventPixelParams];
  touchmove: [params: MapEventPixelParams];
  touchend: [params: MapEventPixelParams];
  longpress: [params: MapEventPixelParams];
};

export const events = [
  'click',
  'dblclick',
  'rightclick',
  'rightdblclick',
  'maptypechange',
  'mousemove',
  'mouseover',
  'mouseout',
  'movestart',
  'moving',
  'moveend',
  'zoomstart',
  'zoomend',
  'addoverlay',
  'addcontrol',
  'removecontrol',
  'removeoverlay',
  'clearoverlays',
  'dragstart',
  'dragging',
  'dragend',
  'addtilelayer',
  'removetilelayer',
  'loaded',
  'resize',
  'hotspotclick',
  'hotspotover',
  'hotspotout',
  'tilesloaded',
  'touchstart',
  'touchmove',
  'touchend',
  'longpress'
];

type MapLoadEvents = {
  BMap?: BMap;
  map?: MapInstance;
};

export type CustomEvents = {
  init: [params: MapLoadEvents];
  ready: [params: MapLoadEvents];
  load: [params: MapLoadEvents];
  unLoad: [];
};

export const getCenterPoint = (center?: string | Point) => {
  switch (typeof center) {
    case 'string': return center;
    case 'object': return new window.BMap.Point(center.lng, center.lat);
    default: return new window.BMap.Point();
  }
};