<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-26 10:19:19
 * @LastEditTime: 2023-11-26 15:33:43
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\scale\src\index.vue
-->
<template>
  <div></div>
</template>

<script lang='ts' setup>
import { ref, watch, withDefaults } from 'vue';
import { controlMethods, equalsFace, getSize, useCleanup, deleteEmptyKey } from '@vue-baidu-map-3x/utils';
import type { Control, ScaleInstance } from '@vue-baidu-map-3x/utils';
import { useMap } from '@vue-baidu-map-3x/map';

defineOptions({
  name: 'BmScale',
});

const props = withDefaults(defineProps<Control>(), {
  anchor: 'BMAP_ANCHOR_BOTTOM_LEFT',
});

const { BMap, map } = useMap();
const originInstance = ref<ScaleInstance>();

const { removeInstance } = useCleanup(originInstance, map);

watch([map], (_, __, onCleanup) => {
  if (map?.value) {
    const ScaleControl = BMap?.value?.ScaleControl;
    originInstance.value = new ScaleControl(deleteEmptyKey({
      anchor: window[props?.anchor],
      offset: props.offset && getSize(props.offset?.width, props.offset?.height),
    }));
    map?.value?.addControl?.(originInstance.value);
    onCleanup(removeInstance);
  }
}, {
  immediate: true,
});

watch(() => props, (newProps, preProps) => {
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
</script>