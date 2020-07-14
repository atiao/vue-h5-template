import Vue from 'vue'
import loadingComponent from './loading.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
  el: document.createElement('div')
})

instance.show = false // 默认隐藏
const loading = {
  show(content) { // 显示
    instance.show = true
    instance.content = content;
    document.body.appendChild(instance.$el)
  },
  hide() { // 隐藏
    instance.show = false
  }
}

export default {
  install() {
    if (!Vue.$loading) {
      Vue.prototype.$loading = loading
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.prototype.$loading
      }
    })
  }
}
