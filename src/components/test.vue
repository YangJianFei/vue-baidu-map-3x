<template>
  <div>
    <BaiduMap class="map" :center="{ lng: 118.454, lat: 32.955 }" :zoom="5" :ak="ak" v="3.0" type="API" @ready="ready">
    </BaiduMap>
  </div>
</template>

<script>

import { BaiduMap } from 'c';

export default {
  name: "PoleMap",
  components: { BaiduMap },
  created() { },
  data() {
    return {
      ak: 'rlgqKI41z2TzKv9mpVb60LiZptSguMBU'
    };
  },
  props: {},
  methods: {
    ready({ BMap, map }) {

    }
  },
};
</script>
