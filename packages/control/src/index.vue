<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 09:48:52
 * @LastEditTime: 2023-11-24 15:10:35
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\control\src\index.vue
-->
<template>
  <div ref="contain">
    <slot></slot>
  </div>
</template>

<script lang='ts' setup>
import { ref, watch, withDefaults } from 'vue';
import { getControl } from './control';
import { useMap } from '@vue-baidu-map-3x/map';
import { getSize, ControlInstance, useCleanup, equalsFace } from '@vue-baidu-map-3x/utils';
import { Control } from '../typing';
import { methods } from './helper';

defineOptions({
  name: 'BmControl',
});

const props = withDefaults(defineProps<Control>(), {
  offset: { width: 0, height: 0 } as any,
  anchor: 'BMAP_ANCHOR_TOP_LEFT',
});

const contain = ref(null);
const { BMap, map } = useMap();
const originInstance = ref<ControlInstance>();

const { removeInstance } = useCleanup(originInstance, map);

watch([contain, map], (_, __, onCleanup) => {
  if (contain.value && map?.value) {
    const CustomControl = getControl(BMap?.value?.Control, contain.value);
    originInstance.value = new CustomControl({
      anchor: props.anchor,
      offset: getSize(props.offset?.width as any, props.offset?.height as any),
    }) as any as ControlInstance;
    map?.value?.addControl?.(originInstance.value);
    onCleanup(removeInstance);
  }
}, {
  immediate: true,
});

watch(() => ({ ...props }), (newProps, preProps) => {
  if (originInstance?.value) {
    methods.forEach((method, key) => {
      if (!equalsFace(newProps?.[key], preProps?.[key])) {
        originInstance?.value?.[method]?.(window[newProps?.[key]]);
      }
    });
  }
}, {
  deep: true,
});

defineExpose({
  originInstance
});
</script>