import Api from '@/router/api'
export const getUserInfo = {
  computed: {
    userFavs () { // creates an array from user's saves keywords, sorted by most frequently appearing words
      let frequency = {}
      this.userKeywords.forEach((val) => {
        frequency[val] = 0
      })
      let uniques = this.userKeywords.filter((val) => {
        return ++frequency[val] === 1
      })
      return uniques.sort((a, b) => {
        return frequency[b] - frequency[a]
      })
    }
  },

  created () {
    Api().get('/account').then((res) => {
      this.profilePicUrl = res.data.profilePicUrl
      this.userName = res.data.userName
      this.userTitle = res.data.userTitle
      this.userEmail = res.data.userEmail
      this.userKeywords = res.data.keywords
    }).catch((err) => {
      console.log(err)
    })
  },
  data () {
    return {
      profilePicUrl: null,
      userName: null,
      userTitle: null,
      userEmail: null,
      userKeywords: null
    }
  }
}
