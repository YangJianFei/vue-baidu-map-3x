/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 28th 2022, 4:16:08 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
<template>
  <div class="load-wrap">
    <svg class="load-wrap-spinner" width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle class="load-wrap-path" fill="none" stroke-width="3" stroke-linecap="round" cx="20" cy="20" r="15" />
    </svg>
    <div class="load-wrap-content" v-if="content">{{content}}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  content: ''
});
</script>

<style lang="scss" scoped>
.load-wrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: hsla(0, 0%, 100%, 0.9);
  z-index: 100;
  transition: opacity 0.3s;
  .load-wrap-content {
    margin-top: 12px;
    font-size: 16px;
    color: #5e6d82;
  }
  .load-wrap-spinner {
    animation: rotator 1.4s linear infinite;
  }
  .load-wrap-path {
    stroke-dasharray: 127;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash 1.4s ease-in-out infinite,
      colors (1.4s * 4) ease-in-out infinite;
  }
}
@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 127;
  }
  50% {
    stroke-dashoffset: 50.8;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: 127;
    transform: rotate(450deg);
  }
}
</style>