/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 7th 2022, 11:10:36 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
import { IAddressToPointConfig, IPointTransferConfig } from './type';
export declare function getParamsStrByObject(obj: any): string;
/**
 * 通过坐标获取地址 config和返回值参考百度api
 * @param config {IPointToAddressConfig}
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getAddressByPoints(config: IPointToAddressConfig, aks?: string[]): Promise<unknown>;
/**
 * 通过地址获取坐标 config和返回值参考百度api
 * @param config {IAddressToPointConfig}
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getPointByAddress(config: IAddressToPointConfig, aks?: string[]): Promise<unknown>;
/**
 * 坐标转换 config和返回值参考百度api
 * @param config {IPointTransferConfig}
 * @param aks {String[]} ; ak不传默认使用map ak
 *
 * @return {promise} ;
*/
export declare function getPointsTransfer(config: IPointTransferConfig, aks: string[]): Promise<unknown>;
