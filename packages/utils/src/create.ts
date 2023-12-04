/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:20:33
 * @LastEditTime: 2023-11-24 10:20:33
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\create.ts
 */
import { deleteEmptyKey } from '.';
import type { Icon, Point, Size } from '../typing';

export const getPoint = (lng: number, lat: number): Point => {
  return new window.BMap.Point(lng, lat);
};

export const getSize = (width?: number, height?: number): Size => {
  return new window.BMap.Size(width || 0, height || 0);
};

export const getIcon = (options: Icon): Icon => {
  return new window.BMap.Icon(
    options?.imageUrl,
    getSize(options?.imageSize?.width, options?.imageSize?.height),
    deleteEmptyKey({
      anchor: getSize(options?.anchor?.width, options?.anchor?.height),
      imageOffset: getSize(options?.imageOffset?.width, options?.imageOffset?.height),
      infoWindowAnchor: getSize(options?.infoWindowAnchor?.width, options?.infoWindowAnchor?.height),
      printImageUrl: options?.printImageUrl,
    })
  );
};