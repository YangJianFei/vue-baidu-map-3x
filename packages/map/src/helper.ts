/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 09:05:43
 * @LastEditTime: 2023-11-23 15:30:25
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\src\helper.ts
 */
import type { Point } from "@vue-baidu-map-3x/utils";

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

export const customEvents = [
  'init',
  'ready',
  'load',
  'unLoad',
];

export const getCenterPoint = (center?: string | Point) => {
  switch (typeof center) {
    case 'string': return center;
    case 'object': return new window.BMap.Point(center.lng, center.lat);
    default: return new window.BMap.Point();
  }
};