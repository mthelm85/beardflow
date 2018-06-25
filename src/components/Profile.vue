<template lang="html">
  <div class="container-fluid h-100">
    <div class="row h-100 justify-content-center">

      <div class="col-xs-12 col-md-3 mt-3">
        <div class="card shadow">
          <img class="card-img-top" :src="profilePicUrl">
          <div class="card-body">
            <router-link to="/edit-profile" class="float-right cog"><i class="fas fa-cog"></i></router-link>
            <h5 class="card-title">{{ userName }}</h5>
            <p>{{ userTitle }}</p>
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-6 mt-3">
        <div class="card shadow">
          <p class="card-header bg-dark text-white text-center">Latest Posts</p>
          <div class="list-group list-group-flush">
            <router-link v-for="post in posts" :key="post._id" :to="{ name: 'ViewPost', params: { postId: post._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ post.title }}</h5>
                <small class="text-right">{{ post.date | relativeTime }}</small>
              </div>
              <p class="mb-1">{{ `${post.text.substring(0, 70).trim()}...` }}</p>
              <b-img :src="post.userPic" rounded="circle" width="40" class="ml-2 img-cropped"></b-img>
              <small>By {{ post.user }}</small>
              <span class="badge badge-primary badge-pill float-right mt-2 mr-1">{{ post.keywords[0] }}</span>
              <span class="badge badge-primary badge-pill float-right mt-2 mr-1">{{ post.keywords[1] }}</span>
              <span class="badge badge-primary badge-pill float-right mt-2 mr-1">{{ post.keywords[2] }}</span>
            </router-link>
          </div>
          <div class="card-footer">
            <router-link to="/post" class="btn btn-warning btn-sm">Post your own story</router-link>
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-3 mt-3">
        <div class="card shadow">
          <div class="list-group" :class="{ 'pb-3': padBottom }">
            <p
              v-b-popover.hover="'BeardFlow has a collection of cool beard-related apps built in. This list is a portal to our world of bearded awesomeness!'"
              title="What's this?"
              class="card-header bg-dark text-white text-center">
              Cool Beard Stuff
            </p>
            <a href="#" class="list-group-item list-group-item-action">Face Analysis</a>
            <a href="#" class="list-group-item list-group-item-action">Better My Beard</a>
            <a href="#" class="list-group-item list-group-item-action">Create/Store Recipes</a>
          </div>
        </div>
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
      posts: []
    }
  },

  computed: {
    padBottom () {
      if (this.$mq === 'mobile') {
        return true
      } else {
        return false
      }
    }
  },

  created () {
    Api().get('/get-posts')
      .then((res) => {
        let i = 0
        for (i = 0; i < res.data.length; i++) {
          this.posts.push(res.data[i])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },

  filters: {
    relativeTime (date) {
      return Moment(date).fromNow()
    }
  },

  mixins: [getUserInfo]
}
</script>
<style scoped lang="css">
.cog {
  color: #777777;
}
.cog:hover {
  color: #e0e0e0;
}
</style>
