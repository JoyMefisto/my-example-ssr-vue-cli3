import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import plugins from './plugins'
import modules from './modules'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    actions,
    getters,
    mutations,
    plugins,
    modules: { ...modules }
  })
}
