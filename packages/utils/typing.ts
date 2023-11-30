/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 17:16:21
 * @LastEditTime: 2023-11-30 18:50:07
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\typing.ts
 */

import { ControlAnchorEnum, ControlAnchor, LengthUnit, NavigationControlType } from "./src/constant";

export type BMap = {
  [key in string]: any;
};

export type ConfigType = {
  v: string;
  type: string;
  ak?: string;
};

export type Point = {
  lng: number;
  lat: number;
  equals?: (other: Point) => boolean;
};

export type Size = {
  width: number;
  height: number;
  equals?: (other: Size) => boolean;
};

export type MapStyleV2 = {
  styleJson: any[];
};

type MapCallback = (params: any) => void;

export type MapInstance = {
  addEventListener: (evnet: string, cb: MapCallback) => void;
  removeEventListener: (evnet: string, cb: MapCallback) => void;
  centerAndZoom: (point: Point, zoom: number) => void;
  addControl: (instance: any) => void;
  removeControl: (instance: any) => void;
  destroy: () => void;
};

export type Control = {
  offset?: Size;
  anchor?: ControlAnchor;
};

export type ControlInstance = {
  setAnchor: (anchor: keyof typeof ControlAnchorEnum) => void;
  getAnchor: () => keyof typeof ControlAnchorEnum;
  setOffset: (offset: Size) => void;
  getOffset: () => Size;
  show: () => void;
  hide: () => void;
  isVisible: () => boolean;
};

export type ScaleInstance = ControlInstance & {
  setUnit: (unit: LengthUnit) => void;
  getUnit: () => LengthUnit;
};

export type Navigation = Control & {
  type?: string;
  showZoomInfo?: boolean;
  enableGeolocation?: boolean;
};

export type NavigationInstance = ControlInstance & {
  getType: () => NavigationControlType;
  setType: (type: NavigationControlType) => void;
};