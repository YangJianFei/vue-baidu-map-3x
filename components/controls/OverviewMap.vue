<script>
import { createSize } from '../base/factory.js'
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { deleteEmptyKey } from 'c/base/util.js'

export default {
  name: 'bm-overview-map',
  mixins: [commonMixin('control')],
  render() { },
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    size: {
      type: Object
    },
    isOpen: {
      type: Boolean
    }
  },
  watch: {
    anchor() {
      this.reload()
    },
    offset() {
      this.reload()
    },
    size() {
      this.reload()
    },
    isOpen() {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, map, isOpen, size, offset, anchor } = this
      const mapTypes = []
      this.mapTypes && this.mapTypes.forEach(item => {
        mapTypes.push(window[item])
      })
      let overviewOption = {
        anchor: window[anchor],
        offset: createSize(BMap, offset),
        size: createSize(BMap, size),
        isOpen
      };
      deleteEmptyKey(overviewOption);
      this.originInstance = new BMap.OverviewMapControl(overviewOption)
      bindEvents.call(this, this.originInstance)
      map.addControl(this.originInstance)
    }
  }
}
</script>
