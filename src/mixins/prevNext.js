export const prevNext = {
  data () {
    return {
      page: 1,
      totalPages: null
    }
  },

  computed: {
    nextDisabled () {
      if (this.page === this.totalPages) {
        return true
      } else {
        return false
      }
    },
    prevDisabled () {
      if (this.page === 1) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    next () {
      this.page++
      this.getPosts()
    },
    previous () {
      this.page--
      this.getPosts()
    }
  }
}
