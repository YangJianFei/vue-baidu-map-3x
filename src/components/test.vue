/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, May 5th 2022, 11:45:35 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <span @click="change">修改</span>
    <span @click="handleJudge">判断</span>
    <baidu-map class="map" :center="{lng: 117.16976, lat: 36.17322}" :zoom="15" @click="drawLine" :scroll-wheel-zoom="true">
      <bm-polygon :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="true" @lineupdate="updatePolygonPath" />
      <bm-marker v-for="item,index of position" :position="item" :key="index" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script setup>
import './BMapLib';
import { ref } from 'vue';

const position = ref([
  { lng: 116.404, lat: 39.915 }
]);

const polygonPath = ref([
  // { lng: 116.412732, lat: 39.911707 },
  // { lng: 116.39455, lat: 39.910932 },
  // { lng: 116.403461, lat: 39.921336 }
  {
    lng: 117.09041095828636,
    lat: 36.20757184260112
  },
  {
    lng: 117.09034358537312,
    lat: 36.20421185276448
  },
  {
    lng: 117.09845528412822,
    lat: 36.204142685681326
  },
  {
    lng: 117.09836994510476,
    lat: 36.20765556746687

  }
]);

const change = () => {
  position.value = { lng: 116.404, lat: 39.925 }
};

const handleJudge = () => {
  const point = new BMap.Point(position.value[0].lng, position.value[0].lat);
  const points = [];
  polygonPath.value.forEach(item => {
    points.push(new BMap.Point(item.lng, item.lat));
  });
  const ply = new BMap.Polygon(points);
  const result = BMapLib.GeoUtils.isPointInPolygon(point, ply);
  console.log(result, ply, point);
}

const drawLine = (e) => {
  const point = new BMap.Point(position.value[0].lng, position.value[0].lat);
  const points = [];
  polygonPath.value.forEach(item => {
    points.push(new BMap.Point(item.lng, item.lat));
  });
  const ply = new BMap.Polygon(points);
  const result = BMapLib.GeoUtils.isPointInPolygon(e.point, ply);
  console.log(result, ply, point);

}
</script>