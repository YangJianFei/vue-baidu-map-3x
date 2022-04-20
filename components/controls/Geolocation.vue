<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createIcon, createSize } from '../base/factory.js'
import { deleteEmptyKey } from 'c/base/util.js'

export default {
  name: 'bm-geolocation',
  render() { },
  mixins: [commonMixin('control')],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    showAddressBar: {
      type: Boolean
    },
    autoLocation: {
      type: Boolean
    },
    locationIcon: {
      type: Object
    }
  },
  watch: {
    anchor() {
      this.reload()
    },
    offset() {
      this.reload()
    },
    showAddressBar() {
      this.reload()
    },
    autoLocation() {
      this.reload()
    },
    locationIcon() {
      this.reload()
    }
  },
  methods: {
    load() {
      const { BMap, map, anchor, showAddressBar, autoLocation, locationIcon, offset } = this
      let geoLocationOption = {
        anchor: window[anchor],
        showAddressBar,
        enableAutoLocation: autoLocation,
        offset: offset && createSize(BMap, offset),
        locationIcon: locationIcon && createIcon(BMap, locationIcon)
      };
      deleteEmptyKey(geoLocationOption);
      this.originInstance = new BMap.GeolocationControl(geoLocationOption)
      bindEvents.call(this, this.originInstance)
      map.addControl(this.originInstance)
    }
  }
}
</script>
