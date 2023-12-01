<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-12-01 14:06:17
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
    <bm-scale></bm-scale>
    <bm-navigation :offset="{ height: 40 }" />
    <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" />
  </baidu-map>
</template>

<script lang='ts' setup>
import { watch, ref, withDefaults, provide } from 'vue';
import { Control } from '@vue-baidu-map-3x/utils';

const wa: Control = {};
console.log(wa);

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