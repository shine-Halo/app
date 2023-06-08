import {reggoodslist,regdetail} from '@/api'
//封装临时游客身份模块uuid----生成一个随机字符
import {getUUID} from '@/utils/uuid_token'
const state = {
    result:{},
    //游客临时身份
    uuid_token:getUUID()//函数不管执行一次还是一百次，最终返回的都是一个值
}
const mutations = {
    GETGOODSLIST(state,result) {
        state.result = result
    }
}
const actions = {
    async reggoodslist(context,skuId) {
        let result = await reggoodslist(skuId)
        if(result.code == 200 ) {
            context.commit('GETGOODSLIST',result.data)
        }
  
    },

    //加入购物车||修改某一产品的个数
   async regdetail({commit},{skuId,skuNum}) {
       //发请求：前端带一些参数给服务器（需要存储这些数据），存储成功了，没有给返回值，所以不需要三连环
       let deresult =  await regdetail(skuId,skuNum)
       if(deresult.code == 200) {
         return 'ok'
       }else {
         return Promise.reject(new Error('faile'))
       }
    }

}
const getters = {
    categoryView(state) {
        //因为一开始state里面result是空对象，如果这里有值了，就违背前面空对象了
        return state.result.categoryView || {}
    },
    skuInfo(state) {
        return state.result.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.result.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}