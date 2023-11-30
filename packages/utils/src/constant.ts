/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:01:08
 * @LastEditTime: 2023-11-30 16:31:41
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\constant.ts
 */

export enum ControlsEnum {
  ScaleControl = 'ScaleControl',
  Navigation = 'NavigationControl',
};

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