/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-23 17:01:26
 * @LastEditTime: 2023-11-23 17:01:27
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\map\src\useMap.ts
 */
import { inject } from 'vue';
import { BdMapKey } from '../keys';

const useMap = () => {
  const injectvalue = inject(BdMapKey);

  return {
    ...injectvalue
  };
};

export default useMap;
