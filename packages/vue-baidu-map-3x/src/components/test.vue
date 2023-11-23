<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2023-11-23 17:34:41
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\vue-baidu-map-3x\src\components\test.vue
-->
<template>
  <baidu-map class="map" :center="{ lng: 116.404, lat: 39.915 }" :zoom="15">
  </baidu-map>
</template>

<script lang='ts' setup>
import { watch, ref, withDefaults, provide } from 'vue';

const props = withDefaults(defineProps<{
}>(), {
});

const name = ref('sss');

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