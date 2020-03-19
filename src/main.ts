import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import store from './store'

import 'assets/scss/index.scss'

// @ts-ignore
fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
