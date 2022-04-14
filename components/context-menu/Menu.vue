<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import commonMixin from '../base/mixins/common.js'

export default {
  name: 'bm-context-menu',
  props: {
    width: {
      type: Number
    }
  },
  mixins: [commonMixin('contextMenu')],
  methods: {
    load() {
      const { width, BMap, map, $parent } = this
      const parent = this.parent = $parent.originInstance || map
      if (this.originInstance) {
        parent.removeContextMenu(this.originInstance)
      }
      const menu = this.originInstance = new BMap.ContextMenu()
      if (this.$slots.default) {
        for (const item of this.$slots.default() || []) {
          const props = item.props;
          if (props.seperator) {
            menu.addSeparator()
            continue
          }
          const menuItem = new BMap.MenuItem(props.text, function (point, pixel) {
            props.callback({
              point,
              pixel,
              BMap,
              map,
              target: parent
            })
          }, {
            width,
            id: props.id,
            iconUrl: props.iconUrl
          })
          props.disabled ? menuItem.disable() : menuItem.enable()
          props.originInstance = menuItem
          menu.addItem(menuItem)
        }
      }
      parent.addContextMenu(menu)
    }
  }
}
</script>
