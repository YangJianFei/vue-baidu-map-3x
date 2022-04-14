/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, April 14th 2022, 9:59:18 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <label v-for="label in labels" :key="label.type">
      <input type="radio" name="pointType" :checked="label.type===activeType" @change="activeType=label.type">
      {{label.name}}
    </label>
    <baidu-map v-if="activeType==='menu'" class="map" :center="center" :zoom="zoom">
      <bm-context-menu>
        <bm-context-menu-item :callback="gotoBeijing" text="去北京"></bm-context-menu-item>
        <bm-context-menu-item :callback="gotoShanghai" text="去上海"></bm-context-menu-item>
      </bm-context-menu>
    </baidu-map>
    <baidu-map v-if="activeType==='makerMenu'" class="map" :center="center" :zoom="zoom">
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

const activeType = ref('menu');
const labels = ref([
  { name: '菜单', type: 'menu' },
  { name: 'maker菜单', type: 'makerMenu' },
]);

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