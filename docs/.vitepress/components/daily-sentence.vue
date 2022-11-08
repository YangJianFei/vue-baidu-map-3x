/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Tuesday, November 8th 2022, 3:12:13 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

<template>
  <Transition name="fade">
    <div v-show="show" :key="1454" class="daily-sentence">{{sentence[nowIndex]}}</div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DailySentence } from '../plugin/options.js';
import { getFormartTime } from '../plugin/util';

const sentence = ref<string[]>([]);
const nowIndex = ref<number>(0);
const show = ref(false);

sentence.value = DailySentence;
nowIndex.value = Math.floor(Math.random() * sentence.value.length);


const getDailyJinShan = () => {
  const now = new Date();
  fetch('http://sentence.iciba.com/index.php?callback=wahaha&c=dailysentence&m=getdetail&title=' + getFormartTime(new Date()))
    .then(data => data.json()).then(res => {
      DailySentence.push(decodeURI(res.note));
      sentence.value = DailySentence;
      nowIndex.value = Math.random() * sentence.value.length;
    })
};

onMounted(() => {
  setTimeout(() => {
    show.value = true;

  }, 1000);
});
// getDailyJinShan();
</script>

<style lang="scss" scope>
.daily-sentence {
  padding-left: 80px;
}
</style>