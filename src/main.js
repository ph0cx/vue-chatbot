import { createApp } from 'vue'
import App from './App.vue'

window._audioCache = {} // Clear audio cache on reload

const app = createApp(App)
app.mount('#app')
