<script>
import commonMixin from '../base/mixins/common.js'
import { createSize } from '../base/factory.js'
import MethodMap from 'c/base/methodMap.js';

export default {
  name: 'bm-navigation',
  render() { },
  mixins: [commonMixin('control')],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    type: {
      type: String
    },
    showZoomInfo: {
      type: Boolean
    },
    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    anchor() {
      this.reload()
    },
    offset() {
      this.reload()
    },
    type() {
      this.reload()
    },
    showZoomInfo() {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, map, anchor, offset, type, showZoomInfo, enableGeolocation } = this
      this.originInstance = new BMap[MethodMap[this._BMap().type].NavigationControl]({
        anchor: window[anchor],
        offset: offset && createSize(BMap, offset),
        type: window[type],
        showZoomInfo,
        enableGeolocation
      })
      map.addControl(this.originInstance)
    }
  }
}
</script>
