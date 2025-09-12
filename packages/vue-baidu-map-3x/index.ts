/*
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-12 10:59:09
 * @LastEditTime: 2025-09-12 15:28:22
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/vue-baidu-map-3x/index.ts
 */
import ApiLoader from '@vue-baidu-map-3x/api-loader';
import BaiduMap from '@vue-baidu-map-3x/map'
import BmScale from '@vue-baidu-map-3x/scale'
import BmNavigation from '@vue-baidu-map-3x/navigation'
import BmMapType from '@vue-baidu-map-3x/map-type'
import BmOverviewMap from '@vue-baidu-map-3x/overview-map'
import BmGeolocation from '@vue-baidu-map-3x/geolocation'
import BmCopyright from '@vue-baidu-map-3x/copyright'
import BmCityList from '@vue-baidu-map-3x/city-list'
import BmPanorama from '@vue-baidu-map-3x/panorama'
import BmControl from '@vue-baidu-map-3x/control';
import BmRangefinder from '@vue-baidu-map-3x/rangefinder';
import { setConfig, getConfig } from '@vue-baidu-map-3x/utils';

export * from '@vue-baidu-map-3x/utils';

export default {
  install(Vue, options = {}) {
    setConfig(options);

    Vue.component(ApiLoader.name, ApiLoader)
    Vue.component(BaiduMap.name, BaiduMap)

    Vue.component(BmScale.name, BmScale)
    Vue.component(BmNavigation.name, BmNavigation)
    Vue.component(BmMapType.name, BmMapType)
    Vue.component(BmOverviewMap.name, BmOverviewMap)
    Vue.component(BmGeolocation.name, BmGeolocation)
    Vue.component(BmCopyright.name, BmCopyright)
    Vue.component(BmCityList.name, BmCityList)
    Vue.component(BmPanorama.name, BmPanorama)
    Vue.component(BmControl.name, BmControl)
    Vue.component(BmRangefinder.name, BmRangefinder)
  }
}

export {
  ApiLoader,
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
};

export {
  getConfig,
}
