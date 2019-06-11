import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Icon from 'vue-svg-icon/Icon.vue'
import Alert from './components/common/alert/alert'
import 'normalize.css'
import './style/global.scss'

Vue.config.productionTip = false

Vue.component('icon', Icon)

Vue.prototype.$Alert = Alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
