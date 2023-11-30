<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-26 10:19:19
 * @LastEditTime: 2023-11-30 18:52:11
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\scale\src\index.vue
-->

<script lang='ts' setup>
import { withDefaults } from 'vue';
import type { Control, ScaleInstance } from '@vue-baidu-map-3x/utils';
import { useControl, ControlsEnum } from '@vue-baidu-map-3x/utils';

defineOptions({
  name: 'BmScale',
});

const props = withDefaults(defineProps<Control>(), {
  anchor: 'BMAP_ANCHOR_BOTTOM_LEFT',
});

const { originInstance } = useControl<ScaleInstance>({
  props,
  controlName: ControlsEnum.ScaleControl,
});

defineExpose({
  originInstance
});
</script>