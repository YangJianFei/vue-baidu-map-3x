## 路线规划
只有api2有途径点

## 限定区域
``` main.js
import './util/AreaRestriction_min';
```
```
//设置限定区域
BMapLib.AreaRestriction.setBounds(map, new BMap.Bounds(new BMap.Point(118.561352, 30.576457), new BMap.Point(121.803875, 31.865034)));
```

## 个性化地图拖动出现文字重叠
确实浏览器缩放比不是100
不用styleid设置，用json设置style

## 百度地图缩放中心点偏移
监听缩放完成后再初始化地图
https://www.cnblogs.com/huoshengmiao/p/15654595.html