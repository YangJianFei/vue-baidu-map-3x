<!--
 * @Description:   
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2026-05-07 10:36:52
 * @LastEditTime: 2026-05-07 11:28:55
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/components/advert-wx copy.vue
-->
<!--
 * @Description:
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2026-04-13 14:56:39
 * @LastEditTime: 2026-05-07 10:36:52
 * @LastEditors: YangJianFei 1294485765@qq.com
 * @FilePath: /vue-baidu-map-3x/docs/.vitepress/components/advert-wx.vue
-->
<template>
  <teleport to="body">
    <div v-if="showModal" class="advert-modal-mask">
      <div class="advert-modal">
        <div class="advert-modal-title">请使用微信扫码完成广告观看</div>
        <div class="advert-modal-tip">
          访问文档需要完成一次广告观看，完成后会自动关闭当前弹窗。
        </div>

        <div class="advert-qrcode-box">
          <div v-if="qrExpired" class="advert-qrcode-expired">二维码已失效</div>
          <img
            v-if="qrcodeData && !qrExpired"
            class="advert-qrcode"
            :src="qrcodeData"
            alt="微信小程序二维码"
          />
          <div v-else-if="!qrExpired" class="advert-qrcode-placeholder">
            二维码加载中...
          </div>
          <div v-else class="advert-qrcode-placeholder">请刷新获取新二维码</div>
        </div>

        <div class="advert-status" :class="statusClass">
          {{ statusText }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import "../plugin/detector.js";

const LOCAL_STORAGE_KEY = "ad-watch-user-key";
const STATUS_API = "/api/v1/web/ad-watch/status";
const QRCODE_API = "/api/v1/web/system/getQrcode";

const userKey = ref("");
const qrcodeData = ref("");
const showModal = ref(false);
const loading = ref(false);
const watched = ref(false);
const errorMessage = ref("");
const qrExpired = ref(false);

const POLL_INTERVAL = 3000;
const POLL_TIMEOUT = 180000;
let pollTimer: number | null = null;
let timeoutTimer: number | null = null;

devtoolsDetector.addListener((isOpen) => {
  if (isOpen) {
    document.write("");
  }
});

devtoolsDetector.launch();

const statusText = computed(() => {
  if (errorMessage.value) {
    return errorMessage.value;
  }
  if (watched.value) {
    return "广告已观看";
  }
  if (qrExpired.value) {
    return "二维码已失效";
  }
  if (loading.value) {
    return "正在准备二维码...";
  }
  if (showModal.value) {
    return "二维码已展示，请扫码";
  }
  return "待观看";
});

const statusClass = computed(() => {
  if (errorMessage.value || qrExpired.value) {
    return "is-error";
  }
  if (watched.value) {
    return "is-success";
  }
  if (loading.value) {
    return "is-loading";
  }
  return "is-pending";
});

function getStoredUserKey() {
  if (typeof window === "undefined") {
    return "";
  }

  const storedUserKey = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedUserKey) {
    return storedUserKey;
  }

  const randomKey = createUserKey();
  window.localStorage.setItem(LOCAL_STORAGE_KEY, randomKey);
  return randomKey;
}

function createUserKey() {
  const seed = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
  return `u_${seed}`.slice(0, 32);
}

function getApiBaseUrl() {
  return "https://api.heifa.site:4000";
  if (window.location.hostname === "localhost") {
    return `${window.location.protocol}//localhost:30001`;
  }

  return window.location.origin;
}

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`请求失败: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

async function fetchWatchStatus(currentUserKey: string) {
  const result = await requestJson<{
    code: number;
    data: { userKey: string; watched: boolean } | boolean;
    msg: string;
  }>(
    `${getApiBaseUrl()}${STATUS_API}?t=${Date.now()}&userKey=${encodeURIComponent(
      currentUserKey
    )}`
  );

  if (result.code !== 200 || typeof result.data !== "object" || result.data === null) {
    throw new Error(result.msg || "广告状态查询失败");
  }

  return result.data.watched;
}

async function fetchQrcode(currentUserKey: string) {
  const result = await requestJson<{
    code: number;
    data: string | boolean;
    msg: string;
  }>(`${getApiBaseUrl()}${QRCODE_API}?userKey=${encodeURIComponent(currentUserKey)}`);

  if (result.code !== 200 || typeof result.data !== "string") {
    throw new Error(result.msg || "二维码获取失败");
  }

  const qrcodeErrorMessage = parseQrcodeErrorMessage(result.data);
  if (qrcodeErrorMessage) {
    throw new Error(qrcodeErrorMessage);
  }

  return result.data;
}

function parseQrcodeErrorMessage(qrcodeDataUrl: string) {
  const base64Prefix = "data:image/png;base64,";
  if (!qrcodeDataUrl.startsWith(base64Prefix)) {
    return "";
  }

  try {
    const rawText = window.atob(qrcodeDataUrl.slice(base64Prefix.length));
    const payload = JSON.parse(rawText);
    if (payload?.errmsg) {
      return `二维码生成失败: ${payload.errmsg}`;
    }
  } catch (error) {
    return "";
  }

  return "";
}

function clearPollTimers() {
  if (pollTimer !== null) {
    window.clearTimeout(pollTimer);
    pollTimer = null;
  }
  if (timeoutTimer !== null) {
    window.clearTimeout(timeoutTimer);
    timeoutTimer = null;
  }
}

function startStatusPolling(currentUserKey: string) {
  clearPollTimers();

  const poll = async () => {
    try {
      const hasWatched = await fetchWatchStatus(currentUserKey);
      if (hasWatched) {
        watched.value = true;
        errorMessage.value = "";
        showModal.value = false;
        clearPollTimers();
        return;
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : "广告状态查询失败";
    }

    if (!watched.value && !qrExpired.value) {
      pollTimer = window.setTimeout(poll, POLL_INTERVAL);
    }
  };

  timeoutTimer = window.setTimeout(() => {
    if (!watched.value) {
      qrExpired.value = true;
      errorMessage.value = "";
      clearPollTimers();
    }
  }, POLL_TIMEOUT);

  poll();
}

async function loadQrcode(currentUserKey: string) {
  qrcodeData.value = await fetchQrcode(currentUserKey);
}

async function initAdWatch() {
  if (typeof window === "undefined") {
    return;
  }

  loading.value = true;
  errorMessage.value = "";
  watched.value = false;
  qrExpired.value = false;
  qrcodeData.value = "";
  clearPollTimers();

  try {
    const currentUserKey = getStoredUserKey();
    userKey.value = currentUserKey;

    const hasWatched = await fetchWatchStatus(currentUserKey);
    watched.value = hasWatched;

    if (hasWatched) {
      showModal.value = false;
      return;
    }

    showModal.value = true;
    await loadQrcode(currentUserKey);
    startStatusPolling(currentUserKey);
  } catch (error) {
    showModal.value = true;
    errorMessage.value = error instanceof Error ? error.message : "广告能力初始化失败";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  initAdWatch();
});

onBeforeUnmount(() => {
  clearPollTimers();
});
</script>

<style lang="scss" scoped>
.advert-modal-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.56);
}

.advert-modal {
  width: min(92vw, 360px);
  padding: 24px;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.22);
  text-align: center;
}

.advert-modal-title {
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--c-text);
}

.advert-modal-tip {
  color: var(--c-text-light);
  line-height: 1.6;
}

.advert-qrcode-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 232px;
  margin: 16px 0 12px;
  padding: 16px;
  border-radius: 16px;
  background: radial-gradient(circle at top, rgba(62, 175, 124, 0.12), transparent 50%),
    #f8fbfa;
  overflow: hidden;
}

.advert-qrcode {
  display: block;
  width: min(100%, 220px);
  height: auto;
  border-radius: 12px;
  background: #fff;
}

.advert-qrcode-placeholder {
  color: var(--c-text-light);
}

.advert-qrcode-expired {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(197, 63, 63, 0.12);
  color: #c53f3f;
  font-size: 12px;
  font-weight: 700;
}

.advert-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 40px;
  padding: 0 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
}

.advert-status.is-success {
  color: #0f8f57;
  background: #e8f8ef;
}

.advert-status.is-loading {
  color: #8c5d00;
  background: #fff4d6;
}

.advert-status.is-error {
  color: #c53f3f;
  background: #fff1f0;
}

.advert-status.is-pending {
  color: #0066cc;
  background: #edf5ff;
}
</style>
