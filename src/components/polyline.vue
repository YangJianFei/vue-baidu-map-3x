<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14" @mousemove="syncPolyline" @click="paintPolyline"
      @rightclick="newPolyline">
      <bm-control>
        <button @click.stop="toggle">{{ polyline.editing ? '停止绘制' : '开始绘制' }}</button>
      </bm-control>
      <bm-polyline :path="path" v-for="path of polyline.paths" :key="path"></bm-polyline>
    </baidu-map>
  </div>
</template>


<script setup>
import { ref, toRef } from 'vue';

const polyline = ref({
  editing: false,
  paths: []
});

const toggle = (name) => {
  polyline.value.editing = !polyline.value.editing;
};

const syncPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }

  if (!polyline.value.paths.length) {
    return
  }
  const path = polyline.value.paths[polyline.value.paths.length - 1]
  if (!path.length) {
    return
  }
  if (path.length === 1) {
    polyline.value.paths[polyline.value.paths.length - 1].push(e.point)
  }
  polyline.value.paths[polyline.value.paths.length - 1][path.length - 1] = e.point;
}

const newPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }
  if (!polyline.value.paths.length) {
    polyline.value.paths.push([])
  }
  const path = polyline.value.paths[polyline.value.paths.length - 1]
  path.pop()
  if (path.length) {
    polyline.value.paths.push([])
  }
}

const paintPolyline = (e) => {
  if (!polyline.value.editing) {
    return
  }
  !polyline.value.paths.length && polyline.value.paths.push([])
  polyline.value.paths[polyline.value.paths.length - 1].push(e.point)
}
</script>

<style>
</style>
