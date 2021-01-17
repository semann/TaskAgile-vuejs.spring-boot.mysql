import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuelidate from 'vuelidate'

// axios 부트스트랩
axios.defaults.baseURL = '/api'
axios.defaults.headers.common.Accept = 'application/json'
axios.interceptors.response.use(
  response => response,
  (error) => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
