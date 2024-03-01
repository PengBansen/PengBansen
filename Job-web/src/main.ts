import './assets/public.less'
import './assets/initialize.css'
import { createApp } from 'vue'
import router from './router/router'
import 'element-plus/dist/index.css';
import App from "./App.vue";
const index = createApp(App)
index.use(router)
index.mount('#router')
