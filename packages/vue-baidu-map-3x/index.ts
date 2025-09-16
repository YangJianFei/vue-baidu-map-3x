/*
 * @Description:
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-12 10:59:09
 * @LastEditTime: 2025-09-12 17:13:43
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/vue-baidu-map-3x/index.ts
 */
import ApiLoader, { useBMap, getBMap } from "@vue-baidu-map-3x/api-loader";
import { setConfig, getConfig } from "@vue-baidu-map-3x/utils";

import BaiduMap from "@vue-baidu-map-3x/map";
import BmScale from "@vue-baidu-map-3x/scale";
import BmNavigation from "@vue-baidu-map-3x/navigation";
import BmMapType from "@vue-baidu-map-3x/map-type";
import BmOverviewMap from "@vue-baidu-map-3x/overview-map";
import BmGeolocation from "@vue-baidu-map-3x/geolocation";
import BmCopyright from "@vue-baidu-map-3x/copyright";
import BmCityList from "@vue-baidu-map-3x/city-list";
import BmPanorama from "@vue-baidu-map-3x/panorama";
import BmControl from "@vue-baidu-map-3x/control";
import BmRangefinder from "@vue-baidu-map-3x/rangefinder";

export * from "@vue-baidu-map-3x/utils";

export default {
  install(Vue, options = {}) {
    setConfig(options);

    Vue.component(ApiLoader.name, ApiLoader);

    Vue.component(BaiduMap.name, BaiduMap);

    // 控件
    Vue.component(BmScale.name, BmScale);
    Vue.component(BmNavigation.name, BmNavigation);
    Vue.component(BmMapType.name, BmMapType);
    Vue.component(BmOverviewMap.name, BmOverviewMap);
    Vue.component(BmGeolocation.name, BmGeolocation);
    Vue.component(BmCopyright.name, BmCopyright);
    Vue.component(BmCityList.name, BmCityList);
    Vue.component(BmPanorama.name, BmPanorama);
    Vue.component(BmControl.name, BmControl);
    Vue.component(BmRangefinder.name, BmRangefinder);

    // 覆盖物

    // 图层

    // 检索

    // 上下文菜单

    // 其他

    // 第三方库
  },
};

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

export { useBMap };

export { getBMap, getConfig };
