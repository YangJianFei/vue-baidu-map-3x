# VUE3 BAIDU MAP

## fork vue-baidu-map组件通过vite构建的vue3版本

<p align="center">
  <img src="https://yangjianfei.github.io/vue-baidu-map-3x/favicon.png" width="200px">
</p>
<p align="center">基于 VUE 3.x 的百度地图组件</p>

[![npm](https://img.shields.io/npm/v/vue-baidu-map-3x.svg)]()

## 语言

- [中文](https://github.com/YangJianFei/vue-baidu-map-3x/blob/main/README.md)
- [English](https://github.com/YangJianFei/vue-baidu-map-3x/blob/main/README.en.md)

## 文档

[https://yangjianfei.github.io/vue-baidu-map-3x/](https://yangjianfei.github.io/vue-baidu-map-3x/)

## 开始

### 安装

```bash
npm i --save vue-baidu-map-3x
```

### 初始化

```javascript
import { createApp } from 'vue';
import BaiduMap from 'vue-baidu-map-3x';

const app = createApp(App);
app.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
});
```

### 使用
```vue
<template>
  <baidu-map class="map">
  </baidu-map>
</template>

<style>
/* 地图容器必须设置宽和高属性 */
.map {
  width: 400px;
  height: 300px;
}
</style>
```


## 协议

[MIT 许可证](https://opensource.org/licenses/MIT)

版权所有 (c) 2016至今, YangJianFei <1294485765@qq.com>


