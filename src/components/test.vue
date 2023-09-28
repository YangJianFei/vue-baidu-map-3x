<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-09-15 18:13:26
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>
    <span @click="handleChange">修改</span>
    <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="12" scroll-wheel-zoom @init="handleReady"
      @zoomend="handleZoomed">
      <bm-polygon v-if="showPolygon" :path="polygonPath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2"
        :editing="true" @lineupdate="updatePolygonPath" />
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPointByAddress, useGeocoder, usePoint } from 'c'

const keyword = ref('');
const location = ref('上海市');
const zoom = ref(6);
const points = ref([
  { lng: 116.404, lat: 39.915 },
  { lng: 116.304, lat: 39.915 },
  { lng: 116.504, lat: 39.915 },
]);

const handleReady = ({ BMap, map }) => {
}

const handleZoomed = (e) => {
  console.log('zoomed');
};

const handleChange = () => {
  zoom.value = 15;
}

const handleClick = () => {
  console.log('click');
}


const draw = ({ el, BMap, map }, point) => {
  const pixel = map.pointToOverlayPixel(new BMap.Point(point.lng, point.lat))
  el.style.left = pixel.x + 'px'
  el.style.top = pixel.y + 'px'
};

useGeocoder().then((geocoder) => {
  geocoder.getPoint('广东省深圳市光明新区上辇新村', (res) => {
    console.log('222:', res);
  });
  usePoint(116.404, 39.915).then(point => {
    geocoder.getLocation(point, (result) => {
      console.log('1111:', result);
    });
  });
});
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