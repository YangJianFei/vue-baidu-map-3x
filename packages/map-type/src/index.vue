<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 11:43:48
 * @LastEditTime: 2023-12-01 11:44:02
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map-type\src\index.vue
-->
<template></template>

<script lang='ts' setup>
import { } from 'vue';
import { ControlsEnum, baseEvents, isEmpty, useControl } from '@vue-baidu-map-3x/utils';
import type { BaseEvents, MapType, MapTypeInstance } from '@vue-baidu-map-3x/utils';

defineOptions({
  name: 'BmMapType',
});

const props = withDefaults(defineProps<MapType>(), {
  anchor: 'BMAP_ANCHOR_TOP_RIGHT',
});

const emit = defineEmits<BaseEvents<MapTypeInstance>>();

const { originInstance } = useControl<MapTypeInstance>({
  props,
  emit,
  events: baseEvents,
  controlName: ControlsEnum.MapTypeControl,
  getElseParams: () => {
    const mapTypes: any[] = [];
    props?.mapTypes?.forEach?.(item => {
      const result = window[item];
      if (!isEmpty(result)) {
        mapTypes.push(result);
      }
    });
    return {
      type: window[props?.type ?? ''],
      mapTypes: mapTypes?.length ? mapTypes : undefined,
    }
  }
});

defineExpose({
  originInstance
});

</script>