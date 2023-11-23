/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 10:12:02
 * @LastEditTime: 2023-11-23 10:12:16
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\useEvent.ts
 */
import { watchEffect, toValue } from 'vue';

const useEvent = (instance: any, emit, events: string[]) => {

  watchEffect((onCleanup) => {
    const eventMethods: Record<string, any> = {};
    events?.forEach?.(eventName => {
      eventMethods[eventName] = (params) => {
        emit?.(eventName, params);
      };
      toValue(instance)?.addEventListener?.(eventName, eventMethods[eventName]);
    });
    onCleanup(() => {
      events?.forEach?.(eventName => {
        toValue(instance)?.removeEventListener?.(eventName, eventMethods[eventName]);
      })
    });
  });
};

export default useEvent;