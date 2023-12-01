/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 14:00:35
 * @LastEditTime: 2023-11-26 15:37:10
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\index.ts
 */
import type { ConfigType } from '../typing';
import { ControlsEnum } from './constant';
import { getSize } from './create';

let config: ConfigType = {
  v: '3.0',
  type: 'API',
};

export const setConfig = (options = {}) => {
  config = Object.assign(config, options);
  if (!config.ak) {
    console.error('请配置ak：百度地图开发者平台申请的密钥');
  }
};

export const getConfig = () => {
  return config;
};

export const withInstall = (comp) => {
  comp.install = (app) => {
    app.component(comp.name, comp);
  };
};

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === '';
};

export const equalsFace = (newValue: any, elseValue: any) => {
  if (isEmpty(newValue)) {
    return true;
  }
  if (typeof newValue == 'object' && typeof elseValue == 'object') {
    if (JSON.stringify(newValue) == JSON.stringify(elseValue)) {
      return true;
    } else {
      return false;
    }
  } else if (newValue !== elseValue) {
    return false;
  }
  return true;
};

export const deleteEmptyKey = (obj) => {
  Object.keys(obj).forEach(key => {
    if (isEmpty(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
};