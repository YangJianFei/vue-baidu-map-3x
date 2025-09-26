/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 17:16:21
 * @LastEditTime: 2025-09-12 15:05:58
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/utils/typing.ts
 */

import { ControlAnchorEnum, ControlAnchor, LengthUnit, NavigationControlType, AnimationEnum, ContextMenuIconEnum, ShapeTypeEnum, SizeTypeEnum } from "./src/constant";

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
  width?: number;
  height?: number;
  equals?: (other: Size) => boolean;
};

export type Pixel = {
  x: number;
  y: number;
  equals: (other: Pixel) => boolean;
};

export type Overlay = {

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

export type Label = {
  content?: string;
  offset?: Size;
  position?: Point;
  enableMassClear?: boolean;
};

export type LabelInstance = {
  setStyle?: (style: Object) => void;
  setContent?: (content: string) => void;
  setPosition?: (position: Point) => void;
  getPosition?: () => Point;
  setOffset?: (offset: Size) => void;
  getOffset?: () => Size;
  setTitle?: (title: string) => void;
  getTitle?: () => string;
  enableMassClear?: (enable: boolean) => void;
  disableMassClear?: () => void;
  setZIndex?: (zIndex: number) => void;
  getMap?: () => MapInstance;
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
  addOverlay: (instance: any) => void;
  removeOverlay: (instance: any) => void;
  addTileLayer: (instance: any) => void;
  removeTileLayer: (instance: any) => void;
  addContextMenu: (instance: any) => void;
  removeContextMenu: (instance: any) => void;
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

export type OverlayInstance = {
  initialize: (map: BMap) => any;
  isVisible: () => boolean;
  draw: () => void;
  show: () => void;
  hide: () => void;
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

export type Panorama = Control;

export type PanoramaInstance = ControlInstance;

export type Rangefinder = {
  followText?: string;  //测距过程中，提示框文字,
  unit?: 'metric' | 'us'; //测距结果所用的单位制，可接受的属性为"metric"表示米制和"us"表示美国传统单位,
  lineColor?: string; //折线颜色,
  lineStroke?: number; //折线宽度,
  opacity?: number //透明度,
  lineStyle?: 'solid' | 'dashed'; //折线的样式，只可设置solid和dashed,
  secIcon?: Icon;//转折点的Icon,
  closeIcon?: Icon; //关闭按钮的Icon,
  cursor?: string; //跟随的鼠标样式
};

export type RangefinderInstance = {
  close?: () => void;
  open?: () => boolean;
};

export type RangefinderAddPointEventType = {
  point?: Point; //最新添加上的节点BMap.Point对象,
  pixel?: Pixel; //最新添加上的节点BMap.Pixel对象,
  index?: number; //最新添加的节点的索引,
  distance?: number; //截止最新添加的节点的总距离
};

export type RangefinderDrawendEventType = {
  points?: Point;// 所有测量时，打下的节点BMap.Point对象,
  overlays?: Overlay[];// 所有测量时，生成的线段BMap.Overlay对象,
  distance?: number;// 测量解释时的最终距离
};

export type EventParams = {
  type: string;
  target: any;
};

export type MapEventPixelParams = EventParams & {
  point: Point;
  pixel: Pixel;
};

export type MapEventPixelOverlayParams = MapEventPixelParams & {
  overlay: OverlayInstance;
};

export type MarkerEventParams = EventParams;

export type PointCollectionEventPointParams = MarkerEventParams & {
  point: Point;
};

export type MarkerEventPointParams = MarkerEventParams & {
  point: Point;
  pixel: Pixel;
};

export type Marker = {
  offset?: Size;
  icon?: Icon;
  enableMassClear?: boolean;
  enableDragging?: boolean;
  enableClicking?: boolean;
  raiseOnDrag?: boolean;
  draggingCursor?: string;
  rotation?: number;
  shadow?: Icon;
  title?: string;
  position?: Point;
  label?: Label;
};

export type MarkerInstance = {
  openInfoWindow?: (infoWindow: InfoWindow) => void;
  closeInfoWindow?: () => void;
  setIcon?: (icon: Icon) => void;
  getIcon?: () => Icon;
  setPosition?: (point: Point) => void;
  getPosition?: () => Point;
  setOffset?: (offset: Size) => void;
  getOffset?: () => Size;
  setLabel?: (label: Label) => void;
  getLabel?: () => Label;
  setTitle?: (title: string) => void;
  getTitle?: () => string;
  setTop?: (isTop: boolean) => void;
  enableDragging?: () => void;
  disableDragging?: () => void;
  enableMassClear?: () => void;
  disableMassClear?: () => void;
  setZIndex?: (zIndex: number) => void;
  getMap?: () => MapInstance;
  addContextMenu?: (menu: ContextMenu) => void;
  removeContextMenu?: (menu: ContextMenu) => void;
  setAnimation?: (animation?: AnimationEnum) => void;
  setRotation?: (rotation: number) => void;
  getRotation?: () => number;
  setShadow?: (shadow: Icon) => void;
  getShadow?: () => Icon;
};

export type InfoWindow = {
  width?: number;
  height?: number;
  maxWidth?: number;
  offset?: Size;
  title?: string;
  enableAutoPan?: boolean;
  enableCloseOnClick?: boolean;
  enableMessage?: boolean;
  message?: string;
};
export type InfoWindowInstance = {
  setWidth?: (width: number) => void;
  setHeight?: (height: number) => void;
  redraw?: () => void;
  setTitle?: (title: string | HTMLElement) => void;
  getTitle?: () => string | HTMLElement;
  setContent?: (content: string | HTMLElement) => void;
  getContent?: () => string | HTMLElement;
  getPosition?: () => Point;
  enableMaximize?: () => void;
  disableMaximize?: () => void;
  isOpen?: () => boolean;
  setMaxContent?: (content: string) => void;
  maximize?: () => void;
  restore?: () => void;
  enableAutoPan?: () => void;
  disableAutoPan?: () => void;
  enableCloseOnClick?: () => void;
  disableCloseOnClick?: () => void;
};

export type ContextMenuItem = {
  width?: number;
  id?: string;
  iconUrl?: string | ContextMenuIconEnum;
};

export type ContextMenuItemInstance = {
  setText?: (text: string) => void;
  setIcon?: (iconUrl: string) => void;
  enable?: () => void;
  disable?: () => void;
}

export type ContextMenu = {
};

export type ContextMenuInstance = {
  addItem?: (item: ContextMenuItem) => void;
  getItem?: (index: number) => ContextMenuItem;
  removeItem?: (item: ContextMenuItem) => void;
  addSeparator?: () => void;
  removeSeparator?: (index: number) => void;
};

export type PointCollection = {
  points: Point[];
  shape?: ShapeTypeEnum;
  color?: string;
  size?: SizeTypeEnum;
};

export type PointCollectionInstance = {
  setPoints?: (points: Point[]) => void;
  setStyles?: (styles: PointCollection) => void;
  clear?: () => void;
};

export type SymbolOption = {
  path: string;
  anchor?: Size;
  fillColor?: string;
  fillOpacity?: number;
  scale?: number;
  rotation?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokeWeight?: number;
};

export type SymbolOptionInstance = {
  setPath: (path: string) => void;
  setAnchor: (anchor: Size) => void;
  setRotation: (rotation: number) => void;
  setScale: (scale: number) => void;
  setStrokeWeight: (weight: number) => void;
  setStrokeColor: (color: string) => void;
  setStrokeOpacity: (opacity: number) => void;
  setFillOpacity: (opacity: number) => void;
  setFillColor: (color: string) => void;
};

export type IconSequence = {
  symbol?: SymbolOption;
  offset?: string;
  repeat: string;
  fixedRotation: boolean;
};

export type Polyline = {
  points: Point[];
  strokeColor?: string;
  strokeWeight?: number;
  strokeOpacity?: number;
  strokeStyle?: 'solid' | 'dashed';
  enableMassClear?: boolean;
  enableEditing?: boolean;
  enableClicking?: boolean;
  icons?: IconSequence[];
};

export type PolylineInstance = {
  setPath: (path: Point[]) => void;
  getPath: () => Point[];
  setStrokeColor: (color: string) => void;
  getStrokeColor: () => string;
  setStrokeOpacity: (opacity: number) => void;
  getStrokeOpacity: () => number;
  setStrokeWeight: (weight: number) => void;
  getStrokeWeight: () => number;
  setStrokeStyle: (style: 'solid' | 'dashed') => void;
  getStrokeStyle: () => 'solid' | 'dashed';
  getBounds: () => Bounds;
  setPositionAt: (index: number, point: Point) => void;
  getMap: () => MapInstance;
  enableMassClear: () => void;
  disableMassClear: () => void;
  enableEditing: () => void;
  disableEditing: () => void;
};

export type Polygon = Omit<Polyline, 'icons'> & {
  fillColor?: string;
  fillOpacity?: number;
};

export type PolygonInstance = PolylineInstance & {
  setFillColor: (color: string) => void;
  getFillColor: () => string;
  setFillOpacity: (opacity: number) => void;
  getFillOpacity: () => number;
};