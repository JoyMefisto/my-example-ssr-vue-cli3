import api from '@/api'

export default {
  namespaced: true,
  state: () => {
    return {
      data: []
    }
  },
  mutations: {
    setDate (state, value) {
      state.data = value
    }
  },
  getters: {
    getData: state => state.data
  },
  actions: {
    fetchData ({ commit }) {
      return api.home.getData()
        .then(res => {
          commit('setDate', res.data.data)
        })
        .catch(e => console.log(e))
    }
  }
}
