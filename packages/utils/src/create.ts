/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 10:20:33
 * @LastEditTime: 2023-11-24 10:20:33
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\create.ts
 */
import { deleteEmptyKey } from '.';
import type { Bounds, Icon, IconSequence, Label, Point, Size, SymbolOption } from '../typing';

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

export const getBounds = (sw?: Point, ne?: Point): Bounds => {
  return new window.BMap.Bounds(sw, ne);
};

export const getLabel = (options?: Label): Label => {
  let labelOption = {
    offset: options?.offset && getSize(options.offset.width, options.offset.height),
    position: options?.position && getPoint(options.position.lng, options.position.lat),
    enableMassClear: options?.enableMassClear,
  };
  deleteEmptyKey(labelOption);
  return new window.BMap.Label(options?.content, labelOption)
};

export function getSymbol(options: SymbolOption) {
  let symbolOption = {
    anchor: options.anchor && getSize(options.anchor?.width, options.anchor?.height),
    fillColor: options.fillColor,
    fillOpacity: options.fillOpacity,
    scale: options.scale,
    rotation: options.rotation,
    strokeColor: options.strokeColor,
    strokeOpacity: options.strokeOpacity,
    strokeWeight: options.strokeWeight
  };
  deleteEmptyKey(symbolOption);
  return new window.BMap.Symbol(window[options.path] || options.path, symbolOption)
}

export function getIconSequence(options: IconSequence) {
  const { symbol, offset, repeat, fixedRotation } = options;
  return new window.BMap.IconSequence(
    symbol && getSymbol(symbol),
    offset,
    repeat,
    fixedRotation
  )
}