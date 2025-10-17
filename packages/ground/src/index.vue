<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-26 11:05:36
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/point-collection/src/index.vue
-->
<template></template>

<script lang="ts" setup>
import {
  baseEvents,
  ComponentTypeEnum,
  ControlsEnum,
  getBounds,
  getPoint,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type {
  BaseEvents,
  GroundOverlay,
  GroundOverlayInstance,
} from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";

defineOptions({
  name: "BmGround",
});

const props = defineProps<GroundOverlay>();

const emit = defineEmits<Events & BaseEvents<GroundOverlayInstance>>();

const { originInstance } = useControl<GroundOverlayInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.GroundOverlay,
  getPrefixParams: () => [getBounds(props.bounds?.sw, props.bounds?.ne)],
  getElseParams: () => {
    return {
      opacity: props.opacity,
      imageURL: props.imageURL,
      displayOnMinLevel: props.displayOnMinLevel,
      displayOnMaxLevel: props.displayOnMaxLevel,
    };
  },
  methods,
});

defineExpose({
  originInstance,
});
</script>
