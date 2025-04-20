import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

window._audioCache = {} // Clear audio cache on reload

new Vue({
  render: (h) => h(App)
}).$mount('#app')
