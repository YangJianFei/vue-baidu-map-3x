/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, May 5th 2022, 11:45:35 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <span @click="changePoint">修改</span>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11">
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" :icon="{
             url: 'https://blog-1307687732.cos.ap-beijing.myqcloud.com//image火箭.png',
             size: {width: 64, height: 64}
           }"></bm-marker>
    </baidu-map>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  getAddressByPoints,
  getPointByAddress,
  getPointsTransfer,
} from 'c';

const btnText = ref('play_arrow');
const path = ref([]);
const rotation = ref(true);
const play = ref(false);
const content = ref('一言不合就开车');
const speed = ref(5000);
const starPoint = ref('天安门');
const endPoint = ref('百度大厦');
const icon = ref({
  url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
  size: {
    width: 52,
    height: 26
  },
  opts: {
    anchor: {
      width: 27,
      height: 13
    }
  }
});

const changeBtnText = (val) => {
  btnText.value = val
  if (val === 'play_arrow') {
    play.value = false
  }
};

const toggle = () => {
  play.value = !play.value
};

const handleSearchComplete = (res) => {
  path.value = res.getPlan(0).getRoute(0).getPath()
};

const changePoint = () => {
  starPoint.value = '香山公园';
  endPoint.value = '中国工商银行(国贸大厦支行)';
}

const handleReady = ({ map }) => {
  console.log(map);
  map.setHeading(64.5);
  map.setTilt(73);
}

const config = {
  location: ['31.225696563611', '121.49884033194']
};
getAddressByPoints(config).then(res => {
  console.log(res);
});
const config2 = {
  address: '北京市海淀区上地十街10号'
};
getPointByAddress(config2).then(res => {
  console.log(res);
});
const config3 = {
  locations: [
    '114.21892734521,29.575429778924',
    '114.34892734521,29.245429778924'
  ]
};
getPointsTransfer(config3).then(res => {
  console.log(res);
});
</script>
