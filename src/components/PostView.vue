<template lang="html">
  <div class="container h-100">
    <div class="row h-100 mt-3">
      <div class="col text-center">
        <h3>{{ post.title }}</h3>
        <b-img :src="post.userPic" width="90" rounded class="mt-3"></b-img>
        <br>
        <small class="text-muted">By {{ post.user }}</small>
        <p class="mt-3 text-justify post-body">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
export default {
  data () {
    return {
      post: {
        title: '',
        text: '',
        user: '',
        userPic: ''
      }
    }
  },

  created () {
    Api().get('/get-one-post', {
      params: {
        id: this.$router.history.current.params.postId
      }
    }).then((res) => {
      this.post.title = res.data.title
      this.post.text = res.data.text
      this.post.user = res.data.user
      this.post.userPic = res.data.userPic
    }).catch((err) => {
      console.log(err)
    })
    console.log(this.$router.history.current.params.postId)
  }
}
</script>

<style scoped lang="css">
.post-body {
  white-space: pre-wrap;
}
</style>
