<template>
  <div>
    <baidu-map class="map" style="height:500px" @ready="addPoints" :center="{lng: 105.000, lat: 38.000}" :zoom="4">
      <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
    </baidu-map>
    <Else v-model="ss" />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, reactive } from 'vue';
import Else from './else.vue'
import { elError } from './symbol.js'

const points = ref([]);
const ss = ref('');

const clickHandler = (e) => {
  alert(`单击点的坐标为：${e.point.lng}, ${e.point.lat}`);
};
const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 }
    pointAll.push(position)
  }
  points.value = pointAll
};

provide(
  elError,
  reactive({
    addPoints
  })
);
</script>