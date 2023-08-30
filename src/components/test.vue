<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-08-25 15:01:40
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\src\components\test.vue
-->
<!-- vue 3 引入百度api -->
<template>
  <div>
    <span @click="handleChange">修改</span>
    <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="zoom" scroll-wheel-zoom @init="handleReady"
      @zoomend="handleZoomed">
      <bm-label content="我爱北京天安门" :position="{ lng: 116.404, lat: 39.915 }"
        :labelStyle="{ color: 'red', fontSize: '24px' }" title="Hover me" />
    </baidu-map>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getPointByAddress, useGeocoder, usePoint } from 'c'

const keyword = ref('');
const location = ref('上海市');
const zoom = ref(15);

const handleReady = ({ BMap, map }) => {
  //设置限定区域
  // BMapLib.AreaRestriction.setBounds(
  //   map, // 参数1：当前地图实例
  //   new BMap.Bounds( // 参数2：需要限制的区域范围（长方形区域）。用bounds限制
  //     new BMap.Point(118.561352, 30.576457), // bounds参数1：限制区域的左下角坐标
  //     new BMap.Point(121.803875, 31.865034) // bounds参数2：限制区域的右上角坐标
  //   )
  // );

  console.log('ready:test');
  setTimeout(() => {
    zoom.value = 18;
  }, 3000);
  // map.setDisplayOptions({
  //   poi: false       //是否显示POI信息 
  // })
  var bdary = new BMap.Boundary();
  bdary.get("北京市海淀区", function (rs) {
    console.log(rs);
  });
  map.addEventListener('click', (e) => {
    var marker5 = new BMap.Marker(new BMap.Point(e.latlng.lng, e.latlng.lat));
    map.addOverlay(marker5);
  })
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
