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
import Axios from 'axios'
import { getUserInfo } from '@/getUserInfo'
export default {
  data () {
    return {
      postKeywords: [],
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
    async post () {
      const keywords = await Axios.post(`https://apis.paralleldots.com/v3/keywords?text=${this.text}&api_key=FlCE7ByUzvtH1PSXffuVd470L3ZIY61KDeNJnE8y9B4`)
      let i
      for (i = 0; i < keywords.data.keywords.length; i++) {
        this.postKeywords.push(keywords.data.keywords[i].keyword)
      }

      Api().post('/post', {
        title: this.title,
        text: this.text,
        user: this.userName,
        userPic: this.profilePicUrl,
        keywords: this.postKeywords
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
