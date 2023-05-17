import { createApp } from 'vue'
import { createHead } from '@vueuse/head'

import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(router)
app.use(head)

app.mount('#app')
