/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-30 16:14:10
 * @LastEditTime: 2023-12-02 10:19:41
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\hooks\useControl.ts
 */

import { ref, watch } from 'vue';
import useCleanup from './useCleanup';
import { deleteEmptyKey, equalsFace } from '..';
import { getSize } from '../create';
import useMap from './useMap';
import { ControlsEnum } from '../constant';
import { controlMethodMap } from '../methods';
import useEvent from './useEvent';

export type UseControlParamsType = {
  props;
  emit?: (event: any, ...args: any[]) => void;
  events?: string[];
  controlName: ControlsEnum;
  getRestParams?: () => Record<string, any>;
};

const useControl = <ControlInstanceType>(params: UseControlParamsType) => {
  const { props, emit, events, controlName, getRestParams } = params;

  const { BMap, map } = useMap();
  const originInstance = ref<ControlInstanceType>();
  const { removeInstance } = useCleanup(originInstance, map);
  useEvent(map, emit, events);


  watch([map], (_, __, onCleanup) => {
    if (map?.value) {
      const Control = BMap?.value?.[controlName];
      const controlInstance = new Control(deleteEmptyKey({
        anchor: window[props?.anchor],
        offset: props.offset && getSize(props.offset?.width, props.offset?.height),
        ...getRestParams?.()
      }));
      map?.value?.addControl?.(controlInstance);
      originInstance.value = controlInstance;
      if (events?.includes?.('load')) {
        emit?.('load', controlInstance);
      }
      onCleanup(removeInstance);
    }
  }, {
    immediate: true,
  });

  watch(() => props, (newProps, preProps) => {
    if (originInstance?.value) {
      controlMethodMap.get(controlName)?.forEach?.(({ key, method, format }) => {
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
      });
    }
  }, {
    deep: true,
  });

  return {
    originInstance
  }
};

export default useControl;