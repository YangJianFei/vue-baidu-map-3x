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
    <baidu-map v-if="activeType==='area'" class="map" :center="{lng: 116.403765, lat: 39.914850}" :zoom="10" :scroll-wheel-zoom="true">
      <bm-boundary name="北京市" :strokeWeight="2" strokeColor="blue" @load="handleBoundaryLoad"></bm-boundary>
    </baidu-map>
    <baidu-map v-if="activeType==='auto'" class="map" :center="{lng: 116.403765, lat: 39.914850}" :zoom="11">
      <bm-control :offset="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
          <input placeholder="请输入地名关键字" />
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
    </baidu-map>
    <div @click="go">跳转</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const Router = useRouter();

const activeType = ref('auto');
const labels = ref([
  { name: '菜单', type: 'menu' },
  { name: 'maker菜单', type: 'makerMenu' },
  { name: '行政区域', type: 'area' },
  { name: '自动填充', type: 'auto' },
]);

const center = ref({
  lng: 116.404,
  lat: 39.915
});
const zoom = ref(15);
const keyword = ref();

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

const go = () => {
  Router.push({
    path: '/else'
  });
}
const handleBoundaryLoad = data => {
  console.log(data);
}
</script>