/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-04-04 16:22:05
 * @LastEditTime: 2023-04-04 16:24:40
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\components\hooks\usePoint.ts
 */
import { useMap } from './useMap';

export const usePoint = (lng: number, lat: number): Promise<IPoint> => {
    return new Promise((resolve) => {
        useMap().then(BMap => {
            const point = new BMap.Point(lng, lat);
            resolve(point);
        });
    });
};