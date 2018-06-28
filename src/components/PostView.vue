<template lang="html">
  <div class="container post-container">
    <div class="row mt-3">
      <div class="col text-center">
        <h3>{{ post.title }}</h3>
        <b-img :src="post.userPic" width="90" rounded="circle" class="mt-2"></b-img>
        <br>
        <small class="text-muted">Posted: <strong>{{ parsedDate }}</strong>
          <br>Author: <strong>{{ post.user }}</strong></small>
        <hr />
        <modal
         name="post-pic"
         transition="scale"
         :height="height"
         :width="width"
         @opened="opened">
          <b-img v-if="hasImage" :src="post.postPicUrl" :width="width"></b-img>
        </modal>
        <p class="mt-3 text-justify post-body">{{ post.text }}</p>
        <div class="text-left">
          <button @click="show" class="false-button"><b-img thumbnail v-if="hasImage" :src="post.postPicUrl" width="100"></b-img></button>
        </div>
        <hr>
        <div class="text-left">
          <textarea v-model="response" class="form-control mt-3" rows="6" id="title" maxlength="1500" placeholder="Grow this flow by responding here..."></textarea>
          <button class="btn btn-warning my-3">Respond</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import Moment from 'moment'
export default {
  data () {
    return {
      post: {
        date: '',
        title: '',
        text: '',
        user: '',
        userPic: '',
        postPicUrl: '',
        postPicBig: false
      }
    }
  },

  computed: {
    width () {
      switch (this.$mq) {
        case 'desktop':
          return '450'
        case 'laptop':
          return '375'
        case 'tablet':
          return '300'
        case 'mobile':
          return '275'
      }
    },
    height () {
      switch (this.$mq) {
        case 'desktop':
          return '450'
        case 'laptop':
          return '375'
        case 'tablet':
          return '300'
        case 'mobile':
          return '275'
      }
    },
    hasImage () {
      if (this.postPicUrl === null) {
        return false
      } else {
        return true
      }
    },
    parsedDate () {
      return Moment(this.post.date).format('LLLL')
    }
  },

  created () {
    Api().get('/get-one-post', {
      params: {
        id: this.$router.history.current.params.postId
      }
    }).then((res) => {
      this.post.date = res.data.date
      this.post.title = res.data.title
      this.post.text = res.data.text
      this.post.user = res.data.user
      this.post.userPic = res.data.userPic
      this.post.postPicUrl = res.data.postPicUrl
    }).catch((err) => {
      console.log(err)
    })
  },

  methods: {
    show () {
      this.$modal.show('post-pic')
    }
  }
}
</script>

<style scoped lang="css">
.false-button {
  background-color: transparent;
  border: none;
}

.false-button:hover {
  cursor: pointer;
}

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

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}
.scale-enter,
.scale-leave-active {
  opacity: 0;
  transform: scale(0.3) translateY(24px);
}
</style>
