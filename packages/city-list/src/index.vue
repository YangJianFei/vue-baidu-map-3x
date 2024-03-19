<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2023-12-29 17:44:29
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\city-list\src\index.vue
-->
<script lang='ts' setup>
import { watch } from 'vue';
import { baseEvents, ControlsEnum, controlMethodMap, useControl } from '@vue-baidu-map-3x/utils';
import type { BaseEvents, CityList, CityListInstance } from '@vue-baidu-map-3x/utils';
import type { Events } from './helper';
import { events } from './helper';

defineOptions({
  name: 'BmCityList',
});

const props = withDefaults(defineProps<CityList>(), {
});

const emit = defineEmits<Events & BaseEvents>();

const { originInstance } = useControl<CityListInstance>({
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: ControlsEnum.CityListControl,
  getRestParams: () => {
    return {
      onChangeBefore: (params) => {
        emit('changeBefore', params);
      },
      onChangeAfter: (params) => {
        emit('changeAfter', params);
      },
    };
  },
});

defineExpose({
  originInstance
});

</script>