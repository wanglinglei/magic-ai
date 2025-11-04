import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import 'uno.css';
import '@/assets/css/main.css';
// 为 docx-templates 提供 Buffer polyfill
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount('#app');
