import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchResults: null,
    totalPages: null,
    currentPage: 1
  },
  getters: {
    getSearchResults: (state) => {
      return state.searchResults
    },
    getTotalPages: (state) => {
      return state.totalPages
    },
    getCurrentPage: (state) => {
      return state.currentPage
    }
  }
})
