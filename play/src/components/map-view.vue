/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 6th 2022, 5:59:26 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
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