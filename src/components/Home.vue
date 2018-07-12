<template lang="html">
  <div class="container-fluid with-bg-photo">
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
                  <input v-model.trim.lazy="password" type="password" class="form-control form-control-lg" id="inputPass" placeholder="Password">
                    <b-popover
                      target="inputPass"
                      placement="left"
                      triggers="null"
                      :show.sync="passPopover">
                      <template slot="title">Warning! <span class="float-right"><img src="../assets/beard-black.svg" width="20px"/></span></template>
                      Your password must be at least 6 characters in length</b-popover>
                </div>
                <div class="form-group text-center">
                  <label class="lead" for="confirmPass"><strong>Confirm Password</strong></label>
                  <input v-model.trim="confirmPass" type="password" class="form-control form-control-lg" id="confirmPass" placeholder="Confirm password">
                  <b-popover
                    target="confirmPass"
                    placement="left"
                    triggers="null"
                    delay="1000"
                    :show.sync="confirmPopover">
                    <template slot="title">Warning! <span class="float-right"><img src="../assets/beard-black.svg" width="20px"/></span></template>
                    This field must match the password field above</b-popover>
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
          this.$router.push('/setup-profile')
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
        title: 'Oops...',
        text: 'We were unable to create your account. If you already have an account and have forgotten your password, contact us to reset it!',
        confirmButtonClass: 'btn btn-dark',
        buttonsStyling: false,
        imageUrl: '/static/beard-black.png',
        imageWidth: 150,
        imageHeight: 150
      })
      this.email = null
      this.password = null
      this.confirmPass = null
    }
  },

  computed: {
    disabled () {
      if (this.password.length > 5 && this.password === this.confirmPass && this.email !== '') {
        return false
      } else {
        return true
      }
    },
    passPopover () {
      if (this.password.length > 0 && this.password.length < 6) {
        return true
      } else {
        return false
      }
    },
    confirmPopover () {
      if (this.confirmPass.length >= this.password.length && this.password !== this.confirmPass) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="css">

.with-bg-photo {
  background-image: url('../assets/1.jpeg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>
