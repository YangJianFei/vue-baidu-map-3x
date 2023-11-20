# 比例尺控件

`BmScale`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|anchor|ControlAnchor||控件停靠位置|
|offset|Size||控件偏移值|

## 示例

### 在右上角加入比例尺控件

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    </baidu-map>
  </div>
</template>
-/DemoCode-
