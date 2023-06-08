import {gettradeinfo} from '@/api/index'
const state = {
    tradeinfo : []
}

const mutations = {
    GETTRADEINFO(state,result) {
        state.tradeinfo = result
    }
}

const actions = {
    //订单交易页信息和送货清单
    async gettradeinfo({commit}) {
        const result = await gettradeinfo()
        // console.log(result);
        if(result.code == 200) {
            commit('GETTRADEINFO',result.data)
        }
    }
}

const getters = {
    userAddressList() {
        return state.tradeinfo.userAddressList || []
    },
    detailArrayList() {
        return state.tradeinfo.detailArrayList
    }
    
}

export default {
    state,
    mutations,
    actions,
    getters
}