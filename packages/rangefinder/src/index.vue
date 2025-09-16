<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-12 17:01:52
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/rangefinder/src/index.vue
-->
<template>
  <slot>
    <button @click="open">开启测距</button>
  </slot>
</template>

<script lang="ts" setup>
import { onUnmounted, ref, watch } from "vue";
import { useMap, deleteEmptyKey, getIcon, useEvent } from "@vue-baidu-map-3x/utils";
import type {
  BaseEvents,
  Rangefinder,
  RangefinderInstance,
} from "@vue-baidu-map-3x/utils";
import DistanceTool from "bmaplib.distancetool";
import { events } from "./helper";
import type { Events } from "./helper";

window.global = window.global || window;

defineOptions({
  name: "BmRangefinder",
});

const {
  followText,
  unit,
  lineColor,
  lineStroke = 2,
  opacity,
  lineStyle,
  secIcon,
  closeIcon,
  cursor,
} = defineProps<Rangefinder>();

const emit = defineEmits<Events & BaseEvents<RangefinderInstance>>();

const { map } = useMap();

const originInstance = ref<RangefinderInstance>();

useEvent(originInstance, emit, events);

const open = () => {
  originInstance.value?.open?.();
};

watch([map], () => {
  if (map?.value) {
    originInstance.value = new DistanceTool(
      map,
      deleteEmptyKey({
        followText,
        unit,
        lineColor,
        lineStroke,
        opacity,
        lineStyle,
        secIcon: secIcon && getIcon(secIcon),
        closeIcon: closeIcon && getIcon(closeIcon),
        cursor,
      })
    );
    emit("load", originInstance.value);
  }
});

onUnmounted(() => {
  originInstance.value?.close?.();
  emit("unLoad");
});

defineExpose({
  originInstance,
  open,
});
</script>
