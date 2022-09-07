/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, April 14th 2022, 2:33:28 pm
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
    <div v-if="activeType==='point'">
      <baidu-map class="map" center="中国" :scroll-wheel-zoom="true" :double-click-zoom="true">
        <bml-marker-clusterer :averageCenter="true" :styles="styles">
          <bm-marker v-for="marker of markers" :key="marker" :position="{lng: marker.lng, lat: marker.lat}" @dragend="updateMarker($event, marker)"
            :dragging="true"></bm-marker>
        </bml-marker-clusterer>
      </baidu-map>
      <button class="md-raised md-primary" @click="addMarker">添加一个随机点</button>
      <button class="md-raised md-primary" @click="removeMarker">删除上一个点</button>
      <button class="md-raised md-primary" @click="changeStyles">更换皮肤</button>
    </div>
    <div v-if="activeType==='lushu'">
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11">
        <bm-driving start="天安门" end="百度大厦" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
        <bml-lushu @start="changeBtnText('pause')" @stop="changeBtnText('play_arrow')" @pause="changeBtnText('play_arrow')" :path="path"
          :rotation="rotation" :content="content" :infoWindow="true" :speed="speed" :icon="icon" :play="play">
        </bml-lushu>
      </baidu-map>
      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>旋转</th>
            <th>行进速度</th>
            <th>窗体内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span @click="toggle">{{btnText}}</span></td>
            <td>
              <input v-model="rotation" type="radio" name="lushu">
            </td>
            <td>
              <input v-model.number="speed" type="text">
            </td>
            <td>
              <input v-model="content" type="text">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <baidu-map v-if="activeType==='hots'" class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14">
      <bml-heatmap :data="data" :max="heatMax" :radius="20">
      </bml-heatmap>
      <span @click="handleChange">改变</span>
    </baidu-map>
    <div v-if="activeType==='curveLine'">
      <baidu-map class="map" :center="{lng: 118.454, lat: 32.955}" :zoom="5" :scroll-wheel-zoom="true">
        <bml-curve-line :points="points" :editing="true" @lineupdate="update"></bml-curve-line>
      </baidu-map>
      <button @click="addPoint" class="md-raised md-primary">
        添加一个坐标点
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { BmlMarkerClusterer, BmlLushu, BmlHeatmap, BmlCurveLine } from 'c';

const props = defineProps({
  modelValue: {}
})
const emit = defineEmits(['update:modelValue'])

const activeType = ref('hots');
const labels = ref([
  { name: '点聚合', type: 'point' },
  { name: '路书', type: 'lushu' },
  { name: '热力图', type: 'hots' },
  { name: '弧线', type: 'curveLine' }
]);

const heatMax = ref(100);
const markers = ref([]);
const styles = ref([]);
const customStyles = ref(false);
const btnText = ref('play_arrow');
const path = ref([]);
const rotation = ref(true);
const play = ref(false);
const content = ref('一言不合就开车');
const speed = ref(5000);
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
const data = ref([
  { lng: 116.418261, lat: 39.921984, count: 50 },
  { lng: 116.423332, lat: 39.916532, count: 51 },
  { lng: 116.419787, lat: 39.930658, count: 15 },
  { lng: 116.418455, lat: 39.920921, count: 40 },
  { lng: 116.418843, lat: 39.915516, count: 100 },
  { lng: 116.42546, lat: 39.918503, count: 6 },
  { lng: 116.423289, lat: 39.919989, count: 18 },
  { lng: 116.418162, lat: 39.915051, count: 80 },
  { lng: 116.422039, lat: 39.91782, count: 11 },
  { lng: 116.41387, lat: 39.917253, count: 7 },
  { lng: 116.41773, lat: 39.919426, count: 42 },
  { lng: 116.421107, lat: 39.916445, count: 4 },
  { lng: 116.417521, lat: 39.917943, count: 27 },
  { lng: 116.419812, lat: 39.920836, count: 23 },
  { lng: 116.420682, lat: 39.91463, count: 60 },
  { lng: 116.415424, lat: 39.924675, count: 8 },
  { lng: 116.419242, lat: 39.914509, count: 15 },
  { lng: 116.422766, lat: 39.921408, count: 25 },
  { lng: 116.421674, lat: 39.924396, count: 21 },
  { lng: 116.427268, lat: 39.92267, count: 1 },
  { lng: 116.417721, lat: 39.920034, count: 51 },
  { lng: 116.412456, lat: 39.92667, count: 7 },
  { lng: 116.420432, lat: 39.919114, count: 11 },
  { lng: 116.425013, lat: 39.921611, count: 35 },
  // { lng: 116.418733, lat: 39.931037, count: 22 },
  // { lng: 116.419336, lat: 39.931134, count: 4 },
  // { lng: 116.413557, lat: 39.923254, count: 5 },
  // { lng: 116.418367, lat: 39.92943, count: 3 },
  // { lng: 116.424312, lat: 39.919621, count: 100 },
  // { lng: 116.423874, lat: 39.919447, count: 87 },
  // { lng: 116.424225, lat: 39.923091, count: 32 },
  // { lng: 116.417801, lat: 39.921854, count: 44 },
  // { lng: 116.417129, lat: 39.928227, count: 21 },
  // { lng: 116.426426, lat: 39.922286, count: 80 },
  // { lng: 116.421597, lat: 39.91948, count: 32 },
  // { lng: 116.423895, lat: 39.920787, count: 26 },
  // { lng: 116.423563, lat: 39.921197, count: 17 },
  // { lng: 116.417982, lat: 39.922547, count: 17 },
  // { lng: 116.426126, lat: 39.921938, count: 25 },
  // { lng: 116.42326, lat: 39.915782, count: 100 },
  // { lng: 116.419239, lat: 39.916759, count: 39 },
  // { lng: 116.417185, lat: 39.929123, count: 11 },
  // { lng: 116.417237, lat: 39.927518, count: 9 },
  // { lng: 116.417784, lat: 39.915754, count: 47 },
  // { lng: 116.420193, lat: 39.917061, count: 52 },
  // { lng: 116.422735, lat: 39.915619, count: 100 },
  // { lng: 116.418495, lat: 39.915958, count: 46 },
  // { lng: 116.416292, lat: 39.931166, count: 9 },
  // { lng: 116.419916, lat: 39.924055, count: 8 },
  // { lng: 116.42189, lat: 39.921308, count: 11 },
  // { lng: 116.413765, lat: 39.929376, count: 3 },
  // { lng: 116.418232, lat: 39.920348, count: 50 },
  // { lng: 116.417554, lat: 39.930511, count: 15 },
  // { lng: 116.418568, lat: 39.918161, count: 23 },
  // { lng: 116.413461, lat: 39.926306, count: 3 },
  // { lng: 116.42232, lat: 39.92161, count: 13 },
  // { lng: 116.4174, lat: 39.928616, count: 6 },
  // { lng: 116.424679, lat: 39.915499, count: 21 },
  // { lng: 116.42171, lat: 39.915738, count: 29 },
  // { lng: 116.417836, lat: 39.916998, count: 99 },
  // { lng: 116.420755, lat: 39.928001, count: 10 },
  // { lng: 116.414077, lat: 39.930655, count: 14 },
  // { lng: 116.426092, lat: 39.922995, count: 16 },
  // { lng: 116.41535, lat: 39.931054, count: 15 },
  // { lng: 116.413022, lat: 39.921895, count: 13 },
  // { lng: 116.415551, lat: 39.913373, count: 17 },
  // { lng: 116.421191, lat: 39.926572, count: 1 },
  // { lng: 116.419612, lat: 39.917119, count: 9 },
  // { lng: 116.418237, lat: 39.921337, count: 54 },
  // { lng: 116.423776, lat: 39.921919, count: 26 },
  // { lng: 116.417694, lat: 39.92536, count: 17 },
  // { lng: 116.415377, lat: 39.914137, count: 19 },
  // { lng: 116.417434, lat: 39.914394, count: 43 },
  // { lng: 116.42588, lat: 39.922622, count: 27 },
  // { lng: 116.418345, lat: 39.919467, count: 8 },
  // { lng: 116.426883, lat: 39.917171, count: 3 },
  // { lng: 116.423877, lat: 39.916659, count: 34 },
  // { lng: 116.415712, lat: 39.915613, count: 14 },
  // { lng: 116.419869, lat: 39.931416, count: 12 },
  // { lng: 116.416956, lat: 39.925377, count: 11 },
  // { lng: 116.42066, lat: 39.925017, count: 38 },
  // { lng: 116.416244, lat: 39.920215, count: 91 },
  // { lng: 116.41929, lat: 39.915908, count: 54 },
  // { lng: 116.422116, lat: 39.919658, count: 21 },
  // { lng: 116.4183, lat: 39.925015, count: 15 },
  // { lng: 116.421969, lat: 39.913527, count: 3 },
  // { lng: 116.422936, lat: 39.921854, count: 24 },
  // { lng: 116.41905, lat: 39.929217, count: 12 },
  // { lng: 116.424579, lat: 39.914987, count: 57 },
  // { lng: 116.42076, lat: 39.915251, count: 70 },
  // { lng: 116.425867, lat: 39.918989, count: 8 }
]);
const points = ref([
  { lng: 116.432045, lat: 39.910683 },
  { lng: 120.129721, lat: 30.314429 },
  { lng: 121.491121, lat: 25.127053 }
]);

const addMarker = () => {
  const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
  markers.value.push(position)
};

const updateMarker = ({ point }, marker) => {
  marker.lng = point.lng
  marker.lat = point.lat
};
const removeMarker = () => {
  markers.value.pop()
};
const changeStyles = () => {
  customStyles.value = !customStyles.value
  const EXAMPLE_URL = "http://api.map.baidu.com/library/MarkerClusterer/1.2/examples/"
  const stylesArr = [{
    url: EXAMPLE_URL + 'images/heart30.png',
    size: {
      width: 30,
      height: 26
    },
    opt_anchor: [16, 0],
    textColor: '#ff00ff',
    opt_textSize: 10
  }, {
    url: EXAMPLE_URL + 'images/heart40.png',
    size: {
      width: 40,
      height: 35
    },
    opt_anchor: [40, 35],
    textColor: '#ff0000',
    opt_textSize: 12
  }, {
    url: EXAMPLE_URL + 'images/heart50.png',
    size: {
      width: 50,
      height: 44
    },
    opt_anchor: [32, 0],
    textColor: 'white',
    opt_textSize: 14
  }]
  styles.value = customStyles.value ? stylesArr : []
};

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

const addPoint = () => {
  points.value.push({
    lng: 116.404,
    lat: 39.915
  })
};
const update = (e) => {
  points.value = e.target.cornerPoints
};

const getMarkers = () => {
  for (let i = 0; i < 10; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    markers.value.push(position);
  }
};

const handleChange = () => {
  heatMax.value = 90;
  data.value = [
    { lng: 116.4183, lat: 39.925015, count: 15 },
    { lng: 116.421969, lat: 39.913527, count: 3 },
    { lng: 116.422936, lat: 39.921854, count: 24 },
    { lng: 116.41905, lat: 39.929217, count: 12 },
    { lng: 116.424579, lat: 39.914987, count: 57 },
    { lng: 116.42076, lat: 39.915251, count: 70 },
    { lng: 116.425867, lat: 39.918989, count: 8 }
  ];
};

getMarkers();
</script>