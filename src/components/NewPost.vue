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
import { getUserInfo } from '@/getUserInfo'
export default {
  data () {
    return {
      title: '',
      text: ''
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
        user: this.userName,
        userPic: this.profilePicUrl
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
  },

  mixins: [getUserInfo]
}
</script>

<style lang="css">
</style>
