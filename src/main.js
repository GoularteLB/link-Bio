import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { motionDirectives } from './directives'
import { initTheme } from './composables/useTheme'
import { initLocale } from './i18n'
import './assets/main.css'

initTheme()
initLocale()

const app = createApp(App).use(router).use(motionDirectives)

router.isReady().then(() => app.mount('#app'))
