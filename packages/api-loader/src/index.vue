<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-11-20 18:59:37
 * @LastEditTime: 2023-11-21 15:11:34
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\packages\api-loader\index.vue
-->
<template>
  <slot v-if="isLoad"></slot>
</template>

<script lang="ts" setup>
import { ref, onUnmounted } from 'vue';
import { ApiLoaderType } from './typing';
import { setConfig, getConfig, BaseEvents } from '@vue-baidu-map-3x/utils';
import type { BMap, ConfigType } from '@vue-baidu-map-3x/utils';
import { mapLoadResolve } from './helper';

defineOptions({
  name: 'ApiLoader'
});

const props = withDefaults(defineProps<ApiLoaderType>(), {});
const emit = defineEmits<BaseEvents<BMap>>();

const isLoad = ref(false);

const dealConfig = () => {
  const options: Partial<ConfigType> = {};
  props?.ak && (options.ak = props.ak);
  props?.type && (options.type = props.type);
  props?.v && (options.v = props.v);
  setConfig(options);
};

const getMapScript = () => {
  if (!window.BMap) {
    const config = getConfig();
    window.BMap = {}
    window.BMap._preloader = new Promise((resolve, reject) => {
      if (config.ak) {
        window._initBaiduMap = function () {
          window.BMap = config.type == 'WebGL' ? window.BMapGL : window.BMap;
          resolve(window.BMap)
          window.document.body.removeChild($script)
          window.BMap._preloader = null
          window._initBaiduMap = null
        }
        const $script = document.createElement('script')
        window.document.body.appendChild($script)
        switch (config.type) {
          case 'WebGL':
            $script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${config.ak}&callback=_initBaiduMap`
            break;
          default:
            $script.src = `https://api.map.baidu.com/api?v=${config.v}&ak=${config.ak}&callback=_initBaiduMap`
        }
      }
    })
    return window.BMap._preloader
  } else if (!window.BMap._preloader) {
    return Promise.resolve(window.BMap)
  } else {
    return window.BMap._preloader
  }
};

dealConfig();
getMapScript().then((BMap) => {
  isLoad.value = true;
  emit('load', BMap);
  mapLoadResolve(BMap);
});

onUnmounted(() => {
  emit('unLoad');
});
</script>