<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-10-19 15:36:30
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>
    <span @click="handleChange">修改{{ zoom }}</span>
    <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="15">
      <bm-info-window ref="infoWindowRef" :position="{ lng: markerPoint.lng, lat: markerPoint.lat }"
        title="Info Window Title" :show="infoWindow.show" @close="infoWinClose" @open="infoWinOpen"
        @ready="onInfoWindowReady">
        <p @click="onContentClick">{{ infoWinContent }}</p>
        <button @click="clear">Clear</button>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPointByAddress, useGeocoder, usePoint } from 'c'

const infoWindowRef = ref(null);
const markerPoint = ref({ lng: 116.404, lat: 39.915 });
const infoWindow = ref({
  show: true,
  contents: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
});
const infoWinContent = ref('我是内容');
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

const infoWinClose = (e) => {
  infoWindow.value.show = false
};

const onInfoWindowReady = () => {
};

const infoWinOpen = (e) => {
  infoWindow.value.show = true
  infoWindowRef?.value?.observer?.disconnect?.();
};

const onContentClick = () => {
  infoWinContent.value = '我是内容修改后';
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