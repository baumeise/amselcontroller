import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import plugins from './plugins'

Vue.use(Vuex)
Vue.use(plugins)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
