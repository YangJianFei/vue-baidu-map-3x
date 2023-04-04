/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 7th 2022, 11:10:36 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

import { getConfig } from '../base/util';
import { IAddressToPointConfig, IAddressToPointResponse, IPointTransferConfig, IPointTransferResponse } from './type';

let mapLoadResolve;
let mapLoadPromise: Promise<IBMap> = new Promise((resolve) => {
    mapLoadResolve = resolve;
});
export { mapLoadResolve };
export const getBMap = () => {
    return mapLoadPromise;
};

export function getParamsStrByObject(obj: any) {
    let arr: string[] = [];
    Object.keys(obj).forEach(key => {
        arr.push(key + '=' + obj[key]);
    });
    return arr.join('&');
}

/**
 * 通过坐标获取地址 config和返回值参考百度api
 * @param config {IPointToAddressConfig}  默认值 {extensions_poi 1,output: 'json',coordtype: 'wgs84ll',timeout: 60  }
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/
export function getAddressByPoints(config: IPointToAddressConfig, aks: string[] = []) {
    if (!config.location || !config.location.length) {
        console.error('请传入location');
    }
    const appConfig = getConfig() as IAppConfig;
    if (appConfig.ak) {
        aks.push(appConfig.ak);
    }
    return new Promise((resolve, reject) => {
        if (aks.length) {
            let params = Object.assign({
                location: [],
                extensions_poi: 1,
                output: 'json',
                coordtype: 'wgs84ll',
                timeout: 60
            }, config);

            let num: number = 0;
            const requestBaidu = () => {
                const timer = setTimeout(() => {
                    reject(new Error('查询超时'));
                }, params.timeout * 1000);

                const callbackName: string = 'baiduReverse' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res: IPointToAddressReponse) => {
                    clearTimeout(timer);
                    window[callbackName] = null;
                    document.getElementById(callbackName)?.remove();
                    if (!res.status) {
                        resolve(res.result);
                    } else {
                        if (num < aks.length * 4) {
                            num++;
                            requestBaidu();
                        } else {
                            reject(new Error('查询失败'));
                        }
                    }
                };
                params.ak = aks[num % aks.length];
                let script = document.createElement('script');
                script.id = callbackName;
                script.src = `https://api.map.baidu.com/reverse_geocoding/v3/?${getParamsStrByObject(params)}`;
                document.getElementsByTagName('head')[0]?.appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}

/**
 * 通过地址获取坐标 config和返回值参考百度api
 * @param config {IAddressToPointConfig} 默认值 {output: 'json',timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/
export function getPointByAddress(config: IAddressToPointConfig, aks: string[] = []) {
    if (!config.address) {
        console.error('请传入address');
    }
    const appConfig = getConfig() as IAppConfig;
    if (appConfig.ak) {
        aks.push(appConfig.ak);
    }
    return new Promise((resolve, reject) => {
        if (aks.length) {
            let params = Object.assign({
                address: '',
                output: 'json',
                timeout: 60
            }, config);

            let num: number = 0;
            const requestBaidu = () => {
                const timer = setTimeout(() => {
                    reject(new Error('查询超时'));
                }, params.timeout * 1000);

                const callbackName: string = 'baidugeocoding' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res: IAddressToPointResponse) => {
                    clearTimeout(timer);
                    window[callbackName] = null;
                    document.getElementById(callbackName)?.remove();
                    if (!res.status) {
                        resolve(res.result);
                    } else {
                        if (num < aks.length * 4) {
                            num++;
                            requestBaidu();
                        } else {
                            reject(new Error('查询失败'));
                        }
                    }
                };
                params.ak = aks[num % aks.length];
                let script = document.createElement('script');
                script.id = callbackName;
                script.src = `https://api.map.baidu.com/geocoding/v3/?${getParamsStrByObject(params)}`;
                document.getElementsByTagName('head')[0]?.appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}

/**
 * 坐标转换 config和返回值参考百度api
 * @param config {IPointTransferConfig} 默认值 {from: 1,to: 5,timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/
export function getPointsTransfer(config: IPointTransferConfig, aks: string[] = []) {
    if (!config.locations || !config.locations.length) {
        console.error('请传入locations');
    }
    const appConfig = getConfig() as IAppConfig;
    if (appConfig.ak) {
        aks.push(appConfig.ak);
    }
    return new Promise((resolve, reject) => {
        if (aks.length) {
            let params = Object.assign({
                locations: [],
                from: 1,
                to: 5,
                timeout: 60
            }, config);

            let num: number = 0;
            const requestBaidu = () => {
                const timer = setTimeout(() => {
                    reject(new Error('查询超时'));
                }, params.timeout * 1000);

                const callbackName: string = 'baidugeoconv' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res: IPointTransferResponse) => {
                    clearTimeout(timer);
                    window[callbackName] = null;
                    document.getElementById(callbackName)?.remove();
                    if (!res.status) {
                        resolve(res.result);
                    } else {
                        if (num < aks.length * 4) {
                            num++;
                            requestBaidu();
                        } else {
                            reject(new Error('查询失败'));
                        }
                    }
                };
                params.ak = aks[num % aks.length];
                params.coords = params.locations.join(';');
                let script = document.createElement('script');
                script.id = callbackName;
                script.src = `https://api.map.baidu.com/geoconv/v1/?${getParamsStrByObject(params)}`;
                document.getElementsByTagName('head')[0]?.appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}
