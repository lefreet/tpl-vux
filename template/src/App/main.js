import Vue from 'vue'
import FastClick from 'fastclick'
import axios from 'axios'
import App from './app'
import router from './router'
import store from './store'

// hack移动端点击延迟
FastClick.attach(document.body)

// 手动引用ajax插件
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://192.168.116.199:9135/'
  // axios.defaults.baseURL = 'http://localhost:8080'
}
Vue.prototype.$http = axios

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')