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
import { ref, watch, withDefaults, onUnmounted } from 'vue';
import { getControl } from './control';
import { useMap, getSize, useCleanup, equalsFace, controlMethods, deleteEmptyKey } from '@vue-baidu-map-3x/utils';
import type { Control, ControlInstance, BaseEvents } from '@vue-baidu-map-3x/utils';

defineOptions({
  name: 'BmControl',
});

const props = withDefaults(defineProps<Control>(), {
  offset: () => ({ width: 0, height: 0 }),
  anchor: 'BMAP_ANCHOR_TOP_LEFT',
});

const emit = defineEmits<BaseEvents<ControlInstance>>();

const contain = ref(null);
const { BMap, map } = useMap();
const originInstance = ref<ControlInstance>();

const { removeInstance } = useCleanup(originInstance, map);

watch([contain, map], (_, __, onCleanup) => {
  if (contain.value && map?.value) {
    const CustomControl = getControl(BMap?.value?.Control, contain.value);
    const instance = new CustomControl(deleteEmptyKey({
      anchor: props.anchor,
      offset: getSize(props.offset?.width, props.offset?.height),
    })) as any as ControlInstance;
    map?.value?.addControl?.(instance);
    originInstance.value = instance;
    emit('load', instance);
    onCleanup(removeInstance);
  }
}, {
  immediate: true,
});

watch(() => ({ ...props }), (newProps, preProps) => {
  if (originInstance?.value) {
    controlMethods.forEach((method, key) => {
      if (!equalsFace(newProps?.[key], preProps?.[key])) {
        if (key == 'anchor') {
          originInstance?.value?.[method]?.(window[newProps?.[key]]);
        } else if (key == 'offset') {
          originInstance?.value?.[method]?.(
            getSize(newProps.offset?.width, newProps.offset?.height)
          );
        }
      }
    });
  }
}, {
  deep: true,
});

onUnmounted(() => {
  emit('unLoad');
});

defineExpose({
  originInstance
});
</script>