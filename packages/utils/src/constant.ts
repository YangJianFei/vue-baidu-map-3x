/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:01:08
 * @LastEditTime: 2023-12-02 10:15:22
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\constant.ts
 */

import { type } from "os";
import { BMap } from "../typing";

export enum ControlsEnum {
  ScaleControl = 'ScaleControl',
  Navigation = 'NavigationControl',
  MapTypeControl = 'MapTypeControl',
  OverviewMapControl = 'OverviewMapControl',
  GeolocationControl = 'GeolocationControl',
  CopyrightControl = 'CopyrightControl',
  CityListControl = 'CityListControl',
  PanoramaControl = 'PanoramaControl',

  Marker = 'Marker',
  PointCollection = 'PointCollection',
  Polyline = 'Polyline',
  Polygon = 'Polygon',
};

export enum ComponentTypeEnum {
  Control = 'control',
  Overlay = 'overlay',
  TileLayer = 'tileLayer',
  ContextMenu = 'contextMenu',
};

export type BaseEvents<T = any> = {
  'load': [params?: T],
  'unLoad': [],
};

export const baseEvents = ['load', 'unLoad'];

export const controlMethods = new Map([
  ['anchor', 'setAnchor'],
  ['offset', 'setOffset'],
]);

export enum ControlAnchorEnum {
  'BMAP_ANCHOR_TOP_LEFT' = 'BMAP_ANCHOR_TOP_LEFT',
  'BMAP_ANCHOR_TOP_RIGHT' = 'BMAP_ANCHOR_TOP_RIGHT',
  'BMAP_ANCHOR_BOTTOM_LEFT' = 'BMAP_ANCHOR_BOTTOM_LEFT',
  'BMAP_ANCHOR_BOTTOM_RIGHT' = 'BMAP_ANCHOR_BOTTOM_RIGHT',
};

export type ControlAnchor = keyof typeof ControlAnchorEnum;

export enum LengthUnitEnum {
  'BMAP_UNIT_METRIC' = 'BMAP_UNIT_METRIC',
  'BMAP_UNIT_IMPERIAL' = 'BMAP_UNIT_IMPERIAL',
};
export type LengthUnit = keyof typeof LengthUnitEnum;

export enum NavigationControlTypeEnum {
  'BMAP_NAVIGATION_CONTROL_LARGE' = 'BMAP_NAVIGATION_CONTROL_LARGE',
  'BMAP_NAVIGATION_CONTROL_SMALL' = 'BMAP_NAVIGATION_CONTROL_SMALL',
  'BMAP_NAVIGATION_CONTROL_PAN' = 'BMAP_NAVIGATION_CONTROL_PAN',
  'BMAP_NAVIGATION_CONTROL_ZOOM' = 'BMAP_NAVIGATION_CONTROL_ZOOM',
};

export type NavigationControlType = keyof typeof NavigationControlTypeEnum;

export enum MapTypeControlTypeEnum {
  'BMAP_MAPTYPE_CONTROL_HORIZONTAL' = 'BMAP_MAPTYPE_CONTROL_HORIZONTAL',
  'BMAP_MAPTYPE_CONTROL_DROPDOWN' = 'BMAP_MAPTYPE_CONTROL_DROPDOWN',
  'BMAP_MAPTYPE_CONTROL_MAP' = 'BMAP_MAPTYPE_CONTROL_MAP',
};

export type MapTypeControlType = keyof typeof MapTypeControlTypeEnum;

export enum MapTypesEnum {
  'BMAP_NORMAL_MAP' = 'BMAP_NORMAL_MAP',
  'BMAP_SATELLITE_MAP' = 'BMAP_SATELLITE_MAP',
  'BMAP_HYBRID_MAP' = 'BMAP_HYBRID_MAP',
};

export type MapTypes = keyof typeof MapTypesEnum;

export enum AnimationEnum {
  'BMAP_ANIMATION_DROP' = 'BMAP_ANIMATION_DROP',
  'BMAP_ANIMATION_BOUNCE' = 'BMAP_ANIMATION_BOUNCE',
};

export enum ContextMenuIconEnum {
  'BMAP_CONTEXT_MENU_ICON_ZOOMIN' = 'BMAP_CONTEXT_MENU_ICON_ZOOMIN',
  'BMAP_CONTEXT_MENU_ICON_ZOOMOUT' = 'BMAP_CONTEXT_MENU_ICON_ZOOMOUT',
}

export enum ShapeTypeEnum {
  'BMAP_POINT_SHAPE_CIRCLE' = 'BMAP_POINT_SHAPE_CIRCLE',
  'BMAP_POINT_SHAPE_STAR' = 'BMAP_POINT_SHAPE_STAR',
  'BMAP_POINT_SHAPE_SQUARE' = 'BMAP_POINT_SHAPE_SQUARE',
  'BMAP_POINT_SHAPE_RHOMBUS' = 'BMAP_POINT_SHAPE_RHOMBUS',
  'BMAP_POINT_SHAPE_WATERDROP' = 'BMAP_POINT_SHAPE_WATERDROP',
};

export enum SizeTypeEnum {
  'BMAP_POINT_SIZE_TINY' = 'BMAP_POINT_SIZE_TINY',
  'BMAP_POINT_SIZE_SMALLER' = 'BMAP_POINT_SIZE_SMALLER',
  'BMAP_POINT_SIZE_SMALL' = 'BMAP_POINT_SIZE_SMALL',
  'BMAP_POINT_SIZE_NORMAL' = 'BMAP_POINT_SIZE_NORMAL',
  'BMAP_POINT_SIZE_BIG' = 'BMAP_POINT_SIZE_BIG',
  'BMAP_POINT_SIZE_BIGGER' = 'BMAP_POINT_SIZE_BIGGER',
  'BMAP_POINT_SIZE_HUGE' = 'BMAP_POINT_SIZE_HUGE',
};