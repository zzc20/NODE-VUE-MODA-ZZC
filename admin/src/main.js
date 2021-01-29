import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// 导入request请求
import request from './network/request'
//将请求直接添加到vue实例属性上面，在各个页面用this可以直接调用
Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
