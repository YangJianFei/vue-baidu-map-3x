# 点聚合

`BmlMarkerClusterer` 能够聚合它包含的所有 `BmMarker` 组件。

## 属性

|属性名|类型 |默认值|描述|
|------|-----|------|----|
|gridSize|Number||网格大小|
|maxZoom|Number||聚合的最大缩放级别|
|minClusterSize|Number||单个聚合的最小数量|
|styles|Array[`{url, size, opt_anchor, textColor, opt_textSize}`]|[]|聚合的样式风格集合|
|averageCenter|Boolean|false|单个聚合的落脚点是否是聚合内所有标记的平均中心|

## 示例

### 聚合动态添加的点坐标

<div>
  <baidu-map class="map" center="中国" :scroll-wheel-zoom="true" :double-click-zoom="true">
    <component v-if="bmlMarker" :is="bmlMarker" :averageCenter="true" :styles="styles">
      <bm-marker v-for="marker of markers" :key="marker" :position="{lng: marker.lng, lat: marker.lat}" @dragend="updateMarker($event, marker)" :dragging="true"></bm-marker>
    </component>
  </baidu-map>
  <button class="md-raised md-primary" @click="addMarker">添加一个随机点</button>
  <button class="md-raised md-primary" @click="removeMarker">删除上一个点</button>
  <button class="md-raised md-primary" @click="changeStyles">更换皮肤</button>
</div>

<script setup>
import { ref, onMounted } from 'vue';

const markers = ref([]);
const styles = ref([]);
const customStyles = ref(false);
const bmlMarker = ref(null);

onMounted(()=>{
  import('vue-baidu-map-3x/extra/MarkerClusterer.vue').then(module=>{
    bmlMarker.value = module.default;
  });
});

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

const getMarkers = () => {
  for (let i = 0; i < 10; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    markers.value.push(position);
  }
};

getMarkers();
</script>

```html
<template>
  <div>
    <baidu-map class="map" center="中国" :scroll-wheel-zoom="true" :double-click-zoom="true">
      <bml-marker-clusterer :averageCenter="true" :styles="styles">
        <bm-marker v-for="marker of markers" :key="marker" :position="{lng: marker.lng, lat: marker.lat}" @dragend="updateMarker($event, marker)" :dragging="true"></bm-marker>
      </bml-marker-clusterer>
    </baidu-map>
    <button class="md-raised md-primary" @click="addMarker">添加一个随机点</button>
    <button class="md-raised md-primary" @click="removeMarker">删除上一个点</button>
    <button class="md-raised md-primary" @click="changeStyles">更换皮肤</button>
  </div>
</template>


<script setup>
import { ref } from 'vue';


const markers = ref([]);
const styles = ref([]);
const customStyles = ref(false);

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

const getMarkers = () => {
  for (let i = 0; i < 10; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    markers.value.push(position);
  }
};

getMarkers();
</script>
```