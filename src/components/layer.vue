/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 13th 2022, 4:16:25 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <label v-for="label in labels" :key="label.type">
      <input type="radio" name="pointType" :checked="label.type === activeType" @change="activeType = label.type">
      {{ label.name }}
    </label>
    <baidu-map v-if="activeType === 'tileLayer'" class="map" :center="{ lng: 116.332782, lat: 40.007978 }" :zoom="16">
      <bm-tile :isTransparentPng="true" tileUrlTemplate="//developer.baidu.com/map/jsdemo/demo/tiles/{Z}/tile{X}_{Y}.png">
      </bm-tile>
    </baidu-map>
    <baidu-map v-if="activeType === 'traffic'" class="map" :center="{ lng: 116.332782, lat: 40.007978 }" :zoom="16">
      <bm-traffic :predictDate="{ weekday: 7, hour: 12 }">
      </bm-traffic>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeType = ref('tileLayer');
const labels = ref([
  { name: '瓦片图层', type: 'tileLayer' },
  { name: '交通流量图层', type: 'traffic' },
]);
</script>