import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from './detail'
import register from './register'
import shopcart from './shopcart'
import trade from './trade'

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        register,
        shopcart,
        trade

    }
})