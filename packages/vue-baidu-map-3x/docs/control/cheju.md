## 引入第三方测距插件

-DemoCode-
<template>
  <div>
      <baidu-map class="map" center="北京" @ready="setDistanceToolInstance">
        <bm-control>
            <button @click="openDistanceTool">开启测距</button>
        </bm-control>
      </baidu-map>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import DistanceTool from 'bmaplib.distancetool'

const distanceTool = ref(null);

const setDistanceToolInstance = ({ map }) => {
  distanceTool.value = new DistanceTool(map, { lineStroke: 2 });
};

const openDistanceTool = (e) => {
  distanceTool.value && distanceTool.value.open();
};

onMounted(()=>{
  window.global = window.global || window;
});

onUnmounted(() => {
  distanceTool.value && distanceTool.value.close();
});
</script>
-/DemoCode-
