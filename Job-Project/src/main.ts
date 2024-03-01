import './assets/base.css'
import './assets/briefIntroduction.css'
import './assets/index.css'
import './assets/initialize.css'
import './assets/position.css'
import './assets/problem.css'
import './assets/public.css'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/router'
import index from './index.vue'

const idex = createApp(index)
idex.use(router)
idex.use(ElementPlus)
idex.mount('#index')