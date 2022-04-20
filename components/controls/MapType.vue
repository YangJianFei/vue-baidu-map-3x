<script>
import commonMixin from '../base/mixins/common.js'
import { createSize } from '../base/factory.js'
import { deleteEmptyKey } from 'c/base/util.js'

export default {
  name: 'bm-map-type',
  render() { },
  mixins: [commonMixin('control')],
  props: ['type', 'mapTypes', 'anchor', 'offset'],
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
    mapTypes() {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, map, anchor, offset, type } = this
      const mapTypes = []
      this.mapTypes && this.mapTypes.forEach(item => mapTypes.push(window[item]))
      let maptypeControlOption = {
        anchor: window[anchor],
        offset: offset && createSize(BMap, offset),
        type: window[type],
        mapTypes
      };
      deleteEmptyKey(maptypeControlOption);
      this.originInstance = new BMap.MapTypeControl(maptypeControlOption)
      map.addControl(this.originInstance)
    }
  }
}
</script>
