<template lang="html">
  <div class="card shadow">
    <p class="card-header bg-dark text-white text-center"><span class="h5">My Inbox</span></p>
      <div class="list-group list-group-flush" :key="page">
        <router-link v-for="message in inbox" :key="message._id" :to="{ name: 'ViewMessage', params: { messageId: message._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ message.subject }}</h5>
            <small class="text-right">{{ message.date | relativeTime }}</small>
          </div>
          <p class="mb-1">{{ `${message.message.substring(0, 70).trim()}...` }}</p>
          <b-img :src="message.userFromPic" rounded="circle" width="40" class="ml-2 img-cropped"></b-img>
          <small>From {{ message.userFrom }}</small>
        </router-link>
      </div>
    <div class="card-footer" :key="page">
      <ul class="pagination pagination-sm float-right my-2">
        <li class="page-item" :class="{ disabled: prevDisabled }"><button class="page-link" @click.prevent="previous">Previous</button></li>
        <li class="page-item disabled"><button class="page-link">{{ page }} of {{ totalPages }}</button></li>
        <li class="page-item" :class="{ disabled: nextDisabled }"><button class="page-link" @click.prevent="next">Next</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { mapGetters } from 'vuex'
import Moment from 'moment'
import { prevNext } from '@/mixins/prevNext'

export default {
  data () {
    return {
      inbox: []
    }
  },

  computed: {
    ...mapGetters({
      user: 'getUserData'
    })
  },

  created () {
    this.getPosts()
  },

  filters: {
    relativeTime (date) {
      return Moment(date).fromNow()
    },
    fullCatName (cat) {
      switch (cat) {
        case 'general':
          return 'General Beard Discussions'
        case 'styling':
          return 'Styling & Grooming'
        case 'feedback':
          return 'Feedback & Help'
        case 'products':
          return 'Beard-Related Products'
        case 'recipes':
          return 'Beard Balm/Oil/Wax Recipes'
      }
    }
  },

  methods: {
    getPosts () {
      Api().get('/get-messages', {
        params: {
          user: this.user.userName,
          page: this.page
        }
      }).then((res) => {
        console.log(res)
        this.inbox = res.data.docs
        this.totalPages = res.data.pages
      })
    }
  },

  mixins: [prevNext]
}
</script>

<style lang="css">
</style>
