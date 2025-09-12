<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-12 10:31:00
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/rangefinder/src/index.vue
-->
<template>
  <slot>
    <button @click="openDistanceTool">开启测距</button>
  </slot>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue";
import { useMap } from "@vue-baidu-map-3x/utils";
import type { BaseEvents, RangefinderInstance } from "@vue-baidu-map-3x/utils";
import DistanceTool from "bmaplib.distancetool";

defineOptions({
  name: "BmRangefinder",
});

const emit = defineEmits<BaseEvents<RangefinderInstance>>();

const originInstance = ref<RangefinderInstance>();

const { map } = useMap();

const openDistanceTool = () => {
  originInstance.value?.open?.();
};

watch([map], () => {
  if (map?.value) {
    originInstance.value = new DistanceTool(map, { lineStroke: 2 });
    emit("load", originInstance.value);
  }
});

onUnmounted(() => {
  originInstance.value?.close?.();
  emit("unLoad");
});

defineExpose({
  originInstance,
});
</script>
