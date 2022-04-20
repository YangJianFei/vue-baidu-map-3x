<template>
  <span>
    <slot></slot>
  </span>
</template>

<script>
import MarkerClusterer from 'bmaplib.markerclusterer'
import { createSize } from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'

const markers = [];
export default {
  name: 'bml-marker-clusterer',
  mixins: [commonMixin('markerClusterer')],
  provide() {
    return {
      Cluster: this
    }
  },
  props: {
    gridSize: {
      type: Object
    },
    maxZoom: {
      type: Number
    },
    minClusterSize: {
      type: Number
    },
    styles: {
      type: Array,
      default() {
        return []
      }
    },
    averageCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  watch: {
    gridSize: {
      handler(val) {
        const { BMap, originInstance } = this
        originInstance.setGridSize(BMap, val.map)
      },
      deep: true
    },
    maxZoom(val) {
      const { originInstance } = this
      originInstance.setMaxZoom(val)
    },
    minClusterSize: {
      handler(val) {
        const { BMap, originInstance } = this
        originInstance.setMinClusterSize(createSize(BMap, val))
      },
      deep: true
    },
    styles: {
      handler(val) {
        const { BMap, originInstance } = this
        const obj = JSON.parse(JSON.stringify(val)).map(item => {
          item.size = item.size && createSize(BMap, item.size)
          return item
        })
        originInstance.setStyles(obj)
      },
      deep: true
    },
    averageCenter(val) {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, map, gridSize, minClusterSize, maxZoom, styles, averageCenter } = this
      this.originInstance = new MarkerClusterer(map, {
        gridSize: gridSize && createSize(BMap, gridSize),
        maxZoom,
        minClusterSize: minClusterSize && createSize(BMap, minClusterSize),
        styles: styles.map(item => {
          item.size = createSize(BMap, item.size)
          return item
        }),
        isAverageCenter: averageCenter
      })
      this.$nextTick(() => {
        const markersInstance = markers.map(inst => inst.originInstance).filter(marker => marker instanceof BMap.Marker)
        this.originInstance.addMarkers(markersInstance)
      })
    },
    addMaker(maker) {
      markers.push(maker);
    },
    removeMaker(maker) {
      markers.splice(markers.indexOf(maker), 1);
    }
  },
  beforeCreate() {
    this.preventChildrenRender = true
  }
}
</script>
