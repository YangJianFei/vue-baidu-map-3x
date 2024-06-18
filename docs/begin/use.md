# 快速上手

## 使用

### 全局注册

全局注册将一次性引入百度地图组件库的所有组件。

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'vue-baidu-map-3x'

const app = createApp(App);

app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '百度地图ak',
  // v:'2.0',  // 默认使用3.0
  // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
});
app.mount('#app');
```

```html
<template>
  <baidu-map class="bm-view" :zoom="12" :center="{lng: 116.404, lat: 39.915}" >
  </baidu-map>
</template>

<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
```

### 局部注册
局部注册的 `BaiduMap` 组件**必须**声明 `ak,v,type` 属性

```html
<template>
  <baidu-map class="map" ak="BaiduMapAK" v="3.0" type="API" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
  </baidu-map>
</template>

<script setup>
import { BaiduMap } from 'vue-baidu-map-3x'
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
```

### CDN 全局注册

```html
<script>
Vue.use(VueBaiduMap.default, {
  ak: 'YOUR_APP_KEY'
})
</script>
```

## 常见问题

- `BaiduMap` 组件容器本身是一个空的块级元素，如果容器不定义高度，百度地图将渲染在一个高度为 0 不可见的容器内。
- 没有设置 `center` 和 `zoom` 属性的地图组件是不进行地图渲染的。当`center` 属性为合法地名字符串时例外，因为百度地图会根据地名自动调整 `zoom` 的值。
- 由于百度地图 JS API 只有 JSONP 一种加载方式，因此 `BaiduMap` 组件及其所有子组件的渲染只能是异步的。因此，请使用在组件的 `ready` 事件来执行地图 API 加载完毕后才能执行的代码，不要试图在 vue 自身的生命周期中调用 `BMap` 类，更不要在这些时机修改 model 层。

### 错误用法

```html{12-14}
<template>
  <baidu-map :center="center" :zoom="zoom"></baidu-map>
</template>

<script setup>
import {ref,onMounted} from 'vue';

const center = ref({lng: 0, lat: 0});
const zoom = ref(3);

onMounted(()=>{
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 15;
});
</script>
```

### 正确用法

```html
<template>
  <baidu-map :center="center" :zoom="zoom" @ready="handler"></baidu-map>
</template>

<script setup>
import {ref,onMounted} from 'vue';

const center = ref({lng: 0, lat: 0});
const zoom = ref(3);

const handler = ({BMap, map}) => {
  console.log(BMap, map);
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 15;
}
</script>
```

## Hello world!

```html
<template>
  <baidu-map class="map" center="北京" :zoom="5"></baidu-map>
</template>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>
```