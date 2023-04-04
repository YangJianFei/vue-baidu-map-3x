/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 7th 2022, 11:10:36 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
import { IAddressToPointConfig, IPointTransferConfig } from './type';
declare let mapLoadResolve: any;
export { mapLoadResolve };
export declare const getBMap: () => Promise<IBMap>;
export declare function getParamsStrByObject(obj: any): string;
/**
 * 通过坐标获取地址 config和返回值参考百度api
 * @param config {IPointToAddressConfig}  默认值 {extensions_poi 1,output: 'json',coordtype: 'wgs84ll',timeout: 60  }
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getAddressByPoints(config: IPointToAddressConfig, aks?: string[]): Promise<unknown>;
/**
 * 通过地址获取坐标 config和返回值参考百度api
 * @param config {IAddressToPointConfig} 默认值 {output: 'json',timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getPointByAddress(config: IAddressToPointConfig, aks?: string[]): Promise<unknown>;
/**
 * 坐标转换 config和返回值参考百度api
 * @param config {IPointTransferConfig} 默认值 {from: 1,to: 5,timeout: 60}
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getPointsTransfer(config: IPointTransferConfig, aks?: string[]): Promise<unknown>;
