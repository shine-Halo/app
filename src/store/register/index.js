import {regregister,userregister,getuserlogin, getuserinfo,outregister } from '@/api'
import {usertoken,removetoken} from '@/utils/token'
const state = {
    code: '',
    token:localStorage.getItem('TOKEN'),
    userinfo : {}
}
//获取验证码
const mutations = {
    GETCODE(state,result) {
        state.code = result
    },
    GETUSERLOGIN(state,result) {
        state.token = result
    },
    GETUSERINFO(state,result) {
        state.userinfo = result
    },
    OUTREGISTER(state) {
        state.userinfo = '',
        state.token = '',
        removetoken()
    }
}
//获取验证码
const actions ={
   async regregister({commit},phone) {
        let result = await regregister(phone)
        if(result.code == 200) {
            commit('GETCODE',result.data)
        }
    },
    //用户注册
    async userregister({commit},user) {
        let result = await userregister(user)
        console.log(result);
        if(result.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登陆业务
    async getuserlogin({commit},data) {
       const result = await getuserlogin(data)
       if(result.code == 200) {
         commit('GETUSERLOGIN',result.data.token)//token是服务器下发的，是唯一标识
         usertoken(result.data.token)
         return 'ok'
       }else {
         return Promise.reject(new Error('faile'))
       }
    },
    //获取用户信息
    async getuserinfo({commit}) {
        let result = await getuserinfo()
        if(result.code == 200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else {
            return Promise.reject(new Promise('faile'))
        }
    },
    //退出登录
    async outregister({commit}) {
        let result = await outregister()
        if(result.code == 200) {
            //操作state中的数据不能再actions中进行
            commit('OUTREGISTER')
        }
    }


}
    
const getters = {


}

export default {
    state,
    mutations,
    actions,
    getters
}