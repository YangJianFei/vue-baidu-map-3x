<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2023-12-22 18:06:24
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\copyright\src\index.vue
-->
<template></template>

<script lang="ts" setup>
import { watch } from "vue";
import {
  baseEvents,
  ControlsEnum,
  controlMethodMap,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, Copyright, CopyrightInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events } from "./helper";

defineOptions({
  name: "BmCopyright",
});

const props = withDefaults(defineProps<Copyright>(), {
  anchor: "BMAP_ANCHOR_BOTTOM_RIGHT",
});

const emit = defineEmits<Events & BaseEvents<CopyrightInstance>>();

const { originInstance } = useControl<CopyrightInstance>({
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.CopyrightControl,
});

watch(
  [originInstance],
  () => {
    if (originInstance?.value) {
      controlMethodMap
        .get(ControlsEnum.CopyrightControl)
        ?.find?.((item) => item.key == "copyright")
        ?.customMethod?.(originInstance, props.copyrights);
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
