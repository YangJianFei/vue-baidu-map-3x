import { createApp } from 'vue'
import App from './App.vue'
// import BaiduMap from 'c'
import Router from './router';
import '@/assets/css/common.scss'

const app = createApp(App);

// app.use(BaiduMap, {
//     ak: 'Yp57V71dkOPiXjiN8VdcFRsVELzlVNKK',
//     // v: '2.0',
//     // type: 'WebGL'
// });
app.use(Router);
app.mount('#app');
