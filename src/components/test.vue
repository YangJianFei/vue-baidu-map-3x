<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2025-06-26 17:26:04
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/src/components/test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>
    <baidu-map class="map" center="北京" :zoom="16">
      <bm-driving
        :start="start"
        :end="end"
        :auto-viewport="true"
        :panel="true"
        location="北京"
        :waypoints="waypoints"
        @markersset="onmarkersset"
      >
      </bm-driving>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { BmlMarkerClusterer } from "c";

const markers = ref([]);
const points = ref([]);
const start = ref({ lng: 116.310791, lat: 40.003419 });
const end = ref({ lng: 116.486419, lat: 39.877282 });
const waypoints = ref([{ lng: 116.318791, lat: 40.003419 }]);

// setTimeout(() => {
//   waypoints.value.push({ lng: 116.318791, lat: 40.003419 });
// }, 10);

const getMarkers = () => {
  for (let i = 0; i < 100; i++) {
    markers.value.push({ lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 });
  }
};

getMarkers();
const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 };
    pointAll.push(position);
  }
  points.value = pointAll;
};

const onmarkersset = (e) => {
  console.log(e);
  e.forEach((item) => {
    item?.bn?.removeEventListener?.("click");
    item?.marker?.removeEventListener?.("click");
  });
};

const init = ({ BMap, map }) => {
  map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
  var driving = new BMap.DrivingRoute(map, {
    renderOptions: {
      map: map,
      autoViewport: true,
    },
  });
  var start = new BMap.Point(116.310791, 40.003419);
  var end = new BMap.Point(116.486419, 39.877282);
  driving.search(start, end);
};
</script>
