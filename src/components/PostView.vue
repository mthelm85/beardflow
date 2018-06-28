<template lang="html">
  <div class="container post-container">
    <div class="row mt-3">
      <div class="col text-center">
        <h3>{{ post.title }}</h3>
        <b-img :src="post.userPic" width="90" rounded="circle" class="mt-2"></b-img>
        <br>
        <small class="text-muted">Posted: <strong>{{ post.date }}</strong>
          <br>Author: <strong>{{ post.user }}</strong></small>
        <hr />
        <modal
         name="post-pic"
         transition="scale"
         :height="height"
         :width="width">
          <b-img v-if="hasImage" :src="post.postPicUrl" :width="width"></b-img>
        </modal>
        <p class="mt-3 text-justify post-body">{{ post.text }}</p>
        <div class="text-left">
          <button @click="show" class="false-button"><b-img thumbnail v-if="hasImage" :src="post.postPicUrl" width="100"></b-img></button>
        </div>
        <hr>
        <div class="text-left">
          <textarea v-model="response.text" class="form-control mt-3" rows="6" id="title" maxlength="1500" placeholder="Grow this flow by responding here..."></textarea>
          <button class="btn btn-warning mt-3" @click.prevent="reply">Respond</button>
        </div>
        <hr>
        <b-card v-for="reply in replies" :key="reply._id" class="text-justify mb-3">
          <div class="reply-left">
            <b-img :src="reply.userPic" width="90" rounded="circle"></b-img>
          </div>
          <div>
            <strong>{{ reply.user }}:</strong> {{ reply.text }}
          </div>
          <div class="text-right mb-0">
            <small>{{ reply.date | formatDate }}</small>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { getUserInfo } from '@/mixins/getUserInfo'
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
        postPicBig: false,
        postObjectID: ''
      },
      response: {
        text: ''
      },
      replies: []
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
      this.post.postPicUrl = res.data.postPicUrl
      this.post.postObjectID = res.data._id
    }).then(() => {
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
    reply () {
      Api().post('/reply', {
        postObjectID: this.post.postObjectID,
        text: this.response.text,
        user: this.userName,
        userPic: this.profilePicUrl
      }).then((res) => {
        if (res.data.success === 'yes') {
          this.$router.go()
        } else if (res.data.error) {
          alert(res.data.error)
        }
      })
    },
    show () {
      this.$modal.show('post-pic')
    }
  },

  mixins: [getUserInfo]
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
