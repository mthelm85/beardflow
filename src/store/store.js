import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    page: 1,
    searchResults: null,
    totalPages: null
  },
  getters: {
    getSearchResults: (state) => {
      return state.searchResults
    },
    getTotalPages: (state) => {
      return state.totalPages
    },
    getCurrentPage: (state) => {
      return state.totalPages
    }
  }
})
