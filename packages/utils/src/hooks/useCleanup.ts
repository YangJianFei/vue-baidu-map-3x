/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 13:57:13
 * @LastEditTime: 2023-11-30 16:13:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\utils\src\hooks\useCleanup.ts
 */
import { onUnmounted, Ref } from 'vue';
import type { MapInstance } from '../../typing';
import { ComponentTypeEnum } from '../constant';

type UserCleanupOptions = {
  type?: ComponentTypeEnum;
};

const useCleanup = (instance: Ref<any>, map?: Ref<MapInstance | undefined>, options?: UserCleanupOptions) => {

  const { type = ComponentTypeEnum.Control } = options || {};

  const removeInstance = () => {
    if (type == ComponentTypeEnum.Control) {
      map?.value?.removeControl?.(instance?.value);
    } else if (type == ComponentTypeEnum.Overlay) {
      map?.value?.removeOverlay?.(instance?.value);
    } else if (type == ComponentTypeEnum.TileLayer) {
      map?.value?.removeTileLayer?.(instance?.value);
    } else if (type == ComponentTypeEnum.ContextMenu) {
      map?.value?.removeContextMenu?.(instance?.value);
    }
  };

  onUnmounted(removeInstance);

  return { removeInstance };
};

export default useCleanup;