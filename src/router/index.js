import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)

import routes from "./routes";
import store from "@/store";

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
let router =  new VueRouter({
    routes,
    //一进入detail页面就滑到上面
    scrollBehavior(to,from,savePosition){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
        return {y:0}
      }
})
router.beforeEach(async (to,from,next) => {

    let token = store.state.register.token
    let name = store.state.register.userinfo.name
    //首先判断有没有token，有的话才代表已经登陆成功了
    if(token) {
        //如果已经登录成功要去注册或者登陆界面的话直接放行到home组件页面
        if(to.path == '/login' || to.path == '/register') {
            next('/home')
        }else {
            //如果是去除了注册和登录的界面以外的界面，如果有了用户信息里面的name
            if(name) {
                //那么直接放行
                next()
            }else{
                //如果没有向服务器要到用户信息的name数据
                try {
                    //将函数派发到actions，如果成功了，就放行
                    await store.dispatch('getuserinfo')
                    next()
                } catch (error) {
                    //如果没有成功，可能数据已经过期，那么重新跳到登陆页面，删除token数据，之前已经写过
                    await store.dispatch('outregister')
                    next('/login')
                }
            }
        }
    }else {
        //如果没有登录的话,trade结算 center订单中心 paysuccess支付成功 页面不能进
        let topath = to.path
        //console.log(topath);
        if(topath == '/paysuccess' || topath == '/center/myorder' || topath == '/trade') {
            next('/login?Redirect='+topath) // 通过query参数重定向参数
        }else {
            next()
        }

    }
})

export default router
