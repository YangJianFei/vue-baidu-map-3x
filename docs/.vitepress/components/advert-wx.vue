<!--
 * @Description:
 * @Author: YangJianFei 1294485765@qq.com
 * @Date: 2026-04-13 14:56:39
 * @LastEditTime: 2026-05-07 14:33:13
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
          <img
            v-if="qrcodeData"
            class="advert-qrcode"
            :src="qrcodeData"
            alt="微信小程序二维码"
          />
          <div v-else class="advert-qrcode-placeholder">二维码加载中...</div>
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

const LOCAL_STORAGE_KEY = "ad-watch-user-key";
const STATUS_API = "/api/v1/web/ad-watch/status";
const QRCODE_API = "/api/v1/web/system/getQrcode";
const WS_PATH = "/ws/ad-watch";

const userKey = ref("");
const qrcodeData = ref("");
const showModal = ref(false);
const loading = ref(false);
const watched = ref(false);
const errorMessage = ref("");
const wsConnected = ref(false);

let socket: WebSocket | null = null;

const statusText = computed(() => {
  if (errorMessage.value) {
    return errorMessage.value;
  }
  if (watched.value) {
    return "广告已观看";
  }
  if (loading.value) {
    return "正在准备二维码...";
  }
  if (showModal.value) {
    return wsConnected.value ? "等待广告完成通知..." : "二维码已展示，请扫码";
  }
  return "待观看";
});

const statusClass = computed(() => {
  if (errorMessage.value) {
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

function getWsUrl(currentUserKey: string) {
  const apiBaseUrl = new URL(getApiBaseUrl());
  const protocol = apiBaseUrl.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${apiBaseUrl.host}${WS_PATH}?userKey=${encodeURIComponent(
    currentUserKey
  )}`;
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
  }>(
    `${getApiBaseUrl()}${QRCODE_API}?t=${Date.now()}&userKey=${encodeURIComponent(
      currentUserKey
    )}`
  );

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

function handleAdStatusMessage(payload: { watched?: boolean; userKey?: string }) {
  if (payload.userKey && payload.userKey !== userKey.value) {
    return;
  }

  if (payload.watched) {
    watched.value = true;
    errorMessage.value = "";
    showModal.value = false;
    closeSocket();
  }
}

function openSocket(currentUserKey: string) {
  closeSocket();

  socket = new WebSocket(getWsUrl(currentUserKey));

  socket.onopen = () => {
    wsConnected.value = true;
  };

  socket.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data);
      if (payload.type === "ad-status") {
        handleAdStatusMessage(payload);
      }
    } catch (error) {
      console.error("ad-watch websocket message parse error", error);
    }
  };

  socket.onerror = () => {
    errorMessage.value = "监听连接失败，请稍后重试";
  };

  socket.onclose = () => {
    wsConnected.value = false;
    socket = null;
  };
}

function closeSocket() {
  if (!socket) {
    wsConnected.value = false;
    return;
  }

  socket.close();
  socket = null;
  wsConnected.value = false;
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
  qrcodeData.value = "";
  closeSocket();

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
    openSocket(currentUserKey);
  } catch (error) {
    showModal.value = true;
    errorMessage.value = error instanceof Error ? error.message : "广告能力初始化失败";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  if (!document.querySelector("#detector")) {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/devtools-detector@2.0.25/lib/devtools-detector.js";
    script.id = "detector";
    document.body.appendChild(script);
  }
  setTimeout(() => {
    initAdWatch();

    devtoolsDetector?.addListener?.((isOpen) => {
      if (isOpen) {
        document.write("");
      }
    });

    devtoolsDetector?.launch?.();
  }, 1000 * 5);
});

onBeforeUnmount(() => {
  closeSocket();
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
