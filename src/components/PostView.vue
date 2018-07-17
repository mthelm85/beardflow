<template lang="html">
  <div class="container post-container">
    <div class="row mt-3">
      <div class="col text-center">
        <h3>{{ post.title }}</h3>
        <b-img :src="post.userPic" width="90" rounded="circle" class="mt-2"></b-img>
        <br>
        <small class="text-muted">Posted {{ post.date }}
          <br>By {{ post.user }}</small>
        <hr />
        <modal
         name="post-pic1"
         transition="scale"
         :height="height"
         :width="width">
          <b-img v-if="hasImage(1)" :src="post.imageUrls[0]" :width="width"></b-img>
        </modal>
        <modal
         name="post-pic2"
         transition="scale"
         :height="height"
         :width="width">
          <b-img v-if="hasImage(2)" :src="post.imageUrls[1]" :width="width"></b-img>
        </modal>
        <p class="mt-3 text-justify post-body lead">{{ post.text }}</p>
        <div class="row">
          <div class="col-4">
            <div v-if="hasImage(1)" class="text-left">
              <button @click="show(1)" class="false-button"><b-img thumbnail :src="post.imageUrls[0]" width="100"></b-img></button>
              <button v-if="hasImage(2)" @click="show(2)" class="false-button"><b-img thumbnail :src="post.imageUrls[1]" width="100"></b-img></button>
            </div>
            <div v-if="!response.showInput" class="text-left">
              <button class="btn btn-warning mt-3" @click.prevent="showResponseInput">Post a Response</button>
            </div>
          </div>
          <like-dislike
            :postKeywords="post.keywords"
            :userEmail="userEmail">
          </like-dislike>
        </div>
        <transition name="height" mode="out-in">
          <div v-if="response.showInput">
            <hr>
            <div class="text-left">
              <textarea v-model="response.text" class="form-control mt-3" rows="6" id="title" maxlength="1500" placeholder="Grow this flow by responding here..."></textarea>
              <button class="btn btn-warning mt-3" @click.prevent="reply" :disabled="disabled">Respond</button>
            </div>
          </div>
        </transition>
        <hr>
        <transition-group name="height">
          <b-card v-for="reply in replies" :key="reply._id" class="text-justify mb-3">
            <div class="reply-left">
              <b-img :src="reply.userPic" :width="replyWidth" rounded="circle"></b-img>
            </div>
            <div>
              {{ reply.text }}
            </div>
            <footer class="blockquote-footer text-right">
              {{ reply.user }}
              <br>
              <cite>{{ reply.date | formatDate }}</cite>
            </footer>
          </b-card>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import LikeDislike from '@/components/LikeDislike.vue'
import { mapGetters } from 'vuex'
import Moment from 'moment'
export default {
  components: {
    LikeDislike
  },

  data () {
    return {
      post: {
        date: '',
        title: '',
        text: '',
        user: '',
        userPic: '',
        imageUrls: null,
        postPicBig: false,
        postObjectID: '',
        keywords: null
      },
      response: {
        text: '',
        showInput: false
      },
      replies: []
    }
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    }),
    disabled () {
      if (this.response.text !== '') {
        return false
      } else {
        return true
      }
    },
    width () {
      switch (this.$mq) {
        case 'desktop':
          return '450'
        case 'laptop':
          return '375'
        case 'tablet':
          return '300'
        case 'mobile':
          return '200'
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
          return '200'
      }
    },
    replyWidth () {
      switch (this.$mq) {
        case 'desktop':
          return '90'
        case 'laptop':
          return '90'
        case 'tablet':
          return '70'
        case 'mobile':
          return '40'
      }
    }
  },

  created () {
    Api().get('/get-one-post', {
      params: {
        id: this.$router.history.current.params.postId
      }
    }).then((res) => {
      this.post.date = Moment(res.data.date).format('LLLL')
      this.post.title = res.data.title
      this.post.text = res.data.text
      this.post.user = res.data.user
      this.post.userPic = res.data.userPic
      this.post.imageUrls = res.data.imageUrls
      this.post.postObjectID = res.data._id
      this.post.keywords = res.data.keywords
    }).then(() => {
      this.getReplies()
    }).catch((err) => {
      alert(err)
    })
  },

  filters: {
    formatDate (date) {
      return Moment(date).format('LLLL')
    }
  },

  methods: {
    getReplies () {
      Api().get('/get-replies', {
        params: {
          postObjectID: this.$router.history.current.params.postId
        }
      }).then((res) => {
        this.replies = res.data
        console.log(this.replies)
      }).catch((err) => {
        alert(err)
      })
    },
    hasImage (n) {
      if (this.post.imageUrls.length >= n) {
        return true
      } else if (this.post.imageUrls.length <= n) {
        return false
      }
    },
    reply () {
      Api().post('/reply', {
        postObjectID: this.post.postObjectID,
        text: this.response.text,
        user: this.user.userName,
        userPic: this.user.profilePicUrl
      }).then((res) => {
        this.response.text = ''
        if (res.data.success === 'yes') {
          this.getReplies()
        } else if (res.data.error) {
          alert(res.data.error)
        }
      })
    },
    show (n) {
      if (n === 1) {
        this.$modal.show('post-pic1')
      } else if (n === 2) {
        this.$modal.show('post-pic2')
      }
    },
    showResponseInput () {
      this.response.showInput = true
    }
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

.reply-left {
  float: left;
  width: 20%;
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
