### 双向绑定

-DemoCode-
<template>
  <input v-model.number="center.lng">
  <input v-model.number="center.lat">
  <input v-model.number="zoom">
  <baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
  </baidu-map>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const center = ref({
  lng: 116.404,
  lat: 39.915
});

let zoom = ref(15);

const syncCenterAndZoom = (e) => {
  const { lng, lat } = e.target.getCenter();
  zoom.value = e.target.getZoom();
  nextTick(() => {
    center.value.lng = lng;
    center.value.lat = lat;
  })
};
</script>
-/DemoCode-