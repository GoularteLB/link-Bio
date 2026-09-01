import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { motionDirectives } from './directives'
import './assets/main.css'

const app = createApp(App).use(router).use(motionDirectives)

router.isReady().then(() => app.mount('#app'))
