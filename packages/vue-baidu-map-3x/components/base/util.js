import { createPoint } from './factory'

export const isPoint = obj => obj.lng && obj.lat
export const checkType = val => Object.prototype.toString.call(val).slice(8, -1)

export const getPosition = (BMap, point) => isPoint(point) ? createPoint(BMap, point) : point

export const deleteEmptyKey = (obj) => {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'undefined') {
            delete obj[key];
        }
    });
}

let config = {
    v: '3.0',
    type: 'API'
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