# VUE3 BAIDU MAP

## fork vue-baidu-map组件的vue3版本

<p align="center">
  <img src="https://dafrok.github.io/vue-baidu-map/favicon.png" width="200px">
</p>
<p align="center">基于 VUE 3.x 的百度地图组件</p>

## vite/webpack可直接使用(通过vite构建)

## 语言

- [中文](https://github.com/Dafrok/vue-baidu-map/blob/master/README.zh.md)
- [English](https://github.com/Dafrok/vue-baidu-map/blob/master/README.md)

## 文档

[https://dafrok.github.io/vue-baidu-map](https://dafrok.github.io/vue-baidu-map)

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


