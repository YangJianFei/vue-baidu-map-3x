/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:20:33
 * @LastEditTime: 2023-11-24 10:20:33
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\create.ts
 */
import type { Point, Size } from '../typing';

export const getPoint = (lng: number, lat: number): Point => {
  return new window.BMap.Point(lng, lat);
};

export const getSize = (width?: number, height?: number): Size => {
  return new window.BMap.Size(width || 0, height || 0);
};