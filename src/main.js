import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'c'
import Router from './router';
import '@/assets/css/common.scss'

const app = createApp(App);

app.use(BaiduMap, {
    ak: 'rlgqKI41z2TzKv9mpVb60LiZptSguMBU'
});
app.use(Router);
app.mount('#app');
