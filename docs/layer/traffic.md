# 交通流量图层

`BmTraffic`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|predictDate|PredictDate||预测日期|

## 示例

### 周日12点时的交通路况


-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.332782, lat: 40.007978}" :zoom="16">
      <bm-traffic :predictDate="{weekday: 7, hour: 12}">
      </bm-traffic>
    </baidu-map>
  </div>
</template>
-/DemoCode-