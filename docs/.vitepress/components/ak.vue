<!--
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2025-09-10 15:20:25
 * @LastEditTime: 2025-09-10 15:59:50
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/components/ak.vue
-->
<template>
  <div class="contain">
    <textarea class="input" v-model="userAk" placeholder="请输入百度ak" />
    <div class="flex">
      <button class="button" @click="onResetClick">重置</button>
      <button class="button" @click="onClick">录入并刷新</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { vue3xAk } from "../theme/config";

const userAk = ref();

const onResetClick = () => {
  userAk.value = undefined;
  localStorage.removeItem("userAk");
  window.location.reload();
};

const onClick = () => {
  if (userAk.value) {
    if (userAk.value != vue3xAk) {
      localStorage.setItem("userAk", userAk.value);
    }
    window.location.reload();
  } else {
    alert("请输入百度ak");
  }
};

onMounted(() => {
  const ak = localStorage.getItem("userAk");
  if (ak && ak != vue3xAk) {
    userAk.value = ak;
  }
});
</script>

<style lang="scss" scoped>
.contain {
  padding: 16px 16px 0;
}
.input {
  width: 100%;
  border: 1px solid rgba(60, 60, 60, 0.29);
  border-radius: 4px;
  padding: 0.2em 0.6em;
  background: transparent;
  transition: background-color 0.5s;
}
.flex {
  display: flex;
}
.button {
  flex: 1;
  height: 28px;
  cursor: pointer;
  border: 1px solid rgba(60, 60, 60, 0.29);
  background: transparent;
  border-radius: 4px;
  color: #333;
  & + & {
    margin-left: 4px;
  }
}
</style>
