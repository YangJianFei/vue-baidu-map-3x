import EvenBus from '../eventBus.js'
const types = {
  control: {
    unload: 'removeControl'
  },
  layer: {
    unload: 'removeTileLayer'
  },
  overlay: {
    unload: 'removeOverlay'
  },
  contextMenu: {
    unload: 'removeContextMenu'
  }
}

const getParent = $component => {
  return ($component.abstract || $component.name !== 'bm-map') ? getParent($component.$parent) : $component
}
//($component.abstract || $component.$el === $component.$children[0].$el) ? getParent($component.$parent) : $component

function destroyInstance() {
  const { unload, renderByParent, $parent, ready } = this
  EvenBus.$off('ready', ready);
  if (renderByParent) {
    $parent.reload()
  }
  unload()
}

const getMixin = (prop = {}) => {
  return {
    emits: ['ready', 'init'],
    computed: {
      renderByParent() {
        return this.$parent.preventChildrenRender
      }
    },
    created() {
      const $parent = getParent(this.$parent)
      const map = $parent.map
      const { ready, _init } = this
      map ? ready() : EvenBus.$on('ready', ({ mapKey }) => this.emitCallBack(mapKey, ready));
      map ? this.init({ BMap: $parent.BMap, map }) : EvenBus.$on('init', ({ mapKey }) => this.emitCallBack(mapKey, _init));
    },
    mounted() {
      const $parent = getParent(this.$parent)
      const map = $parent.map
      const { mountedReady } = this
      map ? mountedReady() : EvenBus.$on('ready', ({ mapKey }) => this.emitCallBack(mapKey, mountedReady));
    },
    unmounted: destroyInstance,
    methods: {
      emitCallBack(mapKey, cb) {
        const $parent = getParent(this.$parent)
        if (mapKey == $parent.mapKey) {
          cb();
        }
      },
      _init() {
        const $parent = getParent(this.$parent)
        const BMap = this.BMap = $parent.BMap
        const map = this.map = $parent.map
        this.init({ BMap, map })
      },
      init() { },
      ready() {
        const $parent = getParent(this.$parent)
        const BMap = this.BMap = $parent.BMap
        const map = this.map = $parent.map
        this.load()
        this.$emit('ready', {
          BMap,
          map
        })
      },
      mountedReady() {
        this.mountedLoad()
      },
      transmitEvent(e) {
        this.$emit(e.type.replace(/^on/, ''), e)
      },
      reload() {
        this && this.BMap && this.$nextTick(() => {
          this.unload()
          this.$nextTick(() => {
            this.load();
            this.mountedLoad();
          })
        })
      },
      unload() {
        const { map, originInstance } = this
        try {
          switch (prop.type) {
            case 'search':
              return originInstance.clearResults()
            case 'autoComplete':
            case 'lushu':
              return originInstance.dispose()
            case 'markerClusterer':
              return originInstance.clearMarkers()
            default:
              map[types[prop.type].unload](originInstance)
          }
        } catch (e) { }
      },
      mountedLoad() { }
    },
  };
}

export default type => getMixin({ type });
