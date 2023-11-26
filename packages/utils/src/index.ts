/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 14:00:35
 * @LastEditTime: 2023-11-24 14:00:48
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\index.ts
 */
import type { ConfigType } from '../typing';

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

export const equalsFace = (value: any, elseValue: any) => {
  if (typeof value == 'object' && typeof elseValue == 'object') {
    if (JSON.stringify(value) == JSON.stringify(elseValue)) {
      return true;
    } else {
      return false;
    }
  } else if (value !== elseValue) {
    return false;
  }
  return true;
};

export const deleteEmptyKey = (obj) => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'undefined') {
      delete obj[key];
    }
  });
};