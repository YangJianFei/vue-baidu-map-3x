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
    <baidu-map v-else-if="controlType==='scale'" class="map" center="北京">
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
    <baidu-map v-else class="map" center="北京">
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const controlType = ref('scaleRule');

const labels = ref([
  { name: '比例尺', type: 'scaleRule' },
  { name: '缩放', type: 'scale' },
  { name: '地图类型', type: 'type' }
]);
</script>