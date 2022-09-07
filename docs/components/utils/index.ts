/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 7th 2022, 11:10:36 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

import { getConfig } from '../base/util';

export function getParamsStrByObject(obj: any) {
    let arr: string[] = [];
    Object.keys(obj).forEach(key => {
        arr.push(key + '=' + obj[key]);
    });
    return arr.join('&');
}

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
                coordtype: 'wgs84ll'
            }, config);

            let num = 0;
            const requestBaidu = () => {
                const callbackName: string = 'baiduReverse' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res: IPointToAddressReponse) => {
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
                document.getElementsByTagName('head')[0].appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}

export function getPointByAddress(config = {}) {
    return new Promise((resolve, reject) => {
        if (getConfig().BaiduMapAKs.length) {
            let params = Object.assign({
                address: '',
                output: 'json',
            }, config);

            let num = 0;
            const requestBaidu = () => {
                const callbackName = 'baidugeocoding' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res) => {
                    window[callbackName] = null;
                    document.getElementById(callbackName).remove();
                    if (!res.status) {
                        resolve(res.result);
                    } else {
                        if (num < getConfig().BaiduMapAKs.length * 4) {
                            num++;
                            requestBaidu();
                        } else {
                            reject(new Error('查询失败'));
                        }
                    }
                };
                params.ak = getConfig().BaiduMapAKs[num % getConfig().BaiduMapAKs.length];
                let script = document.createElement('script');
                script.id = callbackName;
                script.src = `https://api.map.baidu.com/geocoding/v3/?${getParamsStrByObject(params)}`;
                document.getElementsByTagName('head')[0].appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}

export function getPointsGPS(config = {}) {
    return new Promise((resolve, reject) => {
        if (getConfig().BaiduMapAKs.length) {
            let params = Object.assign({
                locations: [],
                from: 1,
                to: 5
            }, config);

            let num = 0;
            const requestBaidu = () => {
                const callbackName = 'baidugeoconv' + Math.floor(Math.random() * 1000000);
                params.callback = callbackName;
                window[callbackName] = (res) => {
                    window[callbackName] = null;
                    document.getElementById(callbackName).remove();
                    if (!res.status) {
                        resolve(res.result);
                    } else {
                        if (num < getConfig().BaiduMapAKs.length * 4) {
                            num++;
                            requestBaidu();
                        } else {
                            reject(new Error('查询失败'));
                        }
                    }
                };
                params.ak = getConfig().BaiduMapAKs[num % getConfig().BaiduMapAKs.length];
                params.coords = params.locations.join(';');
                let script = document.createElement('script');
                script.id = callbackName;
                script.src = `https://api.map.baidu.com/geoconv/v1/?${getParamsStrByObject(params)}`;
                document.getElementsByTagName('head')[0].appendChild(script);
            };
            requestBaidu();
        } else {
            console.error('请配置百度ak！');
            reject(new Error('请配置百度ak！'));
        }
    });
}
