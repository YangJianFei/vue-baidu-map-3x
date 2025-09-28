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
import { watch } from "vue";
import {
  baseEvents,
  ComponentTypeEnum,
  ControlsEnum,
  getIcon,
  getLabel,
  getPoint,
  getSize,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type {
  BaseEvents,
  PointCollection,
  PointCollectionInstance,
} from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";

defineOptions({
  name: "BmPointCollection",
});

const props = defineProps<PointCollection>();

const emit = defineEmits<Events & BaseEvents>();

const { originInstance } = useControl<PointCollectionInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.PointCollection,
  getPrefixParams: () => [
    props.points?.map((item) => getPoint(item.lng, item.lat)) ?? [],
  ],
  getElseParams: () => {
    return {
      shape: props.shape,
      color: props.color,
      size: props.size,
    };
  },
  methods,
});

defineExpose({
  originInstance,
});
</script>
