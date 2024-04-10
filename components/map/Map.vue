<template>
  <div :class="$attrs.class" :style="$attrs.style">
    <div v-if="!hasBmView" ref="view" style="width: 100%; height: 100%">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import bindEvents from '../base/bindEvent.js'
import { checkType, setConfig, getConfig } from '../base/util.js'
import EvenBus from '../base/eventBus.js'
import getMapMethod from '../base/methodMap.js';
import { mapLoadResolve } from '../utils';


export default {
  name: 'bm-map',
  inheritAttrs: false,
  emits: ['ready', 'init', 'animationed'],
  props: {
    ak: {
      type: String
    },
    v: {
      type: String
    },
    type: {
      type: String
    },
    center: {
      type: [Object, String]
    },
    zoom: {
      type: Number
    },
    minZoom: {
      type: Number
    },
    maxZoom: {
      type: Number
    },
    highResolution: {
      type: Boolean,
      default: true
    },
    mapClick: {
      type: Boolean,
      default: true
    },
    mapType: {
      type: String
    },
    dragging: {
      type: Boolean,
      default: true
    },
    scrollWheelZoom: {
      type: Boolean,
      default: false
    },
    doubleClickZoom: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    inertialDragging: {
      type: Boolean,
      default: true
    },
    continuousZoom: {
      type: Boolean,
      default: true
    },
    pinchToZoom: {
      type: Boolean,
      default: true
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    theme: {
      type: Array
    },
    mapStyle: {
      type: Object
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    defaultAnimation: {
      type: Boolean,
      default: true
    },
    preserveDrawingBuffer: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    center(val, oldVal) {
      const { map, zoom } = this
      if (checkType(val) === 'String' && val !== oldVal) {
        this.setCenterZoom(map, val, zoom);
      }
    },
    'center.lng'(val, oldVal) {
      const { BMap, map, zoom, center } = this
      if (val !== oldVal && val >= -180 && val <= 180) {
        this.setCenterZoom(map, new BMap.Point(val, center.lat), zoom);
      }
    },
    'center.lat'(val, oldVal) {
      const { BMap, map, zoom, center } = this
      if (val !== oldVal && val >= -74 && val <= 74) {
        this.setCenterZoom(map, new BMap.Point(center.lng, val), zoom);
      }
    },
    zoom(val, oldVal) {
      const { map } = this
      if (val !== oldVal && val >= 3 && val <= 19) {
        map.setZoom(val)
      }
    },
    minZoom(val) {
      const { map } = this
      map.setMinZoom(val)
    },
    maxZoom(val) {
      const { map } = this
      map.setMaxZoom(val)
    },
    highResolution() {
      this.reset()
    },
    mapClick() {
      this.reset()
    },
    mapType(val) {
      const { map } = this
      map.setMapType(window[val])
    },
    dragging(val) {
      const { map } = this
      val ? map.enableDragging() : map.disableDragging()
    },
    scrollWheelZoom(val) {
      const { map } = this
      val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
    },
    doubleClickZoom(val) {
      const { map } = this
      val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
    },
    keyboard(val) {
      const { map } = this
      val ? map.enableKeyboard() : map.disableKeyboard()
    },
    inertialDragging(val) {
      const { map } = this
      val ? map.enableInertialDragging() : map.disableInertialDragging()
    },
    continuousZoom(val) {
      const { map } = this
      val ? map.enableContinuousZoom() : map.disableContinuousZoom()
    },
    pinchToZoom(val) {
      const { map } = this
      val ? map.enablePinchToZoom() : map.disablePinchToZoom()
    },
    autoResize(val) {
      const { map } = this
      val ? map.enableAutoResize() : map.disableAutoResize()
    },
    theme(val) {
      const { map } = this
      map[getMapMethod('setMapStyle')]({ styleJson: val })
    },
    mapStyle: {
      handler(val) {
        const { map, theme } = this
        !theme && map[getMapMethod('setMapStyle')](val)
      },
      deep: true
    }
  },
  methods: {
    setMapOptions() {
      const { map, minZoom, maxZoom, mapType, dragging, scrollWheelZoom, doubleClickZoom, keyboard, inertialDragging, continuousZoom, pinchToZoom, autoResize } = this
      minZoom && map.setMinZoom(minZoom)
      maxZoom && map.setMaxZoom(maxZoom)
      mapType && map.setMapType(window[mapType])
      dragging ? map.enableDragging() : map.disableDragging()
      scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
      doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
      keyboard ? map.enableKeyboard() : map.disableKeyboard()
      inertialDragging ? map.enableInertialDragging() : map.disableInertialDragging()
      continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom()
      pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom()
      autoResize ? map.enableAutoResize() : map.disableAutoResize()
    },
    init(BMap) {
      if (this.map) {
        return
      }
      let $el = this.$refs.view
      const map = new BMap.Map($el, { enableHighResolution: this.highResolution, enableMapClick: this.mapClick, preserveDrawingBuffer: this.preserveDrawingBuffer })
      const mapKey = Math.random().toString();
      this.mapKey = mapKey;
      this.map = map
      const { setMapOptions, zoom, getCenterPoint, theme, mapStyle } = this
      setMapOptions()
      bindEvents.call(this, map)
      // 此处强行初始化一次地图 回避一个由于错误的 center 字符串导致初始化失败抛出的错误
      map.reset()
      this.setCenterZoom(map, getCenterPoint(), zoom);
      theme ? map[getMapMethod('setMapStyle')]({ styleJson: theme }) : (mapStyle && map[getMapMethod('setMapStyle')](mapStyle))
      let loadNum = 0;
      this.$emit('init', { BMap, map, mapKey });
      EvenBus.$emit('init', { BMap, map, mapKey });
      map.addEventListener('tilesloaded', () => {
        if (!loadNum) {
          loadNum++;
          this.$emit('ready', { BMap, map, mapKey })
          EvenBus.$emit('ready', { BMap, map, mapKey });
        }
      });
      map.addEventListener('loaded', () => {
        this.$emit('loaded', { BMap, map, mapKey });
        EvenBus.$emit('loaded', { BMap, map, mapKey });
      });
    },
    setCenterZoom(map, center, zoom) {
      if (getConfig().type === 'WebGL') {
        if (!this.hasAnimation || !this.defaultAnimation) {
          map.setCenter(center, {
            noAnimation: !this.hasAnimation,
            callback: () => {
              map.setZoom(zoom, {
                noAnimation: !this.hasAnimation,
                zoomCenter: center,
                callback: () => {
                  this.$emit('animationed', { BMap: this.BMap, map });
                }
              });
            }
          });
        } else {
          map.centerAndZoom(center, zoom);
        }
      } else {
        map.centerAndZoom(center, zoom);
      }
    },
    getCenterPoint() {
      const { center, BMap } = this
      switch (checkType(center)) {
        case 'String': return center
        case 'Object': return new BMap.Point(center.lng, center.lat)
        default: return new BMap.Point()
      }
    },
    initMap(BMap) {
      this.BMap = BMap
      this.init(BMap)
      mapLoadResolve(BMap);
    },
    getMapScript() {
      if (!window.BMap) {
        window.BMap = {}
        window.BMap._preloader = new Promise((resolve, reject) => {
          window._initBaiduMap = function () {
            window.BMap = getConfig().type == 'WebGL' ? window.BMapGL : window.BMap;
            resolve(window.BMap)
            window.document.body.removeChild($script)
            window.BMap._preloader = null
            window._initBaiduMap = null
          }
          const $script = document.createElement('script')
          window.document.body.appendChild($script)
          switch (getConfig().type) {
            case 'WebGL':
              $script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${getConfig().ak}&callback=_initBaiduMap`
              break;
            default:
              $script.src = `https://api.map.baidu.com/api?v=${getConfig().v}&ak=${getConfig().ak}&callback=_initBaiduMap`
          }
        })
        return window.BMap._preloader
      } else if (!window.BMap._preloader) {
        return Promise.resolve(window.BMap)
      } else {
        return window.BMap._preloader
      }
    },
    reset() {
      const { getMapScript, initMap } = this
      getMapScript()
        .then(initMap)
    }
  },
  created() {
    const options = {};
    this.ak && (options.ak = this.ak);
    this.v && (options.v = this.v);
    this.type && (options.type = this.type);
    setConfig(options);
  },
  mounted() {
    this.reset()
  },
  data() {
    return {
      hasBmView: false,
      map: null,
      BMap: null,
      name: 'bm-map',
      mapKey: '',
    }
  }
}
</script>
