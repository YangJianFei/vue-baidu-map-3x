/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, September 8th 2022, 2:41:13 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */


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

class Mixin {
  constructor(prop) {
    this.emits = ['ready'];
    this.methods = {
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
    }
    this.computed = {
      renderByParent() {
        return this.$parent.preventChildrenRender
      }
    }
    this.created = function () {
      const $parent = getParent(this.$parent)
      const map = $parent.map
      const { ready } = this
      map ? ready() : EvenBus.$on('ready', ready);
      EvenBus.$on('init', this.init);
    }
    this.mounted = function () {
      const $parent = getParent(this.$parent)
      const map = $parent.map
      const { mountedReady } = this
      map ? mountedReady() : EvenBus.$on('ready', mountedReady);
    }
    this.unmounted = destroyInstance
  }
}

export default type => new Mixin({ type })
