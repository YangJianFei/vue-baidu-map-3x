/*
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-12 11:43:23
 * @LastEditTime: 2025-09-12 13:43:05
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/vue-baidu-map-3x/types/index.d.ts
 */
import 'vue'
import type {
  BaiduMap,
  BmScale,
  BmNavigation,
  BmMapType,
  BmOverviewMap,
  BmGeolocation,
  BmCopyright,
  BmCityList,
  BmPanorama,
  BmControl,
  BmRangefinder,
} from '../index'

declare module 'vue' {
  export interface GlobalComponents {
    BaiduMap: typeof BaiduMap
    BmScale: typeof BmScale
    BmNavigation: typeof BmNavigation
    BmMapType: typeof BmMapType
    BmOverviewMap: typeof BmOverviewMap
    BmGeolocation: typeof BmGeolocation
    BmCopyright: typeof BmCopyright
    BmCityList: typeof BmCityList
    BmPanorama: typeof BmPanorama
    BmControl: typeof BmControl
    BmRangefinder: typeof BmRangefinder
  }
}

export { }
