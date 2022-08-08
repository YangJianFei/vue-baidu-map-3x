/*
 * Author: y
  components: { Label },ang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, April 7th 2022, 9:44:40 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <label v-for="label in labels" :key="label.type">
      <input name="controlType" type="radio" :checked="controlType===label.type" @change="controlType=label.type">{{label.name}}
    </label>
    <baidu-map v-if="controlType==='scaleRule'" class="map" center="北京">
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    </baidu-map>
    <baidu-map v-else-if="controlType==='scale'" class="map" center="北京" :scroll-wheel-zoom="true">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
    <baidu-map v-else-if="controlType==='type'" class="map" center="北京">
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    </baidu-map>
    <baidu-map v-else-if="controlType==='overview'" class="map" center="北京">
      <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
    </baidu-map>
    <baidu-map v-else-if="controlType==='location'" class="map" center="北京" @init="handleMapInit">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
    </baidu-map>
    <baidu-map v-else-if="controlType==='copyright'" class="map" center="北京">
      <bm-copyright anchor="BMAP_ANCHOR_TOP_RIGHT" :copyright="[{id: 1, content: 'Copyright Message', bounds: {ne: {lng: 110, lat: 40}, sw:{lng: 0, lat: 0}}}, {id: 2, content: '<a>我是版权信息</a>'}]">
      </bm-copyright>
    </baidu-map>
    <baidu-map v-else-if="controlType==='citylist'" class="map" style="height: 400px" center="北京">
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
    </baidu-map>
    <baidu-map v-else-if="controlType==='panorama'" class="map" center="北京">
      <bm-panorama></bm-panorama>
    </baidu-map>
    <baidu-map v-else-if="controlType==='custom'" class="map" :zoom="zoom" center="北京">
      <bm-control>
        <button @click="addZoom(19)">缩放至最大</button>
        <button @click="addZoom(10)">还原</button>
        <button @click="addZoom(3)">缩放至最小</button>
      </bm-control>
    </baidu-map>
    <baidu-map v-else-if="controlType==='ranging'" class="map" center="北京" @ready="setDistanceToolInstance">
      <bm-control>
        <button @click="openDistanceTool">开启测距</button>
      </bm-control>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import DistanceTool from 'bmaplib.distancetool'

window.global = window.global || window;

const controlType = ref('citylist');
const distanceTool = ref(null);

const zoom = ref(10);

const labels = ref([
  { name: '比例尺', type: 'scaleRule' },
  { name: '缩放', type: 'scale' },
  { name: '地图类型', type: 'type' },
  { name: '缩略图', type: 'overview' },
  { name: '定位', type: 'location' },
  { name: '版权', type: 'copyright' },
  { name: '城市列表', type: 'citylist' },
  { name: '全景', type: 'panorama' },
  { name: '自定义控件', type: 'custom' },
  { name: '测距', type: 'ranging' }
]);

const addZoom = (level) => {
  zoom.value = level;
};

const setDistanceToolInstance = ({ map }) => {
  distanceTool.value = new DistanceTool(map, { lineStroke: 2 });
};

const openDistanceTool = (e) => {
  distanceTool.value && distanceTool.value.open();
};

const handleMapInit = ({ BMap, map }) => {
  const geolocation = new BMap.Geolocation();
  return new Promise((res, rej) => {
    geolocation.getCurrentPosition(function (result) {
      console.log(result);
      return res(result);
    }, { enableHighAccuracy: true });
  });
}

onUnmounted(() => {
  distanceTool.value && distanceTool.value.close();
});
</script>