/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 11:38:40
 * @LastEditTime: 2023-11-24 11:38:40
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\control\typing.ts
 */
import { ControlAnchorEnum, Size } from '@vue-baidu-map-3x/utils';

export type Control = {
  offset?: Size;
  anchor?: keyof typeof ControlAnchorEnum;
};