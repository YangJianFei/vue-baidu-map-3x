/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-24 17:59:37
 * @LastEditTime: 2023-04-04 16:22:00
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\components\hooks\useGeocoder.ts
 */
import { useMap } from './useMap';

let geocoder: IGeoCoder;
export const useGeocoder = (): Promise<IGeoCoder> => {
    return new Promise((resolve) => {
        if (geocoder) {
            resolve(geocoder);
        } else {
            useMap().then(BMap => {
                geocoder = new BMap.Geocoder();
                resolve(geocoder);
            });
        }
    });
}