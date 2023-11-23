<script>
import commonMixin from '../base/mixins/common.js'
import bindEvents from '../base/bindEvent.js'
import { createIcon, createSize } from '../base/factory.js'
import { deleteEmptyKey } from '../base/util.js'
import { getConfig } from '@vue-baidu-map-3x/utils';

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
      switch (getConfig().type) {
        case 'WebGL':
          this.originInstance = new BMap.LocationControl(geoLocationOption)
          break;
        default:
          this.originInstance = new BMap.GeolocationControl(geoLocationOption)
      }
      bindEvents.call(this, this.originInstance)
      map.addControl(this.originInstance)
    }
  }
}
</script>
