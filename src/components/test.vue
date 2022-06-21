<template>
  <div>
    <baidu-map class="map" :center="'北京'" :mapStyle="mapStyle" :zoom="15" :scroll-wheel-zoom="true" @ready="mapInit">
    </baidu-map>
  </div>
</template>

<script>

export default {
  name: "PoleMap",
  created() { },
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
      ]
    };
  },
  props: {},
  methods: {
    mapInit() {
      // this.mapCenter.lng = 114.517154
      // this.mapCenter.lat = 38.038766
      // this.zoom = 8
    }
  },
};
</script>
