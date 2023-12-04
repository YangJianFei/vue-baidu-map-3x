<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-26 15:40:11
 * @LastEditTime: 2023-12-01 14:02:45
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\navigation\src\index.vue
-->
<script lang='ts' setup>
import { withDefaults } from 'vue';
import type { BaseEvents, Navigation, NavigationInstance } from '@vue-baidu-map-3x/utils';
import { useControl, ControlsEnum, getMapMethod, baseEvents } from '@vue-baidu-map-3x/utils';

defineOptions({
  name: 'BmNavigation',
});

const props = withDefaults(defineProps<Navigation>(), {
  anchor: 'BMAP_ANCHOR_TOP_RIGHT',
  enableGeolocation: false,
});

const emit = defineEmits<BaseEvents<NavigationInstance>>();

const { originInstance } = useControl<NavigationInstance>({
  props,
  emit,
  events: baseEvents,
  controlName: getMapMethod(ControlsEnum.Navigation),
  getRestParams: () => ({
    type: window[props?.type ?? ''],
    showZoomInfo: props?.showZoomInfo,
    enableGeolocation: props?.enableGeolocation,
  })
});

defineExpose({
  originInstance
});

</script>