<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createPoint } from '../base/factory.js'

export default {
  render() { },
  name: 'bm-point-collection',
  mixins: [commonMixin('overlay')],
  props: {
    points: {
      type: Array,
      default() {
        return []
      }
    },
    shape: {
      type: String,
      default: 'BMAP_POINT_SHAPE_CIRCLE'
    },
    color: {
      type: String
    },
    size: {
      type: String,
      default: 'BMAP_POINT_SIZE_NORMAL'
    }
  },
  watch: {
    shape(val) {
      const { originInstance, color, size } = this
      originInstance.setStyles({
        shape: window[val],
        color,
        size: window[size]
      })
    },
    size(val) {
      const { originInstance, color, shape } = this
      originInstance.setStyles({
        shape: window[shape],
        color,
        size: window[val]
      })
    },
    color(val) {
      const { originInstance, shape, size } = this
      originInstance.setStyles({
        shape: window[shape],
        color: val,
        size: window[size]
      })
    },
    points: {
      deep: true,
      handler(val) {
        const { originInstance } = this
        originInstance.clear()
        originInstance.setPoints(val)
      }
    }
  },
  methods: {
    load() {
      const { BMap, map, points, shape, color, size } = this
      const overlay = this.originInstance = new BMap.PointCollection(points.map(p => createPoint(BMap, p)), {
        shape: window[shape],
        color,
        size: window[size]
      })
      bindEvents.call(this, overlay)
      map.addOverlay(overlay)
    }
  }
}
</script>
