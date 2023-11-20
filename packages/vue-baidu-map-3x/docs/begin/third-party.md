# 第三方组件

第三方组件是对基于百度地图 JS API 开发的开源库的封装，该分类中的组件不参与全局注册，请根据使用频度需求自行进行全局 / 局部注册。

## 示例

### 全局注册

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import {BmlMarkerClusterer} from 'vue-baidu-map'

const app = createApp(App);

app.component('bml-marker-cluster', BmlMarkerClusterer)
app.mount('#app');
```

### 局部注册

```javascript
import {BmlMarkerClusterer} from 'vue-baidu-map'
export default {
  components: {
    BmlMarkerClusterer
  }
}
```
