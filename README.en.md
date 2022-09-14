# VUE BAIDU MAP

## fork vue-baidu-map  vue3 (build by vite，support baidu v2.0 、 v3.0 and webGl)

<p align="center">
  <img src="https://yangjianfei.github.io/vue-baidu-map-3x/favicon.png" width="200px">
</p>
<p align="center">Baidu Map components for Vue 3.x</p>

[![npm](https://img.shields.io/npm/v/vue-baidu-map-3x.svg)]()

## Languages

- [中文](https://github.com/YangJianFei/vue-baidu-map-3x/blob/main/README.md)
- [English](https://github.com/YangJianFei/vue-baidu-map-3x/blob/main/README.en.md)

## Documentation

[https://yangjianfei.github.io/vue-baidu-map-3x/](https://yangjianfei.github.io/vue-baidu-map-3x/)

## Get Start

### Installation

```bash
npm i --save vue-baidu-map-3x
```

### Initialization

```javascript
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'YOUR_APP_KEY',
  // v:'2.0',  // default 3.0
  // type: 'WebGL' // ||API defaultAPI (BMap=BMapGL)
})
```

### Usage

```vue
<template>
  <baidu-map class="map" :center="{lng: 118.454, lat: 32.955}" :zoom="5" @ready="ready" >
  </baidu-map>
</template>

<script setup>
const ready = ({Bmap,map})=>{
  //  custom operate
};
</script>


<style>
/* The container of BaiduMap must be set width & height. */
.map {
  width: 100%;
  height: 300px;
}
</style>
```

### offline map
install plugin<font color="#e81224">npm i vue-baidu-map-offline</font> contact me wechart:yjf163163|1294485765@qq.com

## abandon
~~BmView~~
abandon<font color="#e81224">BmView</font>component

## License

[MIT ](https://opensource.org/licenses/MIT)

copyright (c) 2016~now, YangJianFei <1294485765@qq.com>


## About me

wechart:yjf163163  wechart group:scan me
<div>
  <img src="https://yangjianfei.github.io/vue-baidu-map-3x/heifahaizei.png" width="256px">
</div>
Hope you star!（づ￣3￣）づ╭<span style="color:red;">❤</span>～

## todos

- [ ] Load on demand
- [ ] treeshaking

## updated logs
[updated logs](https://github.com/YangJianFei/vue-baidu-map-3x/blob/main/docs/changelogs.md)