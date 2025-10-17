<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-28 17:33:40
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/label/src/index.vue
-->
<template></template>

<script lang="ts" setup>
import {
  baseEvents,
  ComponentTypeEnum,
  ControlsEnum,
  getPoint,
  getSize,
  MarkerKey,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, Label, LabelInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";
import { inject, watch, watchEffect } from "vue";

defineOptions({
  name: "BmLabel",
});

const props = defineProps<Label>();

const emit = defineEmits<Events & BaseEvents<LabelInstance>>();

const markerInstance = inject(MarkerKey, undefined);

const { originInstance } = useControl<LabelInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.Label,
  getPrefixParams: () => [props.content],
  getElseParams: () => {
    return {
      offset: props.offset && getSize(props.offset?.width, props.offset?.height),
      position: props.position && getPoint(props.position.lng, props.position.lat),
      enableMassClear: props.enableMassClear,
    };
  },
  methods,
  onInstanceInit(instance) {
    if (props.styles) {
      instance.setStyle(props.styles);
    }
    if (props.title) {
      instance.setTitle(props.title);
    }
    if (props.zIndex) {
      instance.setZIndex(props.zIndex);
    }
  },
});

watchEffect(() => {
  if (markerInstance?.value && originInstance.value) {
    markerInstance?.value?.setLabel?.(originInstance.value);
  }
});

defineExpose({
  originInstance,
});
</script>
