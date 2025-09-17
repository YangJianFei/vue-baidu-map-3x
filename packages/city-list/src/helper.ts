/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:27
 * @LastEditTime: 2023-12-01 16:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\helper.ts
 */

export type Events = {
  'changeBefore': [params: any];
  'changeAfter': [params: any];
  'changeSuccess': [params: any];
}

export const events = [
  'changeBefore',
  'changeAfter',
  'changeSuccess',
];