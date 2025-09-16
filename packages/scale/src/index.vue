<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-26 10:19:19
 * @LastEditTime: 2025-09-12 16:49:02
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/scale/src/index.vue
-->
<template></template>

<script lang="ts" setup>
import { withDefaults } from "vue";
import type { BaseEvents, Scale, ScaleInstance } from "@vue-baidu-map-3x/utils";
import { useControl, ControlsEnum, baseEvents } from "@vue-baidu-map-3x/utils";

defineOptions({
  name: "BmScale",
});

const props = withDefaults(defineProps<Scale>(), {
  anchor: "BMAP_ANCHOR_BOTTOM_LEFT",
});

const emit = defineEmits<BaseEvents<ScaleInstance>>();

const { originInstance } = useControl<ScaleInstance>({
  props,
  emit,
  events: baseEvents,
  controlName: ControlsEnum.ScaleControl,
});

defineExpose({
  originInstance,
});
</script>
