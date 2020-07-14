import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import $request from "./api/request"
import $utils from "./utils/utils"
import toast from "./plugins/toast/index"
import confirm from './plugins/message/message'
import loading from './plugins/loading/loading'

import "babel-polyfill"
import './utils/amfe-flexible'

Vue.config.productionTip = false;

Vue.prototype.$request = $request
Vue.prototype.$utils = $utils

Vue.use(toast)
Vue.use(confirm)
Vue.use(loading)

Vue.config.errorHandler = function (err, vm, info) {
  console.log('vue error')
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
  let error = {
    error: `${err.toString()}`,
    info: `${info}`,
    channelName: localStorage.getItem('channelName'),
    classCode: localStorage.getItem('classCode')
  }
}

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
