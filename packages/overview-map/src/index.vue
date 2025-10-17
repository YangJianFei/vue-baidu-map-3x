<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 14:14:16
 * @LastEditTime: 2025-09-11 18:10:58
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/overview-map/src/index.vue
-->
<template></template>

<script lang="ts" setup>
import {} from "vue";
import {
  ControlsEnum,
  baseEvents,
  getSize,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type {
  BaseEvents,
  OverivewMap,
  OverivewMapInstance,
} from "@vue-baidu-map-3x/utils";
import { events } from "./helper";
import type { Events } from "./helper";

defineOptions({
  name: "BmOverviewMap",
});

const props = withDefaults(defineProps<OverivewMap>(), {
  anchor: "BMAP_ANCHOR_BOTTOM_RIGHT",
});

const emit = defineEmits<Events & BaseEvents<OverivewMapInstance>>();

const { originInstance } = useControl<OverivewMapInstance>({
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.OverviewMapControl,
  getElseParams: () => {
    return {
      size: props.offset && getSize(props.offset?.width, props.offset?.height),
      isOpen: props.isOpen,
    };
  },
});

defineExpose({
  originInstance,
});
</script>
