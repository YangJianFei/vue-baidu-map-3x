# 上下文菜单

`BmContextMenu`

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|width |Number||菜单宽度|

## 事件

|事件名|参数|描述|
|------|----|----|
|open|`event{type, target, point, pixel}`|右键菜单打开时触发，事件参数point和pixel分别表示菜单开启时的地理和像素坐标点|
|close|`event{type, target, point, pixel}`|右键菜单关闭时触发，事件参数point和pixel分别表示菜单开启时的地理和像素坐标点|

## 示例

### 在地图中插入一个上下文菜单

-DemoCode-
<template>
  <div>
    <baidu-map class="map" :center="center" :zoom="zoom">
      <bm-context-menu>
        <bm-context-menu-item :callback="gotoBeijing" text="去北京"></bm-context-menu-item>
        <bm-context-menu-item seperator></bm-context-menu-item>
        <bm-context-menu-item :callback="gotoShanghai" text="去上海" iconUrl="http://lbsyun.baidu.com/skins/MySkin/resources/img/red.png"></bm-context-menu-item>        
        <bm-context-menu-item disabled text="去深圳"></bm-context-menu-item>
      </bm-context-menu>
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true">
        <bm-context-menu>
          <bm-context-menu-item :callback="getPosition" text="获取坐标"></bm-context-menu-item>
        </bm-context-menu>
      </bm-marker>
    </baidu-map>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const center = ref({
  lng: 116.404,
  lat: 39.915
});
const zoom = ref(15);

const gotoBeijing = (e) => {
  center.value = {
    lng: 116.404,
    lat: 39.915
  };
};

const gotoShanghai = (e) => {
  center.value = {
    lng: 121.473354,
    lat: 31.238413
  };
};

const getPosition = (e) => {
  alert(`${e.point.lng} / ${e.point.lat}`)
};
</script>
-/DemoCode-