/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-30 17:14:46
 * @LastEditTime: 2023-12-21 18:05:14
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\methods.ts
 */

import { Ref } from 'vue';
import { deleteEmptyKey, getConfig } from ".";
import { CopyrightControl, CopyrightInstance } from "../typing";
import { ControlsEnum } from "./constant";
import { getBounds, getPoint, getSize } from "./create";

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
  format?: (value: any) => any;
  customMethod?: (originInstance, newValue: any, oldValue?: any) => void;
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
  [ControlsEnum.OverviewMapControl, [
    ...baseControlMethod,
    {
      key: 'size',
      method: 'setSize',
      format: (size) => getSize(size?.width, size?.height)
    }
  ]],
  [ControlsEnum.GeolocationControl, [...baseControlMethod]],
  [ControlsEnum.CopyrightControl, [
    ...baseControlMethod,
    {
      key: 'copyright',
      method: 'addCopyright',
      customMethod: (originInstance: Ref<CopyrightInstance | undefined>, newValue: CopyrightControl[]) => {
        originInstance?.value?.getCopyrightCollection?.()?.forEach?.(copyright => {
          if (copyright?.id) {
            originInstance?.value?.removeCopyright?.(copyright?.id);
          }
        });
        newValue?.forEach?.(copyright => {
          const bounds = copyright?.bounds && getBounds(
            getPoint(copyright?.bounds?.sw?.lng, copyright?.bounds?.sw?.lat),
            getPoint(copyright?.bounds?.ne?.lng, copyright?.bounds?.ne?.lat)
          );
          originInstance?.value?.addCopyright?.(deleteEmptyKey({
            ...copyright,
            bounds
          }));
        });
      },
    }
  ]],
  [ControlsEnum.CityListControl, [...baseControlMethod]],
]);

const methods = {
  'API': {
    '2.0': {
      setMapStyle: 'setMapStyle',
      NavigationControl: 'NavigationControl',
      GeolocationControl: 'GeolocationControl',
    },
    '3.0': {
      setMapStyle: 'setMapStyleV2',
      NavigationControl: 'NavigationControl',
      GeolocationControl: 'GeolocationControl',
    }
  },
  'WebGL': {
    setMapStyle: 'setMapStyleV2',
    NavigationControl: 'NavigationControl3D',
    GeolocationControl: 'LocationControl',
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