import {regCategorylist,regCategorybanner,floorlist} from "@/api"

const mutations = {
    GETNUM(state,result){
        state.result = result.slice(0,16)//因为数据多了一个
    },
    CATEBANNER(state,result) {
        state.cateorybannerlist = result
    },
    GETFFLOORLIST(state,result) {
        state.floorlist = result
    }
}
const actions = {
    //通过api里面的接口函数调用，向服务器发送请求，获取数据
     async cateorylist(context) {
        let result =  await regCategorylist()
        if(result.code === 200) {
            context.commit('GETNUM',result.data)
           // console.log(result);要拿到里面的数据
       }  
    },
    //获取轮播图数据
    async cateorybannerlist(context) {
        let result = await regCategorybanner()
        if(result.code == 200) {
            context.commit('CATEBANNER',result.data)
        }
    },
    //获取floor数据
    async getfloorlist(context) {
        let result = await floorlist()
        if(result.code === 200) {
            context.commit('GETFFLOORLIST',result.data)
        }
    }
}
const state = {
    result:[],
    cateorybannerlist :[],
    floorlist:[]

}

export default {
    mutations,
    actions,
    state
}