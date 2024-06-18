<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2024-06-18 18:03:19
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>

    <baidu-map class="map" :center="{ lng: 105.0, lat: 38.0 }" :zoom="4"
      :scroll-wheel-zoom="true" @init="addPoints">
      <!-- <bm-point-collection :points="[{lat:37.405247,lng:109.49779}]" /> -->
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL"
        >
      </bm-point-collection>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { BmlMarkerClusterer } from 'c';

const markers = ref([]);
const points = ref([]);

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
</script>

<style>
.sample {
  width: 120px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  box-shadow: 0 0 5px #000;
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
}

.sample.active {
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
}
</style>