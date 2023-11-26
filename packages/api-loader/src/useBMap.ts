/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-22 17:04:04
 * @LastEditTime: 2023-11-22 17:04:04
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\api-loader\src\useBMap.ts
 */
import { ref } from 'vue';
import { getBMap } from './helper';
import type { BMap } from '@vue-baidu-map-3x/utils';

const useBMap = () => {
  const BMap = ref<BMap>();

  getBMap().then(res => {
    BMap.value = res;
  });

  return {
    BMap
  }
};

export default useBMap;