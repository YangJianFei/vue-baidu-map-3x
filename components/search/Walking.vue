<template>
  <div v-show="panel">
    <slot></slot>
  </div>
</template>

<script>
import { createPoint } from '../base/factory.js'
import { isPoint, getPosition } from '../base/util.js'
import commonMixin from '../base/mixins/common.js'

export default {
  name: 'bm-walking',
  emits: ['searchcomplete', 'markersset', 'infohtmlset', 'polylinesset', 'resultshtmlset'],
  mixins: [commonMixin('search')],
  props: {
    location: {
      type: [Object, String]
    },
    start: {
      type: [Object, String]
    },
    end: {
      type: [Object, String]
    },
    panel: {
      type: Boolean,
      default: true
    },
    pageCapacity: {
      type: Number
    },
    autoViewport: {
      type: Boolean
    },
    selectFirstResult: {
      type: Boolean
    }
  },
  watch: {
    location: {
      handler(val) {
        const { originInstance, map } = this
        originInstance.setLocation(val || map)
      },
      deep: true
    },
    start: {
      handler(val) {
        const { originInstance, end, BMap } = this
        originInstance.search(getPosition(BMap, val), getPosition(BMap, end))
      },
      deep: true
    },
    end: {
      handler(val) {
        const { originInstance, start, BMap } = this
        originInstance.search(getPosition(BMap, start), getPosition(BMap, val))
      },
      deep: true
    },
    panel() {
      this.reload()
    },
    autoViewport(val) {
      this.reload()
    },
    selectFirstResult(val) {
      this.reload()
    },
    highlightMode() {
      this.reload()
    }
  },
  methods: {
    search(start, end) {
      const { originInstance } = this
      originInstance.search(start, end)
    },
    load() {
      const instance = this
      const { map, BMap, location, selectFirstResult, autoViewport, highlightMode, search, start, end, originInstance } = this
      const _location = location ? isPoint(location) ? createPoint(BMap, location) : location : map
      const route = this.originInstance = new BMap.WalkingRoute(_location, {
        renderOptions: {
          map,
          // panel: panel && this.$el,
          panel: this.$el,
          selectFirstResult,
          autoViewport,
          highlightMode
        },
        onSearchComplete(e) {
          if (originInstance && originInstance !== route) {
            originInstance.clearResults()
          }
          instance.$emit('searchcomplete', e)
        },
        onMarkersSet(e) {
          instance.$emit('markersset', e)
        },
        onInfoHtmlSet(e) {
          instance.$emit('infohtmlset', e)
        },
        onPolylinesSet(e) {
          instance.$emit('polylinesset', e)
        },
        onResultsHtmlSet(e) {
          instance.$emit('resultshtmlset', e)
        }
      })
      search(isPoint(start) ? createPoint(BMap, start) : start, isPoint(end) ? createPoint(BMap, end) : end)
    }
  }
}
</script>
