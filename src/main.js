import { createApp } from 'vue'
import App from './App.vue'
import BaiduMap from 'c'
import Router from './router';
import '@/assets/css/common.scss'

const app = createApp(App);

app.use(BaiduMap, {
    // v: '2.0',
    ak: 'Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK',// 7Cc5Kmn672miPzG4qQhvlOrERcXMMinq    Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK
    type: 'WebGL'
});
app.use(Router);
app.mount('#app');
