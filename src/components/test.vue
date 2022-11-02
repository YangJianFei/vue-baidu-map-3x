<!-- vue 3 引入百度api -->
<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="14" :defaultAnimation="false" @animationed="handleAnimationed">
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" animation="BMAP_ANIMATION_BOUNCE" :labelStyle="{color: 'red', fontSize : '24px'}"
        :offset="{width: -35, height: 30}" />
    </bm-marker>
  </baidu-map>
</template>

<script setup>
const handleAnimationed = (data) => {
  console.log(data);

}
</script>
