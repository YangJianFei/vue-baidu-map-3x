<!--
 * @Description:   
 * @Author: YangJianFei
 * @Date: 2023-03-16 17:40:21
 * @LastEditTime: 2023-03-16 17:48:15
 * @LastEditors: YangJianFei
 * @FilePath: \vue-baidu-map-3x\docs\.vitepress\components\advert-card.vue
-->

<template>
  <div class="advert-wrap">
    <span class="advert-label">广告</span>
    <div class="advert-card">
      广告位招租
    </div>
    <div class="grid-2">
      <span>联系微信</span>
      <div class="txc-primary tx-right">yjf163163</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

</script>

<style lang="scss" scoped>
.advert-card {
  height: 80px;
  border-radius: 4px;
  text-align: center;
  color: #f3f3f3;
  line-height: 80px;
  font-size: 24px;
  font-weight: bold;
  background-color: #1fc8db;
  background-image: linear-gradient(140deg, #EADEDB 0%, #BC70A4 50%, #BFD641 75%);
}
</style>