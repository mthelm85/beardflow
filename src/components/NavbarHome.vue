<template lang="html">
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark shadow-lg">
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
        <form class="form-inline my-2 my-lg-0" @submit.prevent="login">
          <input class="form-control mr-sm-2" v-model.trim="email" type="email" name="email" placeholder="E-mail" aria-label="E-mail">
          <input class="form-control mr-sm-2" v-model.trim="password" type="password" name="password" placeholder="Password" aria-label="Password">
          <button class="btn btn-outline-light my-2 my-sm-0" :disabled="disabled">Login</button>
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
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      if (!this.email || !this.password) {
        this.loginError()
      }
      Api().post('/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        console.log(res.data)
        if (res.data.success === 'yes') {
          this.$router.push('/profile')
        }
      }).catch((err) => {
        console.log(err)
        this.loginError()
      })
    },
    loginError () {
      this.$swal({
        title: 'Oops...',
        text: 'We were unable to log you in. Please check your credentials and try again!',
        imageUrl: '/static/beard-black.png',
        imageWidth: 150,
        imageHeight: 150
      })
      this.email = null
      this.password = null
    }
  },

  computed: {
    disabled () {
      if (this.email && this.password) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="css">

</style>
