# 自定义覆盖物

`BmOverlay` 自定义覆盖物组件是一个高度订制化的组件，通过 `draw` 事件进行覆盖物的重绘。推荐的使用方法是将重绘逻辑相同的 `BmOverlay` 进行二次封装。自定义覆盖物仅在地图发生变化时触发 `draw` 方法重绘覆盖物视图，若需要定制数据视图同步策略，请手动触发 `BmOverlay` 的 `reload` 实例方法。

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|pane|String||自定义覆盖物所在[容器](http://lbsyun.baidu.com/cms/jsapi/class/jsapi_reference.html#a3b1)。包含 `floatPane`、`markerMouseTarget`、`floatShadow`、`labelPane`、`markerPane`、`markerShadow`、`mapPane` 共 7 种合法值|

## 事件

|事件名|参数|描述|
|------|-----|----|
|initialize|`event{BMap, map, el, overlay}`|覆盖物初始化时触发此事件|
|draw|`event{BMap, map, el, overlay}`|地图发生改变时触发此事件|

## 示例

### 单独使用

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
      <bm-overlay pane="labelPane" :class="{sample: true, active}" @draw="draw" @mouseover="active = true" @mouseleave="active = false">
        <div>我爱北京天安门</div>
      </bm-overlay>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);

const draw = ({ el, BMap, map }) => {
  const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915)) // 返回的坐标为覆盖物的左上角坐标。
  el.style.left = pixel.x - 60 + 'px' // 最终坐标 = 覆盖物坐标 - 覆盖物宽度/2。 // 居中显示
  el.style.top = pixel.y - 20 + 'px'
};
</script>

<style>
.sample {
  position: absolute;
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
}
.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>
-/DemoCode-

::: tip
自定义覆盖物需要自己写样式必须要有**position: absolute;**样式
:::