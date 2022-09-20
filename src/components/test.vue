<template>
  <div>
    <span @click="change">修改</span>
    <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" @ready="handleReady" scroll-wheel-zoom>
      <bm-marker v-for="(point,index) in points" :key="point.lng" :position="point" :dragging="true" @click="infoWindowOpen">
        <bm-info-window :key="index" :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门{{index}}</bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import { BaiduMap, BmNavigation, getPointsTransfer } from 'c'
export default {
  name: "PoleMap",
  components: {
    BaiduMap,
    BmNavigation
  },
  created() {
    getPointsTransfer({
      location: ['114.21892734521, 29.575429778924']
    }).then(res => {
      console.log(res);
    });
  },
  data() {
    return {
      mapCenter: { lng: 0, lat: 0 },
      zoom: 3,
      Width: '100%',
      height: 400,
      mapStyle: [
        {
          featureType: 'land',
          elementType: 'geometry',
          stylers: {
            color: '#fffff9ff'
          }
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            color: '#8AC3DB'
          }
        },
        {
          featureType: 'highway',
          elementType: 'geometry.fill',
          stylers: {
            color: '#FFF693'
          }
        }
      ],
      points: [
        { "lng": 116.404, "lat": 39.915 },
        { "lng": 116.404, "lat": 39.945 }
      ],
      label: {
        content: 'wahaha',
        opts: {
          offset: {
            width: 50,
            height: 50
          },
          position: { "lng": 116.404, "lat": 39.915 },
          enableMassClear: true
        }
      },
      show: false
    };
  },
  props: {},
  methods: {
    mapInit() {
      // this.mapCenter.lng = 114.517154
      // this.mapCenter.lat = 38.038766
      // this.zoom = 8
    },
    change() {
      this.points = [
        { "lng": 116.404, "lat": 39.905 },
        { "lng": 116.404, "lat": 39.925 },
      ]
    },
    handleReady({ BMap, map }) {
      map.setTilt(73); // 倾斜度
      map.setDisplayOptions({
        skyColors: ['rgba(186, 0, 255, 0)', 'rgba(186, 0, 255, 0.2)'] // 设置天空颜色
      })
    },
    infoWindowOpen() {
      this.show = true;
    }
  },
};
</script>
