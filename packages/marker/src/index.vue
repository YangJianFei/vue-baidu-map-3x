<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-11 18:07:43
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/city-list/src/index.vue
-->
<template>
  <slot></slot>
</template>

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
import type { BaseEvents, Marker, MarkerInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events } from "./helper";

defineOptions({
  name: "BmMarker",
});

const props = defineProps<Marker>();

const emit = defineEmits<Events & BaseEvents>();

const { originInstance } = useControl<MarkerInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.Marker,
  getPrefixParams: () =>
    props.position && getPoint(props.position.lng, props.position.lat),
  getElseParams: () => {
    return {
      offset: props.offset && getSize(props.offset?.width, props.offset?.height),
      icon: props.icon && getIcon(props.icon),
      enableMassClear: props.enableMassClear,
      enableDragging: props.enableDragging,
      enableClicking: props.enableClicking,
      raiseOnDrag: props.raiseOnDrag,
      draggingCursor: props.draggingCursor,
      rotation: props.rotation,
      shadow: props.shadow && getIcon(props.shadow),
      title: props.title,
    };
  },
});

watch(
  originInstance,
  () => {
    if (originInstance.value && props.label) {
      originInstance.value.setLabel?.(getLabel(props.label));
    }
  },
  {
    immediate: true,
  }
);

defineExpose({
  originInstance,
});
</script>
