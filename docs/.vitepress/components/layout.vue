<!--
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2024-12-25 16:49:12
 * @LastEditTime: 2025-09-10 15:29:32
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/components/layout.vue
-->
/* * Author: yang jian fei * Email: 1294485765@qq.com * Created Date: Tuesday, September
13th 2022, 2:37:53 pm * Modified By: yang jian fei * Desc: desc * Copyright (c) 2022 黑发
*/
<template>
  <Layout>
    <template #daily>
      <DailySentence />
    </template>
    <template #sidebar-top>
      <Ak />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import DailySentence from "./daily-sentence.vue";
// import AdvertCard from './advert-card.vue';
import Ak from "./ak.vue";

const Layout = DefaultTheme.Layout;
</script>

<style lang="scss" scoped></style>
