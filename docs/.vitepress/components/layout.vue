<!--
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2024-12-25 16:49:12
 * @LastEditTime: 2026-05-07 11:48:47
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/components/layout.vue
-->
<template>
  <Layout>
    <template #daily>
      <DailySentence />
    </template>
    <template #sidebar-top>
      <Ak />
      <AdvertWx />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import DailySentence from "./daily-sentence.vue";
// import AdvertCard from './advert-card.vue';
import Ak from "./ak.vue";
import AdvertWx from "./advert-wx.vue";

const Layout = DefaultTheme.Layout;
</script>

<style lang="scss" scoped></style>
