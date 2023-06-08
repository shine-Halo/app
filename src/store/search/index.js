import {regetsearch} from '@/api'

const state = {
    regetsearch:{}

}

const mutations = {
    REGETSEARCH(state,result) {
        state.regetsearch = result
    }
}

const actions ={
    async regetsearch(context,params={}) {
        const result = await regetsearch(params)
       // console.log(result);
        if(result.code === 200) {
            context.commit('REGETSEARCH',result.data)
        }
    }

}
    
const getters = {
    goodsList(state) {
        return state.regetsearch.goodsList
        
    },
    trademarkList(state) {
        return state.regetsearch.trademarkList
    },
    attrsList(state) {
        return state.regetsearch.attrsList
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}