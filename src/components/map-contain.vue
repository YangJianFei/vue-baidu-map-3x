/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 6th 2022, 2:22:34 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <span>开启滚轮缩放+设置自定义主题</span>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true" :mapStyle="mapStyle">
    </baidu-map>
    设置地图类型
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" mapType="BMAP_SATELLITE_MAP">
    </baidu-map>
    <span @click="onclick">双向绑定</span>
    <div>
      <input v-model.number="center.lng">
      <input v-model.number="center.lat">
      <input v-model.number="zoom">
      <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom"
        @zoomend="syncCenterAndZoom">
      </baidu-map>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const center = ref({
  lng: 116.404,
  lat: 39.915
});

let zoom = ref(15);

const mapStyle = ref({
  styleJson: [
    {
      "featureType": "land",
      "elementType": "geometry",
      "stylers": {
        "visibility": "on",
        "color": "#091220ff"
      }
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": {
        "visibility": "on",
        "color": "#113549ff"
      }
    }
  ]
});

const syncCenterAndZoom = (e) => {
  const { lng, lat } = e.target.getCenter();
  zoom.value = e.target.getZoom();
  nextTick(() => {
    center.value.lng = lng;
    center.value.lat = lat;
  })
};
</script>
