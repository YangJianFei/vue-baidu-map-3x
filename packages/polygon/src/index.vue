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
  getPoint,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, Polygon, PolygonInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";

defineOptions({
  name: "BmPolygon",
});

const props = defineProps<Polygon>();

const emit = defineEmits<Events & BaseEvents<PolygonInstance>>();

const { originInstance } = useControl<PolygonInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.Polygon,
  getPrefixParams: () => [
    props.points?.map((item) => getPoint(item.lng, item.lat)) ?? [],
  ],
  getElseParams: () => {
    return {
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      enableMassClear: props.enableMassClear,
      enableEditing: props.enableEditing,
      enableClicking: props.enableClicking,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
    };
  },
  methods,
});

defineExpose({
  originInstance,
});
</script>
