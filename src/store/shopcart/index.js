import {regcarlist,regdeletecarlist,regchecked} from '@/api'

const state = {
    cartlist : []
}

const mutations = {
    RECARLIST(state,result) {
        state.cartlist = result
    }

}
const actions = {
    async regcarlist(context) {
        let result = await regcarlist()
        if(result.code == 200) {
            context.commit('RECARLIST',result.data)
        }
    },

    async regdeletecarlist(context,skuId) {
        let result = await regdeletecarlist(skuId)
        if(result.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },

    async regchecked(context,{skuId,isChecked}) {
        let result = await regchecked(skuId,isChecked)
        if(result.code == 200) {
            return 'ok'
        }else {
            return Promise.reject(new Error('faile'))
        }
    },

    //删除全部选中的商品
    deleteall({dispatch,getters}) {
        let allpromise = []
        //对商品进行遍历
        getters.cartlist.cartInfoList.forEach(item => {
           //判断商品是否被选中，选中了就发送请求
           let promise = item.isChecked==1 ? dispatch('regdeletecarlist',item.skuId) : ''
           //发送完请求回来是promsie，将promise对象放到数组中
           allpromise.push(promise)
        })
        //只有全部的promise对象都为成功状态才返回成功的值
        return Promise.all(allpromise)
        
    },

    //全选按钮和单选按钮一致
    selectall({dispatch,getters},isChecked) {
        let allpromise = []
        getters.cartlist.cartInfoList.forEach(item => {
            //代表上面的子按钮都跟着全选按钮走，全选按钮为1，其他的也是
            let promise = dispatch('regchecked',{skuId:item.skuId,isChecked})
            allpromise.push(promise)
        })
        return Promise.all(allpromise)
    }
}

const getters = {
    cartlist(state) {
        return state.cartlist[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}