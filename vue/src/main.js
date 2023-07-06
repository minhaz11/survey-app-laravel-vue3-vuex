import { createApp } from 'vue'

import './input.css'
import App from './App.vue'
import Store from './store/store.js'
import Router from './router/routes.js'


createApp(App)
.use (Store)
.use (Router)
.mount('#app')
