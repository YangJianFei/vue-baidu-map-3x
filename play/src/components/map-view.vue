<template>
  <baidu-map class="map" style="display: flex; flex-direction: column" center="北京" :zoom="zoom">
    <p style="padding: 0 10px;">bm-view不可用</p>
    <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
  </baidu-map>
</template>

<script setup>
import { ref } from 'vue';

const zoom = ref(12);
</script>