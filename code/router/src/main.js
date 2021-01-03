import Vue from 'vue'
import App from './page'
import router from './route';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
