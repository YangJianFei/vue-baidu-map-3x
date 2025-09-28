<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-28 13:55:25
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/circle/src/index.vue
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
import type { BaseEvents, Circle, CircleInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events, methods } from "./helper";
import { computed, ref, watch } from "vue";

defineOptions({
  name: "BmCircle",
});

const props = defineProps<Circle>();

const emit = defineEmits<Events & BaseEvents>();

const editingKey = ref();
const isEditing = ref(false);

const { originInstance } = useControl<CircleInstance>({
  type: ComponentTypeEnum.Overlay,
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.Circle,
  getPrefixParams: () => [getPoint(props.center?.lng, props.center?.lat), props.radius],
  getElseParams: () => {
    return {
      strokeColor: props.strokeColor,
      strokeWeight: props.strokeWeight,
      strokeOpacity: props.strokeOpacity,
      strokeStyle: props.strokeStyle,
      enableMassClear: props.enableMassClear,
      enableClicking: props.enableClicking,
      enableEditing: props.enableEditing,
      fillColor: props.fillColor,
      fillOpacity: props.fillOpacity,
    };
  },
  methods,
  // onInstanceInit: (instance) => {
  //   if (instance) {
  //     const stack: string[] = [];
  //     instance?.enableEditing();
  //     setTimeout(() => {
  //       for (const key in instance) {
  //         if (instance[key] && instance[key].length === 2) {
  //           stack.push(key);
  //         }
  //       }
  //       instance?.disableEditing();
  //       for (const key in instance) {
  //         if (instance[key] && instance[key].length === 0 && ~stack.indexOf(key)) {
  //           editingKey.value = key;
  //         }
  //       }
  //     }, 0);
  //   }
  //   setTimeout(() => {
  //     if (props.enableEditing) {
  //       enableEditing();
  //     } else {
  //       instance.disableEditing();
  //     }
  //   }, 10);
  // },
});

// const dragStartHandler = () => {
//   isEditing.value = true;
// };

// const dragEndHandler = () => {
//   isEditing.value = false;
//   bindEditingNodeEvents();
// };

// const bindEditingNodeEvents = () => {
//   if (originInstance.value?.[editingKey.value]) {
//     originInstance.value[editingKey.value].forEach(($node) => {
//       $node.addEventListener("dragstart", dragStartHandler);
//       $node.addEventListener("dragend", dragEndHandler);
//     });
//   }
// };

// const enableEditing = () => {
//   originInstance.value?.enableEditing();
//   bindEditingNodeEvents();
// };

// watch(
//   () => props.center.lng,
//   () => {
//     if (originInstance.value && props.center) {
//       if (!isEditing.value) {
//         originInstance.value.disableEditing();
//         originInstance.value.setCenter(getPoint(props.center.lng, props.center.lat));
//         props.enableEditing && enableEditing();
//       }
//     }
//   }
// );

// watch(
//   () => props.center.lat,
//   () => {
//     if (originInstance.value && props.center) {
//       if (!isEditing.value) {
//         originInstance.value.disableEditing();
//         originInstance.value.setCenter(getPoint(props.center.lng, props.center.lat));
//         props.enableEditing && enableEditing();
//       }
//     }
//   }
// );

// watch(
//   () => props.radius,
//   () => {
//     if (originInstance.value && props.radius) {
//       if (!isEditing.value) {
//         originInstance.value.disableEditing();
//         originInstance.value.setRadius(props.radius);
//         props.enableEditing && enableEditing();
//       }
//     }
//   }
// );

// watch(
//   () => props.enableEditing,
//   () => {
//     if (originInstance.value) {
//       if (props.enableEditing) {
//         enableEditing();
//       } else {
//         originInstance.value.disableEditing();
//       }
//     }
//   }
// );

defineExpose({
  originInstance,
});
</script>
