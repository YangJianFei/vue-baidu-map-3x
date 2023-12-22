## 注意事项

::: danger
本网站例子可能由于ak使用量过大有限制导致列子展示不出来，但是示例代码一般是没问题的。有问题可以联系我微信解决
:::

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

::: danger 地图事件点坐标坑
WebGl地图事件点坐标是latlng，Api事件点坐标是point
:::

::: danger 驾车路线规划坑
WebGL和API3.0的start和end点不能是地点名，需和官方文档一致。API2.0的可以是地点名
:::

```
<bm-driving :start="lushuPoint.start" :end="lushuPoint.end" :auto-viewport="true" :policy="policy" :panel="true" location="北京" :waypoints="['西二旗']">
</bm-driving>

const lushuPoint = ref({
  start: {
    lng: 116.301934,
    lat: 39.977552
  },
  end: {
    lng: 116.508328,
    lat: 39.919141
  },
});
```

::: danger 组件莫名报错
如果组件之前是好的突然报错，可以检查下是否额度已用完。
:::
