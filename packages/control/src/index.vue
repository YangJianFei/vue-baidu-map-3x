<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 09:48:52
 * @LastEditTime: 2023-11-26 10:29:04
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
import { getSize, useCleanup, equalsFace, controlMethods } from '@vue-baidu-map-3x/utils';
import type { Control, ControlInstance } from '@vue-baidu-map-3x/utils';

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
    const instance = new CustomControl({
      anchor: props.anchor,
      offset: getSize(props.offset?.width as any, props.offset?.height as any),
    }) as any as ControlInstance;
    map?.value?.addControl?.(instance);
    originInstance.value = instance;
    onCleanup(removeInstance);
  }
}, {
  immediate: true,
});

watch(() => ({ ...props }), (newProps, preProps) => {
  if (originInstance?.value) {
    controlMethods.forEach((method, key) => {
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