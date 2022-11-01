/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 27th 2022, 2:49:53 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */

const pkg = require('../../package.json')
import transformCode from "./plugin"

const config = {
    title: 'vue-baidu-map-3x',
    description: 'vue-baidu-map的vue3版本（支持v2.0、v3.0和webGl api）我全都有',
    lang: 'zh-cn',
    base: '/doc/',
    outDir: 'doc',
    markdown: {
        lineNumbers: true,
        config: (md) => {
            md.use(transformCode)
        }
    },
    themeConfig: {
        repo: pkg.homepage,
        logo: '/heifahaizei.png',
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '为此页提供修改建议',
        nav: [
            {
                text: '开始',
                link: '/begin/install'
            }, {
                text: '焚书坑儒',
                link: '/hole/',
                hot: true
            }, {
                text: '断网地图',
                link: '/offline-map/',
                latest: true
            }, {
                text: '和作者摆龙门阵',
                link: '/help/'
            }, {
                text: '曲径通幽',
                items: [
                    {
                        text: '地区编码坐标数据',
                        link: '/util/area',
                        latest: true
                    }, {
                        text: '版本历史',
                        link: '/changelogs'
                    }, {
                        text: '数据统计',
                        link: '/help/download'
                    }, {
                        text: '打破砂锅',
                        link: '/help/about'
                    }
                ]
            }
        ],
        sidebar: {
            '/hole/': 'auto',
            '/offline-map/': 'auto',
            '/help/': 'auto',
            '/changelogs': 'auto',
            '/help/download': 'auto',
            '/help/about': 'auto',
            '/': [
                {
                    text: '介绍',
                    link: 'index'
                },
                {
                    text: '开始',
                    children: [
                        {
                            text: '安装',
                            link: '/begin/install'
                        }, {
                            text: '快速上手',
                            link: '/begin/use'
                        }, {
                            text: '第三方组件',
                            link: '/begin/third-party'
                        }, {
                            text: '基础',
                            link: '/begin/base'
                        }
                    ]
                },
                {
                    text: '地图容器API',
                    link: '/baidu-map'
                },
                {
                    text: '双向绑定',
                    link: '/shuangxiang'
                },
                {
                    text: '图像绘制',
                    link: '/guid/painting'
                },
                {
                    text: '控件',
                    children: [
                        {
                            text: '比例尺',
                            link: '/control/scale'
                        }, {
                            text: '缩放/3D',
                            link: '/control/navigation'
                        }, {
                            text: '地图类型',
                            link: '/control/map-type'
                        }, {
                            text: '缩略图',
                            link: '/control/overview'
                        }, {
                            text: '定位',
                            link: '/control/geolocation'
                        }, {
                            text: '版权',
                            link: '/control/copyright'
                        }, {
                            text: '城市列表',
                            link: '/control/city-list'
                        }, {
                            text: '全景',
                            link: '/control/panorama'
                        }, {
                            text: '测距',
                            link: '/control/cheju'
                        }, {
                            text: '自定义控件',
                            link: '/control/control'
                        }
                    ]
                },
                {
                    text: '覆盖物',
                    hot: true,
                    children: [
                        {
                            text: '点',
                            link: '/overlay/marker'
                        }, {
                            text: '海量点',
                            link: '/overlay/point-collection'
                        }, {
                            text: '折线',
                            link: '/overlay/polyline'
                        }, {
                            text: '多边形',
                            link: '/overlay/polygon'
                        }, {
                            text: '圆形',
                            link: '/overlay/circle'
                        }, {
                            text: '地面',
                            link: '/overlay/ground'
                        }, {
                            text: '标签',
                            link: '/overlay/label'
                        }, {
                            text: '信息窗体',
                            link: '/overlay/info-window'
                        }, {
                            text: '自定义覆盖物',
                            link: '/overlay/overlay'
                        }
                    ]
                }, {
                    text: '图层',
                    children: [
                        {
                            text: '瓦片图层',
                            link: '/layer/tile'
                        }, {
                            text: '交通流量图层',
                            link: '/layer/traffic'
                        }
                    ]
                }, {
                    text: '检索',
                    children: [
                        {
                            text: '地区检索',
                            link: '/search/local-search'
                        }, {
                            text: '公交路线规划',
                            link: '/search/transit'
                        }, {
                            text: '步行路线规划',
                            link: '/search/walking'
                        }, {
                            text: '驾车路线规划',
                            link: '/search/driving'
                        }, {
                            text: '公交路线检索',
                            link: '/search/bus'
                        }
                    ]
                }, {
                    text: '上下文菜单',
                    children: [
                        {
                            text: '菜单',
                            link: '/menu/menu'
                        }, {
                            text: '菜单项',
                            link: '/menu/menu-item'
                        }
                    ]
                }, {
                    text: '其他',
                    children: [
                        {
                            text: '行政区划',
                            link: '/other/boundary'
                        }, {
                            text: '自动填充',
                            link: '/other/auto-complete'
                        }
                    ]
                }, {
                    text: '第三方组件库',
                    children: [
                        {
                            text: '点聚合',
                            link: '/bmaplib/marker-clusterer'
                        }, {
                            text: '路书',
                            link: '/bmaplib/lushu'
                        }, {
                            text: '热力图',
                            link: '/bmaplib/heatmap'
                        }, {
                            text: '弧线',
                            link: '/bmaplib/curve-line'
                        }
                    ]
                }, {
                    text: '工具函数',
                    link: '/util/',
                    latest: true
                }, {
                    text: '坑人集合',
                    link: '/hole/',
                    hot: true
                }, {
                    text: '离线地图',
                    link: '/offline-map/',
                    latest: true
                }, {
                    text: '和作者聊聊天',
                    link: '/help/'
                }, {
                    text: '版本历史',
                    link: '/changelogs'
                }, {
                    text: '数据统计',
                    link: '/help/download'
                }, {
                    text: '打破砂锅',
                    link: '/help/about'
                }, {
                    text: '地区编码坐标数据',
                    link: '/util/area',
                    latest: true
                }
            ]
        }
    }
}

export default config;