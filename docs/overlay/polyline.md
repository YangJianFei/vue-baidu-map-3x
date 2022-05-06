# 折线

`BmPolyline`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|path|Array[Point]|[]|构成折线的点|
|strokeColor|String||折线颜色|
|strokeWeight|Number||折线的宽度，以像素为单位|
|strokeOpacity|Number||折线的透明度，取值范围0 - 1|
|strokeStyle|String|'solid'|折线的样式，solid或dashed|
|massClear|Boolean|true|是否在调用map.clearOverlays清除此覆盖物|
|editing|Boolean|false|是否启用线编辑|
|clicking|Boolean|true|是否响应点击事件|
|icons|Array[IconSequence]|[]|贴合折线的图标|

## 事件

|事件名|参数|描述|
|------|----|----|
|click|`event{type, target, point, pixel}`|点击折线后会触发此事件|
|dblclick|`event{type, target, point, pixel}`|双击折线后会触发此事件|
|mousedown|`event{type, target, point, pixel}`|鼠标在折线上按下触发此事件|
|mouseup|`event{type, target, point, pixel}`|鼠标在折线释放触发此事件|
|mouseout|`event{type, target, point, pixel}`|鼠标离开折线时触发此事件|
|mouseover|`event{type, target, point, pixel}`|当鼠标进入折线区域时会触发此事件|
|remove|`event{type, target}`|移除折线时触发|
|lineupdate|`event{type, target}`|覆盖物的属性发生变化时触发|

## 示例

### 在地图中添加可编辑的折线

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14" @mousemove="syncPolyline" @click="paintPolyline" @rightclick="newPolyline">
      <bm-control>
        <button @click.stop="toggle">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      </bm-control>
      <bm-polyline :path="path" v-for="path of polyline.paths" :key="path"></bm-polyline>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, toRef } from 'vue';

const polyline = ref({
  editing: false,
  paths: []
});

const toggle = (name) => {
  polyline.value.editing = !polyline.value.editing;
};

const syncPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }

  if (!polyline.value.paths.length) {
    return
  }
  const path = polyline.value.paths[polyline.value.paths.length - 1]
  if (!path.length) {
    return
  }
  if (path.length === 1) {
    polyline.value.paths[polyline.value.paths.length - 1].push(e.point)
  }
  polyline.value.paths[polyline.value.paths.length - 1][path.length - 1] = e.point;
}

const newPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }
  if (!polyline.value.paths.length) {
    polyline.value.paths.push([])
  }
  const path = polyline.value.paths[polyline.value.paths.length - 1]
  path.pop()
  if (path.length) {
    polyline.value.paths.push([])
  }
}

const paintPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }
  !polyline.value.paths.length && polyline.value.paths.push([])
  polyline.value.paths[polyline.value.paths.length - 1].push(e.point)
}
</script>
-/DemoCode-