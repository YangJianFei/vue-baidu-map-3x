<script>
import commonMixin from '../base/mixins/common.js'
import { createSize } from '../base/factory.js'
import MethodMap from '../base/methodMap.js';
import { deleteEmptyKey, getConfig } from '../base/util.js'

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
      let navigationOption = {
        anchor: window[anchor],
        offset: offset && createSize(BMap, offset),
        type: window[type],
        showZoomInfo,
        enableGeolocation
      };
      deleteEmptyKey(navigationOption);
      this.originInstance = new BMap[MethodMap[getConfig().type].NavigationControl](navigationOption)
      map.addControl(this.originInstance)
    }
  }
}
</script>
