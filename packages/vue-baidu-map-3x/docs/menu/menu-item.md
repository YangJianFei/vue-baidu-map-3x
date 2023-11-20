# 菜单项

`BmContextMenuItem` 菜单项是右键菜单的子组件，请勿在其他组件中使用。

## 属性

|属性名|类型|默认值|描述|
|------|-----|-----|----|
|callback|Function|`new Function`|点击菜单时执行的回调函数，第一个参数为 `{BMap, map, target, pixel, point}`|
|text|String||指定此菜单项的文本|
|iconUrl|String||指定此菜单项的icon URL（大小为17px*17px）|
|disabled|Boolean|false|是否禁用菜单项|
|seperator|Boolean|false|是否是分隔线（此属性为真时，其它属性会被忽略）|

## 示例

### 插入一个复杂的右键菜单

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