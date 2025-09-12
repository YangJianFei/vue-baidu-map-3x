/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 10:12:02
 * @LastEditTime: 2025-09-11 17:40:26
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/utils/src/hooks/useEvent.ts
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
    events?.forEach?.(eventName => {
      toValue(instance)?.removeEventListener?.(eventName, eventMethods[eventName]);
    })
  });
};

export default useEvent;