import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import 'uno.css';
import '@/assets/css/main.css';

import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css';
initAMapApiLoader({
  key: import.meta.env.VITE_MAP_KEY,
  securityJsCode: import.meta.env.VITE_MAP_SECURITY,
});
// 为 docx-templates 提供 Buffer polyfill
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAMap);
app.use(ElementPlus);

app.mount('#app');
