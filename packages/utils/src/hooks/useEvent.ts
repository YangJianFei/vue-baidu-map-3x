/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 10:12:02
 * @LastEditTime: 2023-12-01 18:15:47
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\hooks\useEvent.ts
 */
import { watchEffect, toValue, onUnmounted } from 'vue';

const useEvent = (instance: any, emit, events?: string[]) => {

  const eventMethods: Record<string, any> = {};

  watchEffect((onCleanup) => {
    events?.forEach?.(eventName => {
      eventMethods[eventName] = (params) => {
        emit?.(eventName, params);
      };
      toValue(instance)?.addEventListener?.(eventName, eventMethods[eventName]);
    });
    onCleanup(() => {
      events?.forEach?.(eventName => {
        toValue(instance)?.removeEventListener?.(eventName, eventMethods[eventName]);
      });
    });
  });

  onUnmounted(() => {
    if (events?.includes?.('unLoad')) {
      emit?.('unLoad');
    }
    events?.forEach?.(eventName => {
      toValue(instance)?.removeEventListener?.(eventName, eventMethods[eventName]);
    })
  });
};

export default useEvent;