/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 20th 2022, 12:13:57 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

import { getConfig } from './util';

const config = getConfig();

const methods = {
    'API': {
        '2.0': {
            setMapStyle: 'setMapStyle',
            NavigationControl: 'NavigationControl'
        },
        '3.0': {
            setMapStyle: 'setMapStyleV2',
            NavigationControl: 'NavigationControl'
        }
    },
    'WebGL': {
        setMapStyle: 'setMapStyleV2',
        NavigationControl: 'NavigationControl3D'
    }
}

const getMapMethod = (method) => {
    const config = getConfig();
    if (config.type == 'WebGL') {
        return methods[config.type][method];
    } else {
        return methods[config.type][config.v][method];
    }
}

export default getMapMethod;