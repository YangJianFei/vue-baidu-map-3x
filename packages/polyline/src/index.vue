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
  getIconSequence,
  getPoint,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, Polyline, PolylineInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";

defineOptions({
  name: "BmPolyline",
});

const props = defineProps<Polyline>();

const emit = defineEmits<Events & BaseEvents>();

const { originInstance } = useControl<PolylineInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.Polyline,
  getPrefixParams: () => props.points?.map((item) => getPoint(item.lng, item.lat) ?? []),
  getElseParams: () => {
    return {
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      enableMassClear: props.enableMassClear,
      enableEditing: props.enableEditing,
      enableClicking: props.enableClicking,
      icons: props.icons?.map((item) => getIconSequence(item)),
    };
  },
  methods,
});

defineExpose({
  originInstance,
});
</script>
