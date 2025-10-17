<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-30 09:15:12
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/info-window/src/index.vue
-->
<template>
  <div ref="content" v-show="show">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {
  baseEvents,
  ComponentTypeEnum,
  ControlsEnum,
  getPoint,
  getSize,
  MarkerKey,
  useControl,
  useMap,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, InfoWindow, InfoWindowInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";
import { inject, onMounted, ref, useTemplateRef, watch, watchEffect } from "vue";

defineOptions({
  name: "BmInfoWindow",
});

const props = defineProps<InfoWindow>();

const emit = defineEmits<Events & BaseEvents<InfoWindowInstance>>();

const markerInstance = inject(MarkerKey, undefined);
const { map } = useMap();

const $content = useTemplateRef("content");
let observer: MutationObserver;

const originInstance = ref<InfoWindowInstance>();

const bindObserver = () => {
  const MutationObserver = window.MutationObserver;
  if (!MutationObserver) {
    return;
  }
  observer = new MutationObserver((mutations) => {
    originInstance.value?.redraw?.();
  });
  if ($content.value) {
    observer.observe($content.value, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
};

watch(
  [
    map,
    markerInstance,
    originInstance,
    () => [props.position?.lng, props.position?.lat, props.show],
  ],
  () => {
    if (map?.value || markerInstance?.value) {
      if (props.show) {
        const position = props.position || markerInstance?.value?.getPosition?.();
        if (position && originInstance.value) {
          (markerInstance?.value || map?.value)?.openInfoWindow?.(
            originInstance.value,
            getPoint(position.lng, position.lat)
          );
        }
      } else {
        (map?.value || markerInstance?.value)?.closeInfoWindow?.();
      }
    }
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  useControl<InfoWindowInstance>({
    type: ComponentTypeEnum.Overlay,
    props,
    emit,
    events: [...events, ...baseEvents],
    controlName: ControlsEnum.InfoWindow,
    getPrefixParams: () => [$content.value],
    getElseParams: () => {
      return {
        width: props.width,
        height: props.height,
        maxWidth: props.maxWidth,
        offset: props.offset && getSize(props.offset?.width, props.offset?.height),
        title: props.title,
        enableAutoPan: props.enableAutoPan,
        enableCloseOnClick: props.enableCloseOnClick,
        enableMessage: props.enableMessage,
        message: props.message,
      };
    },
    methods,
    onInstanceInit(instance) {
      originInstance.value = instance;
      if (props.maximize) {
        instance.enableMaximize?.();
      } else {
        instance.disableMaximize?.();
      }
      instance.redraw?.();
      [].forEach.call($content.value?.querySelectorAll("img"), ($img: any) => {
        $img.onload = () => instance.redraw?.();
      });
      bindObserver();
    },
  });
});

defineExpose({
  originInstance,
});
</script>
