import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    searchResults: null,
    totalPages: null,
    currentPage: 1,
    user: {
      profilePicUrl: null,
      userName: null,
      userTitle: null,
      userEmail: null,
      userKeywords: null,
      userFavorites: null
    }
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
    },
    getUserData: (state) => {
      return state.user
    }
  }
})
