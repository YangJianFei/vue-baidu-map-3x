/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, September 8th 2022, 10:53:34 am
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

export interface IAddressToPointConfig {
    address: string;
    city?: string;
    ret_coordtype?: Coordtype;
    sn?: string;
    output?: string;
    extension_analys_level?: string;
    timeout?: number;
    [key: string]: any;
}

export interface IAddressToPointResult {
    location?: ILocation;
    precise?: number;
    confidence?: number;
    comprehension?: number;
    level?: string;
    analys_level?: string;
    [key: string]: any;
}

export interface IAddressToPointResponse {
    status: number;
    result?: IAddressToPointResult;
    [key: string]: any;
}

export interface IPointTransferConfig {
    locations: string[];
    from?: number;
    to?: number;
    sn?: string;
    output?: string;
    [key: string]: any;
}

export interface IPointTransferResult {
    x?: number;
    y?: number;
}

export interface IPointTransferResponse {
    status: number;
    result?: IPointTransferResult[]
}