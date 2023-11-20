# 地面

`BmGround`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|bounds|Bounds||地面覆盖区域|
|opacity|Number||图层透明度|
|imageURL|String||图层地址|
|displayOnMinLevel|Number||图层显示的最小级别|
|displayOnMaxLevel|Number||图层显示的最大级别|


## 事件

|事件名|参数|描述|
|------|----|----|
|click|`event{type, target}`|点击地面图层后会触发此事件|
|dblclick|`event{type, target}`|双击地面图层后会触发此事件|

## 示例

### 在地图中添加北京四环的反白地面图层

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="12">
      <bm-ground :bounds="bounds" imageURL="//developer.baidu.com/map/jsdemo/img/si-huan.png" :opacity="1" :displayOnMinLevel="10" :displayOnMaxLevel="14">
      </bm-ground>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const bounds = ref({
  ne: {
    lng: 116.475451,
    lat: 39.9764
  },
  sw: {
    lng: 116.29579,
    lat: 39.837146
  }
});
</script>
-/DemoCode-