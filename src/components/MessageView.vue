<template lang="html">
  <div class="container h-100">
    <div class="row h-100 text-center mt-3">
      <div class="col">
        <div class="mb-3 card shadow">
          <div class="card-header">
            <b-img :src="message.userFromPic" rounded="circle" width="40" class="ml-2 img-cropped"></b-img>
            Message from <strong>{{ message.userFrom }}</strong> sent {{ message.date }}
          </div>
          <div class="card-body text-justify">
            <div class="lead"><strong>Subject:</strong> {{ message.subject }}</div>
            <div class="lead mt-3"><strong>Message:</strong> {{ message.body }}</div>
            <transition-group name="height">
              <b-card v-for="reply in replies" :key="reply._id" class="text-justify mb-3 mt-4">
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
            <transition name="height" mode="out-in">
              <div>
                <div class="text-left">
                  <textarea v-model="reply.message" class="form-control mt-3" rows="6" id="title" maxlength="1500" placeholder="Type your reply here..."></textarea>
                </div>
              </div>
            </transition>
          </div>
          <div class="card-footer">
            <button @click.prevent="sendReply" :disabled="disabled" class="btn btn-dark">Reply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { mapGetters } from 'vuex'
import Moment from 'moment'

export default {
  data () {
    return {
      message: {
        subject: '',
        body: '',
        date: '',
        userFrom: '',
        userFromPic: ''
      },
      reply: {
        message: ''
      },
      replies: []
    }
  },

  beforeDestroy () {

  },

  computed: {
    disabled () {
      return (this.reply.message === '')
    },
    ...mapGetters({
      userFrom: 'getUserData'
    }),
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
    Api().get('/get-one-message', {
      params: {
        id: this.$router.history.current.params.messageId
      }
    }).then((res) => {
      this.message.subject = res.data.subject
      this.message.body = res.data.message
      this.message.date = Moment(res.data.date).format('LLLL')
      this.message.userFrom = res.data.userFrom
      this.message.userFromPic = res.data.userFromPic
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
      Api().get('/get-message-replies', {
        params: {
          messageId: this.$router.history.current.params.messageId
        }
      }).then((res) => {
        this.replies = res.data
        console.log(this.replies)
      }).catch((err) => {
        alert(err)
      })
    },
    sendReply () {
      Api().post('/reply-message', {
        messageId: this.$router.history.current.params.messageId,
        userFrom: this.userFrom.userName,
        userFromPic: this.userFrom.profilePicUrl,
        text: this.reply.message
      }).then((res) => {
        this.reply.message = ''
        this.getReplies()
      }).catch((err) => {
        alert(err)
      })
    }
  }
}
</script>

<style scoped lang="css">
.reply-left {
  float: left;
  width: 20%;
}
</style>
