import { mapGetters } from 'vuex'
export const getUserKeywords = {
  computed: {
    ...mapGetters({
      user: 'getUserData'
    }),
    userFavs () { // creates an array from user's saves keywords, sorted by most frequently appearing words
      let frequency = {}
      this.user.userKeywords.forEach((val) => {
        frequency[val] = 0
      })
      let uniques = this.user.userKeywords.filter((val) => {
        return ++frequency[val] === 1
      })
      return uniques.sort((a, b) => {
        return frequency[b] - frequency[a]
      })
    }
  },

  methods: {
    recommended (keywords) {
      let a = keywords
      let b = this.user.userKeywords
      let z
      let commonVals
      if (b.length > a.length) {
        z = b
        b = a
        a = z
      }
      commonVals = a.filter((e) => {
        return b.indexOf(e) > -1
      })
      if (commonVals.length > 5) {
        return true
      } else {
        return false
      }
    }
  }
}
