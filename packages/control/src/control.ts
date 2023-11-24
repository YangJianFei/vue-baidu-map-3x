/*
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-24 09:58:37
 * @LastEditTime: 2023-11-24 09:58:37
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\control\src\control.ts
 */
import { ControlAnchorEnum } from '@vue-baidu-map-3x/utils';
import type { Size } from '@vue-baidu-map-3x/utils';

type ControlOptions = {
  anchor: keyof typeof ControlAnchorEnum;
  offset: Size;
};

const getControl = (MapControl, element) => {

  class Control extends MapControl {

    defaultAnchor: keyof typeof ControlAnchorEnum;
    defaultOffset: Size;

    constructor({ offset, anchor }: ControlOptions) {
      super();
      this.defaultAnchor = window[anchor];
      this.defaultOffset = offset;
    }

    initialize(map) {
      return map.getContainer().appendChild(element)
    }
  }

  return Control;
};

export { getControl };