<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2023-12-01 16:47:16
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\geolocation\src\index.vue
-->
<script lang='ts' setup>
import { } from 'vue';
import { baseEvents, ControlsEnum, getMapMethod, getIcon, useControl } from '@vue-baidu-map-3x/utils';
import type { BaseEvents, Geolocation, GeolocationInstance } from '@vue-baidu-map-3x/utils';
import type { Events } from './helper';
import { events } from './helper';

defineOptions({
  name: 'BmGeolocation',
});

const props = withDefaults(defineProps<Geolocation>(), {
  anchor: 'BMAP_ANCHOR_BOTTOM_RIGHT',
});

const emit = defineEmits<Events & BaseEvents>();

const { originInstance } = useControl<GeolocationInstance>({
  props,
  emit,
  events: [...events, ...baseEvents],
  controlName: getMapMethod(ControlsEnum.GeolocationControl),
  getRestParams: () => {
    return {
      showAddressBar: props.showAddressBar,
      enableAutoLocation: props.autoLocation,
      locationIcon: props.locationIcon && getIcon(props.locationIcon)
    }
  }
});

defineExpose({
  originInstance
});

</script>