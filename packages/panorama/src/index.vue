<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-12-01 16:01:13
 * @LastEditTime: 2025-09-12 09:03:06
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/packages/panorama/src/index.vue
-->
<script lang="ts" setup>
import {
  baseEvents,
  ControlsEnum,
  useControl,
} from "@vue-baidu-map-3x/utils";
import type { BaseEvents, Panorama, PanoramaInstance } from "@vue-baidu-map-3x/utils";

defineOptions({
  name: "BmPanorama",
});

const props = defineProps<Panorama>();

const emit = defineEmits<BaseEvents>();

const { originInstance } = useControl<PanoramaInstance>({
  props,
  emit,
  events: [...baseEvents],
  controlName: ControlsEnum.PanoramaControl,
});

defineExpose({
  originInstance,
});
</script>
