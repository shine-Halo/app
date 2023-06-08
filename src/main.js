import Vue from 'vue'
import App from './App.vue'
//设置全局组件
//设置三级联动的全局组件
import Typenav from '@/components/Typenav'
import Carousel from '@/components/Carousel'
import Pagnation from '@/components/Pagination'
import { Button,MessageBox } from 'element-ui'
Vue.component(Typenav.name,Typenav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagnation.name,Pagnation)
Vue.component(Button.name,Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入路由
import router from '@/router'

import store from '@/store'
import '@/mock/mockServer'
import "swiper/css/swiper.css"
import * as API from '@/api'

Vue.config.productionTip = false
import '@/plugins/validate' //引入表单验证
import VueLazyload from 'vue-lazyload'//图片懒加载
import jingling from '@/assets/jingling.png'
Vue.use(VueLazyload, {
  loading:jingling
});
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API  //vc可以访问到vue原型上的属性和方法
  },
  router,
  store
}).$mount('#app')
