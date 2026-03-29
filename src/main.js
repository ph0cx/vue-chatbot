import { createApp } from 'vue'
import App from './App.vue'

window._audioCache = {} // Clear audio cache on reload

// For compiled scripts, document.currentScript is null in ESM.
// We look for the script tag that has our dataset or the one that loaded the script.
const scriptTag = document.querySelector('script[data-selected-state]') || 
                  document.querySelector('script[src*="main.js"]') ||
                  document.querySelector('script[src*="index"]');
const options = scriptTag ? scriptTag.dataset : {}

const app = createApp(App, {
  userOptions: options
})
app.mount('#chatbot')
