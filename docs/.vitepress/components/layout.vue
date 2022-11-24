/*
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Tuesday, September 13th 2022, 2:37:53 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */
<template>
  <Layout>
    <template #daily>
      <DailySentence />
    </template>
    <template #sidebar-top>
      <AdvertMe />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import DailySentence from './daily-sentence.vue';
import AdvertMe from './advert-me.vue';

const Layout = DefaultTheme.Layout;
</script>

<style lang="scss" scoped>
</style>

