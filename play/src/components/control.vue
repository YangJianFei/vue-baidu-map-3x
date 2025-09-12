<template>
  <div>
    <label v-for="label in labels" :key="label.type">
      <input
        name="controlType"
        type="radio"
        :checked="controlType === label.type"
        @change="controlType = label.type"
      />{{ label.name }}
    </label>
    <baidu-map
      v-if="controlType === 'scaleRule'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
    >
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'scale'"
      class="map"
      :zoom="zoom"
      :center="{ lng: 116.404, lat: 39.915 }"
      :scroll-wheel-zoom="true"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'type'"
      class="map"
      :zoom="zoom"
      :center="{ lng: 116.404, lat: 39.915 }"
      :scroll-wheel-zoom="true"
    >
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
        anchor="BMAP_ANCHOR_TOP_LEFT"
      ></bm-map-type>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'overview'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
    >
      <bm-overview-map
        :offset="{ width: 0, height: 100 }"
        :isOpen="true"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        @load="onLoad"
        @unLoad="unLoad"
        @viewchanged="onViewchanged"
      ></bm-overview-map>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'location'"
      class="map"
      :zoom="zoom"
      :center="{ lng: 116.404, lat: 39.915 }"
      @init="handleMapInit"
    >
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :showAddressBar="true"
        :autoLocation="true"
      ></bm-geolocation>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'copyright'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
    >
      <bm-copyright
        :copyright="[
          {
            id: 1,
            content: 'Copyright Message',
            bounds: { ne: { lng: 110, lat: 40 }, sw: { lng: 0, lat: 0 } },
          },
          { id: 2, content: '<a>我是版权信息</a>' },
        ]"
      >
      </bm-copyright>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'citylist'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
    >
      <bm-city-list></bm-city-list>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'panorama'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
    >
      <bm-panorama></bm-panorama>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'custom'"
      class="map"
      :zoom="zoom"
      :center="{ lng: 116.404, lat: 39.915 }"
    >
      <bm-control>
        <button @click="addZoom(19)">缩放至最大</button>
        <button @click="addZoom(10)">还原</button>
        <button @click="addZoom(3)">缩放至最小</button>
      </bm-control>
    </baidu-map>
    <baidu-map
      v-else-if="controlType === 'ranging'"
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="zoom"
    >
      <BmControl>
        <BmRangefinder @addpoint="addPoint" />
      </BmControl>
    </baidu-map>
  </div>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, useTemplateRef } from "vue";
import type { RangefinderAddPointEventType } from "vue-baidu-map-3x";
import { BmControl, getPoint } from "vue-baidu-map-3x";

const controlType = ref("overview");

const zoom = ref(10);

console.log("point", getPoint(116.404, 39.915));

const labels = ref([
  { name: "比例尺", type: "scaleRule" },
  { name: "缩放", type: "scale" },
  { name: "地图类型", type: "type" },
  { name: "缩略图", type: "overview" },
  { name: "定位", type: "location" },
  { name: "版权", type: "copyright" },
  { name: "城市列表", type: "citylist" },
  { name: "全景", type: "panorama" },
  { name: "自定义控件", type: "custom" },
  { name: "测距", type: "ranging" },
]);

const addZoom = (level) => {
  zoom.value = level;
};

const handleMapInit = ({ BMap, map }) => {
  const geolocation = new BMap.Geolocation();
  return new Promise((res, rej) => {
    geolocation.getCurrentPosition(
      function (result) {
        console.log(result);
        return res(result);
      },
      { enableHighAccuracy: true }
    );
  });
};

const addPoint = (e: RangefinderAddPointEventType) => {
  console.log("addPoint", e);
};

const onLoad = (...params) => {
  console.log("load", params);
};

const unLoad = (...params) => {
  console.log("unload", params);
};

const onViewchanged = (...params) => {
  console.log("testChange", params);
};
</script>
