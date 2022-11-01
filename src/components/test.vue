<!-- vue 3 引入百度api -->
<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14" :defaultAnimation="false" @animationed="handleAnimationed">
  </baidu-map>
</template>

<script setup>
const handleAnimationed = (data) => {
  console.log(data);

}
</script>
