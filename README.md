# VUE3 BAIDU MAP

## fork vue-baidu-map组件通过vite构建的vue3版本（支持地图v2.0和v3.0）

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
  ak: 'YOUR_APP_KEY',
  v:'2.0'  // 默认使用3.0
});
```

### 使用
```vue
<template>
  <baidu-map class="map" :center="{lng: 118.454, lat: 32.955}" :zoom="5" @ready="ready" >
  </baidu-map>
</template>

<script setup>
const ready = ({Bmap,map})=>{
  //  对地图进行自定义操作
};
</script>

<style>
/* 地图容器必须设置宽和高属性 */
.map {
  width: 400px;
  height: 300px;
}
</style>
```

## 废弃
~~BmView~~
废弃了<font color="#e81224">BmView</font>组件

## 协议

[MIT 许可证](https://opensource.org/licenses/MIT)

版权所有 (c) 2016至今, YangJianFei <1294485765@qq.com>


## 关于我

扫描添加下方的微信(<font color="#e81224">yjf163163</font>)并回复加群，即可加入”<font color="#e81224">前端男海群</font>“。交流学习，及时获取代码最新动态。
<div>
  <img src="https://yangjianfei.github.io/vue-baidu-map-3x/heifahaizei.png" width="256px">
</div>
如果对你有帮助送我一颗小星星（づ￣3￣）づ╭❤～
