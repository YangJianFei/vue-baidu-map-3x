# 自定义控件

`BmControl` 组件允许开发者自由定制控件。

由于受到百度地图的鼠标滚轮缩放机制影响，在自定义控件组件中使用鼠标滚轮操作一个 DOM 元素的滚动条会失效，该问题可以通过阻止自定义控件的 `wheel` 事件冒泡来解决。

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|anchor|ControlAnchor||控件停靠位置，默认为左上。|
|offset|Size||控件偏移值|

## 示例

### 插入自定义控件

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :zoom="zoom" :center="{lng: 116.404, lat: 39.915}">
      <bm-control>
        <button @click="addZoom(19)">缩放至最大</button>
        <button @click="addZoom(10)">还原</button>
        <button @click="addZoom(3)">缩放至最小</button>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      zoom: 10
    }
  },
  methods: {
    addZoom (level) {
      this.zoom = level
    }
  }
}
</script>
-/DemoCode-