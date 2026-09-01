import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { motionDirectives } from './directives'
import './assets/main.css'

createApp(App).use(router).use(motionDirectives).mount('#app')
