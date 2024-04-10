import { openBlock, createElementBlock, normalizeClass, normalizeStyle, createCommentVNode, renderSlot, withDirectives, vShow, resolveComponent, Fragment, renderList, createBlock, createElementVNode } from "vue";
var events = {
  "bm-map": [
    "click",
    "dblclick",
    "rightclick",
    "rightdblclick",
    "maptypechange",
    "mousemove",
    "mouseover",
    "mouseout",
    "movestart",
    "moving",
    "moveend",
    "zoomstart",
    "zoomend",
    "addoverlay",
    "addcontrol",
    "removecontrol",
    "removeoverlay",
    "clearoverlays",
    "dragstart",
    "dragging",
    "dragend",
    "addtilelayer",
    "removetilelayer",
    "load",
    "resize",
    "hotspotclick",
    "hotspotover",
    "hotspotout",
    "tilesloaded",
    "touchstart",
    "touchmove",
    "touchend",
    "longpress"
  ],
  "bm-geolocation": [
    "locationSuccess",
    "locationError"
  ],
  "bm-overview-map": [
    "viewchanged",
    "viewchanging"
  ],
  "bm-marker": [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "remove",
    "infowindowclose",
    "infowindowopen",
    "dragstart",
    "dragging",
    "dragend",
    "rightclick"
  ],
  "bm-polyline": [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "remove",
    "lineupdate"
  ],
  "bm-polygon": [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "remove",
    "lineupdate"
  ],
  "bm-circle": [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "remove",
    "lineupdate"
  ],
  "bm-label": [
    "click",
    "dblclick",
    "mousedown",
    "mouseup",
    "mouseout",
    "mouseover",
    "remove",
    "rightclick"
  ],
  "bm-info-window": [
    "close",
    "open",
    "maximize",
    "restore",
    "clickclose"
  ],
  "bm-ground": [
    "click",
    "dblclick"
  ],
  "bm-autocomplete": [
    "onconfirm",
    "onhighlight"
  ],
  "bm-point-collection": [
    "click",
    "mouseover",
    "mouseout"
  ]
};
function bindEvents(instance2, eventList2) {
  const ev = eventList2 || events[this.$options.name];
  ev && ev.forEach((event) => {
    const hasOn = event.slice(0, 2) === "on";
    let eventName = hasOn ? event.slice(2) : event;
    const listener = this.$attrs["on" + eventName.replace(eventName[0], eventName[0].toUpperCase())];
    listener && instance2.addEventListener(event, listener);
  });
}
function createPoint(BMap2, options = {}) {
  const { lng, lat } = options;
  return new BMap2.Point(lng, lat);
}
function createBounds(BMap2, options = {}) {
  const { sw, ne } = options;
  return new BMap2.Bounds(createPoint(BMap2, sw), createPoint(BMap2, ne));
}
function createSize(BMap2, options = {}) {
  const { width, height } = options;
  return new BMap2.Size(width, height);
}
function createIcon(BMap2, options = {}) {
  const { url, size, opts = {} } = options;
  let iconOption = {
    anchor: opts.anchor && createSize(BMap2, opts.anchor),
    imageSize: opts.imageSize && createSize(BMap2, opts.imageSize),
    imageOffset: opts.imageOffset && createSize(BMap2, opts.imageOffset),
    infoWindowAnchor: opts.infoWindowAnchor && createSize(BMap2, opts.infoWindowAnchor),
    printImageUrl: opts.printImageUrl
  };
  deleteEmptyKey(iconOption);
  return new BMap2.Icon(url, createSize(BMap2, size), iconOption);
}
function createLabel(BMap2, options = {}) {
  const { content, opts } = options;
  let labelOption = {
    offset: opts.offset && createSize(BMap2, opts.offset),
    position: opts.position && createPoint(BMap2, opts.position),
    enableMassClear: opts.enableMassClear
  };
  deleteEmptyKey(labelOption);
  return new BMap2.Label(content, labelOption);
}
function createSymbol(BMap2, options = {}) {
  const { path, opts } = options;
  let symbolOption = {
    anchor: opts.anchor && createSize(BMap2, opts.anchor),
    fillColor: opts.fillColor,
    fillOpacity: opts.fillOpacity,
    scale: opts.scale,
    rotation: opts.rotation,
    strokeColor: opts.strokeColor,
    strokeOpacity: opts.strokeOpacity,
    strokeWeight: opts.strokeWeight
  };
  deleteEmptyKey(symbolOption);
  return new BMap2.Symbol(window[path] || path, symbolOption);
}
function createIconSequence(BMap2, options = {}) {
  const { symbol, offset, repeat, fixedRotation } = options;
  return new BMap2.IconSequence(symbol && createSymbol(BMap2, symbol), offset, repeat, fixedRotation);
}
const isPoint = (obj) => obj.lng && obj.lat;
const checkType = (val) => Object.prototype.toString.call(val).slice(8, -1);
const getPosition = (BMap2, point) => isPoint(point) ? createPoint(BMap2, point) : point;
const deleteEmptyKey = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "undefined") {
      delete obj[key];
    }
  });
};
let config = {
  v: "3.0",
  type: "API"
};
const setConfig = (options = {}) => {
  config = Object.assign(config, options);
  if (!config.ak) {
    console.error("\u8BF7\u914D\u7F6Eak\uFF1A\u767E\u5EA6\u5730\u56FE\u5F00\u53D1\u8005\u5E73\u53F0\u7533\u8BF7\u7684\u5BC6\u94A5");
  }
};
const getConfig = () => {
  return config;
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var tinyEmitter = { exports: {} };
function E$1() {
}
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
tinyEmitter.exports = E$1;
tinyEmitter.exports.TinyEmitter = E$1;
var E = tinyEmitter.exports;
var instance = new E();
var EvenBus = {
  $on: (...args) => instance.on(...args),
  $once: (...args) => instance.once(...args),
  $off: (...args) => instance.off(...args),
  $emit: (...args) => instance.emit(...args)
};
const methods = {
  "API": {
    "2.0": {
      setMapStyle: "setMapStyle",
      NavigationControl: "NavigationControl"
    },
    "3.0": {
      setMapStyle: "setMapStyleV2",
      NavigationControl: "NavigationControl"
    }
  },
  "WebGL": {
    setMapStyle: "setMapStyleV2",
    NavigationControl: "NavigationControl3D"
  }
};
const getMapMethod = (method) => {
  const config2 = getConfig();
  if (config2.type == "WebGL") {
    return methods[config2.type][method];
  } else {
    return methods[config2.type][config2.v][method];
  }
};
let mapLoadResolve;
let mapLoadPromise = new Promise((resolve) => {
  mapLoadResolve = resolve;
});
const getBMap = () => {
  return mapLoadPromise;
};
function getParamsStrByObject(obj) {
  let arr = [];
  Object.keys(obj).forEach((key) => {
    arr.push(key + "=" + obj[key]);
  });
  return arr.join("&");
}
function getAddressByPoints(config2, aks = []) {
  if (!config2.location || !config2.location.length) {
    console.error("\u8BF7\u4F20\u5165location");
  }
  const appConfig = getConfig();
  if (appConfig.ak) {
    aks.push(appConfig.ak);
  }
  return new Promise((resolve, reject) => {
    if (aks.length) {
      let params = Object.assign({
        location: [],
        extensions_poi: 1,
        output: "json",
        coordtype: "wgs84ll",
        timeout: 60
      }, config2);
      let num = 0;
      const requestBaidu = () => {
        var _a;
        const timer = setTimeout(() => {
          reject(new Error("\u67E5\u8BE2\u8D85\u65F6"));
        }, params.timeout * 1e3);
        const callbackName = "baiduReverse" + Math.floor(Math.random() * 1e6);
        params.callback = callbackName;
        window[callbackName] = (res) => {
          var _a2;
          clearTimeout(timer);
          window[callbackName] = null;
          (_a2 = document.getElementById(callbackName)) == null ? void 0 : _a2.remove();
          if (!res.status) {
            resolve(res.result);
          } else {
            if (num < aks.length * 4) {
              num++;
              requestBaidu();
            } else {
              reject(new Error("\u67E5\u8BE2\u5931\u8D25"));
            }
          }
        };
        params.ak = aks[num % aks.length];
        let script = document.createElement("script");
        script.id = callbackName;
        script.src = `https://api.map.baidu.com/reverse_geocoding/v3/?${getParamsStrByObject(params)}`;
        (_a = document.getElementsByTagName("head")[0]) == null ? void 0 : _a.appendChild(script);
      };
      requestBaidu();
    } else {
      console.error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01");
      reject(new Error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01"));
    }
  });
}
function getPointByAddress(config2, aks = []) {
  if (!config2.address) {
    console.error("\u8BF7\u4F20\u5165address");
  }
  const appConfig = getConfig();
  if (appConfig.ak) {
    aks.push(appConfig.ak);
  }
  return new Promise((resolve, reject) => {
    if (aks.length) {
      let params = Object.assign({
        address: "",
        output: "json",
        timeout: 60
      }, config2);
      let num = 0;
      const requestBaidu = () => {
        var _a;
        const timer = setTimeout(() => {
          reject(new Error("\u67E5\u8BE2\u8D85\u65F6"));
        }, params.timeout * 1e3);
        const callbackName = "baidugeocoding" + Math.floor(Math.random() * 1e6);
        params.callback = callbackName;
        window[callbackName] = (res) => {
          var _a2;
          clearTimeout(timer);
          window[callbackName] = null;
          (_a2 = document.getElementById(callbackName)) == null ? void 0 : _a2.remove();
          if (!res.status) {
            resolve(res.result);
          } else {
            if (num < aks.length * 4) {
              num++;
              requestBaidu();
            } else {
              reject(new Error("\u67E5\u8BE2\u5931\u8D25"));
            }
          }
        };
        params.ak = aks[num % aks.length];
        let script = document.createElement("script");
        script.id = callbackName;
        script.src = `https://api.map.baidu.com/geocoding/v3/?${getParamsStrByObject(params)}`;
        (_a = document.getElementsByTagName("head")[0]) == null ? void 0 : _a.appendChild(script);
      };
      requestBaidu();
    } else {
      console.error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01");
      reject(new Error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01"));
    }
  });
}
function getPointsTransfer(config2, aks = []) {
  if (!config2.locations || !config2.locations.length) {
    console.error("\u8BF7\u4F20\u5165locations");
  }
  const appConfig = getConfig();
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
      }, config2);
      let num = 0;
      const requestBaidu = () => {
        var _a;
        const timer = setTimeout(() => {
          reject(new Error("\u67E5\u8BE2\u8D85\u65F6"));
        }, params.timeout * 1e3);
        const callbackName = "baidugeoconv" + Math.floor(Math.random() * 1e6);
        params.callback = callbackName;
        window[callbackName] = (res) => {
          var _a2;
          clearTimeout(timer);
          window[callbackName] = null;
          (_a2 = document.getElementById(callbackName)) == null ? void 0 : _a2.remove();
          if (!res.status) {
            resolve(res.result);
          } else {
            if (num < aks.length * 4) {
              num++;
              requestBaidu();
            } else {
              reject(new Error("\u67E5\u8BE2\u5931\u8D25"));
            }
          }
        };
        params.ak = aks[num % aks.length];
        params.coords = params.locations.join(";");
        let script = document.createElement("script");
        script.id = callbackName;
        script.src = `https://api.map.baidu.com/geoconv/v1/?${getParamsStrByObject(params)}`;
        (_a = document.getElementsByTagName("head")[0]) == null ? void 0 : _a.appendChild(script);
      };
      requestBaidu();
    } else {
      console.error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01");
      reject(new Error("\u8BF7\u914D\u7F6E\u767E\u5EA6ak\uFF01"));
    }
  });
}
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$x = {
  name: "bm-map",
  inheritAttrs: false,
  emits: ["ready", "init", "animationed"],
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
      const { map, zoom } = this;
      if (checkType(val) === "String" && val !== oldVal) {
        this.setCenterZoom(map, val, zoom);
      }
    },
    "center.lng"(val, oldVal) {
      const { BMap: BMap2, map, zoom, center } = this;
      if (val !== oldVal && val >= -180 && val <= 180) {
        this.setCenterZoom(map, new BMap2.Point(val, center.lat), zoom);
      }
    },
    "center.lat"(val, oldVal) {
      const { BMap: BMap2, map, zoom, center } = this;
      if (val !== oldVal && val >= -74 && val <= 74) {
        this.setCenterZoom(map, new BMap2.Point(center.lng, val), zoom);
      }
    },
    zoom(val, oldVal) {
      const { map } = this;
      if (val !== oldVal && val >= 3 && val <= 19) {
        map.setZoom(val);
      }
    },
    minZoom(val) {
      const { map } = this;
      map.setMinZoom(val);
    },
    maxZoom(val) {
      const { map } = this;
      map.setMaxZoom(val);
    },
    highResolution() {
      this.reset();
    },
    mapClick() {
      this.reset();
    },
    mapType(val) {
      const { map } = this;
      map.setMapType(window[val]);
    },
    dragging(val) {
      const { map } = this;
      val ? map.enableDragging() : map.disableDragging();
    },
    scrollWheelZoom(val) {
      const { map } = this;
      val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
    },
    doubleClickZoom(val) {
      const { map } = this;
      val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();
    },
    keyboard(val) {
      const { map } = this;
      val ? map.enableKeyboard() : map.disableKeyboard();
    },
    inertialDragging(val) {
      const { map } = this;
      val ? map.enableInertialDragging() : map.disableInertialDragging();
    },
    continuousZoom(val) {
      const { map } = this;
      val ? map.enableContinuousZoom() : map.disableContinuousZoom();
    },
    pinchToZoom(val) {
      const { map } = this;
      val ? map.enablePinchToZoom() : map.disablePinchToZoom();
    },
    autoResize(val) {
      const { map } = this;
      val ? map.enableAutoResize() : map.disableAutoResize();
    },
    theme(val) {
      const { map } = this;
      map[getMapMethod("setMapStyle")]({ styleJson: val });
    },
    mapStyle: {
      handler(val) {
        const { map, theme } = this;
        !theme && map[getMapMethod("setMapStyle")](val);
      },
      deep: true
    }
  },
  methods: {
    setMapOptions() {
      const { map, minZoom, maxZoom, mapType, dragging, scrollWheelZoom, doubleClickZoom, keyboard, inertialDragging, continuousZoom, pinchToZoom, autoResize } = this;
      minZoom && map.setMinZoom(minZoom);
      maxZoom && map.setMaxZoom(maxZoom);
      mapType && map.setMapType(window[mapType]);
      dragging ? map.enableDragging() : map.disableDragging();
      scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom();
      doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom();
      keyboard ? map.enableKeyboard() : map.disableKeyboard();
      inertialDragging ? map.enableInertialDragging() : map.disableInertialDragging();
      continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom();
      pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom();
      autoResize ? map.enableAutoResize() : map.disableAutoResize();
    },
    init(BMap2) {
      if (this.map) {
        return;
      }
      let $el = this.$refs.view;
      const map = new BMap2.Map($el, { enableHighResolution: this.highResolution, enableMapClick: this.mapClick, preserveDrawingBuffer: this.preserveDrawingBuffer });
      this.map = map;
      const { setMapOptions, zoom, getCenterPoint, theme, mapStyle } = this;
      setMapOptions();
      bindEvents.call(this, map);
      map.reset();
      this.setCenterZoom(map, getCenterPoint(), zoom);
      theme ? map[getMapMethod("setMapStyle")]({ styleJson: theme }) : mapStyle && map[getMapMethod("setMapStyle")](mapStyle);
      let loadNum = 0;
      this.$emit("init", { BMap: BMap2, map });
      EvenBus.$emit("init", { BMap: BMap2, map });
      map.addEventListener("tilesloaded", () => {
        if (!loadNum) {
          loadNum++;
          this.$emit("ready", { BMap: BMap2, map });
          EvenBus.$emit("ready", { BMap: BMap2, map });
        }
      });
      map.addEventListener("loaded", () => {
        this.$emit("loaded", { BMap: BMap2, map });
        EvenBus.$emit("loaded", { BMap: BMap2, map });
      });
    },
    setCenterZoom(map, center, zoom) {
      if (getConfig().type === "WebGL") {
        if (!this.hasAnimation || !this.defaultAnimation) {
          map.setCenter(center, {
            noAnimation: !this.hasAnimation,
            callback: () => {
              map.setZoom(zoom, {
                noAnimation: !this.hasAnimation,
                zoomCenter: center,
                callback: () => {
                  this.$emit("animationed", { BMap: this.BMap, map });
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
      const { center, BMap: BMap2 } = this;
      switch (checkType(center)) {
        case "String":
          return center;
        case "Object":
          return new BMap2.Point(center.lng, center.lat);
        default:
          return new BMap2.Point();
      }
    },
    initMap(BMap2) {
      this.BMap = BMap2;
      this.init(BMap2);
      mapLoadResolve(BMap2);
    },
    getMapScript() {
      if (!window.BMap) {
        window.BMap = {};
        window.BMap._preloader = new Promise((resolve, reject) => {
          window._initBaiduMap = function() {
            window.BMap = getConfig().type == "WebGL" ? window.BMapGL : window.BMap;
            resolve(window.BMap);
            window.document.body.removeChild($script);
            window.BMap._preloader = null;
            window._initBaiduMap = null;
          };
          const $script = document.createElement("script");
          window.document.body.appendChild($script);
          switch (getConfig().type) {
            case "WebGL":
              $script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${getConfig().ak}&callback=_initBaiduMap`;
              break;
            default:
              $script.src = `https://api.map.baidu.com/api?v=${getConfig().v}&ak=${getConfig().ak}&callback=_initBaiduMap`;
          }
        });
        return window.BMap._preloader;
      } else if (!window.BMap._preloader) {
        return Promise.resolve(window.BMap);
      } else {
        return window.BMap._preloader;
      }
    },
    reset() {
      const { getMapScript, initMap } = this;
      getMapScript().then(initMap);
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
    this.reset();
  },
  data() {
    return {
      hasBmView: false,
      map: null,
      BMap: null,
      name: "bm-map"
    };
  }
};
const _hoisted_1$2 = {
  key: 0,
  ref: "view",
  style: { "width": "100%", "height": "100%" }
};
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(_ctx.$attrs.class),
    style: normalizeStyle(_ctx.$attrs.style)
  }, [
    !$data.hasBmView ? (openBlock(), createElementBlock("div", _hoisted_1$2, null, 512)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default")
  ], 6);
}
var BaiduMap = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$e]]);
const types = {
  control: {
    unload: "removeControl"
  },
  layer: {
    unload: "removeTileLayer"
  },
  overlay: {
    unload: "removeOverlay"
  },
  contextMenu: {
    unload: "removeContextMenu"
  }
};
const getParent = ($component) => {
  return $component.abstract || $component.name !== "bm-map" ? getParent($component.$parent) : $component;
};
function destroyInstance() {
  const { unload, renderByParent, $parent, ready } = this;
  EvenBus.$off("ready", ready);
  if (renderByParent) {
    $parent.reload();
  }
  unload();
}
const getMixin = (prop = {}) => {
  return {
    emits: ["ready", "init"],
    computed: {
      renderByParent() {
        return this.$parent.preventChildrenRender;
      }
    },
    created() {
      const $parent = getParent(this.$parent);
      const map = $parent.map;
      const { ready } = this;
      map ? ready() : EvenBus.$on("ready", ready);
      map ? this.init({ BMap: $parent.BMap, map }) : EvenBus.$on("init", this.init);
    },
    mounted() {
      const $parent = getParent(this.$parent);
      const map = $parent.map;
      const { mountedReady } = this;
      map ? mountedReady() : EvenBus.$on("ready", mountedReady);
    },
    unmounted: destroyInstance,
    methods: {
      init() {
      },
      ready() {
        const $parent = getParent(this.$parent);
        const BMap2 = this.BMap = $parent.BMap;
        const map = this.map = $parent.map;
        this.load();
        this.$emit("ready", {
          BMap: BMap2,
          map
        });
      },
      mountedReady() {
        this.mountedLoad();
      },
      transmitEvent(e) {
        this.$emit(e.type.replace(/^on/, ""), e);
      },
      reload() {
        this && this.BMap && this.$nextTick(() => {
          this.unload();
          this.$nextTick(() => {
            this.load();
            this.mountedLoad();
          });
        });
      },
      unload() {
        const { map, originInstance } = this;
        try {
          switch (prop.type) {
            case "search":
              return originInstance.clearResults();
            case "autoComplete":
            case "lushu":
              return originInstance.dispose();
            case "markerClusterer":
              return originInstance.clearMarkers();
            default:
              map[types[prop.type].unload](originInstance);
          }
        } catch (e) {
        }
      },
      mountedLoad() {
      }
    }
  };
};
var commonMixin = (type) => getMixin({ type });
const _sfc_main$w = {
  name: "bm-scale",
  render() {
  },
  mixins: [commonMixin("control")],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    }
  },
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset } = this;
      this.originInstance = new BMap2.ScaleControl({
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset)
      });
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$v = {
  name: "bm-navigation",
  render() {
  },
  mixins: [commonMixin("control")],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    type: {
      type: String
    },
    showZoomInfo: {
      type: Boolean
    },
    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    },
    type() {
      this.reload();
    },
    showZoomInfo() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset, type, showZoomInfo, enableGeolocation } = this;
      let navigationOption = {
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset),
        type: window[type],
        showZoomInfo,
        enableGeolocation
      };
      deleteEmptyKey(navigationOption);
      this.originInstance = new BMap2[getMapMethod("NavigationControl")](navigationOption);
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$u = {
  name: "bm-map-type",
  render() {
  },
  mixins: [commonMixin("control")],
  props: ["type", "mapTypes", "anchor", "offset"],
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    },
    type() {
      this.reload();
    },
    mapTypes() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset, type } = this;
      const mapTypes = [];
      this.mapTypes && this.mapTypes.forEach((item) => mapTypes.push(window[item]));
      let maptypeControlOption = {
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset),
        type: window[type],
        mapTypes
      };
      deleteEmptyKey(maptypeControlOption);
      this.originInstance = new BMap2.MapTypeControl(maptypeControlOption);
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$t = {
  name: "bm-overview-map",
  mixins: [commonMixin("control")],
  render() {
  },
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    size: {
      type: Object
    },
    isOpen: {
      type: Boolean
    }
  },
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    },
    size() {
      this.reload();
    },
    isOpen() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, isOpen, size, offset, anchor } = this;
      this.mapTypes && this.mapTypes.forEach((item) => {
      });
      let overviewOption = {
        anchor: window[anchor],
        offset: createSize(BMap2, offset),
        size: createSize(BMap2, size),
        isOpen
      };
      deleteEmptyKey(overviewOption);
      this.originInstance = new BMap2.OverviewMapControl(overviewOption);
      bindEvents.call(this, this.originInstance);
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$s = {
  name: "bm-geolocation",
  render() {
  },
  mixins: [commonMixin("control")],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    showAddressBar: {
      type: Boolean
    },
    autoLocation: {
      type: Boolean
    },
    locationIcon: {
      type: Object
    }
  },
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    },
    showAddressBar() {
      this.reload();
    },
    autoLocation() {
      this.reload();
    },
    locationIcon() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, showAddressBar, autoLocation, locationIcon, offset } = this;
      let geoLocationOption = {
        anchor: window[anchor],
        showAddressBar,
        enableAutoLocation: autoLocation,
        offset: offset && createSize(BMap2, offset),
        locationIcon: locationIcon && createIcon(BMap2, locationIcon)
      };
      deleteEmptyKey(geoLocationOption);
      switch (getConfig().type) {
        case "WebGL":
          this.originInstance = new BMap2.LocationControl(geoLocationOption);
          break;
        default:
          this.originInstance = new BMap2.GeolocationControl(geoLocationOption);
      }
      bindEvents.call(this, this.originInstance);
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$r = {
  name: "bm-copyright",
  render() {
  },
  mixins: [commonMixin("control")],
  props: ["anchor", "offset", "copyright"],
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    },
    copyright() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, offset, anchor, updateCopyrightList } = this;
      this.originInstance = new BMap2.CopyrightControl({
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset)
      });
      updateCopyrightList();
      map.addControl(this.originInstance);
    },
    updateCopyrightList() {
      const { BMap: BMap2, map } = this;
      const { removeCopyright, getCopyrightCollection } = this.originInstance;
      const copyrightList = getCopyrightCollection();
      copyrightList && copyrightList.forEach((item) => {
        removeCopyright(item.id);
      });
      this.copyright && this.copyright.forEach((item) => {
        const bounds = item.bounds ? new BMap2.Bounds(new BMap2.Point(item.bounds.sw.lng, item.bounds.sw.lat), new BMap2.Point(item.bounds.ne.lng, item.bounds.ne.lat)) : map.getBounds();
        this.originInstance.addCopyright({
          id: item.id,
          content: item.content,
          bounds
        });
      });
    }
  }
};
const _sfc_main$q = {
  name: "bm-city-list",
  render() {
  },
  emits: ["changeBefore", "changeAfter"],
  mixins: [commonMixin("control")],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    }
  },
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset } = this;
      const self2 = this;
      this.originInstance = new BMap2.CityListControl({
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset),
        onChangeBefore() {
          self2.$emit("changeBefore");
        },
        onChangeAfter() {
          self2.$emit("changeAfter");
        }
      });
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$p = {
  name: "bm-panorama",
  mixins: [commonMixin("control")],
  render() {
  },
  props: ["anchor", "offset"],
  watch: {
    anchor() {
      this.reload();
    },
    offset() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset } = this;
      this.originInstance = new BMap2.PanoramaControl({
        anchor: window[anchor],
        offset: offset && createSize(BMap2, offset)
      });
      map.addControl(this.originInstance);
    }
  }
};
const _sfc_main$o = {
  name: "bm-control",
  mixins: [commonMixin("control")],
  props: ["anchor", "offset"],
  watch: {
    anchor(val) {
      this.originInstance.setAnchor(val);
    },
    offset(val) {
      this.originInstance.setOffset(val);
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, anchor, offset, $el } = this;
      const Control = function() {
        this.defaultAnchor = window[anchor || "BMAP_ANCHOR_TOP_LEFT"];
        this.defaultOffset = createSize(BMap2, offset);
      };
      Control.prototype = new BMap2.Control();
      Control.prototype.initialize = (map2) => map2.getContainer().appendChild($el);
      this.originInstance = new Control(anchor, offset);
      map.addControl(this.originInstance);
    }
  }
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BmControl = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$d]]);
var Marker_vue_vue_type_style_index_0_lang = "";
const _sfc_main$n = {
  name: "bm-marker",
  mixins: [commonMixin("overlay")],
  inject: {
    Cluster: {
      default: () => ({})
    }
  },
  props: {
    position: {},
    offset: {},
    icon: {},
    massClear: {
      type: Boolean,
      default: true
    },
    dragging: {
      type: Boolean,
      default: false
    },
    clicking: {
      type: Boolean,
      default: true
    },
    raiseOnDrag: {
      type: Boolean,
      default: false
    },
    draggingCursor: {
      type: String
    },
    rotation: {
      type: Number
    },
    shadow: {
      type: Object
    },
    title: {
      type: String
    },
    label: {
      type: Object
    },
    animation: {
      type: String
    },
    top: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "position.lng"(val, oldVal) {
      const { BMap: BMap2, originInstance, position, renderByParent, $parent } = this;
      if (val !== oldVal && val >= -180 && val <= 180) {
        originInstance.setPosition(createPoint(BMap2, { lng: val, lat: position.lat }));
      }
      renderByParent && $parent.reload();
    },
    "position.lat"(val, oldVal) {
      const { BMap: BMap2, originInstance, position, renderByParent, $parent } = this;
      if (val !== oldVal && val >= -74 && val <= 74) {
        originInstance.setPosition(createPoint(BMap2, { lng: position.lng, lat: val }));
      }
      renderByParent && $parent.reload();
    },
    "offset.width"(val, oldVal) {
      const { BMap: BMap2, originInstance } = this;
      if (val !== oldVal) {
        originInstance.setOffset(new BMap2.Size(val, this.offset.height));
      }
    },
    "offset.height"(val, oldVal) {
      const { BMap: BMap2, originInstance } = this;
      if (val !== oldVal) {
        originInstance.setOffset(new BMap2.Size(this.offset.width, val));
      }
    },
    icon: {
      deep: true,
      handler(val) {
        const { BMap: BMap2, originInstance, rotation } = this;
        originInstance && originInstance.setIcon(createIcon(BMap2, val));
        rotation && originInstance && originInstance.setRotation(rotation);
      }
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    },
    dragging(val) {
      val ? this.originInstance.enableDragging() : this.originInstance.disableDragging();
    },
    clicking() {
      this.reload();
    },
    raiseOnDrag() {
      this.reload();
    },
    draggingCursor(val) {
      this.originInstance.setDraggingCursor(val);
    },
    rotation(val) {
      this.originInstance.setRotation(val);
    },
    shadow(val) {
      this.originInstance.setShadow(val);
    },
    title(val) {
      this.originInstance.setTitle(val);
    },
    label(val) {
      this.reload();
    },
    animation(val) {
      this.originInstance.setAnimation(window[val]);
    },
    top(val) {
      this.originInstance.setTop(val);
    },
    zIndex(val) {
      this.originInstance.setZIndex(val);
    }
  },
  methods: {
    load() {
      var _a, _b;
      const { BMap: BMap2, map, position, offset, icon, massClear, dragging, clicking, raiseOnDrag, draggingCursor, rotation, shadow, title, label, animation, top, renderByParent, $parent, zIndex } = this;
      let makerOption = {
        offset,
        icon: icon && createIcon(BMap2, icon),
        enableMassClear: massClear,
        enableDragging: dragging,
        enableClicking: clicking,
        raiseOnDrag,
        draggingCursor,
        rotation,
        shadow,
        title
      };
      deleteEmptyKey(makerOption);
      const overlay = new BMap2.Marker(new BMap2.Point(position.lng, position.lat), makerOption);
      this.originInstance = overlay;
      label && overlay && overlay.setLabel(createLabel(BMap2, label));
      overlay.setTop(top);
      overlay.setZIndex(zIndex);
      bindEvents.call(this, overlay);
      if (renderByParent) {
        $parent.reload();
      } else {
        map.addOverlay(overlay);
      }
      overlay.setAnimation(window[animation]);
      (_b = (_a = this.Cluster) == null ? void 0 : _a.addMaker) == null ? void 0 : _b.call(_a, this);
    }
  },
  beforeUnmount() {
    var _a, _b;
    (_b = (_a = this.Cluster) == null ? void 0 : _a.removeMaker) == null ? void 0 : _b.call(_a, this);
  }
};
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BmMarker = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$c]]);
const _sfc_main$m = {
  render() {
  },
  name: "bm-point-collection",
  mixins: [commonMixin("overlay")],
  props: {
    points: {
      type: Array,
      default() {
        return [];
      }
    },
    shape: {
      type: String,
      default: "BMAP_POINT_SHAPE_CIRCLE"
    },
    color: {
      type: String
    },
    size: {
      type: String,
      default: "BMAP_POINT_SIZE_NORMAL"
    }
  },
  watch: {
    shape(val) {
      const { originInstance, color, size } = this;
      originInstance.setStyles({
        shape: window[val],
        color,
        size: window[size]
      });
    },
    size(val) {
      const { originInstance, color, shape } = this;
      originInstance.setStyles({
        shape: window[shape],
        color,
        size: window[val]
      });
    },
    color(val) {
      const { originInstance, shape, size } = this;
      originInstance.setStyles({
        shape: window[shape],
        color: val,
        size: window[size]
      });
    },
    points: {
      deep: true,
      handler(val) {
        const { originInstance } = this;
        originInstance.clear();
        originInstance.setPoints(val);
      }
    }
  },
  methods: {
    load() {
    },
    init({ BMap: BMap2, map }) {
      this.$emit("init", {
        BMap: BMap2,
        map
      });
      const { points, shape, color, size } = this;
      let pointCollectionOption = {
        shape: window[shape],
        color,
        size: window[size]
      };
      deleteEmptyKey(pointCollectionOption);
      const overlay = this.originInstance = new BMap2.PointCollection(points.map((p) => createPoint(BMap2, p)), pointCollectionOption);
      bindEvents.call(this, overlay);
      map.addOverlay(overlay);
    }
  }
};
const _sfc_main$l = {
  name: "bm-polyline",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    path: {
      type: Array
    },
    strokeColor: {
      type: String,
      default: "blue"
    },
    strokeWeight: {
      type: Number,
      default: 2
    },
    strokeOpacity: {
      type: Number,
      default: 0.5
    },
    strokeStyle: {
      type: String,
      default: "solid"
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    },
    icons: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    path: {
      handler(val, oldVal) {
        this.reload();
      },
      deep: true
    },
    icons: {
      handler(val, oldVal) {
        this.reload();
      },
      deep: true
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val);
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val);
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val);
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val);
    },
    editing(val) {
      val ? this.originInstance.enableEditing() : this.originInstance.disableEditing();
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    },
    clicking(val) {
      this.reload();
    }
  },
  computed: {
    iconSequences() {
      const { BMap: BMap2, icons } = this;
      return icons.map((item) => {
        return createIconSequence(BMap2, item);
      });
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, path, strokeColor, strokeWeight, strokeOpacity, strokeStyle, editing, massClear, clicking, iconSequences } = this;
      let polyLineOption = {
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        enableEditing: editing,
        enableMassClear: massClear,
        enableClicking: clicking,
        icons: iconSequences
      };
      deleteEmptyKey(polyLineOption);
      const overlay = new BMap2.Polyline(path.map((item) => createPoint(BMap2, { lng: item.lng, lat: item.lat })), polyLineOption);
      this.originInstance = overlay;
      map.addOverlay(overlay);
      bindEvents.call(this, overlay);
    }
  }
};
const _sfc_main$k = {
  name: "bm-polygon",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    path: {
      type: Array,
      default() {
        return [];
      }
    },
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    },
    strokeStyle: {
      type: String
    },
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    path: {
      handler(val, oldVal) {
        this.reload();
      },
      deep: true
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val);
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val);
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val);
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val);
    },
    fillColor(val) {
      this.originInstance.setFillColor(val);
    },
    fillOpacity(val) {
      this.originInstance.setFillOpacity(val);
    },
    editing(val) {
      val ? this.originInstance.enableEditing() : this.originInstance.disableEditing();
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    },
    clicking(val) {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, path, strokeColor, strokeWeight, strokeOpacity, strokeStyle, fillColor, fillOpacity, editing, massClear, clicking } = this;
      let polygonOption = {
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        fillColor,
        fillOpacity,
        enableMassClear: massClear,
        enableClicking: clicking
      };
      deleteEmptyKey(polygonOption);
      const overlay = new BMap2.Polygon(path.map((item) => createPoint(BMap2, { lng: item.lng, lat: item.lat })), polygonOption);
      this.originInstance = overlay;
      map.addOverlay(overlay);
      bindEvents.call(this, overlay);
      editing ? overlay.enableEditing() : overlay.disableEditing();
    }
  }
};
const _sfc_main$j = {
  name: "bm-circle",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    center: {},
    radius: {},
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    },
    strokeStyle: {
      type: String
    },
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "center.lng"(val, oldVal) {
      const { BMap: BMap2, originInstance, isEditing, disableEditing, enableEditing, center, editing } = this;
      if (!isEditing) {
        disableEditing();
        const lng = val;
        if (val.toString() !== oldVal.toString() && lng >= -180 && lng <= 180) {
          originInstance.setCenter(createPoint(BMap2, { lng, lat: center.lat }));
        }
        editing && enableEditing();
      }
    },
    "center.lat"(val, oldVal) {
      const { BMap: BMap2, originInstance, isEditing, disableEditing, enableEditing, center, editing } = this;
      if (!isEditing) {
        disableEditing();
        const lat = val;
        if (val.toString() !== oldVal.toString() && lat >= -74 && lat <= 74) {
          originInstance.setCenter(createPoint(BMap2, { lng: center.lng, lat }));
        }
        editing && enableEditing();
      }
    },
    radius(val, oldVal) {
      const { originInstance, isEditing, disableEditing, enableEditing, editing } = this;
      if (!isEditing) {
        disableEditing();
        originInstance.setRadius(val);
        editing && enableEditing();
      }
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val);
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val);
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val);
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val);
    },
    fillColor(val) {
      this.originInstance.setFillColor(val);
    },
    fillOpacity(val) {
      this.originInstance.setFillOpacity(val);
    },
    editing(val) {
      val ? this.enableEditing() : this.disableEditing();
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    },
    clicking(val) {
      this.reload();
    }
  },
  methods: {
    dragStartHandler() {
      this.isEditing = true;
    },
    dragEndHandler() {
      this.isEditing = false;
      this.bindEditingNodeEvents();
    },
    bindEditingNodeEvents() {
      const { originInstance, editingKey, dragStartHandler, dragEndHandler } = this;
      if (originInstance[editingKey]) {
        originInstance[editingKey].forEach(($node) => {
          $node.addEventListener("dragstart", dragStartHandler);
          $node.addEventListener("dragend", dragEndHandler);
        });
      }
    },
    enableEditing() {
      const { originInstance, bindEditingNodeEvents } = this;
      originInstance.enableEditing();
      bindEditingNodeEvents();
    },
    disableEditing() {
      const { originInstance } = this;
      originInstance.disableEditing();
    },
    getEditingKey(overlay) {
      const stack = [];
      overlay.enableEditing();
      setTimeout(() => {
        for (const key in overlay) {
          if (overlay[key] && overlay[key].length === 2) {
            stack.push(key);
          }
        }
        overlay.disableEditing();
        for (const key in overlay) {
          if (overlay[key] && overlay[key].length === 0 && ~stack.indexOf(key)) {
            this.editingKey = key;
          }
        }
      }, 0);
    },
    load() {
      const { BMap: BMap2, map, center, radius, strokeColor, strokeWeight, strokeOpacity, strokeStyle, fillColor, fillOpacity, editing, massClear, clicking, enableEditing, disableEditing, getEditingKey, editingKey } = this;
      let overlayOption = {
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        fillColor,
        fillOpacity,
        enableMassClear: massClear,
        enableClicking: clicking
      };
      deleteEmptyKey(overlayOption);
      const overlay = new BMap2.Circle(createPoint(BMap2, { lng: center.lng, lat: center.lat }), radius, overlayOption);
      this.originInstance = overlay;
      map.addOverlay(overlay);
      bindEvents.call(this, overlay);
      !editingKey && getEditingKey(overlay);
      setTimeout(() => {
        editing ? enableEditing() : disableEditing();
      }, 0);
    }
  }
};
const _sfc_main$i = {
  name: "bm-ground",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    bounds: {
      type: Object
    },
    opacity: {
      type: Number
    },
    imageURL: {
      type: String
    },
    displayOnMinLevel: {
      type: Number
    },
    displayOnMaxLevel: {
      type: Number
    }
  },
  watch: {
    bounds: {
      handler(val) {
        const { BMap: BMap2 } = this;
        this.originInstance.setBounds(createBounds(BMap2, val));
      },
      deep: true
    },
    opacity(val) {
      this.originInstance.setOpacity(val);
    },
    imageURL(val) {
      this.originInstance.setImageURL(val);
    },
    displayOnMinLevel(val) {
      this.originInstance.setDisplayOnMinLevel(val);
    },
    displayOnMaxLevel(val) {
      this.originInstance.setDisplayOnMaxLevel(val);
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, bounds, opacity, imageURL, displayOnMinLevel, displayOnMaxLevel } = this;
      let groundOption = {
        opacity,
        imageURL,
        displayOnMaxLevel,
        displayOnMinLevel
      };
      deleteEmptyKey(groundOption);
      const overlay = new BMap2.GroundOverlay(bounds && createBounds(BMap2, bounds), groundOption);
      overlay.setImageURL(imageURL);
      this.originInstance = overlay;
      bindEvents.call(this, overlay);
      map.addOverlay(overlay);
    }
  }
};
const _sfc_main$h = {
  name: "bm-label",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    content: {
      type: String
    },
    title: {
      type: String
    },
    offset: {},
    position: {},
    labelStyle: {},
    zIndex: {
      type: Number,
      default: 0
    },
    massClear: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    content(val) {
      this.originInstance.setContent(val);
    },
    title(val) {
      this.originInstance.setTitle(val);
    },
    "offset.width"(val, oldVal) {
      const { BMap: BMap2 } = this;
      if (val.toString() !== oldVal.toString()) {
        this.originInstance.setOffset(createSize(BMap2, { width: val, height: this.offset.height }));
      }
    },
    "offset.height"(val, oldVal) {
      const { BMap: BMap2 } = this;
      if (val.toString() !== oldVal.toString()) {
        this.originInstance.setOffset(createSize(BMap2, {
          width: this.offset.width,
          height: val
        }));
      }
    },
    "position.lng"(val, oldVal) {
      const { BMap: BMap2 } = this;
      const lng = val;
      if (val.toString() !== oldVal.toString() && lng >= -180 && lng <= 180) {
        this.originInstance.setPosition(createPoint(BMap2, { lng, lat: this.position.lat }));
      }
    },
    "position.lat"(val, oldVal) {
      const { BMap: BMap2 } = this;
      const lat = val;
      if (val.toString() !== oldVal.toString() && lat >= -74 && lat <= 74) {
        this.originInstance.setPosition(createPoint(BMap2, { lng: this.position.lng, lat }));
      }
    },
    labelStyle: {
      handler(val) {
        this.originInstance.setStyle(val);
      },
      deep: true
    },
    zIndex(val) {
      this.originInstance.setZIndex(val);
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, content, title, offset, position, labelStyle, zIndex, massClear, $parent } = this;
      let labelOption = {
        offset: createSize(BMap2, offset),
        position: createPoint(BMap2, position),
        enableMassClear: massClear
      };
      deleteEmptyKey(labelOption);
      const overlay = new BMap2.Label(content, labelOption);
      this.originInstance = overlay;
      try {
        $parent.originInstance.setLabel(overlay);
      } catch (e) {
        map.addOverlay(overlay);
      }
      title && overlay.setTitle(title);
      labelStyle && overlay.setStyle(labelStyle);
      zIndex && overlay.setZIndex(zIndex);
      bindEvents.call(this, overlay);
    }
  }
};
const _sfc_main$g = {
  name: "bm-info-window",
  mixins: [commonMixin("overlay")],
  props: {
    show: {
      type: Boolean
    },
    position: {
      type: Object
    },
    title: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    maxWidth: {
      type: Number
    },
    offset: {
      type: Object
    },
    maximize: {
      type: Boolean
    },
    autoPan: {
      type: Boolean
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    message: {
      type: String
    }
  },
  watch: {
    show(val) {
      val ? this.openInfoWindow() : this.closeInfoWindow();
    },
    "position.lng"(val, oldVal) {
      this.reload();
    },
    "position.lat"(val, oldVal) {
      this.reload();
    },
    "offset.width"(val, oldVal) {
      this.reload();
    },
    "offset.height"(val) {
      this.reload();
    },
    maxWidth() {
      this.reload();
    },
    width(val) {
      this.originInstance.setWidth(val);
    },
    height(val) {
      this.originInstance.setHeight(val);
    },
    title(val) {
      this.originInstance.setTitle(val);
    },
    maximize(val) {
      val ? this.originInstance.enableMaximize() : this.originInstance.disableMaximize();
    },
    autoPan(val) {
      val ? this.originInstance.enableAutoPan() : this.originInstance.disableAutoPan();
    },
    closeOnClick(val) {
      val ? this.originInstance.enableCloseOnClick() : this.originInstance.disableCloseOnClick();
    }
  },
  methods: {
    redraw() {
      this.originInstance.redraw();
    },
    load() {
      const { BMap: BMap2, map, show, title, width, height, maxWidth, offset, autoPan, closeOnClick, message, maximize, bindObserver, $parent } = this;
      const $content = this.$el;
      let infoWindowOption = {
        width,
        height,
        title,
        maxWidth,
        offset: offset && createSize(BMap2, offset),
        enableAutoPan: autoPan,
        enableCloseOnClick: closeOnClick,
        enableMessage: typeof message === "undefined",
        message
      };
      deleteEmptyKey(infoWindowOption);
      const overlay = new BMap2.InfoWindow($content, infoWindowOption);
      maximize ? overlay.enableMaximize() : overlay.disableMaximize();
      bindEvents.call(this, overlay);
      this.originInstance = overlay;
      overlay.redraw();
      [].forEach.call($content.querySelectorAll("img"), ($img) => {
        $img.onload = () => overlay.redraw();
      });
      bindObserver();
      this.$container = $parent.originInstance && $parent.originInstance.openInfoWindow ? $parent.originInstance : map;
      show && this.openInfoWindow();
    },
    bindObserver() {
      const MutationObserver = window.MutationObserver;
      if (!MutationObserver) {
        return;
      }
      const { $el, originInstance } = this;
      this.observer = new MutationObserver((mutations) => originInstance.redraw());
      this.observer.observe($el, { attributes: true, childList: true, characterData: true, subtree: true });
    },
    openInfoWindow() {
      const { BMap: BMap2, $container, position, originInstance } = this;
      $container.openInfoWindow(originInstance, createPoint(BMap2, position || this.$parent.position));
    },
    closeInfoWindow() {
      this.$container.closeInfoWindow(this.originInstance);
    }
  }
};
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ], 512)), [
    [vShow, $props.show]
  ]);
}
var BmInfoWindow = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$b]]);
const _sfc_main$f = {
  name: "bm-overlay",
  emits: ["initialize", "draw"],
  mixins: [commonMixin("overlay")],
  props: {
    pane: {
      type: String
    }
  },
  watch: {
    pane() {
      this.reload();
    }
  },
  methods: {
    load() {
    },
    mountedLoad() {
      const { BMap: BMap2, map, $el, pane } = this;
      const $emit = this.$emit.bind(this);
      class CustomOverlay extends BMap2.Overlay {
        initialize() {
          $emit("initialize", {
            BMap: BMap2,
            map,
            el: $el,
            overlay: this
          });
          try {
            map.getPanes()[pane].appendChild($el);
          } catch (e) {
          }
          return $el;
        }
        draw() {
          $emit("draw", {
            BMap: BMap2,
            map,
            el: $el,
            overlay: this
          });
        }
      }
      const overlay = new CustomOverlay();
      this.originInstance = overlay;
      map.addOverlay(overlay);
    }
  }
};
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BmOverlay = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$a]]);
const _sfc_main$e = {
  name: "bm-context-menu",
  props: {
    width: {
      type: Number
    }
  },
  mixins: [commonMixin("contextMenu")],
  methods: {
    load() {
      const { width, BMap: BMap2, map, $parent } = this;
      const parent = this.parent = $parent.originInstance || map;
      if (this.originInstance) {
        parent.removeContextMenu(this.originInstance);
      }
      const menu = this.originInstance = new BMap2.ContextMenu();
      if (this.$slots.default) {
        for (const item of this.$slots.default() || []) {
          const props = item.props;
          if (props.seperator) {
            menu.addSeparator();
            continue;
          }
          const menuItem = new BMap2.MenuItem(props.text, function(point, pixel) {
            props.callback && props.callback({
              point,
              pixel,
              BMap: BMap2,
              map,
              target: parent
            });
          }, {
            width,
            id: props.id,
            iconUrl: props.iconUrl
          });
          props.disabled ? menuItem.disable() : menuItem.enable();
          props.originInstance = menuItem;
          menu.addItem(menuItem);
        }
      }
      parent.addContextMenu(menu);
    }
  }
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BmContextMenu = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$9]]);
const _sfc_main$d = {
  name: "bm-context-menu-item",
  props: {
    callback: {
      type: Function,
      default: function() {
      }
    },
    text: {
      type: String
    },
    iconUrl: {
      type: String
    },
    id: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    seperator: {
      type: Boolean
    },
    originInstance: {}
  },
  methods: {
    reload() {
      this.$parent.map && this.$parent.load();
    }
  },
  watch: {
    text() {
      this.reload();
    },
    iconUrl() {
      this.reload();
    },
    id() {
      this.reload();
    },
    disabled() {
      this.reload();
    },
    iseperator() {
      this.reload();
    },
    callback() {
      this.reload();
    }
  },
  destroyed() {
    this.reload();
  },
  mounted() {
    this.reload();
  }
};
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BmContextMenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$8]]);
const _sfc_main$c = {
  name: "bm-local-search",
  emits: ["markersset", "infohtmlset", "resultshtmlset", "searchcomplete"],
  mixins: [commonMixin("search")],
  props: {
    location: {
      type: [Object, String]
    },
    keyword: {
      type: [Array, String]
    },
    panel: {
      type: Boolean,
      default: true
    },
    forceLocal: {
      type: Boolean
    },
    customData: {
      type: Object
    },
    bounds: {
      type: Object
    },
    nearby: {
      type: Object
    },
    pageCapacity: {
      type: Number
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, search } = this;
        originInstance.setLocation(val || this.map);
        search();
      },
      deep: true
    },
    keyword() {
      this.search();
    },
    bounds: {
      handler(val) {
        const { searchInBounds } = this;
        searchInBounds(val);
      },
      deep: true
    },
    nearby: {
      handler(val) {
        const { searchNearby } = this;
        searchNearby(val);
      },
      deep: true
    },
    forceLocal() {
      this.reload();
    },
    customData: {
      deep: true,
      handler() {
        this.reload();
      }
    },
    pageCapacity(val) {
      this.originInstance && this.originInstance.setPageCapacity(val);
    },
    autoViewport(val) {
      this.originInstance && (val ? this.originInstance.enableAutoViewport() : this.originInstance.disableAutoViewport());
    },
    selectFirstResult(val) {
      this.originInstance && (val ? this.originInstance.enableFirstResultSelection() : this.originInstance.disableFirstResultSelection());
    },
    highlightMode() {
      this.reload();
    }
  },
  methods: {
    searchNearby(nearby) {
      const { originInstance, keyword, customData, BMap: BMap2 } = this;
      originInstance.searchNearby(keyword, createPoint(BMap2, nearby.center), nearby.radius, customData);
    },
    searchInBounds(bounds) {
      const { originInstance, keyword, customData, BMap: BMap2 } = this;
      originInstance.searchInBounds(keyword, createBounds(BMap2, bounds), customData);
    },
    search() {
      const { originInstance, keyword, forceLocal, customData, nearby, bounds, searchNearby, searchInBounds } = this;
      nearby ? searchNearby(nearby) : bounds ? searchInBounds(bounds) : originInstance.search(keyword, {
        forceLocal,
        customData
      });
    },
    load() {
      const instance2 = this;
      const { map, BMap: BMap2, search, pageCapacity, autoViewport, selectFirstResult, highlightMode, location, originInstance } = this;
      const _location = location ? isPoint(location) ? createPoint(BMap2, location) : location : map;
      const route = this.originInstance = new BMap2.LocalSearch(_location, {
        onMarkersSet(e) {
          instance2.$emit("markersset", e);
        },
        onInfoHtmlSet(e) {
          instance2.$emit("infohtmlset", e);
        },
        onResultsHtmlSet(e) {
          instance2.$emit("resultshtmlset", e);
        },
        onSearchComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("searchcomplete", e);
        },
        pageCapacity,
        renderOptions: {
          map,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        }
      });
      search();
    }
  }
};
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ], 512)), [
    [vShow, $props.panel]
  ]);
}
var BmLocalSearch = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$7]]);
const _sfc_main$b = {
  name: "bm-transit",
  emits: ["searchcomplete", "markersset", "infohtmlset", "polylinesset", "resultshtmlset"],
  mixins: [commonMixin("search")],
  props: {
    location: {
      type: [Object, String]
    },
    start: {
      type: [Object, String]
    },
    end: {
      type: [Object, String]
    },
    panel: {
      type: Boolean,
      default: true
    },
    policy: {
      type: String
    },
    pageCapacity: {
      type: Number
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, map } = this;
        originInstance.setLocation(val || map);
      },
      deep: true
    },
    start: {
      handler(val) {
        const { originInstance, end, BMap: BMap2 } = this;
        originInstance.search(getPosition(BMap2, val), getPosition(BMap2, end));
      },
      deep: true
    },
    end: {
      handler(val) {
        const { originInstance, start, BMap: BMap2 } = this;
        originInstance.search(getPosition(BMap2, start), getPosition(BMap2, val));
      },
      deep: true
    },
    panel() {
      this.reload();
    },
    policy(val) {
      this.originInstance.setPolicy(window[val]);
    },
    pageCapacity(val) {
      this.originInstance && this.originInstance.setPageCapacity(val);
    },
    autoViewport(val) {
      this.originInstance && (val ? this.originInstance.enableAutoViewport() : this.originInstance.disableAutoViewport());
    },
    selectFirstResult() {
      this.reload();
    },
    highlightMode() {
      this.reload();
    }
  },
  methods: {
    search(start, end) {
      const { originInstance } = this;
      originInstance.search(start, end);
    },
    load() {
      const instance2 = this;
      const { map, BMap: BMap2, location, policy, pageCapacity, selectFirstResult, autoViewport, highlightMode, search, start, end, originInstance } = this;
      const _location = location ? isPoint(location) ? createPoint(BMap2, location) : location : map;
      const route = this.originInstance = new BMap2.TransitRoute(_location, {
        renderOptions: {
          map,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        },
        policy: window[policy],
        pageCapacity,
        onSearchComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("searchcomplete", e);
        },
        onMarkersSet(e) {
          instance2.$emit("markersset", e);
        },
        onInfoHtmlSet(e) {
          instance2.$emit("infohtmlset", e);
        },
        onPolylinesSet(e) {
          instance2.$emit("polylinesset", e);
        },
        onResultsHtmlSet(e) {
          instance2.$emit("resultshtmlset", e);
        }
      });
      search(isPoint(start) ? createPoint(BMap2, start) : start, isPoint(end) ? createPoint(BMap2, end) : end);
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ], 512)), [
    [vShow, $props.panel]
  ]);
}
var BmTransit = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$6]]);
const _sfc_main$a = {
  name: "bm-walking",
  emits: ["searchcomplete", "markersset", "infohtmlset", "polylinesset", "resultshtmlset"],
  mixins: [commonMixin("search")],
  props: {
    location: {
      type: [Object, String]
    },
    start: {
      type: [Object, String]
    },
    end: {
      type: [Object, String]
    },
    panel: {
      type: Boolean,
      default: true
    },
    pageCapacity: {
      type: Number
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, map } = this;
        originInstance.setLocation(val || map);
      },
      deep: true
    },
    start: {
      handler(val) {
        const { originInstance, end, BMap: BMap2 } = this;
        originInstance.search(getPosition(BMap2, val), getPosition(BMap2, end));
      },
      deep: true
    },
    end: {
      handler(val) {
        const { originInstance, start, BMap: BMap2 } = this;
        originInstance.search(getPosition(BMap2, start), getPosition(BMap2, val));
      },
      deep: true
    },
    panel() {
      this.reload();
    },
    autoViewport(val) {
      this.reload();
    },
    selectFirstResult(val) {
      this.reload();
    },
    highlightMode() {
      this.reload();
    }
  },
  methods: {
    search(start, end) {
      const { originInstance } = this;
      originInstance.search(start, end);
    },
    load() {
      const instance2 = this;
      const { map, BMap: BMap2, location, selectFirstResult, autoViewport, highlightMode, search, start, end, originInstance } = this;
      const _location = location ? isPoint(location) ? createPoint(BMap2, location) : location : map;
      const route = this.originInstance = new BMap2.WalkingRoute(_location, {
        renderOptions: {
          map,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        },
        onSearchComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("searchcomplete", e);
        },
        onMarkersSet(e) {
          instance2.$emit("markersset", e);
        },
        onInfoHtmlSet(e) {
          instance2.$emit("infohtmlset", e);
        },
        onPolylinesSet(e) {
          instance2.$emit("polylinesset", e);
        },
        onResultsHtmlSet(e) {
          instance2.$emit("resultshtmlset", e);
        }
      });
      search(isPoint(start) ? createPoint(BMap2, start) : start, isPoint(end) ? createPoint(BMap2, end) : end);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ], 512)), [
    [vShow, $props.panel]
  ]);
}
var BmWalking = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$5]]);
const _sfc_main$9 = {
  name: "bm-driving",
  emits: ["searchcomplete", "markersset", "infohtmlset", "polylinesset", "resultshtmlset"],
  mixins: [commonMixin("search")],
  props: {
    location: {
      type: [Object, String]
    },
    start: {
      type: [Object, String]
    },
    end: {
      type: [Object, String]
    },
    startCity: {
      type: [String, Number]
    },
    endCity: {
      type: [String, Number]
    },
    waypoints: {
      type: Array
    },
    policy: {
      type: String
    },
    panel: {
      type: Boolean,
      default: true
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, map } = this;
        originInstance.setLocation(val || map);
      },
      deep: true
    },
    start: {
      handler(val) {
        const { originInstance, end, startCity, endCity, waypoints, BMap: BMap2, getWaypoints } = this;
        originInstance.search(getPosition(BMap2, val), getPosition(BMap2, end), {
          startCity,
          endCity,
          waypoints: getWaypoints(waypoints)
        });
      },
      deep: true
    },
    end: {
      handler(val) {
        const { originInstance, start, startCity, endCity, waypoints, BMap: BMap2, getWaypoints } = this;
        originInstance.search(getPosition(BMap2, start), getPosition(BMap2, val), {
          startCity,
          endCity,
          waypoints: getWaypoints(waypoints)
        });
      },
      deep: true
    },
    startCity(val) {
      const { originInstance, start, end, endCity, waypoints, getWaypoints } = this;
      originInstance.search(start, end, {
        val,
        endCity,
        waypoints: getWaypoints(waypoints)
      });
    },
    endCity(val) {
      const { originInstance, start, end, startCity, waypoints, getWaypoints } = this;
      originInstance.search(start, end, {
        startCity,
        val,
        waypoints: getWaypoints(waypoints)
      });
    },
    waypoints: {
      handler(val) {
        const { originInstance, start, end, startCity, endCity, getWaypoints } = this;
        originInstance.search(start, end, {
          startCity,
          endCity,
          waypoints: getWaypoints(val)
        });
      },
      deep: true
    },
    panel() {
      this.reload();
    },
    policy(val) {
      this.reload();
    },
    autoViewport() {
      this.reload();
    },
    selectFirstResult() {
      this.reload();
    },
    highlightMode() {
      this.reload();
    }
  },
  methods: {
    search(start, end, { startCity, endCity, waypoints }) {
      const { originInstance, getWaypoints } = this;
      originInstance.search(start, end, {
        startCity,
        endCity,
        waypoints: getWaypoints(waypoints)
      });
    },
    getWaypoints(waypoints) {
      const { BMap: BMap2 } = this;
      if (waypoints) {
        return waypoints.map((position) => getPosition(BMap2, position));
      }
    },
    load() {
      const instance2 = this;
      const { map, BMap: BMap2, location, policy, selectFirstResult, autoViewport, highlightMode, search, start, end, startCity, endCity, waypoints, originInstance, getWaypoints } = this;
      const _location = location ? isPoint(location) ? createPoint(BMap2, location) : location : map;
      const route = this.originInstance = new BMap2.DrivingRoute(_location, {
        renderOptions: {
          map,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        },
        policy: window[policy],
        onSearchComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("searchcomplete", e);
        },
        onMarkersSet(e) {
          instance2.$emit("markersset", e);
        },
        onInfoHtmlSet(e) {
          instance2.$emit("infohtmlset", e);
        },
        onPolylinesSet(e) {
          instance2.$emit("polylinesset", e);
        },
        onResultsHtmlSet(e) {
          instance2.$emit("resultshtmlset", e);
        }
      });
      search(getPosition(BMap2, start), getPosition(BMap2, end), {
        startCity,
        endCity,
        waypoints: getWaypoints(waypoints)
      });
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, [
    renderSlot(_ctx.$slots, "default")
  ], 512)), [
    [vShow, $props.panel]
  ]);
}
var BmDriving = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4]]);
const _sfc_main$8 = {
  name: "bm-bus",
  emits: ["getbuslistcomplete", "getbuslinecomplete", "buslisthtmlset", "buslinehtmlset", "markersset", "polylinesset"],
  mixins: [commonMixin("search")],
  props: {
    location: {
      type: [Object, String]
    },
    keyword: {
      type: String
    },
    panel: {
      type: Boolean,
      default: true
    },
    pageCapacity: {
      type: Number
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, map } = this;
        originInstance.setLocation(val || map);
      },
      deep: true
    },
    keyword(val) {
      this.search(val);
    },
    panel() {
      this.reload();
    },
    autoViewport(val) {
      this.reload();
    },
    selectFirstResult(val) {
      this.reload();
    }
  },
  methods: {
    search(keyword) {
      const { originInstance } = this;
      originInstance.getBusList(keyword);
    },
    load() {
      const instance2 = this;
      const { location, selectFirstResult, autoViewport, highlightMode, keyword, search, BMap: BMap2, map, originInstance } = this;
      const _location = location ? isPoint(location) ? createPoint(BMap2, location) : location : map;
      const route = this.originInstance = new BMap2.BusLineSearch(_location, {
        renderOptions: {
          map,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        },
        onGetBusListComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("getbuslistcomplete", e);
        },
        onGetBusLineComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults();
          }
          instance2.$emit("getbuslinecomplete", e);
        },
        onBusListHtmlSet(e) {
          instance2.$emit("buslisthtmlset", e);
        },
        onBusLineHtmlSet(e) {
          instance2.$emit("buslinehtmlset", e);
        },
        onMarkersSet(e) {
          instance2.$emit("markersset", e);
        },
        onPolylinesSet(e) {
          instance2.$emit("polylinesset", e);
        }
      });
      search(keyword);
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return withDirectives((openBlock(), createElementBlock("div", null, null, 512)), [
    [vShow, $props.panel]
  ]);
}
var BmBus = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3]]);
const _sfc_main$7 = {
  name: "bm-tile",
  render(h) {
  },
  mixins: [commonMixin("layer")],
  props: {
    transparentPng: {
      type: Boolean
    },
    tileUrlTemplate: {
      type: String
    },
    copyright: {},
    zIndex: {
      type: Number
    }
  },
  watch: {
    transparentPng() {
      this.reload();
    },
    tileUrlTemplate() {
      this.reload();
    },
    copyright() {
      this.reload();
    },
    zIndex() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, transparentPng, tileUrlTemplate, copyright, zIndex } = this;
      this.originInstance = new BMap2.TileLayer({
        transparentPng,
        tileUrlTemplate,
        copyright: copyright && {
          id: copyright.id,
          content: copyright.content,
          bounds: copyright.bounds && createBounds(copyright.bounds)
        },
        zIndex
      });
      map.addTileLayer(this.originInstance);
    }
  }
};
const _sfc_main$6 = {
  name: "bm-triffic",
  render(h) {
  },
  mixins: [commonMixin("layer")],
  props: {
    predictDate: {
      type: Object
    }
  },
  watch: {
    "pridictDate.weekday"() {
      this.reload();
    },
    "pridictDate.hour"() {
      this.reload();
    },
    pridictDate() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { pridictDate, BMap: BMap2, map } = this;
      this.originInstance = new BMap2.TrafficLayer({
        pridictDate
      });
      map.addTileLayer(this.originInstance);
    }
  }
};
const _sfc_main$5 = {
  mixins: [
    commonMixin("abstract")
  ],
  emits: ["click", "dblclick", "mousedown", "mouseup", "mouseout", "mouseover", "remove", "load"],
  props: ["name", "strokeColor", "strokeWeight", "strokeOpacity", "strokeStyle", "fillColor", "fillOpacity", "massClear", "clicking"],
  data() {
    return {
      paths: []
    };
  },
  components: {
    BmPolygon: _sfc_main$k
  },
  watch: {
    name() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, name } = this;
      const bd = new BMap2.Boundary();
      bd.get(name, (data) => {
        const paths = data.boundaries.map((boundary) => (boundary || []).split(";").map((point) => (([lng, lat]) => ({ lng, lat }))(point.split(",").map((p) => +p))));
        this.paths = paths;
        this.$emit("load", { boundaries: data.boundaries, paths: [...paths] });
      });
    }
  }
};
const _hoisted_1$1 = { key: 0 };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bm_polygon = resolveComponent("bm-polygon");
  return $data.paths.length ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
    (openBlock(true), createElementBlock(Fragment, null, renderList($data.paths, (path, index2) => {
      return openBlock(), createBlock(_component_bm_polygon, {
        key: index2,
        path,
        "stroke-color": $props.strokeColor,
        "stroke-weight": $props.strokeWeight,
        "stroke-opacity": $props.strokeOpacity,
        "stroke-style": $props.strokeStyle,
        "fill-opacity": $props.fillOpacity,
        "fill-color": $props.fillColor,
        "mass-clear": $props.massClear,
        clicking: $props.clicking,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event)),
        onDblclick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("dblclick", $event)),
        onMousedown: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("mousedown", $event)),
        onMouseup: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("mouseup", $event)),
        onMouseout: _cache[4] || (_cache[4] = ($event) => _ctx.$emit("mouseout", $event)),
        onMouseover: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("mouseover", $event)),
        onRemove: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("remove", $event))
      }, null, 8, ["path", "stroke-color", "stroke-weight", "stroke-opacity", "stroke-style", "fill-opacity", "fill-color", "mass-clear", "clicking"]);
    }), 128))
  ])) : createCommentVNode("", true);
}
var BmBoundary = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$2]]);
const _sfc_main$4 = {
  name: "bm-autocomplete",
  mixins: [commonMixin("autoComplete")],
  emits: ["update:modelValue", "searchcomplete"],
  props: {
    types: {
      type: String
    },
    location: {
      type: String
    },
    sugStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    modelValue: {}
  },
  watch: {
    types() {
      this.reload();
    },
    location() {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, $el, types: types2, location, sugStyle } = this;
      const input = $el.querySelector("input");
      if (!input) {
        return;
      }
      this.originInstance = new BMap2.Autocomplete({
        input,
        types: types2,
        location: location || map,
        onSearchComplete: (e) => {
          const $sugs = document.querySelectorAll(".tangram-suggestion-main");
          for (const $sug of $sugs) {
            for (const name in sugStyle) {
              $sug.style[name] = sugStyle[name].toString();
            }
          }
          this.$emit("searchcomplete", e);
        }
      });
      this.originInstance.addEventListener("onconfirm", (e) => {
        const val = e.item.value;
        this.$emit("update:modelValue", val.province + val.city + val.district + val.street + val.business);
      });
      bindEvents.call(this, this.originInstance);
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("input", null, null, -1);
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      _hoisted_1
    ])
  ]);
}
var BmAutoComplete = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1]]);
var bmaplib_markerclusterer = { exports: {} };
(function(module, exports) {
  (function(global2, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    var __commonjs_global = typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : this;
    function __commonjs(fn, module2) {
      return module2 = { exports: {} }, fn(module2, module2.exports, __commonjs_global), module2.exports;
    }
    var index$1 = __commonjs(function(module2, exports2, global2) {
      (function(root, factory) {
        if (typeof exports2 === "object") {
          module2.exports = factory();
        } else {
          root.BMapLib = root.BMapLib || {};
          root.BMapLib.TextIconOverlay = root.BMapLib.TextIconOverlay || factory();
        }
      })(__commonjs_global, function() {
        var T, baidu = T = baidu || { version: "1.3.8" };
        var context = {};
        baidu.guid = "$BAIDU$";
        context[baidu.guid] = context[baidu.guid] || {};
        baidu.dom = baidu.dom || {};
        baidu.dom.g = function(id) {
          if (typeof id == "string" || id instanceof String) {
            return document.getElementById(id);
          } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
            return id;
          }
          return null;
        };
        baidu.g = baidu.G = baidu.dom.g;
        baidu.dom.getDocument = function(element) {
          element = baidu.dom.g(element);
          return element.nodeType == 9 ? element : element.ownerDocument || element.document;
        };
        baidu.lang = baidu.lang || {};
        baidu.lang.isString = function(source) {
          return Object.prototype.toString.call(source) == "[object String]";
        };
        baidu.isString = baidu.lang.isString;
        baidu.dom._g = function(id) {
          if (baidu.lang.isString(id)) {
            return document.getElementById(id);
          }
          return id;
        };
        baidu._g = baidu.dom._g;
        baidu.browser = baidu.browser || {};
        if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
          baidu.browser.ie = baidu.ie = document.documentMode || +RegExp["$1"];
        }
        baidu.dom.getComputedStyle = function(element, key) {
          element = baidu.dom._g(element);
          var doc = baidu.dom.getDocument(element), styles;
          if (doc.defaultView && doc.defaultView.getComputedStyle) {
            styles = doc.defaultView.getComputedStyle(element, null);
            if (styles) {
              return styles[key] || styles.getPropertyValue(key);
            }
          }
          return "";
        };
        baidu.dom._styleFixer = baidu.dom._styleFixer || {};
        baidu.dom._styleFilter = baidu.dom._styleFilter || [];
        baidu.dom._styleFilter.filter = function(key, value, method) {
          for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
            if (filter = filter[method]) {
              value = filter(key, value);
            }
          }
          return value;
        };
        baidu.string = baidu.string || {};
        baidu.string.toCamelCase = function(source) {
          if (source.indexOf("-") < 0 && source.indexOf("_") < 0) {
            return source;
          }
          return source.replace(/[-_][^-_]/g, function(match) {
            return match.charAt(1).toUpperCase();
          });
        };
        baidu.dom.getStyle = function(element, key) {
          var dom = baidu.dom;
          element = dom.g(element);
          key = baidu.string.toCamelCase(key);
          var value = element.style[key] || (element.currentStyle ? element.currentStyle[key] : "") || dom.getComputedStyle(element, key);
          if (!value) {
            var fixer = dom._styleFixer[key];
            if (fixer) {
              value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
            }
          }
          if (fixer = dom._styleFilter) {
            value = fixer.filter(key, value, "get");
          }
          return value;
        };
        baidu.getStyle = baidu.dom.getStyle;
        if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
          baidu.browser.opera = +RegExp["$1"];
        }
        baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
        baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
        baidu.browser.isStrict = document.compatMode == "CSS1Compat";
        baidu.dom.getPosition = function(element) {
          element = baidu.dom.g(element);
          var doc = baidu.dom.getDocument(element), browser = baidu.browser, getStyle = baidu.dom.getStyle;
          browser.isGecko > 0 && doc.getBoxObjectFor && getStyle(element, "position") == "absolute" && (element.style.top === "" || element.style.left === "");
          var pos = { "left": 0, "top": 0 }, viewport = browser.ie && !browser.isStrict ? doc.body : doc.documentElement, parent, box;
          if (element == viewport) {
            return pos;
          }
          if (element.getBoundingClientRect) {
            box = element.getBoundingClientRect();
            pos.left = Math.floor(box.left) + Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
            pos.top = Math.floor(box.top) + Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
            pos.left -= doc.documentElement.clientLeft;
            pos.top -= doc.documentElement.clientTop;
            var htmlDom = doc.body, htmlBorderLeftWidth = parseInt(getStyle(htmlDom, "borderLeftWidth")), htmlBorderTopWidth = parseInt(getStyle(htmlDom, "borderTopWidth"));
            if (browser.ie && !browser.isStrict) {
              pos.left -= isNaN(htmlBorderLeftWidth) ? 2 : htmlBorderLeftWidth;
              pos.top -= isNaN(htmlBorderTopWidth) ? 2 : htmlBorderTopWidth;
            }
          } else {
            parent = element;
            do {
              pos.left += parent.offsetLeft;
              pos.top += parent.offsetTop;
              if (browser.isWebkit > 0 && getStyle(parent, "position") == "fixed") {
                pos.left += doc.body.scrollLeft;
                pos.top += doc.body.scrollTop;
                break;
              }
              parent = parent.offsetParent;
            } while (parent && parent != element);
            if (browser.opera > 0 || browser.isWebkit > 0 && getStyle(element, "position") == "absolute") {
              pos.top -= doc.body.offsetTop;
            }
            parent = element.offsetParent;
            while (parent && parent != doc.body) {
              pos.left -= parent.scrollLeft;
              if (!browser.opera || parent.tagName != "TR") {
                pos.top -= parent.scrollTop;
              }
              parent = parent.offsetParent;
            }
          }
          return pos;
        };
        baidu.event = baidu.event || {};
        baidu.event._listeners = baidu.event._listeners || [];
        baidu.event.on = function(element, type, listener) {
          type = type.replace(/^on/i, "");
          element = baidu.dom._g(element);
          var realListener = function(ev) {
            listener.call(element, ev);
          }, lis = baidu.event._listeners, filter = baidu.event._eventFilter, afterFilter, realType = type;
          type = type.toLowerCase();
          if (filter && filter[type]) {
            afterFilter = filter[type](element, type, realListener);
            realType = afterFilter.type;
            realListener = afterFilter.listener;
          }
          if (element.addEventListener) {
            element.addEventListener(realType, realListener, false);
          } else if (element.attachEvent) {
            element.attachEvent("on" + realType, realListener);
          }
          lis[lis.length] = [element, type, listener, realListener, realType];
          return element;
        };
        baidu.on = baidu.event.on;
        (function() {
          var guid = context[baidu.guid];
          baidu.lang.guid = function() {
            return "TANGRAM__" + (guid._counter++).toString(36);
          };
          guid._counter = guid._counter || 1;
        })();
        context[baidu.guid]._instances = context[baidu.guid]._instances || {};
        baidu.lang.isFunction = function(source) {
          return Object.prototype.toString.call(source) == "[object Function]";
        };
        baidu.lang.Class = function(guid) {
          this.guid = guid || baidu.lang.guid();
          context[baidu.guid]._instances[this.guid] = this;
        };
        context[baidu.guid]._instances = context[baidu.guid]._instances || {};
        baidu.lang.Class.prototype.dispose = function() {
          delete context[baidu.guid]._instances[this.guid];
          for (var property in this) {
            if (!baidu.lang.isFunction(this[property])) {
              delete this[property];
            }
          }
          this.disposed = true;
        };
        baidu.lang.Class.prototype.toString = function() {
          return "[object " + (this._className || "Object") + "]";
        };
        baidu.lang.Event = function(type, target) {
          this.type = type;
          this.returnValue = true;
          this.target = target || null;
          this.currentTarget = null;
        };
        baidu.lang.Class.prototype.addEventListener = function(type, handler, key) {
          if (!baidu.lang.isFunction(handler)) {
            return;
          }
          !this.__listeners && (this.__listeners = {});
          var t = this.__listeners, id;
          if (typeof key == "string" && key) {
            if (/[^\w\-]/.test(key)) {
              throw "nonstandard key:" + key;
            } else {
              handler.hashCode = key;
              id = key;
            }
          }
          type.indexOf("on") != 0 && (type = "on" + type);
          typeof t[type] != "object" && (t[type] = {});
          id = id || baidu.lang.guid();
          handler.hashCode = id;
          t[type][id] = handler;
        };
        baidu.lang.Class.prototype.removeEventListener = function(type, handler) {
          if (typeof handler != "undefined") {
            if (baidu.lang.isFunction(handler) && !(handler = handler.hashCode) || !baidu.lang.isString(handler)) {
              return;
            }
          }
          !this.__listeners && (this.__listeners = {});
          type.indexOf("on") != 0 && (type = "on" + type);
          var t = this.__listeners;
          if (!t[type]) {
            return;
          }
          if (typeof handler != "undefined") {
            t[type][handler] && delete t[type][handler];
          } else {
            for (var guid in t[type]) {
              delete t[type][guid];
            }
          }
        };
        baidu.lang.Class.prototype.dispatchEvent = function(event, options) {
          if (baidu.lang.isString(event)) {
            event = new baidu.lang.Event(event);
          }
          !this.__listeners && (this.__listeners = {});
          options = options || {};
          for (var i in options) {
            event[i] = options[i];
          }
          var i, t = this.__listeners, p = event.type;
          event.target = event.target || this;
          event.currentTarget = this;
          p.indexOf("on") != 0 && (p = "on" + p);
          baidu.lang.isFunction(this[p]) && this[p].apply(this, arguments);
          if (typeof t[p] == "object") {
            for (i in t[p]) {
              t[p][i].apply(this, arguments);
            }
          }
          return event.returnValue;
        };
        baidu.lang.inherits = function(subClass, superClass, className) {
          var key, proto, selfProps = subClass.prototype, clazz = new Function();
          clazz.prototype = superClass.prototype;
          proto = subClass.prototype = new clazz();
          for (key in selfProps) {
            proto[key] = selfProps[key];
          }
          subClass.prototype.constructor = subClass;
          subClass.superClass = superClass.prototype;
          if (typeof className == "string") {
            proto._className = className;
          }
        };
        baidu.inherits = baidu.lang.inherits;
        var _IMAGE_PATH = "http://api.map.baidu.com/library/TextIconOverlay/1.2/src/images/m";
        var _IMAGE_EXTENSION = "png";
        var TextIconOverlay2 = function(position, text, options) {
          try {
            BMap;
          } catch (e) {
            throw Error("Baidu Map JS API is not ready yet!");
          }
          T.lang.inherits(TextIconOverlay2, BMap.Overlay, "TextIconOverlay");
          this._position = position;
          this._text = text;
          this._options = options || {};
          this._styles = this._options["styles"] || [];
          !this._styles.length && this._setupDefaultStyles();
        };
        TextIconOverlay2.prototype._setupDefaultStyles = function() {
          var sizes = [53, 56, 66, 78, 90];
          for (var i = 0, size; size = sizes[i]; i++) {
            this._styles.push({
              url: _IMAGE_PATH + i + "." + _IMAGE_EXTENSION,
              size: new BMap.Size(size, size)
            });
          }
        };
        TextIconOverlay2.prototype.initialize = function(map) {
          this._map = map;
          this._domElement = document.createElement("div");
          this._updateCss();
          this._updateText();
          this._updatePosition();
          this._bind();
          this._map.getPanes().markerMouseTarget.appendChild(this._domElement);
          return this._domElement;
        };
        TextIconOverlay2.prototype.draw = function() {
          this._map && this._updatePosition();
        };
        TextIconOverlay2.prototype.getText = function() {
          return this._text;
        };
        TextIconOverlay2.prototype.setText = function(text) {
          if (text && (!this._text || this._text.toString() != text.toString())) {
            this._text = text;
            this._updateText();
            this._updateCss();
            this._updatePosition();
          }
        };
        TextIconOverlay2.prototype.getPosition = function() {
          return this._position;
        };
        TextIconOverlay2.prototype.setPosition = function(position) {
          if (position && (!this._position || !this._position.equals(position))) {
            this._position = position;
            this._updatePosition();
          }
        };
        TextIconOverlay2.prototype.getStyleByText = function(text, styles) {
          var count = parseInt(text);
          var index2 = parseInt(count / 10);
          index2 = Math.max(0, index2);
          index2 = Math.min(index2, styles.length - 1);
          return styles[index2];
        };
        TextIconOverlay2.prototype._updateCss = function() {
          if (!this._domElement) {
            return;
          }
          var style = this.getStyleByText(this._text, this._styles);
          this._domElement.style.cssText = this._buildCssText(style);
        };
        TextIconOverlay2.prototype._updateText = function() {
          if (this._domElement) {
            this._domElement.innerHTML = this._text;
          }
        };
        TextIconOverlay2.prototype._updatePosition = function() {
          if (this._domElement && this._position) {
            var style = this._domElement.style;
            var pixelPosition = this._map.pointToOverlayPixel(this._position);
            pixelPosition.x -= Math.ceil(parseInt(style.width) / 2);
            pixelPosition.y -= Math.ceil(parseInt(style.height) / 2);
            style.left = pixelPosition.x + "px";
            style.top = pixelPosition.y + "px";
          }
        };
        TextIconOverlay2.prototype._buildCssText = function(style) {
          var url = style["url"];
          var size = style["size"];
          var anchor = style["anchor"];
          var offset = style["offset"];
          var textColor = style["textColor"] || "black";
          var textSize = style["textSize"] || 10;
          var csstext = [];
          if (T.browser["ie"] < 7) {
            csstext.push('filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="' + url + '");');
          } else {
            csstext.push("background-image:url(" + url + ");");
            var backgroundPosition = "0 0";
            offset instanceof BMap.Size && (backgroundPosition = offset.width + "px " + offset.height + "px");
            csstext.push("background-position:" + backgroundPosition + ";");
          }
          if (size instanceof BMap.Size) {
            if (anchor instanceof BMap.Size) {
              if (anchor.height > 0 && anchor.height < size.height) {
                csstext.push("height:" + (size.height - anchor.height) + "px; padding-top:" + anchor.height + "px;");
              }
              if (anchor.width > 0 && anchor.width < size.width) {
                csstext.push("width:" + (size.width - anchor.width) + "px; padding-left:" + anchor.width + "px;");
              }
            } else {
              csstext.push("height:" + size.height + "px; line-height:" + size.height + "px;");
              csstext.push("width:" + size.width + "px; text-align:center;");
            }
          }
          csstext.push("cursor:pointer; color:" + textColor + "; position:absolute; font-size:" + textSize + "px; font-family:Arial,sans-serif; font-weight:bold");
          return csstext.join("");
        };
        TextIconOverlay2.prototype._bind = function() {
          if (!this._domElement) {
            return;
          }
          var me = this;
          var map = this._map;
          var BaseEvent = T.lang.Event;
          function eventExtend(e, be) {
            var elem = e.srcElement || e.target;
            var x = e.clientX || e.pageX;
            var y = e.clientY || e.pageY;
            if (e && be && x && y && elem) {
              var offset = T.dom.getPosition(map.getContainer());
              be.pixel = new BMap.Pixel(x - offset.left, y - offset.top);
              be.point = map.pixelToPoint(be.pixel);
            }
            return be;
          }
          T.event.on(this._domElement, "mouseover", function(e) {
            me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseover")));
          });
          T.event.on(this._domElement, "mouseout", function(e) {
            me.dispatchEvent(eventExtend(e, new BaseEvent("onmouseout")));
          });
          T.event.on(this._domElement, "click", function(e) {
            me.dispatchEvent(eventExtend(e, new BaseEvent("onclick")));
          });
        };
        return TextIconOverlay2;
      });
    });
    var TextIconOverlay = index$1 && typeof index$1 === "object" && "default" in index$1 ? index$1["default"] : index$1;
    var getExtendedBounds = function(map, bounds, gridSize) {
      bounds = cutBoundsInRange(bounds);
      var pixelNE = map.pointToPixel(bounds.getNorthEast());
      var pixelSW = map.pointToPixel(bounds.getSouthWest());
      pixelNE.x += gridSize;
      pixelNE.y -= gridSize;
      pixelSW.x -= gridSize;
      pixelSW.y += gridSize;
      var newNE = map.pixelToPoint(pixelNE);
      var newSW = map.pixelToPoint(pixelSW);
      return new BMap.Bounds(newSW, newNE);
    };
    var cutBoundsInRange = function(bounds) {
      var maxX = getRange(bounds.getNorthEast().lng, -180, 180);
      var minX = getRange(bounds.getSouthWest().lng, -180, 180);
      var maxY = getRange(bounds.getNorthEast().lat, -74, 74);
      var minY = getRange(bounds.getSouthWest().lat, -74, 74);
      return new BMap.Bounds(new BMap.Point(minX, minY), new BMap.Point(maxX, maxY));
    };
    var getRange = function(i, mix, max) {
      mix && (i = Math.max(i, mix));
      max && (i = Math.min(i, max));
      return i;
    };
    var isArray = function(source) {
      return Object.prototype.toString.call(source) === "[object Array]";
    };
    var indexOf = function(item, source) {
      var index2 = -1;
      if (isArray(source)) {
        if (source.indexOf) {
          index2 = source.indexOf(item);
        } else {
          for (var i = 0, m; m = source[i]; i++) {
            if (m === item) {
              index2 = i;
              break;
            }
          }
        }
      }
      return index2;
    };
    var MarkerClusterer2 = function(map, options) {
      try {
        BMap;
      } catch (e) {
        throw Error("Baidu Map JS API is not ready yet!");
      }
      if (!map) {
        return;
      }
      this._map = map;
      this._markers = [];
      this._clusters = [];
      var opts = options || {};
      this._gridSize = opts["gridSize"] || 60;
      this._maxZoom = opts["maxZoom"] || 18;
      this._minClusterSize = opts["minClusterSize"] || 2;
      this._isAverageCenter = false;
      if (opts["isAverageCenter"] != void 0) {
        this._isAverageCenter = opts["isAverageCenter"];
      }
      this._styles = opts["styles"] || [];
      var that = this;
      this._map.addEventListener("zoomend", function() {
        that._redraw();
      });
      this._map.addEventListener("moveend", function() {
        that._redraw();
      });
      var mkrs = opts["markers"];
      isArray(mkrs) && this.addMarkers(mkrs);
    };
    MarkerClusterer2.prototype.addMarkers = function(markers2) {
      if (!markers2.length) {
        return;
      }
      for (var i = 0, len = markers2.length; i < len; i++) {
        this._pushMarkerTo(markers2[i]);
      }
      this._createClusters();
    };
    MarkerClusterer2.prototype._pushMarkerTo = function(marker) {
      var index2 = indexOf(marker, this._markers);
      if (index2 === -1) {
        marker.isInCluster = false;
        this._markers.push(marker);
      }
    };
    MarkerClusterer2.prototype.addMarker = function(marker) {
      this._pushMarkerTo(marker);
      this._createClusters();
    };
    MarkerClusterer2.prototype._createClusters = function() {
      var mapBounds = this._map.getBounds();
      if (!mapBounds.getCenter()) {
        return;
      }
      var extendedBounds = getExtendedBounds(this._map, mapBounds, this._gridSize);
      for (var i = 0, marker; marker = this._markers[i]; i++) {
        if (!marker.isInCluster && extendedBounds.containsPoint(marker.getPosition())) {
          this._addToClosestCluster(marker);
        }
      }
    };
    MarkerClusterer2.prototype._addToClosestCluster = function(marker) {
      var distance = 4e6;
      var clusterToAddTo = null;
      marker.getPosition();
      for (var i = 0, cluster; cluster = this._clusters[i]; i++) {
        var center = cluster.getCenter();
        if (center) {
          var d = this._map.getDistance(center, marker.getPosition());
          if (d < distance) {
            distance = d;
            clusterToAddTo = cluster;
          }
        }
      }
      if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
        clusterToAddTo.addMarker(marker);
      } else {
        var cluster = new Cluster(this);
        cluster.addMarker(marker);
        this._clusters.push(cluster);
      }
    };
    MarkerClusterer2.prototype._clearLastClusters = function() {
      for (var i = 0, cluster; cluster = this._clusters[i]; i++) {
        cluster.remove();
      }
      this._clusters = [];
      this._removeMarkersFromCluster();
    };
    MarkerClusterer2.prototype._removeMarkersFromCluster = function() {
      for (var i = 0, marker; marker = this._markers[i]; i++) {
        marker.isInCluster = false;
      }
    };
    MarkerClusterer2.prototype._removeMarkersFromMap = function() {
      for (var i = 0, marker; marker = this._markers[i]; i++) {
        marker.isInCluster = false;
        var label = marker.getLabel();
        this._map.removeOverlay(marker);
        marker.setLabel(label);
      }
    };
    MarkerClusterer2.prototype._removeMarker = function(marker) {
      var index2 = indexOf(marker, this._markers);
      if (index2 === -1) {
        return false;
      }
      this._map.removeOverlay(marker);
      this._markers.splice(index2, 1);
      return true;
    };
    MarkerClusterer2.prototype.removeMarker = function(marker) {
      var success = this._removeMarker(marker);
      if (success) {
        this._clearLastClusters();
        this._createClusters();
      }
      return success;
    };
    MarkerClusterer2.prototype.removeMarkers = function(markers2) {
      var success = false;
      for (var i = 0; i < markers2.length; i++) {
        var r = this._removeMarker(markers2[i]);
        success = success || r;
      }
      if (success) {
        this._clearLastClusters();
        this._createClusters();
      }
      return success;
    };
    MarkerClusterer2.prototype.clearMarkers = function() {
      this._clearLastClusters();
      this._removeMarkersFromMap();
      this._markers = [];
    };
    MarkerClusterer2.prototype._redraw = function() {
      this._clearLastClusters();
      this._createClusters();
    };
    MarkerClusterer2.prototype.getGridSize = function() {
      return this._gridSize;
    };
    MarkerClusterer2.prototype.setGridSize = function(size) {
      this._gridSize = size;
      this._redraw();
    };
    MarkerClusterer2.prototype.getMaxZoom = function() {
      return this._maxZoom;
    };
    MarkerClusterer2.prototype.setMaxZoom = function(maxZoom) {
      this._maxZoom = maxZoom;
      this._redraw();
    };
    MarkerClusterer2.prototype.getStyles = function() {
      return this._styles;
    };
    MarkerClusterer2.prototype.setStyles = function(styles) {
      this._styles = styles;
      this._redraw();
    };
    MarkerClusterer2.prototype.getMinClusterSize = function() {
      return this._minClusterSize;
    };
    MarkerClusterer2.prototype.setMinClusterSize = function(size) {
      this._minClusterSize = size;
      this._redraw();
    };
    MarkerClusterer2.prototype.isAverageCenter = function() {
      return this._isAverageCenter;
    };
    MarkerClusterer2.prototype.getMap = function() {
      return this._map;
    };
    MarkerClusterer2.prototype.getMarkers = function() {
      return this._markers;
    };
    MarkerClusterer2.prototype.getClustersCount = function() {
      var count = 0;
      for (var i = 0, cluster; cluster = this._clusters[i]; i++) {
        cluster.isReal() && count++;
      }
      return count;
    };
    function Cluster(markerClusterer) {
      this._markerClusterer = markerClusterer;
      this._map = markerClusterer.getMap();
      this._minClusterSize = markerClusterer.getMinClusterSize();
      this._isAverageCenter = markerClusterer.isAverageCenter();
      this._center = null;
      this._markers = [];
      this._gridBounds = null;
      this._isReal = false;
      this._clusterMarker = new TextIconOverlay(this._center, this._markers.length, { "styles": this._markerClusterer.getStyles() });
    }
    Cluster.prototype.addMarker = function(marker) {
      if (this.isMarkerInCluster(marker)) {
        return false;
      }
      if (!this._center) {
        this._center = marker.getPosition();
        this.updateGridBounds();
      } else {
        if (this._isAverageCenter) {
          var l = this._markers.length + 1;
          var lat = (this._center.lat * (l - 1) + marker.getPosition().lat) / l;
          var lng = (this._center.lng * (l - 1) + marker.getPosition().lng) / l;
          this._center = new BMap.Point(lng, lat);
          this.updateGridBounds();
        }
      }
      marker.isInCluster = true;
      this._markers.push(marker);
      var len = this._markers.length;
      if (len < this._minClusterSize) {
        this._map.addOverlay(marker);
        return true;
      } else if (len === this._minClusterSize) {
        for (var i = 0; i < len; i++) {
          var label = this._markers[i].getLabel();
          this._markers[i].getMap() && this._map.removeOverlay(this._markers[i]);
          this._markers[i].setLabel(label);
        }
      }
      this._map.addOverlay(this._clusterMarker);
      this._isReal = true;
      this.updateClusterMarker();
      return true;
    };
    Cluster.prototype.isMarkerInCluster = function(marker) {
      if (this._markers.indexOf) {
        return this._markers.indexOf(marker) != -1;
      } else {
        for (var i = 0, m; m = this._markers[i]; i++) {
          if (m === marker) {
            return true;
          }
        }
      }
      return false;
    };
    Cluster.prototype.isMarkerInClusterBounds = function(marker) {
      return this._gridBounds.containsPoint(marker.getPosition());
    };
    Cluster.prototype.isReal = function(marker) {
      return this._isReal;
    };
    Cluster.prototype.updateGridBounds = function() {
      var bounds = new BMap.Bounds(this._center, this._center);
      this._gridBounds = getExtendedBounds(this._map, bounds, this._markerClusterer.getGridSize());
    };
    Cluster.prototype.updateClusterMarker = function() {
      if (this._map.getZoom() > this._markerClusterer.getMaxZoom()) {
        this._clusterMarker && this._map.removeOverlay(this._clusterMarker);
        for (var i = 0, marker; marker = this._markers[i]; i++) {
          this._map.addOverlay(marker);
        }
        return;
      }
      if (this._markers.length < this._minClusterSize) {
        this._clusterMarker.hide();
        return;
      }
      this._clusterMarker.setPosition(this._center);
      this._clusterMarker.setText(this._markers.length);
      this._clusterMarker.addEventListener && !this._clusterMarker._hasClickEvent && this._clusterMarker.addEventListener("click", function(event) {
        this._clusterMarker._hasClickEvent = true;
        this._markers && this._map.setViewport(this.getBounds());
      }.bind(this));
    };
    Cluster.prototype.remove = function() {
      for (var i = 0; this._markers[i]; i++) {
        var label = this._markers[i].getLabel();
        this._markers[i].getMap() && this._map.removeOverlay(this._markers[i]);
        this._markers[i].setLabel(label);
      }
      this._map.removeOverlay(this._clusterMarker);
      this._markers.length = 0;
      delete this._markers;
    };
    Cluster.prototype.getBounds = function() {
      var bounds = new BMap.Bounds(this._center, this._center);
      for (var i = 0, marker; marker = this._markers[i]; i++) {
        bounds.extend(marker.getPosition());
      }
      return bounds;
    };
    Cluster.prototype.getCenter = function() {
      return this._center;
    };
    return MarkerClusterer2;
  });
})(bmaplib_markerclusterer);
var MarkerClusterer$1 = bmaplib_markerclusterer.exports;
const markers = [];
const _sfc_main$3 = {
  name: "bml-marker-clusterer",
  mixins: [commonMixin("markerClusterer")],
  provide() {
    return {
      Cluster: this
    };
  },
  props: {
    gridSize: {
      type: Number
    },
    maxZoom: {
      type: Number
    },
    minClusterSize: {
      type: Number
    },
    styles: {
      type: Array,
      default() {
        return [];
      }
    },
    averageCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    gridSize: {
      handler(val) {
        const { BMap: BMap2, originInstance } = this;
        originInstance.setGridSize(val);
      },
      deep: true
    },
    maxZoom(val) {
      const { originInstance } = this;
      originInstance.setMaxZoom(val);
    },
    minClusterSize: {
      handler(val) {
        const { BMap: BMap2, originInstance } = this;
        originInstance.setMinClusterSize(val);
      },
      deep: true
    },
    styles: {
      handler(val) {
        const { BMap: BMap2, originInstance } = this;
        const obj = JSON.parse(JSON.stringify(val)).map((item) => {
          item.size = item.size && createSize(BMap2, item.size);
          return item;
        });
        originInstance.setStyles(obj);
      },
      deep: true
    },
    averageCenter(val) {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, gridSize, minClusterSize, maxZoom, styles, averageCenter } = this;
      this.originInstance = new MarkerClusterer$1(map, {
        gridSize: gridSize || 60,
        maxZoom,
        minClusterSize: minClusterSize || 2,
        styles: styles.map((item) => {
          item.size = createSize(BMap2, item.size);
          return item;
        }),
        isAverageCenter: averageCenter
      });
      this.$nextTick(() => {
        const markersInstance = markers.map((inst) => inst.originInstance).filter((marker) => marker instanceof BMap2.Marker);
        this.originInstance.addMarkers(markersInstance);
      });
    },
    addMaker(maker) {
      markers.push(maker);
    },
    removeMaker(maker) {
      markers.splice(markers.indexOf(maker), 1);
    }
  },
  beforeCreate() {
    this.preventChildrenRender = true;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", null, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var MarkerClusterer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render]]);
var bmaplib_lushu = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    var baidu = {};
    baidu.dom = {};
    baidu.dom.g = function(id) {
      if (typeof id == "string" || id instanceof String) {
        return document.getElementById(id);
      } else if (id && id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
      }
      return null;
    };
    baidu.g = baidu.G = baidu.dom.g;
    baidu.lang = baidu.lang || {};
    baidu.lang.isString = function(source) {
      return Object.prototype.toString.call(source) == "[object String]";
    };
    baidu.isString = baidu.lang.isString;
    baidu.dom._g = function(id) {
      if (baidu.lang.isString(id)) {
        return document.getElementById(id);
      }
      return id;
    };
    baidu._g = baidu.dom._g;
    baidu.dom.getDocument = function(element) {
      element = baidu.dom.g(element);
      return element.nodeType == 9 ? element : element.ownerDocument || element.document;
    };
    baidu.browser = baidu.browser || {};
    baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? document.documentMode || +RegExp["$1"] : void 0;
    baidu.dom.getComputedStyle = function(element, key) {
      element = baidu.dom._g(element);
      var doc = baidu.dom.getDocument(element), styles;
      if (doc.defaultView && doc.defaultView.getComputedStyle) {
        styles = doc.defaultView.getComputedStyle(element, null);
        if (styles) {
          return styles[key] || styles.getPropertyValue(key);
        }
      }
      return "";
    };
    baidu.dom._styleFixer = baidu.dom._styleFixer || {};
    baidu.dom._styleFilter = baidu.dom._styleFilter || [];
    baidu.dom._styleFilter.filter = function(key, value, method) {
      for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
          value = filter(key, value);
        }
      }
      return value;
    };
    baidu.string = baidu.string || {};
    baidu.string.toCamelCase = function(source) {
      if (source.indexOf("-") < 0 && source.indexOf("_") < 0) {
        return source;
      }
      return source.replace(/[-_][^-_]/g, function(match) {
        return match.charAt(1).toUpperCase();
      });
    };
    baidu.dom.getStyle = function(element, key) {
      var dom = baidu.dom;
      element = dom.g(element);
      key = baidu.string.toCamelCase(key);
      var value = element.style[key] || (element.currentStyle ? element.currentStyle[key] : "") || dom.getComputedStyle(element, key);
      if (!value) {
        var fixer = dom._styleFixer[key];
        if (fixer) {
          value = fixer.get ? fixer.get(element) : baidu.dom.getStyle(element, fixer);
        }
      }
      if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, "get");
      }
      return value;
    };
    baidu.getStyle = baidu.dom.getStyle;
    baidu.dom._NAME_ATTRS = function() {
      var result = {
        "cellpadding": "cellPadding",
        "cellspacing": "cellSpacing",
        "colspan": "colSpan",
        "rowspan": "rowSpan",
        "valign": "vAlign",
        "usemap": "useMap",
        "frameborder": "frameBorder"
      };
      if (baidu.browser.ie < 8) {
        result["for"] = "htmlFor";
        result["class"] = "className";
      } else {
        result["htmlFor"] = "for";
        result["className"] = "class";
      }
      return result;
    }();
    baidu.dom.setAttr = function(element, key, value) {
      element = baidu.dom.g(element);
      if (key == "style") {
        element.style.cssText = value;
      } else {
        key = baidu.dom._NAME_ATTRS[key] || key;
        element.setAttribute(key, value);
      }
      return element;
    };
    baidu.setAttr = baidu.dom.setAttr;
    baidu.dom.setAttrs = function(element, attributes) {
      element = baidu.dom.g(element);
      for (var key in attributes) {
        baidu.dom.setAttr(element, key, attributes[key]);
      }
      return element;
    };
    baidu.setAttrs = baidu.dom.setAttrs;
    baidu.dom.create = function(tagName, opt_attributes) {
      var el = document.createElement(tagName), attributes = opt_attributes || {};
      return baidu.dom.setAttrs(el, attributes);
    };
    baidu.object = baidu.object || {};
    baidu.extend = baidu.object.extend = function(target, source) {
      for (var p in source) {
        if (source.hasOwnProperty(p)) {
          target[p] = source[p];
        }
      }
      return target;
    };
    var LuShu = function(map, path, opts) {
      try {
        BMap;
      } catch (e) {
        throw Error("Baidu Map JS API is not ready yet!");
      }
      if (!path || path.length < 1) {
        return;
      }
      this._map = map;
      this._path = path;
      this.i = 0;
      this._setTimeoutQuene = [];
      this._projection = this._map.getMapType().getProjection();
      this._opts = {
        icon: null,
        speed: 4e3,
        defaultContent: "",
        showInfoWindow: false
      };
      this._setOptions(opts);
      this._rotation = 0;
      if (!this._opts.icon instanceof BMap.Icon) {
        this._opts.icon = defaultIcon;
      }
    };
    LuShu.prototype._setOptions = function(opts) {
      if (!opts) {
        return;
      }
      for (var p in opts) {
        if (opts.hasOwnProperty(p)) {
          this._opts[p] = opts[p];
        }
      }
    };
    LuShu.prototype.start = function() {
      var me = this, len = me._path.length;
      this._opts.onstart && this._opts.onstart(me);
      if (me.i && me.i < len - 1) {
        if (!me._fromPause) {
          return;
        } else if (!me._fromStop) {
          me._moveNext(++me.i);
        }
      } else {
        !me._marker && me._addMarker();
        me._timeoutFlag = setTimeout(function() {
          !me._overlay && me._addInfoWin();
          me._moveNext(me.i);
        }, 400);
      }
      this._fromPause = false;
      this._fromStop = false;
    }, LuShu.prototype.stop = function() {
      this.i = 0;
      this._fromStop = true;
      clearInterval(this._intervalFlag);
      this._clearTimeout();
      for (var i = 0, t = this._opts.landmarkPois, len = t.length; i < len; i++) {
        t[i].bShow = false;
      }
      this._opts.onstop && this._opts.onstop(this);
    };
    LuShu.prototype.pause = function() {
      clearInterval(this._intervalFlag);
      this._fromPause = true;
      this._clearTimeout();
      this._opts.onpause && this._opts.onpause(this);
    };
    LuShu.prototype.hideInfoWindow = function() {
      this._opts.showInfoWindow = false;
      this._overlay && (this._overlay._div.style.visibility = "hidden");
    };
    LuShu.prototype.showInfoWindow = function() {
      this._opts.showInfoWindow = true;
      this._overlay && (this._overlay._div.style.visibility = "visible");
    };
    LuShu.prototype.dispose = function() {
      clearInterval(this._intervalFlag);
      this._setTimeoutQuene && this._clearTimeout();
      if (this._map) {
        this._map.removeOverlay(this._overlay);
        this._map.removeOverlay(this._marker);
      }
    };
    baidu.object.extend(LuShu.prototype, {
      _addMarker: function(callback) {
        if (this._marker) {
          this.stop();
          this._map.removeOverlay(this._marker);
          clearTimeout(this._timeoutFlag);
        }
        this._overlay && this._map.removeOverlay(this._overlay);
        var marker = new BMap.Marker(this._path[0]);
        this._opts.icon && marker.setIcon(this._opts.icon);
        this._map.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_DROP);
        this._marker = marker;
      },
      _addInfoWin: function() {
        var me = this;
        !CustomOverlay.prototype.initialize && initCustomOverlay();
        var overlay = new CustomOverlay(me._marker.getPosition(), me._opts.defaultContent);
        overlay.setRelatedClass(this);
        this._overlay = overlay;
        this._map.addOverlay(overlay);
        this._opts.showInfoWindow ? this.showInfoWindow() : this.hideInfoWindow();
      },
      _getMercator: function(poi) {
        return this._map.getMapType().getProjection().lngLatToPoint(poi);
      },
      _getDistance: function(pxA, pxB) {
        return Math.sqrt(Math.pow(pxA.x - pxB.x, 2) + Math.pow(pxA.y - pxB.y, 2));
      },
      _move: function(initPos, targetPos, effect) {
        var me = this, currentCount = 0, timer = 10, step = this._opts.speed / (1e3 / timer), init_pos = this._projection.lngLatToPoint(initPos), target_pos = this._projection.lngLatToPoint(targetPos), count = Math.round(me._getDistance(init_pos, target_pos) / step);
        if (count < 1) {
          me._moveNext(++me.i);
          return;
        }
        me._intervalFlag = setInterval(function() {
          if (currentCount >= count) {
            clearInterval(me._intervalFlag);
            if (me.i > me._path.length) {
              return;
            }
            me._moveNext(++me.i);
            me._opts.onmove(me);
          } else {
            currentCount++;
            var x = effect(init_pos.x, target_pos.x, currentCount, count), y = effect(init_pos.y, target_pos.y, currentCount, count), pos = me._projection.pointToLngLat(new BMap.Pixel(x, y));
            if (currentCount == 1) {
              var proPos = null;
              if (me.i - 1 >= 0) {
                proPos = me._path[me.i - 1];
              }
              if (me._opts.enableRotation == true) {
                me.setRotation(proPos, initPos, targetPos);
              }
              if (me._opts.autoView) {
                if (!me._map.getBounds().containsPoint(pos)) {
                  me._map.setCenter(pos);
                }
              }
            }
            me._marker.setPosition(pos);
            me._setInfoWin(pos);
          }
        }, timer);
      },
      setRotation: function(prePos, curPos, targetPos) {
        var me = this;
        var deg = 0;
        curPos = me._map.pointToPixel(curPos);
        targetPos = me._map.pointToPixel(targetPos);
        if (targetPos.x != curPos.x) {
          var tan = (targetPos.y - curPos.y) / (targetPos.x - curPos.x), atan = Math.atan(tan);
          deg = atan * 360 / (2 * Math.PI);
          if (targetPos.x < curPos.x) {
            deg = -deg + 90 + 90;
          } else {
            deg = -deg;
          }
          me._marker.setRotation(-deg);
        } else {
          var disy = targetPos.y - curPos.y;
          var bias = 0;
          if (disy > 0)
            bias = -1;
          else
            bias = 1;
          me._marker.setRotation(-bias * 90);
        }
        return;
      },
      linePixellength: function(from, to) {
        return Math.sqrt(Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y));
      },
      pointToPoint: function(from, to) {
        return Math.abs(from.x - to.x) * Math.abs(from.x - to.x) + Math.abs(from.y - to.y) * Math.abs(from.y - to.y);
      },
      _moveNext: function(index2) {
        var me = this;
        if (index2 < this._path.length - 1) {
          me._move(me._path[index2], me._path[index2 + 1], me._tween.linear);
        } else {
          me.stop();
        }
      },
      moveNext: function(index2) {
        var me = this;
        if (index2 < this._path.length - 1) {
          me._move(me._path[index2], me._path[index2 + 1], me._tween.linear);
        } else {
          me.stop();
        }
      },
      _setInfoWin: function(pos) {
        var me = this;
        me._overlay.setPosition(pos, me._marker.getIcon().size);
        var index2 = me._troughPointIndex(pos);
        if (index2 != -1) {
          clearInterval(me._intervalFlag);
          me._overlay.setHtml(me._opts.landmarkPois[index2].html);
          me._overlay.setPosition(pos, me._marker.getIcon().size);
          me._pauseForView(index2);
        } else {
          me._overlay.setHtml(me._opts.defaultContent);
        }
      },
      _pauseForView: function(index2) {
        var me = this;
        var t = setTimeout(function() {
          me._moveNext(++me.i);
        }, me._opts.landmarkPois[index2].pauseTime * 1e3);
        me._setTimeoutQuene.push(t);
      },
      _clearTimeout: function() {
        for (var i in this._setTimeoutQuene) {
          clearTimeout(this._setTimeoutQuene[i]);
        }
        this._setTimeoutQuene.length = 0;
      },
      _tween: {
        linear: function(initPos, targetPos, currentCount, count) {
          var b = initPos, c = targetPos - initPos, t = currentCount, d = count;
          return c * t / d + b;
        }
      },
      _troughPointIndex: function(markerPoi) {
        var t = this._opts.landmarkPois, distance;
        for (var i = 0, len = t.length; i < len; i++) {
          if (!t[i].bShow) {
            distance = this._map.getDistance(new BMap.Point(t[i].lng, t[i].lat), markerPoi);
            if (distance < 10) {
              t[i].bShow = true;
              return i;
            }
          }
        }
        return -1;
      }
    });
    function CustomOverlay(point, html) {
      this._point = point;
      this._html = html;
    }
    function initCustomOverlay() {
      CustomOverlay.prototype = new BMap.Overlay();
      CustomOverlay.prototype.initialize = function(map) {
        var div = this._div = baidu.dom.create("div", { style: "border:solid 1px #ccc;width:auto;min-width:50px;text-align:center;position:absolute;background:#fff;color:#000;font-size:12px;border-radius: 10px;padding:5px;white-space: nowrap;" });
        div.innerHTML = this._html;
        map.getPanes().floatPane.appendChild(div);
        this._map = map;
        return div;
      };
      CustomOverlay.prototype.draw = function() {
        this.setPosition(this.lushuMain._marker.getPosition(), this.lushuMain._marker.getIcon().size);
      };
      baidu.object.extend(CustomOverlay.prototype, {
        setPosition: function(poi, markerSize) {
          var px = this._map.pointToOverlayPixel(poi), styleW = baidu.dom.getStyle(this._div, "width"), styleH = baidu.dom.getStyle(this._div, "height"), overlayW = parseInt(this._div.clientWidth || styleW, 10);
          parseInt(this._div.clientHeight || styleH, 10);
          this._div.style.left = px.x - overlayW / 2 + "px";
          this._div.style.bottom = -(px.y - markerSize.height) + "px";
        },
        setHtml: function(html) {
          this._div.innerHTML = html;
        },
        setRelatedClass: function(lushuMain) {
          this.lushuMain = lushuMain;
        }
      });
    }
    return LuShu;
  });
})(bmaplib_lushu);
var Lushu = bmaplib_lushu.exports;
const _sfc_main$2 = {
  name: "bm-lushu",
  render(h) {
  },
  emits: ["start", "stop", "pause", "move"],
  mixins: [commonMixin("lushu")],
  props: {
    path: {
      type: Array,
      default: []
    },
    landmarkPois: {
      type: Array,
      default() {
        return [];
      }
    },
    icon: {
      type: Object
    },
    speed: {
      type: Number,
      default: 4e3
    },
    content: {
      type: String,
      default: ""
    },
    autoView: {
      type: Boolean,
      default: false
    },
    rotation: {
      type: Boolean,
      default: false
    },
    infoWindow: {
      type: Boolean,
      default: true
    },
    play: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    path: {
      handler(val) {
        this.reload();
      },
      deep: true
    },
    landmarkPois: {
      handler(val) {
        this.reload();
      },
      deep: true
    },
    icon: {
      handler(val) {
        const { originInstance, content } = this;
        const newMarker = createIcon(BMap, val);
        originInstance._opts.icon = newMarker;
        originInstance._marker = newMarker;
      },
      deep: true
    },
    speed(val) {
      const { originInstance, content } = this;
      originInstance._opts.speed = val;
    },
    content(val) {
      const { originInstance, infoWindow } = this;
      val && infoWindow ? originInstance.showInfoWindow() : originInstance.hideInfoWindow();
      originInstance._opts.defaultContent = val;
      originInstance._overlay && originInstance._overlay.setHtml(val);
    },
    autoView(val) {
      const { originInstance, content } = this;
      originInstance._opts.autoView = val;
    },
    rotation(val) {
      const { originInstance, content } = this;
      originInstance._opts.enableRotation = val;
    },
    infoWindow(val) {
      const { originInstance, content } = this;
      originInstance && val && content ? originInstance.showInfoWindow() : originInstance.hideInfoWindow();
    },
    play(val) {
      const { originInstance } = this;
      val && originInstance ? originInstance.start() : !this._isEnd && originInstance.pause();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, path, landmarkPois, icon, speed, content, autoView, rotation, infoWindow, play } = this;
      const lushu = this.originInstance = new Lushu(map, path, {
        enableRotation: rotation,
        landmarkPois,
        showInfoWindow: infoWindow,
        defaultContent: content,
        icon: icon && createIcon(BMap2, icon),
        speed,
        autoView,
        onstart: (e) => {
          this._isEnd = false;
          this.$emit("start", e);
        },
        onstop: (e) => {
          this._isEnd = true;
          this.$emit("stop", e);
        },
        onpause: (e) => this.$emit("pause", e),
        onmove: (e) => this.$emit("move", e)
      });
      play && path.length && lushu.start(this);
      path.length && (content && infoWindow ? lushu.showInfoWindow() : lushu.hideInfoWindow());
    }
  }
};
var bmaplib_heatmap = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    function inherits(subClass, superClass, className) {
      var key, proto, selfProps = subClass.prototype, clazz = new Function();
      clazz.prototype = superClass.prototype;
      proto = subClass.prototype = new clazz();
      for (key in selfProps) {
        proto[key] = selfProps[key];
      }
      subClass.prototype.constructor = subClass;
      subClass.superClass = superClass.prototype;
      if (typeof className == "string") {
        proto._className = className;
      }
    }
    var heatmapFactory = function() {
      var store = function store2(hmap) {
        var _ = {
          data: [],
          heatmap: hmap
        };
        this.max = 1;
        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
      };
      store.prototype = {
        addDataPoint: function(x, y) {
          if (x < 0 || y < 0)
            return;
          var me = this, heatmap2 = me.get("heatmap"), data = me.get("data");
          if (!data[x])
            data[x] = [];
          if (!data[x][y])
            data[x][y] = 0;
          data[x][y] += arguments.length < 3 ? 1 : arguments[2];
          me.set("data", data);
          if (me.max < data[x][y]) {
            heatmap2.get("actx").clearRect(0, 0, heatmap2.get("width"), heatmap2.get("height"));
            me.setDataSet({ max: data[x][y], data }, true);
            return;
          }
          heatmap2.drawAlpha(x, y, data[x][y], true);
        },
        setDataSet: function(obj, internal) {
          var me = this, heatmap2 = me.get("heatmap"), data = [], d = obj.data, dlen = d.length;
          heatmap2.clear();
          this.max = obj.max;
          heatmap2.get("legend") && heatmap2.get("legend").update(obj.max);
          if (internal != null && internal) {
            for (var one in d) {
              if (one === void 0)
                continue;
              for (var two in d[one]) {
                if (two === void 0)
                  continue;
                heatmap2.drawAlpha(one, two, d[one][two], false);
              }
            }
          } else {
            while (dlen--) {
              var point = d[dlen];
              heatmap2.drawAlpha(point.x, point.y, point.count, false);
              if (!data[point.x])
                data[point.x] = [];
              if (!data[point.x][point.y])
                data[point.x][point.y] = 0;
              data[point.x][point.y] = point.count;
            }
          }
          heatmap2.colorize();
          this.set("data", d);
        },
        exportDataSet: function() {
          var me = this, data = me.get("data"), exportData = [];
          for (var one in data) {
            if (one === void 0)
              continue;
            for (var two in data[one]) {
              if (two === void 0)
                continue;
              exportData.push({ x: parseInt(one, 10), y: parseInt(two, 10), count: data[one][two] });
            }
          }
          return { max: me.max, data: exportData };
        },
        generateRandomDataSet: function(points) {
          var heatmap2 = this.get("heatmap"), w = heatmap2.get("width"), h = heatmap2.get("height");
          var randomset = {}, max = Math.floor(Math.random() * 1e3 + 1);
          randomset.max = max;
          var data = [];
          while (points--) {
            data.push({ x: Math.floor(Math.random() * w + 1), y: Math.floor(Math.random() * h + 1), count: Math.floor(Math.random() * max + 1) });
          }
          randomset.data = data;
          this.setDataSet(randomset);
        }
      };
      var legend = function legend2(config2) {
        this.config = config2;
        var _ = {
          element: null,
          labelsEl: null,
          gradientCfg: null,
          ctx: null
        };
        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
        this.init();
      };
      legend.prototype = {
        init: function() {
          var me = this, config2 = me.config, title = config2.title || "Legend", position = config2.position, offset = config2.offset || 10;
          config2.gradient;
          var labelsEl = document.createElement("ul"), element, gradient, positionCss = "";
          me.processGradientObject();
          if (position.indexOf("t") > -1) {
            positionCss += "top:" + offset + "px;";
          } else {
            positionCss += "bottom:" + offset + "px;";
          }
          if (position.indexOf("l") > -1) {
            positionCss += "left:" + offset + "px;";
          } else {
            positionCss += "right:" + offset + "px;";
          }
          element = document.createElement("div");
          element.style.cssText = "border-radius:5px;position:absolute;" + positionCss + "font-family:Helvetica; width:256px;z-index:10000000000; background:rgba(255,255,255,1);padding:10px;border:1px solid black;margin:0;";
          element.innerHTML = "<h3 style='padding:0;margin:0;text-align:center;font-size:16px;'>" + title + "</h3>";
          labelsEl.style.cssText = "position:relative;font-size:12px;display:block;list-style:none;list-style-type:none;margin:0;height:15px;";
          gradient = document.createElement("div");
          gradient.style.cssText = ["position:relative;display:block;width:256px;height:15px;border-bottom:1px solid black; background-image:url(", me.createGradientImage(), ");"].join("");
          element.appendChild(labelsEl);
          element.appendChild(gradient);
          me.set("element", element);
          me.set("labelsEl", labelsEl);
          me.update(1);
        },
        processGradientObject: function() {
          var me = this, gradientConfig = this.config.gradient, gradientArr = [];
          for (var key in gradientConfig) {
            if (gradientConfig.hasOwnProperty(key)) {
              gradientArr.push({ stop: key, value: gradientConfig[key] });
            }
          }
          gradientArr.sort(function(a, b) {
            return a.stop - b.stop;
          });
          gradientArr.unshift({ stop: 0, value: "rgba(0,0,0,0)" });
          me.set("gradientArr", gradientArr);
        },
        createGradientImage: function() {
          var me = this, gradArr = me.get("gradientArr"), length = gradArr.length, canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), grad;
          canvas.width = "256";
          canvas.height = "15";
          grad = ctx.createLinearGradient(0, 5, 256, 10);
          for (var i = 0; i < length; i++) {
            grad.addColorStop(1 / (length - 1) * i, gradArr[i].value);
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 5, 256, 10);
          ctx.strokeStyle = "black";
          ctx.beginPath();
          for (var i = 0; i < length; i++) {
            ctx.moveTo((1 / (length - 1) * i * 256 >> 0) + 0.5, 0);
            ctx.lineTo((1 / (length - 1) * i * 256 >> 0) + 0.5, i == 0 ? 15 : 5);
          }
          ctx.moveTo(255.5, 0);
          ctx.lineTo(255.5, 15);
          ctx.moveTo(255.5, 4.5);
          ctx.lineTo(0, 4.5);
          ctx.stroke();
          me.set("ctx", ctx);
          return canvas.toDataURL();
        },
        getElement: function() {
          return this.get("element");
        },
        update: function(max) {
          var me = this, gradient = me.get("gradientArr"), ctx = me.get("ctx"), labels = me.get("labelsEl"), labelText, labelsHtml = "", offset;
          for (var i = 0; i < gradient.length; i++) {
            labelText = max * gradient[i].stop >> 0;
            offset = ctx.measureText(labelText).width / 2 >> 0;
            if (i == 0) {
              offset = 0;
            }
            if (i == gradient.length - 1) {
              offset *= 2;
            }
            labelsHtml += '<li style="position:absolute;left:' + (((1 / (gradient.length - 1) * i * 256 || 0) >> 0) - offset + 0.5) + 'px">' + labelText + "</li>";
          }
          labels.innerHTML = labelsHtml;
        }
      };
      var heatmap = function heatmap2(config2) {
        var _ = {
          radius: 40,
          element: {},
          canvas: {},
          acanvas: {},
          ctx: {},
          actx: {},
          legend: null,
          visible: true,
          width: 0,
          height: 0,
          max: false,
          gradient: false,
          opacity: 180,
          premultiplyAlpha: false,
          bounds: {
            l: 1e3,
            r: 0,
            t: 1e3,
            b: 0
          },
          debug: false
        };
        this.store = new store(this);
        this.get = function(key) {
          return _[key];
        };
        this.set = function(key, value) {
          _[key] = value;
        };
        this.configure(config2);
        this.init();
      };
      heatmap.prototype = {
        configure: function(config2) {
          var me = this;
          me.set("radius", config2["radius"] || 40);
          me.set("element", config2.element instanceof Object ? config2.element : document.getElementById(config2.element));
          me.set("visible", config2.visible != null ? config2.visible : true);
          me.set("max", config2.max || false);
          me.set("gradient", config2.gradient || { 0.45: "rgb(0,0,255)", 0.55: "rgb(0,255,255)", 0.65: "rgb(0,255,0)", 0.95: "yellow", 1: "rgb(255,0,0)" });
          me.set("opacity", parseInt(255 / (100 / config2.opacity), 10) || 180);
          me.set("width", config2.width || 0);
          me.set("height", config2.height || 0);
          me.set("debug", config2.debug);
          if (config2.legend) {
            var legendCfg = config2.legend;
            legendCfg.gradient = me.get("gradient");
            me.set("legend", new legend(legendCfg));
          }
        },
        resize: function() {
          var me = this, element = me.get("element"), canvas = me.get("canvas"), acanvas = me.get("acanvas");
          canvas.width = acanvas.width = me.get("width") || element.style.width.replace(/px/, "") || me.getWidth(element);
          this.set("width", canvas.width);
          canvas.height = acanvas.height = me.get("height") || element.style.height.replace(/px/, "") || me.getHeight(element);
          this.set("height", canvas.height);
        },
        init: function() {
          var me = this, canvas = document.createElement("canvas"), acanvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), actx = acanvas.getContext("2d"), element = me.get("element");
          me.initColorPalette();
          me.set("canvas", canvas);
          me.set("ctx", ctx);
          me.set("acanvas", acanvas);
          me.set("actx", actx);
          me.resize();
          canvas.style.cssText = acanvas.style.cssText = "position:absolute;top:0;left:0;z-index:10000000;";
          if (!me.get("visible"))
            canvas.style.display = "none";
          element.appendChild(canvas);
          if (me.get("legend")) {
            element.appendChild(me.get("legend").getElement());
          }
          if (me.get("debug"))
            document.body.appendChild(acanvas);
          actx.shadowOffsetX = 15e3;
          actx.shadowOffsetY = 15e3;
          actx.shadowBlur = 15;
        },
        initColorPalette: function() {
          var me = this, canvas = document.createElement("canvas"), gradient = me.get("gradient"), ctx, grad, testData;
          canvas.width = "1";
          canvas.height = "256";
          ctx = canvas.getContext("2d");
          grad = ctx.createLinearGradient(0, 0, 1, 256);
          testData = ctx.getImageData(0, 0, 1, 1);
          testData.data[0] = testData.data[3] = 64;
          testData.data[1] = testData.data[2] = 0;
          ctx.putImageData(testData, 0, 0);
          testData = ctx.getImageData(0, 0, 1, 1);
          me.set("premultiplyAlpha", testData.data[0] < 60 || testData.data[0] > 70);
          for (var x in gradient) {
            grad.addColorStop(x, gradient[x]);
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, 1, 256);
          me.set("gradient", ctx.getImageData(0, 0, 1, 256).data);
        },
        getWidth: function(element) {
          var width = element.offsetWidth;
          if (element.style.paddingLeft) {
            width += element.style.paddingLeft;
          }
          if (element.style.paddingRight) {
            width += element.style.paddingRight;
          }
          return width;
        },
        getHeight: function(element) {
          var height = element.offsetHeight;
          if (element.style.paddingTop) {
            height += element.style.paddingTop;
          }
          if (element.style.paddingBottom) {
            height += element.style.paddingBottom;
          }
          return height;
        },
        colorize: function(x, y) {
          var me = this, width = me.get("width"), radius = me.get("radius"), height = me.get("height"), actx = me.get("actx"), ctx = me.get("ctx"), x2 = radius * 3, premultiplyAlpha = me.get("premultiplyAlpha"), palette = me.get("gradient"), opacity = me.get("opacity"), bounds = me.get("bounds"), left, top, bottom, right, image, length, alpha, offset, finalAlpha;
          if (x != null && y != null) {
            if (x + x2 > width) {
              x = width - x2;
            }
            if (x < 0) {
              x = 0;
            }
            if (y < 0) {
              y = 0;
            }
            if (y + x2 > height) {
              y = height - x2;
            }
            left = x;
            top = y;
            right = x + x2;
            bottom = y + x2;
          } else {
            if (bounds["l"] < 0) {
              left = 0;
            } else {
              left = bounds["l"];
            }
            if (bounds["r"] > width) {
              right = width;
            } else {
              right = bounds["r"];
            }
            if (bounds["t"] < 0) {
              top = 0;
            } else {
              top = bounds["t"];
            }
            if (bounds["b"] > height) {
              bottom = height;
            } else {
              bottom = bounds["b"];
            }
          }
          image = actx.getImageData(left, top, right - left, bottom - top);
          length = image.data.length;
          for (var i = 3; i < length; i += 4) {
            alpha = image.data[i], offset = alpha * 4;
            if (!offset)
              continue;
            finalAlpha = alpha < opacity ? alpha : opacity;
            image.data[i - 3] = palette[offset];
            image.data[i - 2] = palette[offset + 1];
            image.data[i - 1] = palette[offset + 2];
            if (premultiplyAlpha) {
              image.data[i - 3] /= 255 / finalAlpha;
              image.data[i - 2] /= 255 / finalAlpha;
              image.data[i - 1] /= 255 / finalAlpha;
            }
            image.data[i] = finalAlpha;
          }
          ctx.putImageData(image, left, top);
        },
        drawAlpha: function(x, y, count, colorize) {
          var me = this, radius = me.get("radius"), ctx = me.get("actx");
          me.get("max");
          var bounds = me.get("bounds"), xb = x - 1.5 * radius >> 0, yb = y - 1.5 * radius >> 0, xc = x + 1.5 * radius >> 0, yc = y + 1.5 * radius >> 0;
          ctx.shadowColor = "rgba(0,0,0," + (count ? count / me.store.max : "0.1") + ")";
          ctx.shadowOffsetX = 15e3;
          ctx.shadowOffsetY = 15e3;
          ctx.shadowBlur = 15;
          ctx.beginPath();
          ctx.arc(x - 15e3, y - 15e3, radius, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          if (colorize) {
            me.colorize(xb, yb);
          } else {
            if (xb < bounds["l"]) {
              bounds["l"] = xb;
            }
            if (yb < bounds["t"]) {
              bounds["t"] = yb;
            }
            if (xc > bounds["r"]) {
              bounds["r"] = xc;
            }
            if (yc > bounds["b"]) {
              bounds["b"] = yc;
            }
          }
        },
        toggleDisplay: function() {
          var me = this, visible = me.get("visible"), canvas = me.get("canvas");
          if (!visible)
            canvas.style.display = "block";
          else
            canvas.style.display = "none";
          me.set("visible", !visible);
        },
        getImageData: function() {
          return this.get("canvas").toDataURL();
        },
        clear: function() {
          var me = this, w = me.get("width"), h = me.get("height");
          me.store.set("data", []);
          me.get("ctx").clearRect(0, 0, w, h);
          me.get("actx").clearRect(0, 0, w, h);
        },
        cleanup: function() {
          var me = this;
          me.get("element").removeChild(me.get("canvas"));
        }
      };
      return {
        create: function(config2) {
          return new heatmap(config2);
        },
        util: {
          mousePosition: function(ev) {
            var x, y;
            if (ev.layerX) {
              x = ev.layerX;
              y = ev.layerY;
            } else if (ev.offsetX) {
              x = ev.offsetX;
              y = ev.offsetY;
            }
            if (typeof x == "undefined")
              return;
            return [x, y];
          }
        }
      };
    }();
    var HeatmapOverlay = function(opts) {
      try {
        BMap;
      } catch (e) {
        throw Error("Baidu Map JS API is not ready yet!");
      }
      if (!HeatmapOverlay._isExtended) {
        HeatmapOverlay._isExtended = true;
        inherits(HeatmapOverlay, BMap.Overlay, "HeatmapOverlay");
        var newHeatmap = new HeatmapOverlay(opts);
        this.__proto__ = newHeatmap.__proto__;
      }
      this.conf = opts;
      this.heatmap = null;
      this.latlngs = [];
      this.bounds = null;
      this._moveendHandler = this._moveendHandler.bind(this);
    };
    HeatmapOverlay.prototype.initialize = function(map) {
      this._map = map;
      var el = document.createElement("div");
      el.style.position = "absolute";
      el.style.top = 0;
      el.style.left = 0;
      el.style.border = 0;
      el.style.width = this._map.getSize().width + "px";
      el.style.height = this._map.getSize().height + "px";
      this.conf.element = el;
      map.getPanes().mapPane.appendChild(el);
      this.heatmap = heatmapFactory.create(this.conf);
      this._div = el;
      return el;
    };
    HeatmapOverlay.prototype.draw = function() {
      var currentBounds = this._map.getBounds();
      if (currentBounds.equals(this.bounds)) {
        return;
      }
      this.bounds = currentBounds;
      var ne = this._map.pointToOverlayPixel(currentBounds.getNorthEast()), sw = this._map.pointToOverlayPixel(currentBounds.getSouthWest());
      if (!ne || !sw) {
        return;
      }
      var topY = ne.y, leftX = sw.x, h = sw.y - ne.y, w = ne.x - sw.x;
      this.conf.element.style.left = leftX + "px";
      this.conf.element.style.top = topY + "px";
      this.conf.element.style.width = w + "px";
      this.conf.element.style.height = h + "px";
      this.heatmap.store.get("heatmap").resize();
      if (this.latlngs.length > 0) {
        this.heatmap.clear();
        var len = this.latlngs.length;
        var d = {
          max: this.heatmap.store.max,
          data: []
        };
        while (len--) {
          var latlng = this.latlngs[len].latlng;
          if (!currentBounds.containsPoint(latlng)) {
            continue;
          }
          var divPixel = this._map.pointToOverlayPixel(latlng), screenPixel = new BMap.Pixel(divPixel.x - leftX, divPixel.y - topY);
          var roundedPoint = this.pixelTransform(screenPixel);
          d.data.push({
            x: roundedPoint.x,
            y: roundedPoint.y,
            count: this.latlngs[len].c
          });
        }
        this.heatmap.store.setDataSet(d);
      }
    };
    HeatmapOverlay.prototype.pixelTransform = function(p) {
      var w = this.heatmap.get("width"), h = this.heatmap.get("height");
      while (p.x < 0) {
        p.x += w;
      }
      while (p.x > w) {
        p.x -= w;
      }
      while (p.y < 0) {
        p.y += h;
      }
      while (p.y > h) {
        p.y -= h;
      }
      p.x = p.x >> 0;
      p.y = p.y >> 0;
      return p;
    };
    HeatmapOverlay.prototype._moveendHandler = function(e) {
      this.setDataSet(this._data);
      delete this._data;
      this._map.removeEventListener("moveend", this._moveendHandler);
    };
    HeatmapOverlay.prototype.setDataSet = function(data) {
      if (!this._map) {
        return;
      }
      var currentBounds = this._map.getBounds();
      var ne = this._map.pointToOverlayPixel(currentBounds.getNorthEast()), sw = this._map.pointToOverlayPixel(currentBounds.getSouthWest());
      if (!ne || !sw) {
        this._data = data;
        this._map.addEventListener("moveend", this._moveendHandler);
      }
      var mapdata = {
        max: data.max,
        data: []
      };
      var d = data.data, dlen = d.length;
      this.latlngs = [];
      while (dlen--) {
        var latlng = new BMap.Point(d[dlen].lng, d[dlen].lat);
        this.latlngs.push({
          latlng,
          c: d[dlen].count
        });
        if (!currentBounds.containsPoint(latlng)) {
          continue;
        }
        var divPixel = this._map.pointToOverlayPixel(latlng), leftX = this._map.pointToOverlayPixel(currentBounds.getSouthWest()).x, topY = this._map.pointToOverlayPixel(currentBounds.getNorthEast()).y, screenPixel = new BMap.Pixel(divPixel.x - leftX, divPixel.y - topY);
        var point = this.pixelTransform(screenPixel);
        mapdata.data.push({
          x: point.x,
          y: point.y,
          count: d[dlen].count
        });
      }
      this.heatmap.clear();
      this.heatmap.store.setDataSet(mapdata);
    };
    HeatmapOverlay.prototype.addDataPoint = function(lng, lat, count) {
      var latlng = new BMap.Point(lng, lat), point = this.pixelTransform(this._map.pointToOverlayPixel(latlng));
      this.heatmap.store.addDataPoint(point.x, point.y, count);
      this.latlngs.push({
        latlng,
        c: count
      });
    };
    HeatmapOverlay.prototype.toggle = function() {
      this.heatmap.toggleDisplay();
    };
    return HeatmapOverlay;
  });
})(bmaplib_heatmap);
var Heatmap = bmaplib_heatmap.exports;
const _sfc_main$1 = {
  name: "bml-heatmap",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    data: {
      type: Array,
      default: Array
    },
    max: {
      type: Number
    },
    radius: {
      type: Number
    },
    gradient: {
      type: Object
    },
    opacity: {
      type: Number
    }
  },
  watch: {
    data: {
      handler() {
        this.reload();
      },
      deep: true
    },
    max() {
      this.reload();
    },
    radius(val) {
      const { originInstance, opacity, gradient } = this;
      originInstance.setOptions({
        radius: val,
        opacity,
        gradient
      });
    },
    gradient: {
      handler(val) {
        const { originInstance, radius, opacity } = this;
        originInstance.setOptions({
          radius,
          opacity,
          gradient: val
        });
      },
      deep: true
    },
    opacity(val) {
      const { originInstance, radius, gradient } = this;
      originInstance.setOptions({
        radius,
        opacity: val,
        gradient
      });
    }
  },
  methods: {
    load() {
      const { map, data, max, radius, opacity, gradient } = this;
      const overlay = this.originInstance = new Heatmap({
        radius,
        opacity,
        gradient
      });
      map.addOverlay(overlay);
      overlay.setDataSet({ data, max });
    }
  }
};
var bmaplib_curveline = { exports: {} };
(function(module, exports) {
  (function(root, factory) {
    {
      module.exports = factory();
    }
  })(commonjsGlobal, function() {
    function CurveLine2(points, opts) {
      try {
        BMap;
      } catch (e) {
        throw Error("Baidu Map JS API is not ready yet!");
      }
      var curvePoints = getCurvePoints(points);
      var polyline = new BMap.Polyline(curvePoints, opts);
      polyline.addEventListener("lineupdate", function() {
        if (this.isEditing) {
          this.enableEditing();
        }
      });
      polyline.cornerPoints = points;
      polyline.editMarkers = [];
      polyline.enableEditing = function() {
        var self2 = this;
        if (self2.map) {
          self2.disableEditing();
          for (var i = 0; i < self2.cornerPoints.length; i++) {
            var marker = new BMap.Marker(self2.cornerPoints[i], {
              icon: new BMap.Icon("http://api.map.baidu.com/library/CurveLine/1.5/src/circle.png", new BMap.Size(16, 16)),
              enableDragging: true,
              raiseOnDrag: true
            });
            marker.addEventListener("dragend", function() {
              self2.cornerPoints.length = 0;
              for (var i2 = 0; i2 < self2.editMarkers.length; i2++) {
                self2.cornerPoints.push(self2.editMarkers[i2].getPosition());
              }
              var curvePoints2 = getCurvePoints(self2.cornerPoints);
              self2.setPath(curvePoints2);
            });
            marker.index = i;
            self2.editMarkers.push(marker);
            self2.map.addOverlay(marker);
          }
        }
        self2.isEditing = true;
      };
      polyline.disableEditing = function() {
        this.isEditing = false;
        for (var i = 0; i < this.editMarkers.length; i++) {
          this.map.removeOverlay(this.editMarkers[i]);
          this.editMarkers[i] = null;
        }
        this.editMarkers.length = 0;
      };
      polyline.getPath = function() {
        return curvePoints;
      };
      return polyline;
    }
    function getCurvePoints(points) {
      var curvePoints = [];
      for (var i = 0; i < points.length - 1; i++) {
        var p = getCurveByTwoPoints(points[i], points[i + 1]);
        if (p && p.length > 0) {
          curvePoints = curvePoints.concat(p);
        }
      }
      return curvePoints;
    }
    function getCurveByTwoPoints(obj1, obj2) {
      var curveCoordinates = [];
      if (!obj1 || !obj2 || !(obj1 instanceof BMap.Point) || !(obj2 instanceof BMap.Point)) {
        return null;
      }
      var B1 = function(x) {
        return 1 - 2 * x + x * x;
      };
      var B2 = function(x) {
        return 2 * x - 2 * x * x;
      };
      var B3 = function(x) {
        return x * x;
      };
      var count = 30;
      var t, h, h2, lat3, lng3, t2;
      var i = 0;
      var inc = 0;
      if (typeof obj2 == "undefined") {
        if (typeof curveCoordinates != "undefined") {
          curveCoordinates = [];
        }
        return;
      }
      var lat1 = parseFloat(obj1.lat);
      var lat2 = parseFloat(obj2.lat);
      var lng1 = parseFloat(obj1.lng);
      var lng2 = parseFloat(obj2.lng);
      if (lng2 > lng1) {
        if (parseFloat(lng2 - lng1) > 180) {
          if (lng1 < 0) {
            lng1 = parseFloat(180 + 180 + lng1);
          }
        }
      }
      if (lng1 > lng2) {
        if (parseFloat(lng1 - lng2) > 180) {
          if (lng2 < 0) {
            lng2 = parseFloat(180 + 180 + lng2);
          }
        }
      }
      t2 = 0;
      if (lat2 == lat1) {
        t = 0;
        h = lng1 - lng2;
      } else if (lng2 == lng1) {
        t = Math.PI / 2;
        h = lat1 - lat2;
      } else {
        t = Math.atan((lat2 - lat1) / (lng2 - lng1));
        h = (lat2 - lat1) / Math.sin(t);
      }
      if (t2 == 0) {
        t2 = t + Math.PI / 5;
      }
      h2 = h / 2;
      lng3 = h2 * Math.cos(t2) + lng1;
      lat3 = h2 * Math.sin(t2) + lat1;
      for (i = 0; i < count + 1; i++) {
        curveCoordinates.push(new BMap.Point(lng1 * B1(inc) + lng3 * B2(inc) + lng2 * B3(inc), lat1 * B1(inc) + lat3 * B2(inc) + lat2 * B3(inc)));
        inc = inc + 1 / count;
      }
      return curveCoordinates;
    }
    return CurveLine2;
  });
})(bmaplib_curveline);
var CurveLine = bmaplib_curveline.exports;
const eventList = [
  "click",
  "dblclick",
  "mousedown",
  "mouseup",
  "mouseout",
  "mouseover",
  "remove",
  "lineupdate"
];
const _sfc_main = {
  name: "bml-curve-line",
  render() {
  },
  mixins: [commonMixin("overlay")],
  props: {
    points: {
      type: Array,
      default: Array
    },
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    },
    strokeStyle: {
      type: String
    },
    massClear: {
      type: Boolean,
      default: true
    },
    clicking: {
      type: Boolean,
      default: true
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    points: {
      handler(val, oldVal) {
        this.originInstance.disableEditing();
        this.reload();
      },
      deep: true
    },
    strokeColor(val) {
      this.originInstance.setStrokeColor(val);
    },
    strokeOpacity(val) {
      this.originInstance.setStrokeOpacity(val);
    },
    strokeWeight(val) {
      this.originInstance.setStrokeWeight(val);
    },
    strokeStyle(val) {
      this.originInstance.setStrokeStyle(val);
    },
    editing(val) {
      val ? this.originInstance.enableEditing() : this.originInstance.disableEditing();
    },
    massClear(val) {
      val ? this.originInstance.enableMassClear() : this.originInstance.disableMassClear();
    },
    clicking(val) {
      this.reload();
    }
  },
  methods: {
    load() {
      const { BMap: BMap2, map, points, strokeColor, strokeWeight, strokeOpacity, strokeStyle, editing, massClear, clicking } = this;
      const overlay = new CurveLine(points.map((item) => createPoint(BMap2, item)), {
        strokeColor,
        strokeWeight,
        strokeOpacity,
        strokeStyle,
        enableMassClear: massClear,
        enableClicking: clicking
      });
      editing ? overlay.enableEditing() : overlay.disableEditing();
      this.originInstance = overlay;
      map.addOverlay(overlay);
      bindEvents.call(this, overlay, eventList);
    }
  }
};
const useMap = () => {
  return new Promise((resolve) => {
    getBMap().then((BMap2) => {
      resolve(BMap2);
    });
  });
};
let geocoder;
const useGeocoder = () => {
  return new Promise((resolve) => {
    if (geocoder) {
      resolve(geocoder);
    } else {
      useMap().then((BMap2) => {
        geocoder = new BMap2.Geocoder();
        resolve(geocoder);
      });
    }
  });
};
const usePoint = (lng, lat) => {
  return new Promise((resolve) => {
    useMap().then((BMap2) => {
      const point = new BMap2.Point(lng, lat);
      resolve(point);
    });
  });
};
var index = {
  install(Vue, options = {}) {
    setConfig(options);
    Vue.component("baidu-map", BaiduMap);
    Vue.component("bm-scale", _sfc_main$w);
    Vue.component("bm-navigation", _sfc_main$v);
    Vue.component("bm-map-type", _sfc_main$u);
    Vue.component("bm-overview-map", _sfc_main$t);
    Vue.component("bm-geolocation", _sfc_main$s);
    Vue.component("bm-copyright", _sfc_main$r);
    Vue.component("bm-city-list", _sfc_main$q);
    Vue.component("bm-panorama", _sfc_main$p);
    Vue.component("bm-control", BmControl);
    Vue.component("bm-marker", BmMarker);
    Vue.component("bm-point-collection", _sfc_main$m);
    Vue.component("bm-polyline", _sfc_main$l);
    Vue.component("bm-polygon", _sfc_main$k);
    Vue.component("bm-circle", _sfc_main$j);
    Vue.component("bm-ground", _sfc_main$i);
    Vue.component("bm-label", _sfc_main$h);
    Vue.component("bm-info-window", BmInfoWindow);
    Vue.component("bm-overlay", BmOverlay);
    Vue.component("bm-context-menu", BmContextMenu);
    Vue.component("bm-context-menu-item", BmContextMenuItem);
    Vue.component("bm-local-search", BmLocalSearch);
    Vue.component("bm-transit", BmTransit);
    Vue.component("bm-walking", BmWalking);
    Vue.component("bm-driving", BmDriving);
    Vue.component("bm-bus", BmBus);
    Vue.component("bm-tile", _sfc_main$7);
    Vue.component("bm-traffic", _sfc_main$6);
    Vue.component("bm-auto-complete", BmAutoComplete);
    Vue.component("bm-boundary", BmBoundary);
  }
};
export { BaiduMap, BmAutoComplete, BmBoundary, BmBus, _sfc_main$j as BmCircle, _sfc_main$q as BmCityList, BmContextMenu, BmContextMenuItem, BmControl, _sfc_main$r as BmCopyright, BmDriving, _sfc_main$s as BmGeolocation, _sfc_main$i as BmGround, BmInfoWindow, _sfc_main$h as BmLabel, BmLocalSearch, _sfc_main$u as BmMapType, BmMarker, _sfc_main$v as BmNavigation, BmOverlay, _sfc_main$t as BmOverviewMap, _sfc_main$p as BmPanorama, _sfc_main$m as BmPointCollection, _sfc_main$k as BmPolygon, _sfc_main$l as BmPolyline, _sfc_main$w as BmScale, _sfc_main$7 as BmTile, _sfc_main$6 as BmTraffic, BmTransit, BmWalking, _sfc_main as BmlCurveLine, _sfc_main$1 as BmlHeatmap, _sfc_main$2 as BmlLushu, MarkerClusterer as BmlMarkerClusterer, index as default, getAddressByPoints, getConfig, getPointByAddress, getPointsTransfer, useGeocoder, useMap, usePoint };
