/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Monday, April 11th 2022, 4:50:30 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
      <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
        <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script setup>
</script>