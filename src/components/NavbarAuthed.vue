<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark shadow">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <span class="navbar-brand mb-0 h1">BeardFlow <img src="../assets/beard.svg" width="30"/></span>
          <router-link tag="li" to="/" class="nav-item" active-class="active" exact><a class="nav-link">Home</a></router-link>
          <router-link tag="li" to="/profile" class="nav-item" :active-class="activeClass"><a class="nav-link">My Portal</a></router-link>
          <router-link tag="li" to="/profile/mailbox" class="nav-item" active-class="active"><a class="nav-link">Private Flows</a></router-link>
        </ul>
        <form class="form-inline">
          <div class="input-group mr-2">
            <div class="input-group-prepend">
              <button class="btn btn-outline-light" @click.prevent="search"><i class="fas fa-search"></i></button>
            </div>
            <input v-model="searchTerm" type="text" class="form-control" placeholder="Search all posts">
          </div>
        </form>
        <form class="form-inline my-2 my-lg-0">
          <button class="btn btn-outline-light my-2 my-sm-0" @click.prevent="logout">Logout</button>
        </form>
      </div>
      </nav>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  data () {
    return {
      ativeClass: 'active',
      searchTerm: ''
    }
  },

  computed: {
    activeClass () {
      if (this.$route.path === '/profile/mailbox') {
        return ''
      } else {
        return 'active'
      }
    }
  },

  methods: {
    logout () {
      Api().get('/logout').then((res) => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },

    search () {
      if (this.searchTerm !== '') {
        this.$store.state.currentPage = 1
        Api().post('/search-posts', {
          searchTerm: this.searchTerm
        }).then((res) => {
          if (res.data.length === 0) {
            this.searchTerm = ''
          }
          this.$store.state.searchResults = res.data
          this.$store.state.totalPages = Math.ceil(res.data.length / 5)
          this.$router.push('/profile/search-results')
        }).catch((err) => {
          if (err) {
            alert(err)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="css">

</style>
