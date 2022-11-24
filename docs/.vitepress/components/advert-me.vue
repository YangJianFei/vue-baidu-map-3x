/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Thursday, November 24th 2022, 2:42:26 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */

<template>
  <div class="advert-me">
    <span class="advert-label">广告</span>
    <div class="grid-2">
      <span>🐝</span>
      <div class="txc-primary">{{introMe.name}}</div>
      <div>求职位：</div>
      <div class="txc-primary">{{introMe.job}}</div>
      <div>微信：</div>
      <div class="txc-primary">{{introMe.wx}}</div>
      <div>学历：</div>
      <div class="txc-primary">{{introMe.school}}</div>
      <div>出生日期：</div>
      <div class="txc-primary">{{introMe.birthday}}</div>
      <div>工作地：</div>
      <div class="txc-primary">{{introMe.address}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const introMe = ref({
  job: '高级前端',
  name: '杨剑飞',
  wx: 'yjf163163',
  school: '本科',
  birthday: '1993-04',
  address: '深圳/重庆'
});

</script>

<style lang="scss" scoped>
.advert-me {
  padding: 10px 20px;
  border-bottom: 1px solid var(--c-divider);
  font-size: 14px;
}
</style>