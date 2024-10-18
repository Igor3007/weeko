import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import {
  globalConfig
} from './config/global'

Vue.config.productionTip = false
Vue.prototype.$global = globalConfig
Vue.prototype.lang = store.dispatch('fetchLang').then

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')