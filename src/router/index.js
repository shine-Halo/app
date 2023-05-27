import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//最初参数的push和replace
const originpush = VueRouter.prototype.push
const originreplace = VueRouter.prototype.replace
//修改参数后的push和replace
VueRouter.prototype.push = function(num,resolve,reject) {
    if(resolve || reject) {
        originpush.call(this,num,resolve,reject)
    }else {
        originpush.call(this,num,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(num,resolve,reject) {
    if(resolve || reject) {
        originreplace.call(this,num,resolve,reject)
    }else {
        originreplace.call(this,num,()=>{},()=>{})
    }
}

export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            //路由元信息，key是配置自带的名字
            meta:{show:true}
        },
        {
            path:'/login',
            component:Login,
            meta:{show:false}
        },
        {
            path:'/register',
            component:Register,
            meta:{show:false}
        },
        {
            path:'/search',
            name:'search',
            component:Search,
            meta:{show:true}
        },
        //重定向，在项目跑起来的时候，访问/,立马让他定向到首页
        {
            path:'*',
            redirect:'/home'

        }
        

    ]
})