/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Wednesday, September 28th 2022, 5:47:42 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
<template>
  <div class="download-wrap">
    <h2 ref="$div">
      ⬇️{{name}}
      <span v-show="showData">
        {{activeIndex>-1?numData[activeIndex].day:''}}
        <span class="download-wrap-num"> {{activeIndex>-1?numData[activeIndex].num:''}}</span>
      </span>
    </h2>
    <svg ref="$svg" class="sparkline" :width="svgWidth" height="300" stroke-width="3">
      <text v-if="showError" font-size="20" x="50%" text-anchor="middle" y="50%" style="stroke-width: 1;">{{errorTip}}</text>
    </svg>
    <Loading v-if="isLoading" content="获取数据中" />
  </div>
</template>

<script setup>
import sparkline from '@fnando/sparkline';
import { ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'vue-baidu-map-3x'
  }
});

const $svg = ref('');
const $div = ref('');
const svgWidth = ref(400);
const errorTip = ref('浏览器版本过低不支持fetch，请升级后查看！');
const showError = ref(false);
const isLoading = ref(false);
const numData = ref([]);
const showData = ref(false);
const activeIndex = ref(-1);

const onMouseMove = (e, data) => {
  activeIndex.value = data.index;
  showData.value = true;
};

const onMouseout = () => {
  showData.value = false
};

const generalSvg = (res) => {
  let arr = [];
  let num = 0;
  let index = 0;
  const restNum = res.downloads.length % 7;
  if (restNum) {
    res.downloads.splice(0, restNum);
  }
  res.downloads.forEach((item, i) => {
    index = i + 1;
    num += item.downloads;
    if (index % 7 == 0) {
      arr.push({
        day: res.downloads[index - 7].day + '~' + item.day,
        num
      });
      num = 0;
    } else {
    }
  });
  numData.value = arr;
  nextTick(() => {
    let fun = sparkline;
    if (typeof sparkline !== 'function') {
      fun = sparkline.default;
    }
    fun($svg.value, arr.map(item => item.num), {
      onmousemove: onMouseMove,
      onmouseout: onMouseout
    });
  });
};

onMounted(() => {
  svgWidth.value = parseInt(getComputedStyle($div.value).width);
  if (window.fetch) {
    isLoading.value = true;
    const oneDay = 24 * 60 * 60 * 1000;
    const date = new Date(new Date().getTime() - oneDay);
    const yearAgo = new Date(new Date().getTime() - oneDay * 366);
    fetch(`https://api.npmjs.org/downloads/range/${yearAgo.getFullYear()}-${yearAgo.getMonth() + 1}-${yearAgo.getDate()}:${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/${props.name}`)
      .then(data => data.json()).then(res => {
        generalSvg(res);
      }).catch(() => {
        errorTip.value = '获取数据失败，请稍后重试！';
      }).finally(() => {
        isLoading.value = false;
      });
  } else {
    showError.value = true;
  }
});
</script>

<style lang="scss" scoped>
.download-wrap {
  position: relative;
  .download-wrap-num {
    float: right;
    font-size: 20px;
    color: rgb(137, 86, 255);
  }
}
.sparkline {
  stroke-width: 3;
  stroke: rgb(137, 86, 255);
  fill: rgba(137, 86, 255, 0.2);
  text {
    stroke-width: 1;
    fill: black;
  }
}
</style>