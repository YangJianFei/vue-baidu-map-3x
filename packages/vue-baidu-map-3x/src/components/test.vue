<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-11-24 15:05:17
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\vue-baidu-map-3x\src\components\test.vue
-->
<template>
  <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="zoom">
    <bm-control :anchor="anthor">
      <button @click="onClick">改变位置</button>
      <button @click="changeZoom">还原</button>
      <button>缩放至最 小</button>
    </bm-control>
  </baidu-map>
</template>

<script lang='ts' setup>
import { watch, ref, withDefaults, provide } from 'vue';

const props = withDefaults(defineProps<{
}>(), {
});

const name = ref('sss');
const anthor = ref();
const zoom = ref(15);

const onClick = () => {
  anthor.value = 'BMAP_ANCHOR_TOP_RIGHT';
};


const changeZoom = () => {
  zoom.value = 10;
};

watch(name, (newName, preName) => {
}, {
  immediate: true,
});

watch(props, (newProps, preProps) => {
}, {
  immediate: true,
  deep: true,
});

provide('message', name);

</script>