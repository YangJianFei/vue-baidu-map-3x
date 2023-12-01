/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-30 17:14:46
 * @LastEditTime: 2023-11-30 19:04:29
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\methods.ts
 */

import { getConfig } from ".";
import { ControlsEnum } from "./constant";
import { getSize } from "./create";

export const baseControlMethod = [
  {
    key: 'anchor',
    method: 'setAnchor',
    format: (value) => window[value],
  },
  {
    key: 'offset',
    method: 'setOffset',
    format: (size) => getSize(size?.width, size?.height)
  },
];

export const controlMethodMap = new Map<ControlsEnum, {
  key: string;
  method: string | string[];
  format: (value: any) => any;
}[]>([
  [ControlsEnum.ScaleControl, [...baseControlMethod]],
  [ControlsEnum.Navigation, [
    ...baseControlMethod,
    {
      key: 'type',
      method: 'setType',
      format: (value) => window[value],
    }
  ]],
  [ControlsEnum.MapTypeControl, [...baseControlMethod]],
]);

const methods = {
  'API': {
    '2.0': {
      setMapStyle: 'setMapStyle',
      NavigationControl: 'NavigationControl'
    },
    '3.0': {
      setMapStyle: 'setMapStyleV2',
      NavigationControl: 'NavigationControl'
    }
  },
  'WebGL': {
    setMapStyle: 'setMapStyleV2',
    NavigationControl: 'NavigationControl3D'
  }
}

export const getMapMethod = (method) => {
  const config = getConfig();
  if (config.type == 'WebGL') {
    return methods[config.type][method];
  } else {
    return methods[config.type][config.v][method];
  }
}