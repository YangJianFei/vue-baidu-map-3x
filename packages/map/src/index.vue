<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 17:09:17
 * @LastEditTime: 2025-09-26 10:48:21
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/map/src/index.vue
-->
<template>
  <ApiLoader>
    <div :class="$attrs.class" :style="($attrs.style as any)">
      <div ref="contain" style="height: 100%" />
      <slot></slot>
    </div>
  </ApiLoader>
</template>

<script lang="ts" setup>
import { ref, onUnmounted, watch, provide } from "vue";
import type { MapInstance } from "@vue-baidu-map-3x/utils";
import { Map } from "../typing";
import ApiLoader, { getBMap, useBMap } from "@vue-baidu-map-3x/api-loader";
import {
  useEvent,
  equalsFace,
  EventBus,
  BdMapKey,
  getMapMethod,
} from "@vue-baidu-map-3x/utils";
import { methodsMap, events, getCenterPoint } from "./helper";
import type { Events, CustomEvents } from "./helper";

defineOptions({
  inheritAttrs: false,
  name: "BaiduMap",
});

const props = withDefaults(defineProps<Map>(), {
  highResolution: true,
  mapClick: true,
  dragging: true,
  scrollWheelZoom: true,
  doubleClickZoom: true,
  keyboard: true,
  inertialDragging: true,
  continuousZoom: true,
  pinchToZoom: true,
  autoResize: true,
  hasAnimation: true,
  defaultAnimation: true,
  preserveDrawingBuffer: false,
});

const emit = defineEmits<Events & CustomEvents>();

const contain = ref(null);
const map = ref<MapInstance>();

const { BMap } = useBMap();
useEvent(map, emit, events);

provide(BdMapKey, { BMap, map });

watch(
  [map, () => ({ ...props })],
  ([newMap, newProps], [preMap, preProps]) => {
    if (newMap) {
      methodsMap.forEach((methods, key) => {
        if (
          (!equalsFace(newProps?.[key], preProps?.[key]) || !preMap) &&
          newProps?.[key]
        ) {
          if (Array.isArray(methods)) {
            newMap?.[methods[newProps?.[key] ? 0 : 1]]?.();
          } else {
            if (key == "center") {
              newMap?.[methods]?.(getCenterPoint(newProps?.[key]));
            } else if (key == "mapType") {
              newMap?.[methods]?.(window[newProps?.[key] || "BMAP_NORMAL_MAP"]);
            } else if (key == "theme") {
              newMap?.[getMapMethod(methods)]?.({ styleJson: newProps?.[key] });
            } else if (key == "mapStyle") {
              newMap?.[getMapMethod(methods)]?.(newProps?.[key]);
            } else {
              newMap?.[methods]?.(newProps?.[key]);
            }
          }
        }
      });
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  contain,
  () => {
    if (contain?.value) {
      getBMap().then((BMap) => {
        const instance: MapInstance = new BMap.Map(contain.value, {
          enableHighResolution: props.highResolution,
          enableMapClick: props.mapClick,
          preserveDrawingBuffer: props.preserveDrawingBuffer,
        });
        // 必须先调用centerAndZoom才能初始化地图
        instance.centerAndZoom(getCenterPoint(props.center), props.zoom);
        map.value = instance;
        emit("load", { BMap, map: instance });
        emit("init", { BMap, map: instance });
        emit("ready", { BMap, map: instance });
        EventBus.$emit("init", { BMap, map });
        EventBus.$emit("ready", { BMap, map });
      });
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  map?.value?.destroy?.(); // webgl销毁，api？
  emit("unLoad");
});

defineExpose({
  originInstance: map,
  BMap,
});
</script>
