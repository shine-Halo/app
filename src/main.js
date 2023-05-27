import Vue from 'vue'
import App from './App.vue'
//设置三级联动的全局组件
import Typenav from '@/components/Typenav'
Vue.component(Typenav.name,Typenav)

//引入路由
import router from './router'

import store from '@/store'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
