/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-30 16:14:10
 * @LastEditTime: 2025-09-12 09:20:23
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/utils/src/hooks/useControl.ts
 */

import { onUnmounted, ref, watch } from 'vue';
import useCleanup from './useCleanup';
import { deleteEmptyKey, equalsFace } from '..';
import { getSize } from '../create';
import useMap from './useMap';
import { ComponentTypeEnum, ControlsEnum } from '../constant';
import { controlMethodMap } from '../methods';
import useEvent from './useEvent';

export type UseControlParamsType = {
  props;
  emit?: (event: any, ...args: any[]) => void;
  events?: string[];
  controlName: ControlsEnum;
  getElseParams?: () => Record<string, any>;
  getPrefixParams?: () => any;
  type?: ComponentTypeEnum;
};

const typeAddMethodMap = {
  [ComponentTypeEnum.Control]: 'addControl',
  [ComponentTypeEnum.Overlay]: 'addOverlay',
  [ComponentTypeEnum.TileLayer]: 'addTileLayer',
  [ComponentTypeEnum.ContextMenu]: 'addContextMenu',
};

const useControl = <ControlInstanceType>(params: UseControlParamsType) => {
  const { props, emit, events, controlName, getPrefixParams, getElseParams, type = ComponentTypeEnum.Control } = params;

  const { BMap, map } = useMap();
  const originInstance = ref<ControlInstanceType>();
  const { removeInstance } = useCleanup(originInstance, map, { type });

  useEvent(originInstance, emit, events);

  const prefixParams = ref();

  watch(() => props, () => {
    if (type != ComponentTypeEnum.Control && !prefixParams.value) {
      prefixParams.value = getPrefixParams?.();
    }
  }, {
    immediate: true,
  });

  // 监听map和prefixParams参数
  watch([map, prefixParams], (_, __, onCleanup) => {
    if (map?.value) {
      const Control = BMap?.value?.[controlName];
      let controlInstance;
      if (type == ComponentTypeEnum.Control) {
        controlInstance = new Control(deleteEmptyKey({
          anchor: window[props?.anchor],
          offset: props?.offset && getSize(props.offset?.width, props.offset?.height),
          ...getElseParams?.()
        }));
      } else {
        if (prefixParams.value) {// 有prefixParams参数才创建实例
          controlInstance = new Control(prefixParams.value, deleteEmptyKey(getElseParams?.()));
        }
      }
      if (controlInstance) {
        map?.value?.[typeAddMethodMap[type]]?.(controlInstance);
        originInstance.value = controlInstance;
        if (events?.includes?.('load')) {
          emit?.('load', controlInstance);
        }
      }
      onCleanup(removeInstance);
    }
  }, {
    immediate: true,
  });

  watch(() => props, (newProps, preProps) => {
    if (originInstance?.value) {
      controlMethodMap.get(controlName)?.forEach?.(({ key, method, format, customMethod }) => {
        if (customMethod) {
          customMethod?.(originInstance, newProps?.[key], preProps?.[key]);
        } else {
          if (!equalsFace(newProps?.[key], preProps?.[key])) {
            if (Array.isArray(method)) {
              originInstance?.value?.[
                newProps?.[key] ? method[0] : method[1]
              ]?.(format ? format(newProps?.[key]) : newProps?.[key]);
            } else {
              originInstance?.value?.[
                method
              ]?.(format ? format(newProps?.[key]) : newProps?.[key]);
            }
          }
        }
      });
    }
  }, {
    deep: true,
  });

  onUnmounted(() => {
    if (events?.includes?.('unLoad')) {
      emit?.('unLoad');
    }
  });

  return {
    originInstance
  }
};

export default useControl;