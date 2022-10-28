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
    <span @click="changePath">修改</span>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true">
      <bm-circle :key="1" :center="circlePath.center" :radius="circlePath.radius" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"
        @lineupdate="updateCirclePath" :editing="true"></bm-circle>
      <bm-circle :key="2" :center="circlePath1.center" :radius="circlePath1.radius" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"
        @lineupdate="updateCirclePath1" :editing="true"></bm-circle>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const circlePath = ref({
  center: {
    lng: 116.404,
    lat: 39.915
  },
  radius: 500
});
const circlePath1 = ref({
  center: {
    lng: 116.504,
    lat: 39.915
  },
  radius: 500
});

const changePath = () => {
  try {
    circlePath.value.center.lat = 39.995
  } catch (e) { }
  try {
    circlePath1.value.center.lat = 39.995
  } catch (e) { }
}
</script>
