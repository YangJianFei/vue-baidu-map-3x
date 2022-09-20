## 注意事项

::: danger
地图初始须设置center，zoom否则地图不会初始化，
地图须设置高度才能展示
:::

```html
<baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15">
</baidu-map>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
```
::: danger
局部注册的 `BaiduMap` 组件**必须**声明 `ak,v,type` 属性。现在的局部注册并不是按需引入并不能减少打包体积，按需引入待后期实现
:::

```html
<template>
  <baidu-map class="map" ak="BaiduMapAK" v="3.0" type="API">
  </baidu-map>
</template>

<script setup>
import { BaiduMap } from 'vue-baidu-map-3x'
</script>

<style>
.map {
  width: 100%;
  height: 300px;
}
</style>
```

::: danger
地图加载完事件有：**init**,**load**,**loaded**,**ready**
注意他们的区别一个不行试试另一个
:::


::: danger 信息窗体同时只能存在一个，所以不能循环里面添加
参考：https://lbsyun.baidu.com/index.php?title=jspopularGL/guide/infoWindow
:::

```html{2-7}
<baidu-map class="map" :center="{lng: location.lng, lat: location.lat}" :zoom="15" style="height: 800px;">
	<div v-for="item in locationInfo"> // 错误写法
		<bm-marker :position="{lng: item.location.lng, lat: item.location.lat}" :dragging="false" @click="item.open = true">
			<bm-info-window :show="item.open" @close="item.open=false" @open="item.open = true">
				{{ item }}
			</bm-info-window>
		</bm-marker>
	</div>
</baidu-map>
```