/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 16:58:19
 * @LastEditTime: 2023-11-22 16:58:19
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\api-loader\src\helper.ts
 */

import { BMap } from "@vue-baidu-map-3x/utils";

let mapLoadResolve;
let mapLoadPromise: Promise<BMap> = new Promise((resolve) => {
  mapLoadResolve = resolve;
});

export { mapLoadResolve };

export const getBMap = () => mapLoadPromise;