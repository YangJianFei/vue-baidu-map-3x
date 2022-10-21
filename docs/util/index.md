# 工具函数

## getAddressByPoints 通过坐标获取地址
示例

```bash
import { getAddressByPoints } from 'vue-baidu-map-3x';

/**
 * 通过坐标获取地址 config和返回值参考百度api
 * @param config {IPointToAddressConfig}  默认值 {extensions_poi 1,output: 'json',coordtype: 'wgs84ll',timeout: 60  }
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/

const config = {
    location:['31.225696563611', '121.49884033194']
};
getAddressByPoints(config, ['你的ak']);
```

## getPointByAddress 通过地址获取坐标
示例

```bash
import { getPointByAddress } from 'vue-baidu-map-3x';

/**
 * 通过地址获取坐标 config和返回值参考百度api
 * @param config {IAddressToPointConfig} 默认值 {output: 'json',timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/

const config = {
    address:'北京市海淀区上地十街10号'
};
getPointByAddress(config, ['你的ak']);
```

## getPointsTransfer 坐标转换
示例

```bash
import { getPointsTransfer } from 'vue-baidu-map-3x';

/**
 * 坐标转换 config和返回值参考百度api
 * @param config {IPointTransferConfig} 默认值 {from: 1,to: 5,timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 * 
 * @return {promise} ; 
*/

const config = {
    locations:[
        '114.21892734521,29.575429778924',
        '114.34892734521,29.245429778924'
    ]
};
getPointsTransfer(config, ['你的ak']);
```

## getConfig 获取组件配置
示例

```bash
import { getConfig } from 'vue-baidu-map-3x';

/**
 * 获取组件配置 返回值是use组件的参数
 * 
 * @return {config} ; 
*/

getConfig();
```