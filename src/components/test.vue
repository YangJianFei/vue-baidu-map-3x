<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-04-04 16:34:23
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>
    <span @click="handleChange">修改</span>
    <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="14" @ready="handleReady">
      <bm-control :offset="{ width: '10px', height: '10px' }">
        <bm-auto-complete v-model="keyword" :sugStyle="{ zIndex: 1 }" :location="location">
          <input placeholder="请输入地名关键字" />
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true">
        <div>sdfd</div>
      </bm-geolocation>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPointByAddress, useGeocoder, usePoint } from 'c'

const keyword = ref('');
const location = ref('上海市');

const handleReady = ({ BMap, map }) => {
  map.addEventListener('click', (e) => {
    var marker5 = new BMap.Marker(new BMap.Point(e.latlng.lng, e.latlng.lat));
    map.addOverlay(marker5);
  })
}

const handleChange = () => {
  keyword.value = '';
  location.value = '天津市';
}

const handleClick = () => {
  console.log('click');
}

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
