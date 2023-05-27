import {regCategorylist} from "@/api"

const mutations = {
    GETNUM(state,result){
        state.result = result.slice(0,16)//因为数据多了一个
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
    }
}
const state = {
    result:[],
}

export default {
    mutations,
    actions,
    state
}