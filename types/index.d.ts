declare interface IAppConfig {
    ak: string;
    v?: string;
    type?: string;
    [key: string]: any;
}

declare interface ILocation {
    lat: number;
    lng: number;
}

declare interface IAddressResult {
    country?: string;
    country_code?: number;
    country_code_iso?: string;
    country_code_iso2?: string;
    province?: string;
    city?: string;
    city_level?: number;
    district?: string;
    town?: string;
    town_code?: string;
    street?: string;
    street_number?: string;
    adcode?: number;
    direction?: string;
    distance?: string;
}

declare interface IPoi {
    addr?: string;
    cp?: string;
    direction?: string;
    distance?: number;
    name?: string;
    tag?: string;
    point?: any;
    tel?: number;
    uid?: string;
    zip?: number;
    parent_poi?: any;
}
declare enum Coordtype {
    bd09ll = 'bd09ll', // 百度经纬度坐标
    bd09mc = 'bd09mc', // 百度米制坐标
    gcj02ll = 'gcj02ll', // 国测局经纬度坐标，仅限中国
    wgs84ll = 'wgs84ll', // GPS经纬度
}

declare interface IRoute {
    name?: string;
    distance?: string;
}

declare interface IBelong {
    direction_desc?: string;
    name?: string;
    tag?: string;
}

declare interface IPointToAddressConfig {
    location: number[];
    extensions_poi?: number;
    output?: string;
    coordtype?: Coordtype;
    ret_coordtype?: string;
    radius?: number;
    sn?: string;
    poi_types?: string;
    extensions_road?: boolean;
    extensions_town?: boolean;
    language?: string;
    language_auto?: number;
    [key: string]: any;
}

declare interface IPointToAddressResult {
    location?: ILocation;
    formatted_address?: string;
    business?: string;
    addressComponent?: IAddressResult;
    pois?: IPoi[];
    roads?: IRoute[];
    poiRegions?: IBelong[];
    sematic_description?: string;
    cityCode?: number;
}

declare interface IPointToAddressReponse {
    status: number;
    result: IPointToAddressResult
}