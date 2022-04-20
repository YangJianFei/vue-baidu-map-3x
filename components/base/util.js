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
