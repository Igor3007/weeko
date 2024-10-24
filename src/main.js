import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { globalConfig } from './config/global'
import ru from './lang/ru'


Vue.config.productionTip = false
Vue.prototype.$global = globalConfig
Vue.prototype.lang = ru

new Vue({
  mounted() {
    this.setActiveTheme()

    console.log(this.userConfig)
 
  },
  router,
  store,
  computed: {
    userConfig() {
      return this.$store.state.userConfig
    }
  },
  methods: {
    setActiveTheme() {
      
      let htmlElement = document.documentElement;
       
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

      switch(this.userConfig.theme) {
        case 'dark' : htmlElement.setAttribute('theme', 'dark'); break;
        case 'default' : htmlElement.removeAttribute('theme'); break;

        default: 
          if(darkThemeMq.matches) {
            htmlElement.setAttribute('theme', 'dark')
          }
      }

      
    }
  },
  render: h => h(App)
}).$mount('#app')