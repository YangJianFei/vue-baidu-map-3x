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
</script>
