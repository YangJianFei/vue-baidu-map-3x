<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-11 18:07:43
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/city-list/src/index.vue
-->
<template></template>

<script lang="ts" setup>
import { baseEvents, ControlsEnum, useControl } from "@vue-baidu-map-3x/utils";
import type { BaseEvents, CityList, CityListInstance } from "@vue-baidu-map-3x/utils";
import type { Events } from "./helper";
import { events } from "./helper";

defineOptions({
  name: "BmCityList",
});

const props = defineProps<CityList>();

const emit = defineEmits<Events & BaseEvents<CityListInstance>>();

const { originInstance } = useControl<CityListInstance>({
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.CityListControl,
  getElseParams: () => {
    return {
      onChangeBefore: (params) => {
        emit("changeBefore", params);
      },
      onChangeAfter: (params) => {
        emit("changeAfter", params);
      },
      onChangeSuccess: (params) => {
        emit("changeSuccess", params);
      },
    };
  },
});

defineExpose({
  originInstance,
});
</script>
