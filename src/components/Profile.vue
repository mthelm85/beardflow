<template lang="html">
  <div class="container-fluid h-100">
    <div class="row h-100">
      <div class="col-3 mt-3">
        <div class="card">
          <img class="card-img-top" :src="profilePicUrl">
          <div class="card-body">
            <h5 class="card-title">{{ userName }}</h5>
            <p>{{ userTitle }}</p>
          </div>
        </div>
      </div>
      <div class="col-6 mt-3">
        <div class="list-group list-group-flush">
          <router-link v-for="post in posts" :key="post.date" :to="{ name: 'ViewPost', params: { postId: post._id } }" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ post.title }}</h5>
              <small>{{ post.date | relativeTime }}</small>
            </div>
            <p class="mb-1">{{ `${post.text.substring(0, 70).trim()}...` }}</p>
            <small>By {{ post.user }}</small>
          </router-link>
        </div>
        <div class="card-footer">
          <router-link to="/post" class="btn btn-warning btn-sm">Post your own story</router-link>
        </div>
      </div>
      <div class="col-3 mt-3">
        <div class="list-group">
          <p
            v-b-popover.hover="'BeardFlow has a collection of cool beard-related apps built in. This list is a portal to our world of bearded awesomeness!'"
            title="What's this?"
            class="list-group-item bg-dark text-white text-center">
            Cool Beard Stuff
          </p>
          <a href="#" class="list-group-item list-group-item-action">Face Analysis</a>
          <a href="#" class="list-group-item list-group-item-action">Better My Beard</a>
          <a href="#" class="list-group-item list-group-item-action">Create/Store Recipes</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/router/api'
import { getUserInfo } from '@/getUserInfo'
import Moment from 'moment'
export default {
  data () {
    return {
      posts: []
    }
  },
  created () {
    Api().get('/get-posts')
      .then((res) => {
        let i = 0
        for (i = 0; i < res.data.length; i++) {
          this.posts.push(res.data[i])
        }
        console.log(this.posts)
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

<style lang="css">
</style>
