<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-14 11:14:25
 * @LastEditTime: 2025-09-17 09:10:55
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/play/src/components/test.vue
-->
<template>
  <baidu-map
    class="map"
    :center="{ lng: 116.404, lat: 39.915 }"
    :zoom="zoom"
    @load="onLoad"
  >
    <bm-control :anchor="anthor" @load="onLoad" @unLoad="unLoad">
      <button @click="onClick">改变位置</button>
      <button @click="changeZoom">还原</button>
      <button>缩放至最 小</button>
    </bm-control>
    <bm-scale @load="onLoad" @unLoad="unLoad"></bm-scale>
    <bm-navigation :offset="{ height: 40 }" @load="onLoad" @unLoad="unLoad" />
    <bm-map-type
      :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
      @load="onLoad"
      @unLoad="unLoad"
    />
    <bm-overview-map
      :offset="{ height: 100 }"
      :isOpen="true"
      @load="onLoad"
      @unLoad="unLoad"
      @viewchanged="onViewchanged"
    />
    <bm-geolocation
      :showAddressBar="true"
      @locationError="locationError"
      @load="onLoad"
      @unLoad="unLoad"
    />
    <bm-copyright
      :copyright="[
        {
          id: 1,
          content: 'Copyright Message',
          bounds: { ne: { lng: 110, lat: 40 }, sw: { lng: 0, lat: 0 } },
        },
        { id: 2, content: '<a>我是版权信息</a>' },
      ]"
    />
    <bm-city-list @load="onCityListLoad" />
  </baidu-map>
</template>

<script lang="ts" setup>
import { watch, ref, withDefaults, provide } from "vue";

const props = withDefaults(defineProps<{}>(), {});

const name = ref("sss");
const anthor = ref();
const zoom = ref(15);

const onClick = () => {
  anthor.value = "BMAP_ANCHOR_TOP_RIGHT";
};

const onCityListLoad = (...params) => {
  console.log("cityLoad", params);
};

const onLoad = (...params) => {
  console.log("load", params);
};

const unLoad = (...params) => {
  console.log("unload", params);
};

const locationError = (...res) => {
  console.log(res);
};

const changeZoom = () => {
  zoom.value = 10;
};

const onViewchanged = (...params) => {
  console.log("overviewchanged", params);
};

watch(name, (newName, preName) => {}, {
  immediate: true,
});

watch(props, (newProps, preProps) => {}, {
  immediate: true,
  deep: true,
});

provide("message", name);
</script>
