<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-04-04 16:38:43
 * @LastEditTime: 2023-04-04 16:51:50
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\docs\util\hooks.md
-->
# hooks

## useMap 获取地图对象BMap
示例
```bash
import { useMap } from 'vue-baidu-map-3x';

useMap().then(BMap => {
    console.log(BMap);
});
```

## useGeocoder 获取Geocoder类
可通过类调用getPoint，getLocation方法，参数同官方api

### getPoint：通过地址获取坐标
### getLocation：通过坐标获取地址相关信息

示例
```bash
import { useGeocoder, usePoint } from 'vue-baidu-map-3x';

useGeocoder().then((geocoder) => {
  geocoder.getPoint('广东省深圳市光明新区红花山公园', (res) => {
    console.log(res);
  });
  usePoint(116.404, 39.915).then(point => {
    geocoder.getLocation(point, (result) => {
      console.log(result);
    });
  });
});

```


## usePoint 通过坐标值返回百度坐标点对象
示例
```bash
import { usePoint } from 'vue-baidu-map-3x';

usePoint(116.404, 39.915).then(point => {
   console.log(point);
});

```