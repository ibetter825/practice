import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import layer from './layer'
import prac from './prac'

export default new Vuex.Store({
    strict: true,
    modules: {
        layer,
        prac
    }
})