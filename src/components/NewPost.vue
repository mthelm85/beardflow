<template lang="html">
  <div class="container h-100">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <form>
          <div class="form-group">
            <label class="lead font-weight-bold" for="title">Title</label>
            <textarea v-model="title" class="form-control" rows="1" id="title"></textarea>
            <label class="lead font-weight-bold" for="text">Body</label>
            <textarea v-model="text" class="form-control" rows="12" id="text"></textarea>
          </div>
          <button class="btn btn-dark" @click.prevent="post" :disabled="disabled">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  created () {
    Api().get('/account')
      .then((res) => {
        this.user = res.data.userEmail
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      title: '',
      text: '',
      user: ''
    }
  },
  computed: {
    disabled () {
      if (this.title && this.text) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    post () {
      Api().post('/post', {
        title: this.title,
        text: this.text,
        user: this.user
      }).then((res) => {
        if (res.data.success === 'yes') {
          this.$router.push('/profile')
        } else {
          console.log('Unable to post')
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
