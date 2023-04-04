declare interface IAppConfig {
    ak: string;
    v?: string;
    type?: string;
    [key: string]: any;
}

interface IBMap {
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
    timeout?: number;
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
    [key: string]: any;
}

declare interface IPointToAddressReponse {
    status: number;
    result?: IPointToAddressResult;
    [key: string]: any;
}

interface IPoint {
    lnt: number;
    lat: number;
    equals: (IPoint) => boolean
}

interface IGeocoderResult {
    point: IPoint;
    address: string;
    addressComponents: any;
    surroundingPois: any;
    business: string;
}

interface IGeoCoder {
    getPoint: (address: string, callback: (result: null | IPoint) => void, city: string) => void;
    getLocation: (point: IPoint, callback: (result: null | IGeocoderResult) => void, options: any) => void;
}