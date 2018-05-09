<template lang="html">
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col my-auto">
        <div class="card float-right mr-5">
            <div class="card-header text-center h4">
              <strong>Create A BeardFlow Account</strong> <span><img src="../assets/beard-black.svg" width="30px"/></span>
            </div>
            <div class="card-body">
              <form @submit.prevent="signup">
                <div class="form-group text-center">
                  <label class="lead" for="emailInput"><strong>Email Address</strong></label>
                  <input v-model.trim="email" type="email" class="form-control form-control-lg" id="emailInput" placeholder="Enter email">
                </div>
                <div class="form-group text-center">
                  <label class="lead" for="inputPass"><strong>Password</strong></label>
                  <input v-model.trim="password" type="password" class="form-control form-control-lg" id="inputPass" placeholder="Password">
                </div>
                <div class="form-group text-center">
                  <label class="lead" for="confirmPass"><strong>Confirm Password</strong></label>
                  <input v-model.trim="confirmPass" type="password" class="form-control form-control-lg" id="confirmPass" placeholder="Confirm password">
                </div>
                <div class="row justify-content-center">
                  <button class="btn btn-lg btn-outline-dark" :disabled="disabled">Submit</button>
                </div>
              </form>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPass: ''
    }
  },
  methods: {
    signup () {
      Api().post('/signup', {
        'email': this.email,
        'password': this.password
      }).then((res) => {
        if (res.data.success === 'yes') {
          this.$router.push('/profile')
        } else {
          this.signupError()
        }
      }).catch((err) => {
        console.log(err)
        this.signupError()
      })
    },
    signupError () {
      this.$swal({
        type: 'error',
        title: 'Oops...',
        text: 'We were unable to create your account. If you already have an account and have forgotten your password, contact us to reset it!',
        confirmButtonClass: 'btn btn-dark',
        buttonsStyling: false
      })
    }
  },
  computed: {
    disabled () {
      if (this.password && this.confirmPass && this.email && this.password === this.confirmPass) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang="css">
.alert {
  max-width: 400px
}
.container-fluid {
  background-image: url('../assets/1.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
