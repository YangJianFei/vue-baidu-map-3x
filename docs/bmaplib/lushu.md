# 路书

`bml-lushu` 是用来还原行进轨迹的组件。

## 属性

|属性名|类型|默认值|描述|
|------|-----|------|----|
|play|Boolean|true|是否行进|
|path|Array[`{lng, lat}`]|[]|构成路线的坐标点数组|
|landmarkPois|Array[`{lng, lat, html, pauseTime}`]|[]|要在覆盖物移动过程中显示的特殊点|
|icon|Icon||覆盖物的图标|
|speed|Number|4000|覆盖物移动速度|
|autoView|Boolean|false|是否自动调整路线视野|
|rotation|Boolean|false|移动物体是否随路径旋转朝向|
|infoWindow|Boolean|true|是否开启移动物体上的信息窗体|
|content|String||信息窗体中的内容，无内容则不显示信息窗体|

## 事件

|事件名|参数|描述|
|------|----|----|
|start|this|开始移动|
|stop|this|停止本次移动|
|pause|this|暂停移动|
|move|this|移动事件(参数里面的i即为当前points的索引)|

## 示例

### 还原天安门到百度大厦的驾车路径

<div>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11">
    <bm-driving start="天安门" end="百度大厦" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
    <component v-if="bmlLushu" :is="bmlLushu" @start="changeBtnText('pause')" @stop="changeBtnText('play_arrow')" @pause="changeBtnText('play_arrow')" :path="path" :rotation="rotation" :content="content" :infoWindow="true" :speed="speed" :icon="icon" :play="play">
    </component>
  </baidu-map>
  <table>
    <thead>
      <tr>
        <th>操作</th>
        <th>旋转</th>
        <th>行进速度</th>
        <th>窗体内容</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span @click="toggle">{{btnText}}</span></td>
        <td>
          <input v-model="rotation" type="radio" name="lushu">
        </td>
        <td>
          <input v-model.number="speed" type="text">
        </td>
        <td>
          <input v-model="content" type="text">
        </td>
      </tr>
    </tbody>
  </table>
</div>


<script setup>
import { ref, onMounted } from 'vue';

const btnText = ref('play_arrow');
const path = ref([]);
const rotation = ref(true);
const play = ref(false);
const content = ref('一言不合就开车');
const speed = ref(5000);
const icon = ref({
  url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
  size: {
    width: 52,
    height: 26
  },
  opts: {
    anchor: {
      width: 27,
      height: 13
    }
  }
});
const bmlLushu = ref(null);

onMounted(()=>{
  import('vue-baidu-map-3x/extra/Lushu.vue').then(module=>{
    bmlLushu.value = module.default;
  });
});

const changeBtnText = (val) => {
  btnText.value = val
  if (val === 'play_arrow') {
    play.value = false
  }
};

const toggle = () => {
  play.value = !play.value
};

const handleSearchComplete = (res) => {
  path.value = res.getPlan(0).getRoute(0).getPath()
};
</script>

```html
<template>
  <div>
      <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="11">
        <bm-driving start="天安门" end="百度大厦" @searchcomplete="handleSearchComplete" :panel="false" :autoViewport="true"></bm-driving>
        <bml-lushu @start="changeBtnText('pause')" @stop="changeBtnText('play_arrow')" @pause="changeBtnText('play_arrow')" :path="path" :rotation="rotation" :content="content" :infoWindow="true" :speed="speed" :icon="icon" :play="play">
        </bml-lushu>
      </baidu-map>
      <table>
        <thead>
          <tr>
            <th>操作</th>
            <th>旋转</th>
            <th>行进速度</th>
            <th>窗体内容</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span @click="toggle">{{btnText}}</span></td>
            <td>
              <input v-model="rotation" type="radio" name="lushu">
            </td>
            <td>
              <input v-model.number="speed" type="text">
            </td>
            <td>
              <input v-model="content" type="text">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import {  BmlLushu } from 'vue-baidu-map-3x';

const btnText = ref('play_arrow');
const path = ref([]);
const rotation = ref(true);
const play = ref(false);
const content = ref('一言不合就开车');
const speed = ref(5000);
const icon = ref({
  url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
  size: {
    width: 52,
    height: 26
  },
  opts: {
    anchor: {
      width: 27,
      height: 13
    }
  }
});

const changeBtnText = (val) => {
  btnText.value = val
  if (val === 'play_arrow') {
    play.value = false
  }
};

const toggle = () => {
  play.value = !play.value
};

const handleSearchComplete = (res) => {
  path.value = res.getPlan(0).getRoute(0).getPath()
};
</script>
```