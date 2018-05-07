<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="#navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <span class="navbar-brand mb-0 h1">BeardFlow <img src="../assets/beard.svg" width="30"/></span>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">What is BeardFlow?</router-link>
          </li>
        </ul>
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

    }
  },
  methods: {
    logout () {
      Api().get('/logout').then((res) => {
        if (res.data.success === 'yes') {
          this.$router.push('/')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="css">
</style>
