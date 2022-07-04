/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Friday, May 6th 2022, 4:57:16 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

import BaiduMap from './components/map/Map.vue'
import BmScale from './components/controls/Scale.vue'
import BmNavigation from './components/controls/Navigation.vue'
import BmMapType from './components/controls/MapType.vue'
import BmOverviewMap from './components/controls/OverviewMap.vue'
import BmGeolocation from './components/controls/Geolocation.vue'
import BmCopyright from './components/controls/Copyright.vue'
import BmCityList from './components/controls/CityList.vue'
import BmPanorama from './components/controls/Panorama.vue'
import BmControl from './components/controls/Control.vue'
import BmMarker from './components/overlays/Marker.vue'
import BmPointCollection from './components/overlays/PointCollection.vue'
import BmPolyline from './components/overlays/Polyline.vue'
import BmPolygon from './components/overlays/Polygon.vue'
import BmCircle from './components/overlays/Circle.vue'
import BmGround from './components/overlays/Ground.vue'
import BmLabel from './components/overlays/Label.vue'
import BmInfoWindow from './components/overlays/InfoWindow.vue'
import BmOverlay from './components/overlays/Overlay.vue'
import BmContextMenu from './components/context-menu/Menu.vue'
import BmContextMenuItem from './components/context-menu/Item.vue'
import BmLocalSearch from './components/search/LocalSearch.vue'
import BmTransit from './components/search/Transit.vue'
import BmWalking from './components/search/Walking.vue'
import BmDriving from './components/search/Driving.vue'
import BmBus from './components/search/Bus.vue'
import BmTile from './components/layers/Tile.vue'
import BmTraffic from './components/layers/Traffic.vue'
import BmBoundary from './components/others/Boundary.vue'
import BmAutoComplete from './components/others/AutoComplete.vue'

import { setConfig } from './components/base/util'

export default {
    install(Vue, options = {}) {
        setConfig(options);

        Vue.component('baidu-map', BaiduMap)

        Vue.component('bm-scale', BmScale)
        Vue.component('bm-navigation', BmNavigation)
        Vue.component('bm-map-type', BmMapType)
        Vue.component('bm-overview-map', BmOverviewMap)
        Vue.component('bm-geolocation', BmGeolocation)
        Vue.component('bm-copyright', BmCopyright)
        Vue.component('bm-city-list', BmCityList)
        Vue.component('bm-panorama', BmPanorama)
        Vue.component('bm-control', BmControl)

        Vue.component('bm-marker', BmMarker)
        Vue.component('bm-point-collection', BmPointCollection)
        Vue.component('bm-polyline', BmPolyline)
        Vue.component('bm-polygon', BmPolygon)
        Vue.component('bm-circle', BmCircle)
        Vue.component('bm-ground', BmGround)
        Vue.component('bm-label', BmLabel)
        Vue.component('bm-info-window', BmInfoWindow)
        Vue.component('bm-overlay', BmOverlay)

        Vue.component('bm-context-menu', BmContextMenu)
        Vue.component('bm-context-menu-item', BmContextMenuItem)

        Vue.component('bm-local-search', BmLocalSearch)
        Vue.component('bm-transit', BmTransit)
        Vue.component('bm-walking', BmWalking)
        Vue.component('bm-driving', BmDriving)
        Vue.component('bm-bus', BmBus)

        Vue.component('bm-tile', BmTile)
        Vue.component('bm-traffic', BmTraffic)

        Vue.component('bm-auto-complete', BmAutoComplete)
        Vue.component('bm-boundary', BmBoundary)
    }
}

export {
    BaiduMap,
    BmScale, BmNavigation, BmMapType, BmOverviewMap, BmGeolocation, BmCopyright, BmCityList, BmPanorama, BmControl,
    BmMarker, BmPointCollection, BmPolyline, BmPolygon, BmCircle, BmGround, BmLabel, BmInfoWindow, BmOverlay,
    BmContextMenu, BmContextMenuItem,
    BmLocalSearch, BmTransit, BmWalking, BmDriving, BmBus,
    BmTile, BmTraffic,
    BmBoundary, BmAutoComplete
}
