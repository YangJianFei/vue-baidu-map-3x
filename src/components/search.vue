<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-06-20 16:34:46
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\search.vue
-->
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
    <div v-if="activeType === 'areaSearch'">
      <baidu-map class="map" :center="{ lng: 116.332782, lat: 40.007978 }" :zoom="16">
        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"
          @searchcomplete="handleComplete"></bm-local-search>
      </baidu-map>
      <label>关键词：<input v-model="keyword"></label>
      <label>地区：<input v-model="location"></label>
    </div>
    <baidu-map v-if="activeType === 'transit'" class="map" center="北京" :zoom="16">
      <bm-transit start="百度大厦" end="北京邮电大学西门" :auto-viewport="true" location="北京"></bm-transit>
    </baidu-map>
    <baidu-map v-if="activeType === 'walk'" class="map" center="北京" :zoom="16">
      <bm-walking start="百度大厦" end="北京邮电大学西门" :auto-viewport="true" location="北京"></bm-walking>
    </baidu-map>
    <div v-if="activeType === 'driving'">
      <div>
        <button @click="leastDistance"> 最短距离 </button>
        <button @click="leastTime"> 最短时间 </button>
      </div>
      <baidu-map class="map" center="北京" :zoom="16">
        <bm-driving start="天通苑北" end="宋家庄地铁站" :auto-viewport="true" :policy="policy" :panel="true" location="北京"
          :waypoints="['西二旗']" @markersset="onmarkersset">
        </bm-driving>
      </baidu-map>
    </div>
    <baidu-map v-if="activeType === 'transitSearch'" class="map" center="北京" :zoom="16">
      <bm-bus keyword="331" :auto-viewport="true" location="北京"></bm-bus>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeType = ref('areaSearch');
const labels = ref([
  { name: '地区检索', type: 'areaSearch' },
  { name: '公交路线规划', type: 'transit' },
  { name: '步行路线规划', type: 'walk' },
  { name: '驾车路线规划', type: 'driving' },
  { name: '公交路线检索', type: 'transitSearch' },
]);

const location = ref('北京');
const keyword = ref('百度');
const policy = ref('');

const leastDistance = () => {
  policy.value = "BMAP_DRIVING_POLICY_LEAST_DISTANCE"
};
const leastTime = () => {
  policy.value = "BMAP_DRIVING_POLICY_LEAST_TIME"
};
const handleComplete = (res) => {
  console.log(res);
};
const onmarkersset = (e) => {
  console.log(e);
  e.forEach(item => {
    item?.bn?.removeEventListener?.('click');
    item?.marker?.removeEventListener?.('click');
  })
};
</script>