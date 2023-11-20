# 全景控件

`BmPanorama`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|anchor|ControlAnchor||控件停靠位置|
|offset|Size||控件偏移值|

## 示例

### 插入全景控件

#### 代码

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
      <bm-panorama></bm-panorama>
    </baidu-map>
  </div>
</template>
-/DemoCode-