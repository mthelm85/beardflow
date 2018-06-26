<template lang="html">
  <div class="container post-container">
    <div class="row mt-3">
      <div class="col text-center">
        <h3>{{ post.title }}</h3>
        <b-img :src="post.userPic" width="90" rounded="circle" class="mt-2"></b-img>
        <br>
        <small class="text-muted">By {{ post.user }}</small>
        <hr />
        <b-img v-if="hasImage" :src="post.postPicUrl" rounded :width="width" class="float-right mt-2 profile-pic"></b-img>
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
        userPic: '',
        postPicUrl: ''
      }
    }
  },

  computed: {
    width () {
      switch (this.$mq) {
        case 'desktop':
          return '250'
        case 'laptop':
          return '175'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
    },
    height () {
      switch (this.$mq) {
        case 'desktop':
          return '250'
        case 'laptop':
          return '175'
        case 'tablet':
          return '100'
        case 'mobile':
          return '75'
      }
    },
    hasImage () {
      if (this.postPicUrl === null) {
        return false
      } else {
        return true
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
      this.post.postPicUrl = res.data.postPicUrl
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>

<style scoped lang="css">
.post-body {
  white-space: pre-wrap;
}

.post-container {
  min-height: 100%;
}

.profile-pic {
  shape-outside: padding-box;
  shape-margin: 20px;
  margin-left: 20px;
}
</style>
