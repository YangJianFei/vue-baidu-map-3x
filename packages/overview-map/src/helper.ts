/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 14:24:44
 * @LastEditTime: 2023-12-01 14:24:57
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\overview-map\src\helper.ts
 */

export type Events = {
  'viewchanged': [params: {
    type;
    target;
    isOpen:boolean;
  }];
  'viewchanging': [params: {
    type;
    target;
  }];
}

export const events = [
  'viewchanged',
  'viewchanging',
]