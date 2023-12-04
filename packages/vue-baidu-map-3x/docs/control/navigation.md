# 缩放控件

`BmNavigation`

::: danger 经测试这个定位组件时好时坏WebGL版本会好点，无解。
可联系百度地图客服看看怎么解决（氪金？）
:::

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|anchor|ControlAnchor||控件停靠位置|
|offset|Size||控件偏移值|
|type|NavigationControlType||平移缩放控件的类型|
|showZoomInfo|Boolean||是否显示级别提示信息|
|enableGeolocation|Boolean|false|控件是否集成定位功能|

## 示例

### 在右上角加入缩放控件

#### 代码

-DemoCode-
<template>
  <div>
    <baidu-map class="map" center="北京">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
  </div>
</template>
-/DemoCode-
