import { createApp } from 'vue'
import App from './App.vue'

window._audioCache = {} // Clear audio cache on reload

// For compiled scripts, document.currentScript is null in ESM.
// We look for the script tag that has our dataset or the one that loaded the script.
const scriptTag = document.querySelector('script[data-selected-state]') ||
                  document.querySelector('script[src*="main.js"]') ||
                  document.querySelector('script[src*="index"]')
const options = scriptTag ? scriptTag.dataset : {}

const app = createApp(App, {
  userOptions: options
})

// Ensure there is a mounting point
let chatbotContainer = document.getElementById('chatbot')
if (!chatbotContainer) {
  chatbotContainer = document.createElement('div')
  chatbotContainer.id = 'chatbot'
  // Make container invisible while allowing children to be visible
  chatbotContainer.style.position = 'fixed'
  chatbotContainer.style.bottom = '0'
  chatbotContainer.style.right = '0'
  chatbotContainer.style.width = '0'
  chatbotContainer.style.height = '0'
  chatbotContainer.style.overflow = 'visible'
  chatbotContainer.style.zIndex = '9999'
  chatbotContainer.style.pointerEvents = 'none'
  document.body.appendChild(chatbotContainer)
}

app.mount(chatbotContainer)



