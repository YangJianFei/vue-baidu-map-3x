/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, April 27th 2022, 6:26:23 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 瑞为
 */
<template>
  <div class="code-contain">
    <div v-if="show" class="code-slot">
      <slot></slot>
    </div>
    <div v-if="show" ref="highlight" class="highlight-content" :style="{height:showHightlight?highlightHeight:0}" v-html="content"></div>
    <div class="code-operate-contain grid-3">
      <span></span>
      <a href="#" @click="handleShowCode">
        <span class="trangle move" :class="showHightlight?'open':''"></span>
        <span class="move">{{showHightlight?'隐藏代码':'显示代码'}}</span>
      </a>
      <a class="move btnCopy" v-show="showHightlight" href="#" @click="handleCopy">复制代码</a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeMount } from "@vue/runtime-core";
import ClipboardJS from 'clipboard';

const props = defineProps({
  highligh: {
    default: ''
  }
});

const highlight = ref(null);
const highlightHeight = ref(0);
const show = ref(false);
const showHightlight = ref(false);
const content = computed(() => decodeURIComponent(props.highligh));

const handleShowCode = () => {
  if (!highlightHeight.value) {
    highlightHeight.value = getComputedStyle(highlight.value.firstChild).height;
  }
  showHightlight.value = !showHightlight.value;
};

const handleCopy = () => {
  const clipboard = new ClipboardJS('.btnCopy', {
    target: (trigger) => highlight.value.getElementsByTagName('code')[0]
  });

  clipboard.on('success', function (e) {
    clipboard.destroy();
  });

  clipboard.on('error', function (e) {
    clipboard.destroy();
  });
};

onBeforeMount(() => {
  show.value = true;
});
</script>

<style lang="scss">
.code-contain {
  margin: 12px 0;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  &:hover {
    box-shadow: 0 0 8px 0 rgb(232 237 250 / 60%),
      0 2px 4px 0 rgb(232 237 250 / 50%);
    .code-operate-contain .move {
      transform: translateX(0);
      opacity: 1;
    }
    .code-operate-contain .trangle {
      border-top-color: inherit;
      &.open {
        border-top-color: transparent;
        border-bottom-color: inherit;
      }
    }
  }
  .code-slot {
    padding: 24px;
  }
  .highlight-content {
    overflow: hidden;
    transition: height 0.2s;
  }
  .language-html {
    margin: 0;
    border-radius: 0;
  }
  .code-operate-contain {
    position: sticky;
    bottom: 0;
    height: 45px;
    border-top: 1px solid #ebebeb;
    background: white;
    z-index: 10;
    line-height: 45px;
    text-align: center;
    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
    .move {
      display: inline-block;
      transition: all 0.3s;
      transform: translateX(30px);
      opacity: 0;
    }
    .trangle {
      position: relative;
      top: 4px;
      right: 12px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-color: rgb(211, 220, 230);
      opacity: 1 !important;
      &.open {
        top: -3px;
        border-top-color: transparent;
        border-bottom-color: rgb(211, 220, 230);
      }
    }
  }
}
</style>