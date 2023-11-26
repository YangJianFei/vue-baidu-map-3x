/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:01:08
 * @LastEditTime: 2023-11-24 11:40:01
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\constant.ts
 */

export enum ControlAnchorEnum {
  'BMAP_ANCHOR_TOP_LEFT' = 'BMAP_ANCHOR_TOP_LEFT',
  'BMAP_ANCHOR_TOP_RIGHT' = 'BMAP_ANCHOR_TOP_RIGHT',
  'BMAP_ANCHOR_BOTTOM_LEFT' = 'BMAP_ANCHOR_BOTTOM_LEFT',
  'BMAP_ANCHOR_BOTTOM_RIGHT' = 'BMAP_ANCHOR_BOTTOM_RIGHT',
};

export type ControlAnchor = keyof typeof ControlAnchorEnum;

export const controlMethods = new Map([
  ['anchor', 'setAnchor'],
  ['offset', 'setOffset'],
]);

export enum LengthUnitEnum {
  'BMAP_UNIT_METRIC' = 'BMAP_UNIT_METRIC',
  'BMAP_UNIT_IMPERIAL' = 'BMAP_UNIT_IMPERIAL',
};
export type LengthUnit = keyof typeof LengthUnitEnum;