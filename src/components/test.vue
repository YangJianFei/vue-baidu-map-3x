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
import { getPointByAddress } from 'c'

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

getPointByAddress({
  address: '北京市海淀区上地十街10号'
}).then(res => {
  console.log(res);
});
</script>
