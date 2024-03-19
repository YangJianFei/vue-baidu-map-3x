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

export type Icon = {
  imageUrl: string;
  size?: Size;
  anchor?: Size;
  imageOffset?: Size;
  imageSize?: Size;
  infoWindowAnchor?: Size;
  printImageUrl?: string;
  setImageUrl?: (url: string) => void;
  setSize?: (size: Size) => void;
  setImageSize?: (offset: Size) => void;
  setAnchor?: (anchor: Size) => void;
  setImageOffset?: (offset: Size) => void;
  setInfoWindowAnchor?: (anchor: Size) => void;
  setPrintImageUrl?: (url: string) => void;
};

export type Bounds = {
  /**
   * @name  创建一个包含所有给定点坐标的矩形区域。其中sw表示矩形区域的西南角，参数ne表示矩形区域的东北角
   */
  new(sw: Point, ne: Point): void;
  sw: Point;
  ne: Point;
  /**
   * @name  当且仅当此矩形中的两点参数都等于其他矩形的两点参数时，返回true
   */
  equals?: (other: Bounds) => boolean;
  /**
   * @name  如果点的地理坐标位于此矩形内，则返回true
   */
  containsPoint?: (point: Point) => boolean;
  /**
   * @name  传入的矩形区域完全包含于此矩形区域中，则返回true
   */
  containsBounds?: (bounds: Bounds) => boolean;
  /**
   * @name  计算与另一矩形的交集区域
   */
  intersects?: (other: Bounds) => Bounds;
  /**
   * @name  放大此矩形，使其包含给定的点
   */
  extend?: (point: Point) => void;
  /**
   * @name  返回矩形的中心点
   */
  getCenter?: () => Point;
  /**
   * @name  如果矩形为空，则返回true
   */
  isEmpty?: () => boolean;
  /**
   * @name  返回矩形区域的西南角
   */
  getSouthWest?: () => Point;
  /**
   * @name  返回矩形区域的东北角
   */
  getNorthEast?: () => Point;
  /**
   * @name  
   */
  toSpan?: () => Point;
};

export type CopyrightControl = {
  id?: number;
  content?: string;
  bounds?: Bounds;
}

export type AddressComponent = {
  streetNumber?: string;
  street?: string;
  district?: string;
  city?: string;
  province?: string;
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

export type Scale = Control & {
};

export type ScaleInstance = ControlInstance & {
  setUnit: (unit: LengthUnit) => void;
  getUnit: () => LengthUnit;
};

export type Navigation = Control & {
  type?: NavigationControlType;
  showZoomInfo?: boolean;
  enableGeolocation?: boolean;
};

export type NavigationInstance = ControlInstance & {
  getType: () => NavigationControlType;
  setType: (type: NavigationControlType) => void;
};

export type MapType = Control & {
  type?: string;
  mapTypes?: string[];
};

export type MapTypeInstance = ControlInstance;

export type OverivewMap = Control & {
  size?: Size;
  isOpen?: boolean;
};

export type OverivewMapInstance = ControlInstance & {
  changeView: () => void;
  setSize: (size: Size) => void;
  getSize: () => Size;
};

export type Geolocation = Control & {
  showAddressBar?: boolean;
  autoLocation?: boolean;
  locationIcon?: Icon;
};

export type GeolocationInstance = ControlInstance & {
  location?: () => void;
  getAddressComponent?: () => AddressComponent;
};

export type Copyright = Control & {
  copyrights?: CopyrightControl[];
};

export type CopyrightInstance = ControlInstance & {
  /**
   * @name 添加版权信息
   * @param copyright 
   * @returns 
   */
  addCopyright?: (copyright: CopyrightControl) => void;
  /**
   * @name 移除版权信息
   * @param id 
   * @returns 
   */
  removeCopyright?: (id: number) => void;
  /**
   * @name 返回单个版权信息
   * @param id 
   * @returns CopyrightControl
   */
  getCopyright?: (id: number) => CopyrightControl;
  /**
   * @name 返回版权信息列表
   * @returns CopyrightControl[]
   */
  getCopyrightCollection?: () => CopyrightControl[];
};

export type CityList = Control;

export type CityListInstance = ControlInstance;