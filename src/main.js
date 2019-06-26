import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Icon from 'vue-svg-icon/Icon.vue'
import Alert from './components/common/alert/alert'
import Vue2TouchEvents from 'vue2-touch-events'
import 'normalize.css'
import './style/global.scss'

Vue.config.productionTip = false

Vue.component('icon', Icon)

Vue.prototype.$Alert = Alert

Vue.use(Vue2TouchEvents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
