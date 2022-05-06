## 注意事项

::: danger
地图初始须设置center，zoom否则地图不会初始化，
地图须设置高度才能展示
:::

```html
<baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
</baidu-map>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
```
::: danger
局部注册的 `BaiduMap` 组件**必须**声明 `ak,v,type` 属性。现在的局部注册并不是按需引入并不能减少打包体积，按需引入待后期实现
:::

```html
<template>
  <baidu-map class="map" ak="BaiduMapAK" v="3.0" type="API">
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